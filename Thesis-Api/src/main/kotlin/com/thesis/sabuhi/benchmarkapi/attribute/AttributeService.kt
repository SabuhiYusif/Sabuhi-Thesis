package com.thesis.sabuhi.benchmarkapi.attribute

interface AttributeService {

    fun getAttributeNames(details: AttributeNameRequest): String

    fun getAttributeValues(details: AttributeValueRequest): String
}