package com.thesis.sabuhi.benchmarkapi.validating

import com.beust.klaxon.JsonArray
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.thesis.sabuhi.benchmarkapi.ROOT_PATH
import com.thesis.sabuhi.benchmarkapi.extensions.generateResultsFileName
import com.thesis.sabuhi.benchmarkapi.extensions.getOriginalFileName
import com.thesis.sabuhi.benchmarkapi.files.FileService
import com.thesis.sabuhi.benchmarkapi.files.FileStats
import org.json.JSONArray
import org.json.JSONObject
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.server.ResponseStatusException
import java.io.BufferedReader
import java.io.File
import java.io.FileOutputStream
import java.io.InputStreamReader
import javax.validation.Valid

@CrossOrigin
@RestController
class ValidationController(
    private val resultsToJsonClient: ResultsToJsonClient,
    private val fileService: FileService
) {

    private val log = LoggerFactory.getLogger(javaClass)

    @PostMapping
    fun validate(@RequestBody @Valid request: ValidationRequest): Map<String, String> = with(request) {
        log.debug("Evaluating $fileName...")
        val (kValue, splitPercentage) = splitValues()
        val originalFileName = fileName.getOriginalFileName()

        val path = "python3 ${ROOT_PATH}benchmarks.py $splitPercentage $originalFileName.xes ${payload.toLower()} $kValue $classifier $maxDepth $minSamples $coverageThreshold"
        log.debug("Execute validation process in path $path")

        val executable = Runtime.getRuntime().exec(path)
        val stdInput = BufferedReader(InputStreamReader(executable.inputStream))
        val stdError = BufferedReader(InputStreamReader(executable.errorStream))

        var line: String?

        val rawResults = StringBuilder()
        while (stdInput.readLine().also { line = it } != null) {
            rawResults.append(line.toString().trim() + "\n")
            println("NORMAL " + line.toString().trim())
            log.debug("NORMAL " + line.toString().trim())

        }

        val results = configureResults(kValue, splitPercentage, rawResults)

        val errors = mutableListOf<String>()
        while (stdError.readLine().also { line = it } != null) {
            errors.add(line.toString().trim())
            println("ERRORS " + line.toString().trim())
            log.debug("ERRORS " + line.toString().trim())
        }

        if (errors.isNotEmpty() && results != null && results.isEmpty) handleError(errors.last())

        val resultFileName = fileName.generateResultsFileName()

        fileService.writeToFile(results.toString(), File("./results/$resultFileName"))

        appendResultsFile(resultFileName)

        return mapOf(fileName to resultFileName)
    }

    @PostMapping("/get-results")
    fun getValidationResults(@RequestBody request: ValidationResultsRequest): ResponseEntity<List<*>> {
        if (request.fileName.isEmpty()) return ResponseEntity.ok(listOf<Any>(listOf<Any>(), listOf<Any>()))
        val fileContent = try {
            val resultFile = File("./results/${request.fileName}")
            resultFile.inputStream().readBytes().toString(Charsets.UTF_8)
        } catch (e: Exception) {
            return ResponseEntity.ok(listOf<Any>())
        }

        return ResponseEntity(jacksonObjectMapper().readValue(fileContent, List::class.java), HttpStatus.OK)
    }

    @GetMapping("/get-all-files")
    fun getValidationFiles(page: String?): Set<*> {
        val uploadedFiles = jacksonObjectMapper().readValue(File("$ROOT_PATH/allFiles/uploaded_files.json"), Set::class.java)
        val splitFiles = jacksonObjectMapper().readValue(File("$ROOT_PATH/allFiles/files_json.json"), Set::class.java)

        return (uploadedFiles + splitFiles).toSet()
    }

    @PostMapping("/file-stats")
    fun getLogStats(@RequestParam("file") file: MultipartFile): FileStats {
        createFile(file)
        val inputStream = file.inputStream

        val eventRegex = Regex("<event>")
        val caseRegex = Regex("<trace>")
        val bufferedReader = BufferedReader(InputStreamReader(inputStream))
        val events = mutableListOf<Int>()
        val cases = mutableListOf<Int>()
        bufferedReader.forEachLine {
            events.add(eventRegex.findAll(it).count())
            cases.add(caseRegex.findAll(it).count())
        }

        return FileStats(events.reduce { acc, i -> acc + i }, cases.reduce { acc, i -> acc + i })
    }

    private fun Payload.toLower() = this.name.toLowerCase()

    private fun handleError(error: String) {
        when (error) {
            "KeyError: 'Label'" -> throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Unlabeled log file")
            else -> throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred $error")
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
            else -> throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid log file, file cannot be validated")
        }
        return Pair(kValue1, splitPercentage1)
    }

    private fun ValidationRequest.configureResults(kValue: String, splitPercentage: String, stats: StringBuilder): JSONArray? {
        val json = JSONObject()
            .put("fileName", fileName)
            .put("kValue", kValue)
            .put("splitPercentage", splitPercentage)

        val results = resultsToJsonClient.resultsToJson(stats.toString())
        return JSONArray()
            .put(JsonArray(json))
            .put(results)
    }
}