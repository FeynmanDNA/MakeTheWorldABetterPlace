from flask import Flask, jsonify, render_template, request

# enable CORS for development
from flask_cors import CORS

from time import localtime, strftime, time
import subprocess, sys

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
        return "successfull received your POST request"
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return error


if __name__ == "__main__":
    app.run(debug=True, port = 7717)
