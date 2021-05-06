package com.thesis.sabuhi.benchmarkapi.validating.services

interface ValidationService {
    fun runValidation(details: ValidationDetails) : Pair<StringBuilder, MutableList<String>>
}