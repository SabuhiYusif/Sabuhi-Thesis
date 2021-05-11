package com.thesis.sabuhi.benchmarkapi.files

import org.springframework.stereotype.Service
import java.io.BufferedReader
import java.io.File
import java.io.FileOutputStream
import java.io.InputStream
import java.io.InputStreamReader

@Service
class FileServiceImpl : FileService {
    override fun writeToFile(content: String, fileToWrite: File) {
        FileOutputStream(fileToWrite).bufferedWriter().use { writer ->
            writer.write(content)
            writer.newLine()
        }
    }

    override fun calculateStats(inputStream: InputStream): FileStats {
        val eventRegex = Regex("<event>")
        val caseRegex = Regex("<trace>")
        val bufferedReader = BufferedReader(InputStreamReader(inputStream))
        val events = mutableListOf<Int>()
        val cases = mutableListOf<Int>()
        bufferedReader.forEachLine {
            events.add(eventRegex.findAll(it).count())
            cases.add(caseRegex.findAll(it).count())
        }

        return FileStats(events.reduce { acc, i -> acc + i }, cases.reduce { acc, i -> acc + i })
    }
}