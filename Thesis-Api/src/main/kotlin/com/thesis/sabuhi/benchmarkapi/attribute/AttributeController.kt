package com.thesis.sabuhi.benchmarkapi.attribute

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
@RequestMapping("api/")
class AttributeController(private val attributeService: AttributeService) {

    @PostMapping("attributes-names")
    fun getAttributeNames(@RequestBody request: AttributeNameRequest): Set<String> {
        val rawResults = attributeService.getAttributeNames(request)

        return jacksonObjectMapper().readValue(rawResults)
    }

    @PostMapping("attributes-values")
    fun getAttributeValues(@RequestBody request: AttributeValueRequest): Set<String> {
        val rawResults = attributeService.getAttributeValues(request)

        return jacksonObjectMapper().readValue(rawResults)
    }
}
