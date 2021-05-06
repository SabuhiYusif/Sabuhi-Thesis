package com.thesis.sabuhi.benchmarkapi.validating

import com.thesis.sabuhi.benchmarkapi.MAP_OF_FEATURES
import org.springframework.stereotype.Service

const val TRAIN = "TRAIN"

@Service
class ResultsToJsonClientImpl : ResultsToJsonClient {

    override fun resultsToJson(stats: String): MutableList<Result> {
        val featureNames = MAP_OF_FEATURES.keys.toList()
        val featuresToAccuracyStats = getAccuracyMetrics(stats, featureNames)

        return parseResults(featuresToAccuracyStats)
            .chunked(2)
            .map { Result(it[0].featureName, it[0].train, it[1].test) }.toMutableList()
    }

    private fun getAccuracyMetrics(stats: String, featureNames: List<String>): LinkedHashMap<String, List<String>> {
        val featureNameToMetrics: LinkedHashMap<String, List<String>> = linkedMapOf()

        featureNames.forEach {
            var lines: List<String> = stats.lines()
            var index = lines.indexOf(it.trim())
            while (index > 0) {
                val metricData = lines[index + 1]
                featureNameToMetrics[lines[index].trim()] = listOf(metricData)
                lines = lines.takeLast(lines.size - index - 1)
                index = lines.indexOf(it)
            }
        }
        return featureNameToMetrics
    }

    private fun parseResults(stats: Map<String, List<String>>): List<Result> =
        stats.map {
            val accuracyStats = it.value[0].split(" ").map { it.take(4) }
            val dataset = Dataset(
                meanAccuracy = accuracyStats[0],
                meanAUC = accuracyStats[1],
                meanF1 = accuracyStats[2],
                meanRecall = accuracyStats[3],
                meanPrecision = accuracyStats[4]
            )

            if (it.key.contains(TRAIN)) {
                Result(MAP_OF_FEATURES[it.key]!!, dataset, null)
            } else {
                Result(MAP_OF_FEATURES[it.key]!!, null, dataset)
            }
        }
}

data class Result(
    val featureName: String,
    val train: Dataset?,
    val test: Dataset?
)

data class Dataset(
    val meanAccuracy: String,
    val meanAUC: String,
    val meanF1: String,
    val meanRecall: String,
    val meanPrecision: String
)
