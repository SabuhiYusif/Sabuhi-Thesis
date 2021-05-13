package com.thesis.sabuhi.benchmarkapi.validating.services

import com.thesis.sabuhi.benchmarkapi.ROOT_PATH
import com.thesis.sabuhi.benchmarkapi.validating.toLower
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.io.BufferedReader
import java.io.InputStreamReader

@Service
class ValidationServiceImpl : ValidationService {
    private val log = LoggerFactory.getLogger(javaClass)

    override fun runValidation(details: ValidationDetails) : Pair<StringBuilder, MutableList<String>> {
        val path = with(details) {
            "python3 ${ROOT_PATH}benchmarks.py $splitPercentage $originalFileName.xes ${payload.toLower()}" +
                " $kValue ${classifier.name} $maxDepth $minSamples $coverageThreshold $individualActivities:$declare:$sequence:$hybrid"
        }
        log.debug("Execute validation process in path $path")

        val executable = Runtime.getRuntime().exec(path)
        val stdInput = BufferedReader(InputStreamReader(executable.inputStream))
        val stdError = BufferedReader(InputStreamReader(executable.errorStream))

        var line: String?

        val rawResults = StringBuilder()
        while (stdInput.readLine().also { line = it } != null) {
            rawResults.append(line.toString().trim() + "\n")
        }

        log.debug("NORMAL $rawResults")

        val errors = mutableListOf<String>()
        while (stdError.readLine().also { line = it } != null) {
            errors.add(line.toString().trim())
            log.debug("ERRORS " + line.toString().trim())
        }
        return Pair(rawResults, errors)
    }
}