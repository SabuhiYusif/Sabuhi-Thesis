package com.thesis.sabuhi.benchmarkapi.resetting

import com.thesis.sabuhi.benchmarkapi.ROOT_PATH
import com.thesis.sabuhi.benchmarkapi.files.FileService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.RestController
import java.io.File

@RestController
@CrossOrigin
class ResetController(private val fileService: FileService) {

    @DeleteMapping("reset-all")
    fun resetAllFiles() {
        val allFiles = File("$ROOT_PATH/allFiles").listFiles()

        allFiles?.forEach {
            fileService.writeToFile("[]", it)
        }

        val workingDirPath = System.getProperty("user.dir")
        val resultFiles = File("$workingDirPath/results").listFiles()
        deleteFiles(resultFiles)

        val logFiles = File("$ROOT_PATH/logs").listFiles()
        deleteFiles(logFiles)

        val xrayFiles = File("$ROOT_PATH/xray").listFiles()
        deleteFiles(xrayFiles)
    }

    fun deleteFiles(files: Array<File>?) = files?.forEach {
        it.deleteRecursively()
    }

}