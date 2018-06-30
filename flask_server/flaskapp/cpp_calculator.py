# for timing the elapsed time
from time import time
# for input and output.csv and c++ subprocess
import os
import numpy as np
import subprocess
# custom utility functions
from create_input import create_inputdat, create_inputJSON
from generate_path import generate_path
from generate_zip import generate_zip

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
    # multiprocessing.cpu_cout()
    # in main.cpp, input.n_threads
    n_cpu = "4"

    # TODO: consider move this to a separate function
    if cal_Type == "BareDNA":
        # file_adv is advanced parameters for 3 calTypes
        file_adv = open('input.dat', 'w')
        # BareDNA advanced parameter has these 4:
        file_adv.write('b_B = %s\n' % input_JSON['b_B'])
        file_adv.write('A_B = %s\n' % input_JSON['A_B'])
        file_adv.write('C_B = %s\n' % input_JSON['C_B'])
        file_adv.write('lambda_B = %s\n' % input_JSON['lambda_B'])
        file_adv.close()
        cpp_proc = "../../../../CppCalculator-BareDNA/BareDNA_2018Jun30.out %s %s %s %s" % (
            input_JSON['DNALength'],
            'input_ft.dat',
            input_JSON['maxmode'],
            n_cpu)
    else:
       return "need to specify cal_Type"

    # without shell=True, the server will not find the BareDNA.out file
    cal_proc = subprocess.Popen(cpp_proc, shell=True)
    cal_proc.communicate()

    # communicate will block the server until the cpp is done
    print("output.csv ready")

    # elapsed time is in sec
    cal_end = int(round(time() * 1000))
    cal_elapsed = (cal_end-cal_start)/1000

    # extract the data
    # The returned array will have at least ndmin dimensions.
    # Otherwise mono-dimensional axes will be squeezed.
    output = np.loadtxt('output.csv', delimiter=",", ndmin=2)
    # numpy slicing arrays, [:, n] all indices along n axis
    # numpy array around set the precision to 3 dp
    rel_extension = list(np.around(output[:,3], 3))
    superhelical = list(np.around(output[:, -1], 3))

    # generate zip for user download, containing input and output
    only_fileID = new_cal_path.replace("static/UserRequestDB/", "")
    generate_zip(filename=only_fileID)

    # change the directory back to server level
    os.chdir(flask_path)

    # new_cal_path is a path string:
    # static/UserRequestDB/20180629184947-BareDNA-edece2d9-342a-49b0-8108-6d39b524b1a5
    download_file_path = "{0}/{1}.zip".format(new_cal_path, only_fileID)

    return (cal_elapsed, rel_extension, superhelical, download_file_path)

    # display stdout in terminal for debug
    # print(cal_proc.stdout.read())
    # NOTE: this PIPE is non-blocking, as opposed to communicate()
    # NOTE: need to implement a polling for the 50 seconds to 5 mins version

