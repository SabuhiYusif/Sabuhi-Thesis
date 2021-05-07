package com.thesis.sabuhi.benchmarkapi.labeling

data class LabelingRequest(
    val fileName: String,
    val labelingMethod: String,
    val attrName: String,
    val attrValue: String,
    val greater: Boolean,
    val smaller: Boolean
)