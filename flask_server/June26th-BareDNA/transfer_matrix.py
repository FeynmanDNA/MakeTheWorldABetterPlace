#!/usr/bin/python

import multiprocessing as mp
import subprocess as sp
import numpy as np
import os.path

def transfer_matrix(d, get_array=False):
    if not isinstance(d['force'], list):
        d['force'] = [d['force']]
    if not isinstance(d['torque'], list):
        d['torque'] = [d['torque']]
    f = open('input_ft.dat', 'w')
    for i in d['force']:
        for j in d['torque']:
            f.write('%s %s\n' % (i, j))
    f.close()
    f = open('input.dat', 'w')
    f.write('b_B = %s\n' % d['b_B'])
    f.write('A_B = %s\n' % d['A_B'])
    f.write('C_B = %s\n' % d['C_B'])
    f.write('lambda_B = %s\n' % d['lambda_B'])
    n_cpu = mp.cpu_count()
    print("num of CPU on your PC is: ", n_cpu)
    to_execute = "./BareDNA_afterParallel.out %s %s %s %s" % (d['DNALength'], 'input_ft.dat', d['maxmode'], n_cpu)
    p = sp.Popen(to_execute, shell=True)
    p.communicate()
    if get_array and os.path.isfile('output.dat'):
        return np.loadtxt('output.dat')

if __name__ == "__main__":
    d = {'force': [0.1+i for i in range(20)],
         'torque': 0.0,
         'maxmode': 14,
         'DNALength': 3400,
         'b_B': 0.5,
         'A_B': 50.0,
         'C_B': 95.0,
         'lambda_B': 4.3}
    transfer_matrix(d)