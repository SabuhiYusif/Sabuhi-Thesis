package com.thesis.sabuhi.benchmarkapi.validating

interface ResultsToJsonClient {

    fun resultsToJson(stats: String): MutableList<Result>
}