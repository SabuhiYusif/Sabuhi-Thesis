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
            val featureSelection = "$individualActivities:$declare:$sequence:$hybrid"

            validateFeatureSelection(featureSelection)

            "python3 ${ROOT_PATH}benchmarks.py $splitPercentage $originalFileName.xes ${payload.toLower()}" +
                " $kValue ${classifier.name} $maxDepth $minSamples $coverageThreshold $featureSelection"
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

        log.debug("Results $rawResults")

        val errors = mutableListOf<String>()
        while (stdError.readLine().also { line = it } != null) {
            errors.add(line.toString().trim())
        }
        log.debug("Errors " + line.toString().trim())

        return Pair(rawResults, errors)
    }
}

private fun ValidationDetails.validateFeatureSelection(featureSelection: String) {
    val selections = featureSelection.split(":")

    check( selections.any { it != "def" } ) { "No feature selected" }

    if (selections.last() != "def") {
        if (selections.take(3).filter { it == "def" }.size >= 2) throw IllegalArgumentException("Hybrid needs to be selected with at least 2 other features")
    }
}
