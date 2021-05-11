package com.thesis.sabuhi.benchmarkapi

const val ROOT_PATH = "/home/ubuntu/thesis-joonas/devianceminingthesis/DevianceMiningPipeline/"
//const val ROOT_PATH = "/home/sabuhi/Thesis-Joonas/devianceminingthesis/DevianceMiningPipeline/"
const val HELPER_ROOT_PATH = "/home/ubuntu/all-repos/Sabuhi-Thesis/thesis-labeling/"
//const val HELPER_ROOT_PATH = "/home/sabuhi/Sabuhi-Thesis-Repos/thesis-labeling/"

val MAP_OF_FEATURES = mapOf(
    "Statistics for TRAIN Model baseline with selection coverage" to "Individual Activities",
    "Statistics for TEST Model baseline with selection coverage" to "Individual Activities",
    "Statistics for TRAIN Model declare with selection coverage" to "Declare",
    "Statistics for TEST Model declare with selection coverage" to "Declare",
    "Statistics for TRAIN Model declare_payload with selection coverage" to "Declare Pure Data",
    "Statistics for TEST Model declare_payload with selection coverage" to "Declare Pure Data",
    "Statistics for TRAIN Model declare_dwd with selection coverage" to "Declare DWD",
    "Statistics for TEST Model declare_dwd with selection coverage" to "Declare DWD",
    "Statistics for TRAIN Model declare_payload_dwd with selection coverage" to "Declare Pure Data DWD",
    "Statistics for TEST Model declare_payload_dwd with selection coverage" to "Declare Pure Data DWD",
    "Statistics for TRAIN Model sequence tr with selection coverage" to "Sequence tr",
    "Statistics for TEST Model sequence tr with selection coverage" to "Sequence tr",
    "Statistics for TRAIN Model sequence tra with selection coverage" to "Sequence tra",
    "Statistics for TEST Model sequence tra with selection coverage" to "Sequence tra",
    "Statistics for TRAIN Model sequence mr with selection coverage" to "Sequence mr",
    "Statistics for TEST Model sequence mr with selection coverage" to "Sequence mr",
    "Statistics for TRAIN Model sequence mra with selection coverage" to "Sequence mra",
    "Statistics for TEST Model sequence mra with selection coverage" to "Sequence mra",
    "Statistics for TRAIN Model payload with selection coverage" to "Pure Data",
    "Statistics for TEST Model payload with selection coverage" to "Pure Data",
    "Statistics for TRAIN Model hybrid with selection coverage" to "Hybrid",
    "Statistics for TEST Model hybrid with selection coverage" to "Hybrid",
    "Statistics for TRAIN Model hybrid_data with selection coverage" to "Hybrid Pure Data",
    "Statistics for TEST Model hybrid_data with selection coverage" to "Hybrid Pure Data",
    "Statistics for TRAIN Model hybrid_dwd with selection coverage" to "Hybrid DWD",
    "Statistics for TEST Model hybrid_dwd with selection coverage" to "Hybrid DWD",
    "Statistics for TRAIN Model hybrid_data_dwd with selection coverage" to "Hybrid Pure Data DWD",
    "Statistics for TEST Model hybrid_data_dwd with selection coverage" to "Hybrid Pure Data DWD "
)
