package com.thesis.sabuhi.benchmarkapi.labeling

import com.thesis.sabuhi.benchmarkapi.HELPER_ROOT_PATH
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.io.BufferedReader
import java.io.InputStreamReader

@Service
class LabelingServiceImpl : LabelingService {
    private val log = LoggerFactory.getLogger(javaClass)

    override fun labelLog(details: LabelingRequest): String = with(details) {
        val path = "python3 ${HELPER_ROOT_PATH}main.py"

        val attrNameWithDashes = attrName.replace(" ", "-")
        val attrValueWithDashes = attrValue.replace(" ", "-")
        val executable = "$path $fileName $labelingMethod $attrNameWithDashes $attrValueWithDashes $greater $smaller"

        log.debug("Executable Path {}", executable)
        val attributes = Runtime.getRuntime().exec(executable)

        val stdInput = BufferedReader(InputStreamReader(attributes.inputStream))

        val rawResults = StringBuilder()
        var labeledFileName = fileName
        var line: String?
        while (stdInput.readLine().also { line = it } != null) {
            val trimmedLine = line.toString().trim() + "\n"
            rawResults.append(trimmedLine)
            labeledFileName = trimmedLine
        }

        return labeledFileName
    }
}