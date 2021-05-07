package com.thesis.sabuhi.benchmarkapi.labeling

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.validation.Valid

@RestController
@CrossOrigin
@RequestMapping("api/")
class LabellingController(private val labelingService: LabelingService) {

    // Write labeled log to the current directory
    // Return success
    @PostMapping("labeling")
    fun labelLog(@RequestBody @Valid request: LabelingRequest): Map<String, String> {
        val labeledFileName = labelingService.labelLog(request)
        return mapOf(labeledFileName to "")
    }
}