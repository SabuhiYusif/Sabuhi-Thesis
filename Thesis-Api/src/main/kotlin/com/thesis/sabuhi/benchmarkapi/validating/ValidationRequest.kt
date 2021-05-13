package com.thesis.sabuhi.benchmarkapi.validating

import javax.validation.constraints.NotBlank

data class ValidationRequest(
    @field:NotBlank
    val fileName: String,

    @field:NotBlank
    val payload: Payload,

    @field:NotBlank
    val classifier: Classification,

    @field:NotBlank
    val maxDepth: Int,

    @field:NotBlank
    val minSamples: Int,

    @field:NotBlank
    val coverageThreshold: Int,

    @field:NotBlank
    val individualActivities: String,

    @field:NotBlank
    val declare: String,

    @field:NotBlank
    val sequence: String,

    @field:NotBlank
    val hybrid: String

)

data class ValidationResultsRequest(val fileName: String)
