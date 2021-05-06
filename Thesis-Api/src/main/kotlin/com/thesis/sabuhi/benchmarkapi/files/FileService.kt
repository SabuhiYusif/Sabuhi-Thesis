package com.thesis.sabuhi.benchmarkapi.files

import java.io.File

interface FileService {
    fun writeToFile(content: String, fileToWrite: File)
}