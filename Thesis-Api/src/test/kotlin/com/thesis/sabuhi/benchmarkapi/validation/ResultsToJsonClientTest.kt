package com.thesis.sabuhi.benchmarkapi.validation

import com.thesis.sabuhi.benchmarkapi.validating.ResultsToJsonClientImpl
import org.junit.jupiter.api.Test


class ResultsToJsonClientTest {

    private val client = ResultsToJsonClientImpl()


    @Test
    fun `It returns correct results for basic features`() {
//        val content = "/basic-feature-results.txt".readContent()
        val content = "dsadas"

        val result = client.resultsToJson(content)
        print("result")
        print(result)
    }
}

private fun String.readContent(): String {
    return javaClass.getResource(this).readText()
}