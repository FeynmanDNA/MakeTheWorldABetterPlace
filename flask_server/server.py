from flask import Flask, jsonify, render_template, request
from time import localtime, strftime, time
# for input and output.dat and c++ subprocess
import numpy as np
import subprocess, sys

# enable CORS for development
from flask_cors import CORS

###### this is for the flask's print be caught by stdout ######
# from https://stackoverflow.com/questions/107705/disable-output-buffering
# replace sys.stdout with some other stream like wrapper
# which does a flush after every call.
class Unbuffered(object):
   def __init__(self, stream):
       self.stream = stream
   def write(self, data):
       self.stream.write(data)
       self.stream.flush()
   def writelines(self, datas):
       self.stream.writelines(datas)
       self.stream.flush()
   def __getattr__(self, attr):
       return getattr(self.stream, attr)

sys.stdout = Unbuffered(sys.stdout)
############

# the build folder from react run build
app = Flask(__name__, static_folder='../build/static',
        template_folder="../build")

# enable CORS for development
CORS(app)

########################## Main Functions ############################

def On_Submit(calType):
    # record the request submit time
    submit_time = strftime("%Y-%m-%d %H:%M:%S", localtime())

    # show submit time to stdout
    print("@", submit_time)

    # print out the request headers like user-agent etc
    print("==request.headers %s :==" % (calType))
    print(request.headers)
    return submit_time

def On_Finish():
    finish_time = strftime("%Y-%m-%d %H:%M:%S", localtime())
    print("calculation finished @: ", finish_time)
    return finish_time

# reactrouter and flask 404 fix
# from https://www.reddit.com/r/reactjs/comments/42pn95/reactrouter_and_flask_404/
# and
# https://stackoverflow.com/questions/30620276/flask-and-react-routing
#@app.route('/', defaults={'path':''}, methods=['GET', 'POST'])
#@app.route('/<path:path>')
#def index(path):
#    return render_template('index.html')

# take dictionary input as inputJSON
# and output a file
def transfer_matrix(inputJSON={}, calType=""):
    # record the time taken for calculation
    cal_start = int(round(time() * 1000))

    # parse inputJSON
    if not isinstance(inputJSON['force'], list):
        inputJSON['force'] = [inputJSON['force']]
    if not isinstance(inputJSON['torque'], list):
        inputJSON['torque'] = [inputJSON['torque']]
    # ft stands for force-torque
    file_ft = open('input_ft.dat', 'w')
    for i in inputJSON['force']:
        for j in inputJSON['torque']:
            file_ft.write('%s %s\n' % (i, j))
    file_ft.close()

    # file_adv is advanced parameters for 3 calTypes
    file_adv = open('input.dat', 'w')

    # argv[4] input is the number of CPU cores
    # can also use multiprocessing library to detect CPU number with:
    # multiprocessing.cpu_cout()
    # in main.cpp, input.n_threads = std::atoi(argv[4]);
    n_cpu = "4"

    if calType == "BareDNA":
        # BareDNA advanced parameter has these 4:
        file_adv.write('b_B = %s\n' % inputJSON['b_B'])
        file_adv.write('A_B = %s\n' % inputJSON['A_B'])
        file_adv.write('C_B = %s\n' % inputJSON['C_B'])
        file_adv.write('lambda_B = %s\n' % inputJSON['lambda_B'])
        file_adv.close()
        cpp_proc = "./June26th-BareDNA/BareDNA_afterParallel.out %s %s %s %s" % (
            inputJSON['DNALength'],
            'input_ft.dat',
            inputJSON['maxmode'],
            n_cpu)
    else:
       return "need to specify calType"

    # without shell=True, the server will not find the BareDNA.out file
    cal_proc = subprocess.Popen(cpp_proc, shell=True)
    cal_proc.communicate()

    # communicate will block the server until the cpp is done
    print("output.dat ready")

    # elapsed time is in sec
    cal_end = int(round(time() * 1000))
    cal_elapsed = (cal_end-cal_start)/1000

    # extract the data
    # The returned array will have at least ndmin dimensions.
    # Otherwise mono-dimensional axes will be squeezed.
    output = np.loadtxt('output.dat', ndmin=2)
    # numpy slicing arrays, [:, n] all indices along n axis
    # numpy array around set the precision to 3 dp
    rel_extension = list(np.around(output[:,3], 3))
    superhelical = list(np.around(output[:, -1], 3))

    return (cal_elapsed, rel_extension, superhelical)

    # display stdout in terminal for debug
    # print(cal_proc.stdout.read())
    # NOTE: this PIPE is non-blocking, as opposed to communicate()
    # NOTE: need to implement a polling for the 50 seconds to 5 mins version


@app.route('/BareDNA', methods=['POST'])
def Cal_BareDNA():
    submit_time = On_Submit("BareDNA calculator")
    error = None
    if request.method == 'POST':
        print(">>>>>>>>> request.get_json() is:")
        cal_params = request.get_json()
        print(cal_params)

        # NOTE: call transfer_matrix
        (cal_elapsed, rel_extension, superhelical) = transfer_matrix(cal_params, "BareDNA")

        finish_time = On_Finish()
        return jsonify(
              start_time = submit_time,
              done_time = finish_time,
              elapsed_time = cal_elapsed,
              ext_array = rel_extension,
              suphel_array = superhelical)
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return error


if __name__ == "__main__":
    app.run(debug=True, port = 7717)
