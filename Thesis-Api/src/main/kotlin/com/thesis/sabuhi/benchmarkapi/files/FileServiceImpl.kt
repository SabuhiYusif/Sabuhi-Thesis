package com.thesis.sabuhi.benchmarkapi.files

import org.springframework.stereotype.Service
import java.io.File
import java.io.FileOutputStream

@Service
class FileServiceImpl : FileService {
    override fun writeToFile(content: String, fileToWrite: File) {
        FileOutputStream(fileToWrite).bufferedWriter().use { writer ->
            writer.write(content)
            writer.newLine()
        }
    }
}