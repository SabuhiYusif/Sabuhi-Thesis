package com.thesis.sabuhi.benchmarkapi.validating.services

import com.thesis.sabuhi.benchmarkapi.validating.Classification
import com.thesis.sabuhi.benchmarkapi.validating.Payload

data class ValidationDetails(
    val splitPercentage: String,
    val originalFileName: String,
    val payload: Payload,
    val kValue: String,
    val classifier: Classification,
    val maxDepth: Int,
    val minSamples: Int,
    val coverageThreshold: Int
)
