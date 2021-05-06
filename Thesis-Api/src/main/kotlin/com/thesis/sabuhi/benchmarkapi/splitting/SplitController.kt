package com.thesis.sabuhi.benchmarkapi.splitting

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import java.io.IOException


@RestController
@CrossOrigin
class SplitController(
    private val splitService: SplitService
) {
    private val log = LoggerFactory.getLogger(javaClass)

    @PostMapping("split")
    fun split(request: SplittingRequest): Map<String, String> {
        val splitFile = splitService.splitLog(request)
        log.debug("Split log file $splitFile")

        return try {
            jacksonObjectMapper().readValue(splitFile, object : TypeReference<Map<String, String>>() {})
        } catch (e: IOException) {
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong!")
        }
    }

    data class SplittingRequest(val splitPerc: String?, val fileName: String, val splitMethod: String, val kValue: Int = 1)
}