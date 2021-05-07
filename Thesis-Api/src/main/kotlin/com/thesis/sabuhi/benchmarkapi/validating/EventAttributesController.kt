package com.thesis.sabuhi.benchmarkapi.validating

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.thesis.sabuhi.benchmarkapi.HELPER_ROOT_PATH
import com.thesis.sabuhi.benchmarkapi.extensions.getRawResults
import org.slf4j.LoggerFactory
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.validation.Valid
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

@CrossOrigin
@RestController
@RequestMapping("api/")
class EventAttributesController {

    private val log = LoggerFactory.getLogger(javaClass)

    @GetMapping("get-event-attributes")
    fun getEventAttributes(@RequestParam @Valid @NotBlank fileName: String) : Any {
        if (fileName.isBlank()) throw MissingServletRequestParameterException("fileName", "String")
        val executable = "python3 ${HELPER_ROOT_PATH}data_features.py ${fileName}"
        log.debug("Executable Path {}", this)
        val rawResults = executable.getRawResults()

        log.debug("Results {}", rawResults)

        return jacksonObjectMapper().readValue(rawResults)
    }

    data class EventAttributeRequest(@field:Size(min=5) val fileName: String)
}