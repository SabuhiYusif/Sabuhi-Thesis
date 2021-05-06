package com.thesis.sabuhi.benchmarkapi.attribute

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.thesis.sabuhi.benchmarkapi.labeling.LabelingMethod
import org.springframework.core.io.support.ResourcePatternResolver
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import java.io.BufferedReader
import java.io.InputStreamReader

@RestController
@CrossOrigin
class AttributeController(private val resourcePatternResolver: ResourcePatternResolver) {

    @PostMapping("attributes-names")
    fun getAttributeNames(file: String, labelingMethod: LabelingMethod): Set<String> {
        var s: String?
        val executable = "python3 /home/sabuhi/PycharmProjects/scientificProject/attribute_names.py " + file + " " + labelingMethod.name.toLowerCase()
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

    @PostMapping("attributes-values")
    fun getAttributeValues(file: String, attributeKey: String): Set<String> {
        var s: String?

        val attrNameWithDashes = attributeKey.replace(" ", "-")
        val executable =
            "python3 /home/sabuhi/PycharmProjects/scientificProject/attribute_values.py " + file + " " + attrNameWithDashes

        println(executable)
        val attributes = Runtime.getRuntime().exec(executable)

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