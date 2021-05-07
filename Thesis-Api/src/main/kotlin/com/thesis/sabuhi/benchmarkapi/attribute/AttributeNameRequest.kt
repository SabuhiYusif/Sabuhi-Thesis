package com.thesis.sabuhi.benchmarkapi.attribute

import com.thesis.sabuhi.benchmarkapi.labeling.LabelingMethod

data class AttributeNameRequest(val fileName: String, val labelingMethod: LabelingMethod)