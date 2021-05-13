package com.thesis.sabuhi.benchmarkapi.validating

import com.beust.klaxon.JsonArray
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.thesis.sabuhi.benchmarkapi.ROOT_PATH
import com.thesis.sabuhi.benchmarkapi.extensions.generateResultsFileName
import com.thesis.sabuhi.benchmarkapi.extensions.getOriginalFileName
import com.thesis.sabuhi.benchmarkapi.files.FileService
import com.thesis.sabuhi.benchmarkapi.files.FileStats
import com.thesis.sabuhi.benchmarkapi.validating.services.ValidationDetails
import com.thesis.sabuhi.benchmarkapi.validating.services.ValidationService
import org.json.JSONArray
import org.json.JSONObject
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.io.FileNotFoundException
import java.io.FileOutputStream
import javax.validation.Valid
import javax.validation.constraints.NotBlank

@CrossOrigin
@RestController
@RequestMapping("api/")
class ValidationController(
    private val resultsToJsonClient: ResultsToJsonClient,
    private val fileService: FileService,
    private val validationService: ValidationService
) {

    private val log = LoggerFactory.getLogger(javaClass)

    @PostMapping("evaluate")
    fun validate(@RequestBody @Valid request: ValidationRequest): ResponseEntity<Map<String, String>> = with(request) {
        log.debug("Evaluating $fileName...")
        val (kValue, splitPercentage) = try {
            splitValues()
        } catch (e: IllegalArgumentException) {
            return ResponseEntity(mapOf("error" to "Please select split file"), HttpStatus.BAD_REQUEST)
        }
        val originalFileName = fileName.getOriginalFileName()
        val details = ValidationDetails(
            splitPercentage,
            originalFileName,
            payload,
            kValue,
            classifier,
            maxDepth,
            minSamples,
            coverageThreshold,
            individualActivities,
            declare,
            sequence,
            hybrid
        )
        val (rawResults, errors) = validationService.runValidation(details)
        val results = configureResults(details, rawResults.toString())

        results?.let {
            if (errors.isNotEmpty() || results.isEmpty) return handleError(errors.last())
        }

        val resultFileName = fileName.generateResultsFileName()

        fileService.writeToFile(results.toString(), File("./results/$resultFileName"))

        appendResultsFile(resultFileName)

        return ResponseEntity(mapOf(fileName to resultFileName), HttpStatus.OK)
    }

    @GetMapping("get-results")
    fun getValidationResults(fileName: String): ResponseEntity<List<*>> {
        if (fileName.isEmpty()) return ResponseEntity.ok(listOf<Any>(listOf<Any>(), listOf<Any>()))
        val fileContent = try {
            val resultFile = File("./results/$fileName")
            resultFile.inputStream().readBytes().toString(Charsets.UTF_8)
        } catch (e: Exception) {
            return ResponseEntity.ok(listOf<Any>(listOf<Any>(), listOf<Any>()))
        }

        return ResponseEntity(jacksonObjectMapper().readValue(fileContent, List::class.java), HttpStatus.OK)
    }

    @GetMapping("get-all-files")
    fun getValidationFiles(page: String?): Set<*> {
        val uploadedFiles = try {
            jacksonObjectMapper().readValue(File("$ROOT_PATH/allFiles/uploaded_files.json"), Set::class.java)
        } catch (e: FileNotFoundException) {
            setOf<Any>()
        }
        val splitFiles = try {
            jacksonObjectMapper().readValue(File("$ROOT_PATH/allFiles/files_json.json"), Set::class.java)
        } catch (e: FileNotFoundException) {
             setOf<Any>()
        }

        return (uploadedFiles + splitFiles).toSet()
    }

    @PostMapping("file-stats")
    fun calculateLogStats(@RequestParam("file") file: MultipartFile): FileStats {
        createFile(file)
        val inputStream = file.inputStream

        return fileService.calculateStats(inputStream)
    }

    @PostMapping("curr-file-stats")
    fun calculateCurrentFile(@RequestBody request: FileStatsRequest): FileStats {
        val file = File("${ROOT_PATH}logs/${request.fileName}")
        return fileService.calculateStats(file.inputStream())
    }

    private fun handleError(error: String): ResponseEntity<Map<String, String>> {
        return when (error) {
            "KeyError: 'Label'" -> ResponseEntity(mapOf("error" to "Unlabeled log file"), HttpStatus.BAD_REQUEST)
            else -> ResponseEntity(mapOf("error" to "Something went wrong while evaluating the file"), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    private fun createFile(file: MultipartFile) {
        val newFile = File("$ROOT_PATH/logs/${file.originalFilename}")
        FileOutputStream(newFile).use { os -> os.write(file.bytes) }
        val fileToWrite = File("$ROOT_PATH/allFiles/uploaded_files.json")

        val uploadedFiles = jacksonObjectMapper().readValue(fileToWrite, Set::class.java)

        val content = JSONArray(uploadedFiles)
            .put(
                JSONObject()
                    .put(file.originalFilename, "")
            )

        fileService.writeToFile(content.toString(), fileToWrite)
    }

    private fun ValidationRequest.appendResultsFile(resultFileName: String) {
        val jsonFile = File("$ROOT_PATH/allFiles/files_json.json")

        val files: Set<MutableMap<String, String>> = jacksonObjectMapper().readValue(jsonFile)

        files.find { it.containsKey(fileName) }?.set(fileName, resultFileName)

        jacksonObjectMapper().writeValue(jsonFile, files)
    }

    private fun ValidationRequest.splitValues(): Pair<String, String> {
        val firstTwo = fileName.take(3)
        var splitPercentage1 = "0.2"
        var kValue1 = "1"
        when {
            firstTwo.matches(Regex("[+-]?([0-9]*[.])?[0-9]+")) -> {
                splitPercentage1 = firstTwo
            }
            firstTwo.matches(Regex("[0-9]k_?")) -> {
                kValue1 = fileName.substring(0, 1)
            }
            else -> throw IllegalArgumentException()
        }
        return Pair(kValue1, splitPercentage1)
    }

    private fun ValidationRequest.configureResults(details: ValidationDetails, rawResults: String): JSONArray? = with(details) {
        val json = JSONObject()
            .put("File Name", fileName)
            .put("Split Percentage", splitPercentage.toFloat() * 100)

        if (kValue.toInt() >= 3) {
            json.put("k value", kValue)
        }

        when (payload) {
            Payload.DEFAULT -> json.put("Feature Set", "Basic Features")
            Payload.NORMAL -> json.put("Feature Set", "Pure Data Features")
            Payload.BOTH -> json.put("Feature Set", "Data Aware Declare Constraints")
        }

        when (classifier) {
            Classification.DECISION_TREE -> {
                json.put("Max Depth", maxDepth)
                json.put("Min Samples", minSamples)
                json.put("Classifier", "Decision Tree")
            }
            Classification.LOGISTIC_REGRESSION -> json.put("Classifier", "Logistic Regression")
        }

        json.put("Coverage Threshold", coverageThreshold)
        val results = resultsToJsonClient.resultsToJson(rawResults)
        JSONArray()
            .put(JsonArray(json))
            .put(results)
    }

    data class FileStatsRequest(val fileName: String)
}