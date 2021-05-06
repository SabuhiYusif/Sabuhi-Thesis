package com.thesis.sabuhi.benchmarkapi.validating

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.io.OutputStreamWriter
import java.util.Scanner


@CrossOrigin
@RestController
class PureDataSettingsController {

    @PostMapping("write-to-settings")
    fun writeToSettings(@RequestBody body: SettingsRequest) {
        val file = File("settings.cfg")
        val fileToWrite = File("/home/sabuhi/Thesis/devianceminingthesis/DevianceMiningPipeline/settings.cfg")
        val newLine = System.getProperty("line.separator")

        val scanner = Scanner(FileInputStream(file))
        val out = OutputStreamWriter(FileOutputStream(fileToWrite))
        var line: String
        while (scanner.hasNextLine()) {
            line = scanner.nextLine()
            out.write(line)
            out.write(newLine)
            if (line == "--EVENT--") {
                body.events.map { (k, v) ->
                    out.write("$k|$v")
                    out.write(newLine)
                }
            }

            if (line == "--EVENT DEFAULT--") {
                body.eventDefault.map { (k, v) ->
                    out.write("$k|$v")
                    out.write(newLine)
                }
            }
        }

        scanner.close()
        out.close()
    }
}

data class SettingsRequest(val events: Map<String, String>, val eventDefault: Map<String, String>)
