from flask import Flask, jsonify, render_template, request, send_from_directory

# serving the route functions
from time_stamp import On_Submit, On_Finish
from cpp_calculator import transfer_matrix

# display flask print in stdout
from flush_flask_print import Unbuffered
import sys

# enable CORS for development
from flask_cors import CORS


# create instance of Unbuffered
sys.stdout = Unbuffered(sys.stdout)

# the build folder from react run build
app = Flask(__name__)

# enable CORS for development
CORS(app)

########################## Main Functions ############################

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
    submit_time = On_Submit("BareDNA calculator", request.headers)
    # submit_time = '2018-06-29 13:49:34'
    error = None

    if request.method == 'POST':
        print(">>>>>>>>> request.get_json() is:")
        cal_params = request.get_json()
        print(cal_params)

        # NOTE: call transfer_matrix
        (cal_elapsed,
         rel_extension,
         superhelical,
         output_file_id) = transfer_matrix(
                              cal_params,
                              "BareDNA",
                              submit_time)

        finish_time = On_Finish()
        return jsonify(
                  start_time = submit_time,
                  done_time = finish_time,
                  elapsed_time = cal_elapsed,
                  ext_array = rel_extension,
                  suphel_array = superhelical,
                  download_file = output_file_id
               )
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return error

# temporary serving the UserRequestDB from static/
@app.route('/<path:filename>')
def download_output(filename):
    return send_from_directory(directory=filename, filename=filename)

if __name__ == "__main__":
    app.run(debug=True, port = 7717)
