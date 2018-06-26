from flask import Flask, jsonify, render_template, request

# enable CORS for development
from flask_cors import CORS

from time import localtime, strftime, time, sleep

# for input and output.dat and c++ subprocess
import numpy as np
import subprocess, sys, os.path

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

# the build folder from react run build
app = Flask(__name__, static_folder='../build/static',
        template_folder="../build")

# enable CORS for development
CORS(app)

# reactrouter and flask 404 fix
# from https://www.reddit.com/r/reactjs/comments/42pn95/reactrouter_and_flask_404/
# and
# https://stackoverflow.com/questions/30620276/flask-and-react-routing
#@app.route('/', defaults={'path':''}, methods=['GET', 'POST'])
#@app.route('/<path:path>')
#def index(path):
#    return render_template('index.html')

# take dictionary input as inputJSON
def transfer_matrix(inputJSON, get_array=False):
    # TODO: currently serving the BareDNA version
    # TODO: can i remove the get_array? and also the np.loadtxt()?
    if not isinstance(inputJSON['force'], list):
        inputJSON['force'] = [inputJSON['force']]
    if not isinstance(inputJSON['torque'], list):
        inputJSON['torque'] = [inputJSON['torque']]
    f = open('input_ft.dat', 'w')
    for i in inputJSON['force']:
        for j in inputJSON['torque']:
            f.write('%s %s\n' % (i, j))
    f.close()
    f = open('input.dat', 'w')
    f.write('b_B = %s\n' % inputJSON['b_B'])
    f.write('A_B = %s\n' % inputJSON['A_B'])
    f.write('C_B = %s\n' % inputJSON['C_B'])
    f.write('lambda_B = %s\n' % inputJSON['lambda_B'])
    # TODO: what is the 1 at the end of the input?
    to_execute = "./June26th-BareDNA/BareDNA.out %s %s %s 1" % (
        inputJSON['DNALength'], 'input_ft.dat', inputJSON['maxmode'])
    p = subprocess.Popen(to_execute, shell=True)
    p.communicate()
    if get_array and os.path.isfile('output.dat'):
        return np.loadtxt('output.dat')

@app.route('/BareDNA', methods=['POST'])
def Cal_BareDNA():
    # when print the POST JSON, the u- prefix just means
    # that you have a Unicode string.
    '''
    get_json(force=False, silent=False, cache=True)
    Parse and return the data as JSON. If the mimetype does not indicate JSON (application/json, see is_json()), this returns None unless force is true
    '''
    print(request)
    error = None
    if request.method == 'POST':
        cal_params = request.get_json()
        print(cal_params)
        transfer_matrix(cal_params)
        sleep(2)
        return "successfull received your POST request"
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return error


if __name__ == "__main__":
    app.run(debug=True, port = 7717)
