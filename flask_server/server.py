from flask import Flask, jsonify, render_template, request

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

app = Flask(__name__, static_folder='../build/static',
        template_folder="../build")

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True, port = 7717)
