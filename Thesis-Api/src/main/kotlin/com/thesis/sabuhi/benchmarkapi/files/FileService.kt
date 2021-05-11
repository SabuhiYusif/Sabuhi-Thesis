package com.thesis.sabuhi.benchmarkapi.files

import java.io.File
import java.io.InputStream

interface FileService {
    fun writeToFile(content: String, fileToWrite: File)

    fun calculateStats(inputStream: InputStream): FileStats
}