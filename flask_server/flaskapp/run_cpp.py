import numpy as np
import subprocess
import os


def init_cpp(input_JSON={}, cal_Type="", n_cpu=""):
    if cal_Type == "BareDNA":
        # file_adv is advanced parameters for BareDNA and WithIns
        file_adv = open('input.dat', 'w')
        # BareDNA advanced parameter has these 4:
        file_adv.write('b_B = %s\n' % input_JSON['b_B'])
        file_adv.write('A_B = %s\n' % input_JSON['A_B'])
        file_adv.write('C_B = %s\n' % input_JSON['C_B'])
        file_adv.write('lambda_B = %s\n' % input_JSON['lambda_B'])
        file_adv.close()

        cpp_proc = "../../../CppCalculator-BareDNA/BareDNA_2018Jun30.out %s %s %s %s" % (
            input_JSON['DNALength'],
            'input_ft.dat',
            input_JSON['maxmode'],
            n_cpu)

    elif cal_Type == "WithNul":
        cpp_proc = "../../../CppCalculator-WithNul/WithNul_2018Jul02.out %s %s %s %s %s" % (
            input_JSON['DNALength'],
            'input_ft.dat',
            input_JSON['mu_protein'],
            input_JSON['maxmode'],
            n_cpu)

    elif cal_Type == "WithIns":
        file_adv = open('input.dat', 'w')
        # WithIns advanced parameter has 9 advanced params:
        file_adv.write('A_B_insert = %s\n' % input_JSON['A_B_insert'])
        file_adv.write('C_B_insert = %s\n' % input_JSON['C_B_insert'])
        file_adv.write('lambda_B_insert = %s\n' % input_JSON['lambda_B_insert'])
        file_adv.write('mu_L_insert = %s\n' % input_JSON['mu_L_insert'])
        file_adv.write('lk_L_0_insert = %s\n' % input_JSON['lk_L_0_insert'])
        file_adv.write('mu_P_insert = %s\n' % input_JSON['mu_P_insert'])
        file_adv.write('lk_P_0_insert = %s\n' % input_JSON['lk_P_0_insert'])
        file_adv.write('mu_S_insert = %s\n' % input_JSON['mu_S_insert'])
        file_adv.write('lk_S_0_insert = %s\n' % input_JSON['lk_S_0_insert'])
        file_adv.close()

        # DNA length, insert length, file_ft, number of modes and number of threads
        # NOTE: the insert length from JSON is the percentage of main DNA,
        # occupied by the insert. So the REAL insert length for the cpp is:
        input_DNAL = float(input_JSON['DNALength'])
        input_insertPer = float(input_JSON['insert_length'])
        input_insert_length_nm =  str(input_DNAL*input_insertPer/100.0)
        cpp_proc = "../../../CppCalculator-WithIns/WithIns_2018Jun30.out %s %s %s %s %s" % (
            input_JSON['DNALength'],
            input_insert_length_nm,
            'input_ft.dat',
            input_JSON['maxmode'],
            n_cpu)

    elif cal_Type == "Polymer":
        file_adv = open('input.dat', 'w')
        # Polymer advanced parameter need to overwrite 2 advanced params:
        file_adv.write('b_B = %s\n' % input_JSON['b_B'])
        file_adv.write('A_B = %s\n' % input_JSON['A_B'])
        file_adv.close()

        cpp_proc = "../../../../CppCalculator-Polymer/PolymerVersion.out %s %s %s %s" % (
            input_JSON['DNALength'],
            'input_ft.dat',
            input_JSON['maxmode'],
            n_cpu)

    else:
        return "need to specify cal_Type"

    # without shell=True, the server will not find the BareDNA.out file
    # from https://stackoverflow.com/questions/4789837/how-to-terminate-a-python-subprocess-launched-with-shell-true
    # The os.setsid() is passed in the argument preexec_fn so
    # it's run after the fork() and before  exec() to run the shell.
    cal_proc = subprocess.Popen(cpp_proc, stdout=subprocess.PIPE,
                                shell=True, preexec_fn=os.setsid)

    # subprocess.Popen is NON-blocking, so you can see this print during the cpp
    print("(((subprocess.Popen's PIPE initiated)))")

    print(cal_proc)
    print("cal_proc.poll() status: ", cal_proc.poll())

    # cal_proc is a memory object
    # track this cal_proc object in cpp_calculator.py and __init__.py
    return cal_proc

# __init__ and cpp_calculator pass down the same cal_proc object for checking
def check_computation_status(cal_proc):
    # process pollServer from webpage
    # if cal_proc is not finished
    if cal_proc is None or cal_proc.poll() is None:
        return False
    else:
        # instead of using Popen.stdout.read/Popen.stderr.read, use .communicate()
        print("Cpp calculation finished!")
        # from https://docs.python.org/3/library/subprocess.html
        # if the process does not terminate after timeout seconds, TimeoutExpired exception will be raise
        try:
            outs, errs = cal_proc.communicate(timeout=30)
        # TimeoutExpired is not globally defined; use subprocess.TimeoutExpired instead.
        except (subprocess.TimeoutExpired, ValueError) as e:
            print("the Cpp calculator might not be working...")
            cal_proc.kill()
            outs, errs = cal_proc.communicate()
        # Warning Use communicate() rather than .stdin.write, .stdout.read or .stderr.read to avoid deadlocks due to any of the other OS pipe buffers filling up and blocking the child process.
        # if cpp terminated sigTerm, the outs will be empty, although with no Error
        print("cal_proc Popen.communicate()'s outs:\n", outs.decode('ascii'))
        return True

# if cal_proc is finished, process the output.csv
def finish_cpp():
    # first check if output.csv is empty (when cpp breaks down halfway)
    if os.stat("output.csv").st_size == 0:
        print("output.csv is empty")

    print("output.csv ready")

    # extract the data
    # The returned array will have at least ndmin dimensions.
    # Otherwise mono-dimensional axes will be squeezed.
    output = np.loadtxt('output.csv', delimiter=",", ndmin=2)
    # numpy slicing arrays, [:, n] all indices along n axis
    # numpy array around set the precision to 3 dp
    rel_extension = list(np.around(output[:,3], 3))
    superhelical = list(np.around(output[:, -1], 3))

    return (rel_extension, superhelical)
