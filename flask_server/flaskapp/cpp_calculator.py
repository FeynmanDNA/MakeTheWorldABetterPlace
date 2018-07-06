# for timing the elapsed time
from time import time
# for input and output.csv and c++ subprocess
import os
# custom utility functions
from create_input import create_inputdat, create_inputJSON
from generate_path import generate_path
from generate_zip import generate_zip
from run_cpp import run_cpp

def transfer_matrix(input_JSON={}, cal_Type="", timestamp=""):
    # record the time taken for calculation
    cal_start = int(round(time() * 1000))

    #generate the main server path and new request path
    (flask_path, new_cal_path) = generate_path(cal_Type, timestamp)

    """ inside the UserRequestDB/timestamp-id, create the input files """
    os.chdir(new_cal_path)

    create_inputdat(input_JSON)
    create_inputJSON(input_JSON)

    # can also use multiprocessing library to detect CPU number with:
    # multiprocessing.cpu_count()
    # local development use 4 CPUs, linode VPS use 1 CPU
    # in main.cpp, input.n_threads
    n_cpu = "1"

    # call the cpp CppCalculator and retrieve the Y-Data
    (rel_extension, superhelical) = run_cpp(input_JSON, cal_Type, n_cpu)

    # generate zip for user download, containing input and output
    only_fileID = new_cal_path.replace("static/UserRequestDB/", "")
    download_file_path = "{0}/{1}.zip".format(new_cal_path, only_fileID)
    generate_zip(filename=only_fileID)

    # change the directory back to server level
    os.chdir(flask_path)

    # elapsed time is in sec
    cal_end = int(round(time() * 1000))
    cal_elapsed = (cal_end-cal_start)/1000

    return (cal_elapsed, rel_extension, superhelical, download_file_path)

    # display stdout in terminal for debug
    # print(cal_proc.stdout.read())
    # NOTE: this PIPE is non-blocking, as opposed to communicate()
    # NOTE: need to implement a polling for the 50 seconds to 5 mins version

