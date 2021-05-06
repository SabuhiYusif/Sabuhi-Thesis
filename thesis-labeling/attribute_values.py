import json
from datetime import datetime, date

import pm4py
import sys


def get_trace_attribute_values(log, attribute_key, parameters=None):
    """
    Get the attribute values of the log for the specified attribute along with their count

    Parameters
    ------------
    log
        Log
    attribute_key
        Attribute for which we wish to get the values along with their count
    parameters
        Possible parameters of the algorithm

    Returns
    ------------
    attributes
        Dictionary of attributes associated with their count
    """
    if parameters is None:
        parameters = {}

    attributes = {}

    for trace in log:

        if attribute_key in trace.attributes:
            attribute = trace.attributes[attribute_key]
            if attribute not in attributes:
                attributes[attribute] = 0
            attributes[attribute] = attributes[attribute] + 1

    return attributes

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

if __name__ == "__main__":
    file_name = sys.argv[1]
    attr_name = sys.argv[2]

    attr_name_separated = attr_name.split('-')
    attr_name = ' '.join(map(str, attr_name_separated))

    # for argument in sys.argv[2:]:
    #     attr_name += argument + " "

    log = pm4py.read_xes("/home/sabuhi/Thesis/devianceminingthesis/DevianceMiningPipeline/logs/" + file_name)
    print(json.dumps(list(get_trace_attribute_values(log, attr_name.strip())), default=json_serial))
