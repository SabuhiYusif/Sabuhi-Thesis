package com.thesis.sabuhi.benchmarkapi.splitting

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.io.BufferedReader
import java.io.InputStreamReader

@Service
class SplitServiceImpl : SplitService {
    private val log = LoggerFactory.getLogger(javaClass)

    override fun splitLog(request: SplitController.SplittingRequest): String {
        val path = with(request) {
            "python3 ${com.thesis.sabuhi.benchmarkapi.HELPER_ROOT_PATH}splitting.py " + fileName + " " + splitMethod.toLowerCase() + " " + splitPerc + " " + kValue
        }

        log.debug("Execute process in path $path")
        val executable = Runtime.getRuntime().exec(path)
        val stdInput = BufferedReader(InputStreamReader(executable.inputStream))

        var line: String?
        val stats = mutableListOf<String>()
        while (stdInput.readLine().also { line = it } != null) {
            val trimmedLine = line.toString().trim() + "\n"
            stats.add(trimmedLine)
        }

        return stats.last()
    }
}