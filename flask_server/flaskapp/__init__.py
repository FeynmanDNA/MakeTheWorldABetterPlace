from flask import Flask, jsonify, request

# serving the route functions
from time_stamp import On_Submit, On_Finish
from cpp_calculator import transfer_matrix

# display flask print in stdout
from flush_flask_print import Unbuffered
import sys


# create instance of Unbuffered
sys.stdout = Unbuffered(sys.stdout)

# the build folder from react run build
app = Flask(__name__)


########################## Main Functions ############################

@app.route('/cpp_cal/<string:calculator_type>', methods=['POST'])
def Invoke_Calculator(calculator_type):
    # calculator_type passed from react: BareDNA/WithNul/WithIns

    # cal_Type for On_Submit
    cal_TypeTxt = "{} calculator".format(calculator_type)
    submit_time = On_Submit(cal_TypeTxt, request.headers)
    # submit_time = '2018-06-29 13:49:34'
    error = None

    if request.method == 'POST':
        # if .get_json() is {}, the filesystem will run into dead loop
        if request.get_json == {}:
            error = "Empty get_json Error"
            return error

        print(">>>>>>>>> request.get_json() is:")
        cal_params = request.get_json()
        print(cal_params)

        # NOTE: call transfer_matrix
        (cal_elapsed,
         rel_extension,
         superhelical,
         output_file_id) = transfer_matrix(
                              cal_params,
                              calculator_type,
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
# @app.route('/<path:filename>')
# def download_output(filename):
#     return send_from_directory(directory=filename, filename=filename)

if __name__ == "__main__":
    app.run()
