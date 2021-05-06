package com.thesis.sabuhi.benchmarkapi.extensions

fun String.getOriginalFileName() = this.take(this.length - 6)

fun String.generateResultsFileName() = this.getOriginalFileName() + System.currentTimeMillis() + ".json"