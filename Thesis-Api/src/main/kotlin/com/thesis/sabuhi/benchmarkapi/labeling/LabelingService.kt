package com.thesis.sabuhi.benchmarkapi.labeling

interface LabelingService {
    fun labelLog(details: LabelingRequest): String
}