package com.thesis.sabuhi.benchmarkapi.validating

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.io.BufferedReader
import java.io.InputStreamReader

@CrossOrigin
@RestController
class EventAttributesController {

    @GetMapping("get-event-attributes")
    fun getEventAttributes(fileName: String) : Any {
        var s: String?
        val executable = "python3 /home/sabuhi/PycharmProjects/scientificProject/data_features.py $fileName"
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
}