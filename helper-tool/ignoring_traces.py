import datetime

import pm4py
import json
from pm4py.util import xes_constants as xes
import sys
from pm4py.algo.filtering.log.attributes import attributes_filter

from constants import PATH


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

if __name__ == "__main__":
    file_name = sys.argv[1]
    log = pm4py.read_xes(PATH + "logs/" + file_name)
    allKeys = list(get_all_trace_attributes_from_log(log))
    numerics = get_all_numerical_attributes(allKeys)
    difference = []

    res = [ele for ele in allKeys]
    for a in allKeys:
        if a in numerics:
            res.remove(a)
    print(json.dumps(res))
