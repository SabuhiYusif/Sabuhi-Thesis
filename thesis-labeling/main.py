import sys
import json
from datetime import datetime

import pm4py
from dateutil.parser import parse

from constants import PATH

files_dir = PATH + "allFiles"

def export_log(log, file_name):
    file_name = file_name[0:len(file_name) - 4] + "_labeled.xes"
    pm4py.write_xes(log, PATH + "logs/" + file_name)

    with open(files_dir + "/files_json.json") as json_file:
        data = json.load(json_file)

    split_file = {file_name: ""}
    data.append(split_file)
    with open(files_dir + "/files_json.json", "w") as my_file:
        json.dump(data, my_file)
    # directory = PATH + "allFiles"
    # if not os.path.exists(directory):
    #     os.makedirs(directory)
    # with open(directory + "/files.txt", "a") as myfile:
    #     myfile.write(file_name + "\n")

    print(file_name)
    return file_name
    # xes_exporter.__export_log(log, new_log_name+ ".xes")


def labeling_for_numeric(file_name, log, attr_name, custom_value, greater=False, smaller=False):
    if greater:
        greater_than(file_name, attr_name, log, custom_value)
    elif smaller:
        smaller_than(file_name, attr_name, log, custom_value)
    else:
        equal(file_name, attr_name, log, custom_value)
    export_log(log, file_name)
    return file_name


def equal(file_name, attr_name, log, value):
    for trace in log:
        attr_value = ""
        try:
            attr_value = trace.attributes[attr_name]
        except:
            pass
        if str(attr_value) == str(value):
            trace.attributes["Label"] = "1"
        else:
            trace.attributes["Label"] = "0"
    export_log(log, file_name)
    return file_name


def smaller_than(file_name, attr_name, log, value):
    for trace in log:
        try:
            attr_value = trace.attributes[attr_name]
        except:
            attr_value = value
            pass
        # if smaller then mark it deviant
        if int(attr_value) < int(value):
            trace.attributes["Label"] = "1"
        else:
            trace.attributes["Label"] = "0"
    export_log(log, file_name)
    return file_name


def greater_than(file_name, attr_name, log, value):
    for trace in log:
        try:
            attr_value = trace.attributes[attr_name]
        except:
            attr_value = value
            pass
        # if bigger then mark it deviant
        if int(attr_value) > int(value):
            trace.attributes["Label"] = "1"
        else:
            trace.attributes["Label"] = "0"
    export_log(log, file_name)
    return file_name


def labeling_for_timestamp(file_name, log, attr_name, value, greater=False, smaller=False):
    if greater:
        for trace in log:
            attr_value = ""
            try:
                attr_value = trace.attributes[attr_name]
            except:
                pass
            if type(attr_value) is datetime and attr_value > value:
                trace.attributes["Label"] = "1"
            else:
                trace.attributes["Label"] = "0"
    elif smaller:
        for trace in log:
            attr_value = ""
            try:
                attr_value = trace.attributes[attr_name]
            except:
                pass
            if type(attr_value) is datetime and attr_value < value:
                trace.attributes["Label"] = "1"
            else:
                trace.attributes["Label"] = "0"
    else:
        for trace in log:
            attr_value = ""
            try:
                attr_value = trace.attributes[attr_name]
            except:
                pass
            if type(attr_value) is datetime and attr_value == value:
                trace.attributes["Label"] = "1"
            else:
                trace.attributes["Label"] = "0"
    export_log(log, file_name)
    return file_name


def str_to_bool(s):
    if s.lower() == 'true':
        return True
    elif s.lower() == 'false':
        return False
    else:
        raise ValueError


if __name__ == "__main__":
    file_name = sys.argv[1]
    method = sys.argv[2]
    attr_name = sys.argv[3]
    value = sys.argv[4]
    greater = str_to_bool(sys.argv[5])
    smaller = str_to_bool(sys.argv[6])

    attr_name_separated = attr_name.split('-')
    value_separated = value.split('-')
    attr_name = ' '.join(map(str, attr_name_separated))
    value = ' '.join(map(str, value_separated))

    log = pm4py.read_xes("/home/sabuhi/Thesis/devianceminingthesis/DevianceMiningPipeline/logs/" + file_name)

    # event_stream = pm4py.convert_to_event_stream(log)
    # sorted_event = func.sort_(lambda e: e['time:timestamp'], event_stream)
    #
    # new_log = pm4py.convert_to_event_log(sorted_event)
    # export_log(new_log, "asdasdasd.xes")

    if method == "numerical":
        labeling_for_numeric(file_name, log, attr_name, value, greater, smaller)
    elif method == "temporal":
        dt = parse(value)
        labeling_for_timestamp(file_name, log, attr_name, dt, greater, smaller)
    elif method == "categorical":
        equal(file_name, attr_name, log, value)
