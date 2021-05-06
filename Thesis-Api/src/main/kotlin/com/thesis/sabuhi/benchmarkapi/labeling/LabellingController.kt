package com.thesis.sabuhi.benchmarkapi.labeling

import com.thesis.sabuhi.benchmarkapi.ROOT_PATH
import com.thesis.sabuhi.benchmarkapi.files.FileService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader

@RestController
@CrossOrigin
class LabellingController(private val fileService: FileService) {

    // Write labeled log to the current directory
    // Return success
    @PostMapping("labelling")
    fun labelLog(file: String,
                 labelingMethod: String,
                 attrName: String,
                 attrValue: String,
                 greater: Boolean,
                 smaller: Boolean
    ): Map<String, String> {
        var s: String?
        val path = "python3 /home/sabuhi/PycharmProjects/scientificProject/main.py "

        val attrNameWithDashes = attrName.replace(" ", "-")
        val attrValueWithDashes = attrValue.replace(" ", "-")
        val executable = path + file + " " + labelingMethod + " " + attrNameWithDashes + " " + attrValueWithDashes + " " + greater + " " + smaller

        println(executable)
        val attributes = Runtime.getRuntime().exec(executable)

        val stdInput = BufferedReader(InputStreamReader(attributes.inputStream))

        val stats = StringBuilder()
        var labeledFileName = file;
        while (stdInput.readLine().also { s = it } != null) {
            val ss = s.toString().trim() + "\n"
            stats.append(ss)

            println(ss)
            labeledFileName = ss
        }

        fileService.writeToFile(labeledFileName, File("$ROOT_PATH/allFiles/files.txt"))

        return mapOf(labeledFileName to "")
    }

}