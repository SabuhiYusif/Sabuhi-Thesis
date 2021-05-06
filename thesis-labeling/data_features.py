import json
import sys

import pm4py
from pm4py.util import xes_constants as xes


def get_all_event_attributes_from_log(log):
    """
    Get all events attributes from the log

    Parameters
    -------------
    log
        Log

    Returns
    -------------
    all_attributes
        All trace attributes from the log
    """
    all_attributes = set()
    for trace in log:
        for event in trace:
            all_attributes = all_attributes.union(set(event.keys()))
    if xes.DEFAULT_TRANSITION_KEY in all_attributes:
        all_attributes.remove(xes.DEFAULT_TRANSITION_KEY)
    return all_attributes


def get_all_event_attributes_values_from_log(log, attrName):
    """
    Get all events attributes from the log

    Parameters
    -------------
    log
        Log

    Returns
    -------------
    all_attributes
        All trace attributes from the log
    """
    all_attributes = set()
    for trace in log:
        for event in trace:
            sett = event.get(attrName)
            if sett:
                all_attributes = all_attributes.union([event[attrName]])
    if xes.DEFAULT_TRANSITION_KEY in all_attributes:
        all_attributes.remove(xes.DEFAULT_TRANSITION_KEY)
    return all_attributes


if __name__ == "__main__":
    file_name = sys.argv[1]
    log = pm4py.read_xes(
        "/home/sabuhi/Thesis/devianceminingthesis/DevianceMiningPipeline/logs/" + file_name)

    event_attributes = get_all_event_attributes_from_log(log)
    filtered = [x for x in event_attributes if x != 'concept:name' and x != 'time:timestamp']

    res = {}
    for attr_name in filtered:
        values = get_all_event_attributes_values_from_log(log, attr_name)
        if any(isinstance(value, str) for value in values):
            res[attr_name] = 'literal'
        elif any(isinstance(value, int) or isinstance(value, float) for value in values):
            res[attr_name] = 'number'
        elif any(isinstance(value, bool) for value in values):
            res[attr_name] = 'boolean'

    print(json.dumps(res))
