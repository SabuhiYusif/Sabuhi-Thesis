package com.thesis.sabuhi.benchmarkapi

class ErrorResponse(private val code: Int, val message: String, val developerMessage: String? = null) : Response {
    override fun getStatusCode() = code
}