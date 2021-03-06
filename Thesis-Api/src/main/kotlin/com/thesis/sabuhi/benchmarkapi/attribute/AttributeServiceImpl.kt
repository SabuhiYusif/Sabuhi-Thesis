package com.thesis.sabuhi.benchmarkapi.attribute

import com.thesis.sabuhi.benchmarkapi.HELPER_ROOT_PATH
import com.thesis.sabuhi.benchmarkapi.extensions.getRawResults
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.io.BufferedReader
import java.io.InputStreamReader

@Service
class AttributeServiceImpl : AttributeService {

    override fun getAttributeNames(details: AttributeNameRequest): String = with(details) {
        val executable = "python3 ${HELPER_ROOT_PATH}attribute_names.py " + fileName + " " + labelingMethod.name.toLowerCase()

        executable.getRawResults()
    }

    override fun getAttributeValues(details: AttributeValueRequest): String = with(details) {

        val attrNameWithDashes = attributeKey.replace(" ", "-")
        val executable = "python3 ${HELPER_ROOT_PATH}attribute_values.py " + fileName + " " + attrNameWithDashes

        executable.getRawResults()
    }

//    private fun getRawResults(executable: String): StringBuilder {
//        log.debug("Executable Path {}", executable)
//        val attributes = Runtime.getRuntime().exec(executable)
//
//        val stdInput = BufferedReader(InputStreamReader(attributes.inputStream))
//
//        val rawResults = StringBuilder()
//        var line: String?
//        while (stdInput.readLine().also { line = it } != null) {
//            val trimmedLine = line.toString().trim() + "\n"
//            rawResults.append(trimmedLine)
//        }
//
//        log.debug("Results {}", rawResults)
//        return rawResults
//    }
}