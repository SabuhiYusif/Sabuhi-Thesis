import json
from random import shuffle

import pm4py
import sys

from pm4py.objects.log.log import EventLog
from pm4py.objects.log.util import func

from constants import PATH
import os

files_dir = PATH + "allFiles"


def export_log(log, file_name):
    pm4py.write_xes(log, PATH + "logs/" + file_name)
    pm4py.write_xes(log, PATH + "xray/" + file_name)

    print(file_name)
    return file_name


def str_to_bool(s):
    if s.lower() == 'true':
        return True
    elif s.lower() == 'false':
        return False
    else:
        raise ValueError


def split_train_test(log, split_perc):
    train_log = []
    train_perc = (1 - split_perc)
    log_len = len(log)
    for i in range(0, int(log_len * train_perc)):
        train_log.append(log[i])

    test_log = []
    for i in range(int(log_len * train_perc), log_len):
        test_log.append(log[i])

    return EventLog(train_log), EventLog(test_log)


def kFold(log, split_perc, k_value, file_name):
    log_len = len(log)
    for log_nr in range(1, k_value + 1):
        new_log = []
        first_stop = int(log_len - (log_len * split_perc * (log_nr)))
        for i in range(0, first_stop):
            new_log.append(log[i])

        second_start = int(log_len - (log_len * split_perc * (log_nr - 1)))
        for i in range(second_start, log_len):
            new_log.append(log[i])

        for i in range(first_stop, second_start):
            new_log.append(log[i])

        split_log = EventLog(new_log)

        base_file_name = str(k_value) + "k_" + file_name
        export_log(split_log, base_file_name + "_" + str(log_nr) + ".xes")

    with open(files_dir + "/files_json.json") as json_file:
        data = json.load(json_file)

    split_file = {base_file_name + "_1.xes": ''}
    data.append(split_file)
    with open(files_dir + "/files_json.json", "w") as my_file:
        json.dump(data, my_file)
    print(json.dumps(split_file))

def random_order(log, split_perc):
    shuffled_log = log
    shuffle(shuffled_log)
    train_log, test_log = split_train_test(shuffled_log, split_perc)

    return shuffled_log, train_log, test_log


def temporal_order(log, split_perc):
    event_stream = pm4py.convert_to_event_stream(log)
    sorted_event = func.sort_(lambda e: e['time:timestamp'], event_stream)

    temporal_ordered = pm4py.convert_to_event_log(sorted_event)

    train_log, test_log = split_train_test(temporal_ordered, split_perc)

    return temporal_ordered, train_log, test_log


def temporal_order_strict(log, split_perc):
    temporal_ordered_log, train_log, test_log = temporal_order(log, split_perc)
    # train_log, test_log = split_train_test(temporal_ordered_log, split_perc)
    test_log_first_event_time = test_log[0][0]['time:timestamp']

    return temporal_ordered_log, EventLog(
        filter(lambda x: x[-1]['time:timestamp'] < test_log_first_event_time, train_log)), test_log


if __name__ == "__main__":
    #
    file_name = sys.argv[1]
    method = sys.argv[2]
    split_perc = float(sys.argv[3])
    k_value = int(sys.argv[4])
    xray = PATH + "xray"
    if not os.path.exists(xray):
        os.makedirs(xray)

    log = pm4py.read_xes(PATH + "logs/" + file_name)

    file_name = file_name[0:len(file_name) - 4]

    ## RANDOM
    new_log = EventLog()
    train = EventLog()
    test = EventLog()
    if k_value < 3:
        if method == 'random':
            new_log, train, test = random_order(log, split_perc)
        elif method == 'temporal':
            new_log, train, test = temporal_order(log, split_perc)
        elif method == 'temporal_strict':
            new_log, train, test = temporal_order_strict(log, split_perc)
        elif method == 'sequential':
            new_log = log
            train, test = split_train_test(log, split_perc)

        split_name = str(split_perc) + "_" + method + "_" + file_name
        export_log(new_log, split_name + "_1.xes")
        pm4py.write_xes(train, PATH + "logs/" + split_name + "_1_train.xes")
        pm4py.write_xes(test, PATH + "logs/" + split_name + "_1_test.xes")

        files_dir = PATH + "allFiles"
        if not os.path.exists(files_dir):
            os.makedirs(files_dir)

        with open(files_dir + "/files_json.json") as json_file:
            data = json.load(json_file)

        split_file = {split_name + "_1.xes": ""}
        data.append(split_file)
        with open(files_dir + "/files_json.json", "w") as my_file:
            json.dump(data, my_file)

        print(json.dumps(split_file))
    elif k_value <= 10:
        kFold(log, split_perc, k_value, file_name)

    _, _, files = next(os.walk(xray))
    file_count = len(files)
