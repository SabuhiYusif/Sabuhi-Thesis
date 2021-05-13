package com.thesis.sabuhi.benchmarkapi.validating

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.thesis.sabuhi.benchmarkapi.HELPER_ROOT_PATH
import com.thesis.sabuhi.benchmarkapi.extensions.getRawResults
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
@RequestMapping("api/")
class EventAttributesController {

    private val log = LoggerFactory.getLogger(javaClass)

    @GetMapping("get-event-attributes")
    fun getEventAttributes(fileName: String): ResponseEntity<Any> {
        if (fileName.isBlank()) throw MissingServletRequestParameterException("fileName", "String")
        val executable = "python3 ${HELPER_ROOT_PATH}data_features.py $fileName"
        log.debug("Executable Path {}", this)
        val rawResults = executable.getRawResults()

        log.debug("Results {}", rawResults)

        return try {
                ResponseEntity(jacksonObjectMapper().readValue<Map<String, String>>(rawResults), HttpStatus.OK)
        } catch (ex: Exception) {
            log.error(ex.message)
            ResponseEntity(mapOf("error" to "Please make sure to select a correct file"), HttpStatus.BAD_REQUEST)
        }
    }
}