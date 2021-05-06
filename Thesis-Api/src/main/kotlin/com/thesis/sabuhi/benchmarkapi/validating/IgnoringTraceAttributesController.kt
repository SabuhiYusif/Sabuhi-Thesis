package com.thesis.sabuhi.benchmarkapi.validating

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.io.BufferedReader
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.util.Scanner

@CrossOrigin
@RestController
class IgnoringTraceAttributesController {

    @PostMapping("add-ignored-attributes")
    fun addIgnoredAttributes(@RequestBody body: FileRequest) {
        val attributesToBeIgnored: List<String> = getIgnoredAttributes(body.fileName)

        writeToSettingsFile(attributesToBeIgnored)
    }

    private fun writeToSettingsFile(attributesToBeIgnored: List<String>) {
        val defaultTemplate = File("settings.cfg")
        val fileToWrite = File("/home/sabuhi/Thesis/devianceminingthesis/DevianceMiningPipeline/sepsis_settings.cfg")
        val newLine = System.getProperty("line.separator")

        val scanner = Scanner(FileInputStream(defaultTemplate))
        val out = OutputStreamWriter(FileOutputStream(fileToWrite))
        var line: String
        while (scanner.hasNextLine()) {
            line = scanner.nextLine()
            out.write(line)
            out.write(newLine)
            if (line == "--TRACE IGNORED--") {
                attributesToBeIgnored.forEach {
                    out.write(it)
                    out.write(newLine)
                }
            }
        }

        scanner.close()
        out.close()
    }

    private fun getIgnoredAttributes(fileName: String): List<String> {
        var s: String?
        val executable = "python3 /home/sabuhi/PycharmProjects/scientificProject/ignoring_traces.py $fileName"
        val attributes = Runtime.getRuntime()
            .exec(executable)
        println(executable)

        val stdInput = BufferedReader(InputStreamReader(attributes.inputStream))

        val stats = StringBuilder()
        while (stdInput.readLine().also { s = it } != null) {
            val ss = s.toString().trim() + "\n"
            stats.append(ss)

            println(ss)
        }

        print(stats.toString())
        return jacksonObjectMapper().readValue(stats.toString())
    }

    data class FileRequest(val fileName: String)
}