package com.thesis.sabuhi.benchmarkapi.extensions

import java.io.BufferedReader
import java.io.InputStreamReader

fun String.getOriginalFileName() = this.take(this.length - 6)

fun String.generateResultsFileName() = this.getOriginalFileName() + System.currentTimeMillis() + ".json"

fun String.getRawResults(): String {
    val attributes = Runtime.getRuntime().exec(this)

    val stdInput = BufferedReader(InputStreamReader(attributes.inputStream))

    val rawResults = StringBuilder()
    var line: String?
    while (stdInput.readLine().also { line = it } != null) {
        val trimmedLine = line.toString().trim() + "\n"
        rawResults.append(trimmedLine)
    }

    return rawResults.toString()
}
