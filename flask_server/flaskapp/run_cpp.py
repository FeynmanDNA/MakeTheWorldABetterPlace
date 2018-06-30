import numpy as np
import subprocess

def run_cpp(input_JSON={}, cal_Type="", n_cpu=""):
    if cal_Type == "BareDNA":
        # file_adv is advanced parameters for BareDNA and WithIns
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

    elif cal_Type == "WithNul":
        return

    elif cal_Type == "WithIns":
        file_adv = open('input.dat', 'w')
        # BareDNA advanced parameter has these :
        file_adv.write('b_B = %s\n' % input_JSON['b_B'])
        file_adv.write('A_B = %s\n' % input_JSON['A_B'])
        file_adv.write('C_B = %s\n' % input_JSON['C_B'])
        file_adv.write('lambda_B = %s\n' % input_JSON['lambda_B'])
        file_adv.close()

        cpp_proc = "../../../../CppCalculator-WithIns/WithIns_2018Jun30.out %s %s %s %s %s" % (
            input_JSON['DNALength'],
            input_JSON['insert_length'],
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

    # extract the data
    # The returned array will have at least ndmin dimensions.
    # Otherwise mono-dimensional axes will be squeezed.
    output = np.loadtxt('output.csv', delimiter=",", ndmin=2)
    # numpy slicing arrays, [:, n] all indices along n axis
    # numpy array around set the precision to 3 dp
    rel_extension = list(np.around(output[:,3], 3))
    superhelical = list(np.around(output[:, -1], 3))

    return (rel_extension, superhelical)