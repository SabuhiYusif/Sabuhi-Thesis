import datetime

import pm4py
import json
from pm4py.util import xes_constants as xes
import sys
from pm4py.algo.filtering.log.attributes import attributes_filter


def get_all_trace_attributes_from_log(log):
    """
    Get all trace attributes from the log

    Parameters
    ------------
    log
        Log

    Returns
    ------------
    all_attributes
        All trace attributes from the log
    """
    all_attributes = set()
    for trace in log:
        all_attributes = all_attributes.union(set(trace.attributes.keys()))
    if xes.DEFAULT_TRACEID_KEY in all_attributes:
        all_attributes.remove(xes.DEFAULT_TRACEID_KEY)
    return all_attributes


def get_all_numerical_attributes(attr_keys):
    numericalAttrs = []
    for attr_key in attr_keys:
        values = list(attributes_filter.get_trace_attribute_values(log, attr_key).keys())
        isNumerical = True
        for value in values:
            if type(value) is not int and type(value) is not float and type(value) is not datetime:
                isNumerical = False
                break

        if isNumerical:
            numericalAttrs.append(attr_key)

    return numericalAttrs


def get_all_temporal_attributes(attr_keys):
    temporal_attrs = []
    for attr_key in attr_keys:
        values = list(attributes_filter.get_trace_attribute_values(log, attr_key).keys())
        is_temporal = False
        for value in values:
            if type(value) is datetime.datetime:
                is_temporal = True
                break

        if is_temporal:
            temporal_attrs.append(attr_key)

    return temporal_attrs


if __name__ == "__main__":
    file_name = sys.argv[1]
    labelingMethod = sys.argv[2]
    log = pm4py.read_xes("/home/sabuhi/Thesis/devianceminingthesis/DevianceMiningPipeline/logs/" + file_name)
    if labelingMethod == 'numerical':
        allKeys = list(get_all_trace_attributes_from_log(log))
        print(json.dumps(get_all_numerical_attributes(allKeys)))
    elif labelingMethod == 'temporal':
        allKeys = list(get_all_trace_attributes_from_log(log))
        print(json.dumps(get_all_temporal_attributes(allKeys)))
    else:
        print(json.dumps(list(get_all_trace_attributes_from_log(log))))
