package com.thesis.sabuhi.benchmarkapi.downloading

import com.thesis.sabuhi.benchmarkapi.ROOT_PATH
import org.apache.commons.io.IOUtils
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import java.io.File
import java.io.FileInputStream

@RestController
@CrossOrigin
class DownloadController {

    @PostMapping(
        "download",
        produces = [MediaType.APPLICATION_OCTET_STREAM_VALUE])
    fun download(fileName: String): ByteArray? {
        return try {
            // Change path if location is different
            val path = "${ROOT_PATH}logs/$fileName"
            val file = File(path.trim())
            val resource = FileInputStream(file)

            IOUtils.toByteArray(resource)
        } catch (e: Exception) {
            println("HAY" + e.message)
            null
        }
    }

    @PostMapping(
        "download-settings",
        produces = [MediaType.APPLICATION_OCTET_STREAM_VALUE])
    fun downloadSettings(): ByteArray? {
        return try {
            // Change path if location is different
            val path = ROOT_PATH + "settings.cfg"
            val file = File(path.trim())
            val resource = FileInputStream(file)

            IOUtils.toByteArray(resource)
        } catch (e: Exception) {
            println("HAY" + e.message)
            null
        }
    }
}