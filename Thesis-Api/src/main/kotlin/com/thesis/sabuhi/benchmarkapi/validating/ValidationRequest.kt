package com.thesis.sabuhi.benchmarkapi.validating

import javax.validation.constraints.NotBlank

data class ValidationRequest(
    @get:NotBlank
    val fileName: String,

    @get:NotBlank
    val payload: Payload,

    @get:NotBlank
    val classifier: Classification,

    @get:NotBlank
    val maxDepth: Int,

    @get:NotBlank
    val minSamples: Int,

    @get:NotBlank
    val coverageThreshold: Int
)

data class ValidationResultsRequest(val fileName: String)
