package com.thesis.sabuhi.benchmarkapi.splitting

interface SplitService {
    fun splitLog(request: SplitController.SplittingRequest): String
}