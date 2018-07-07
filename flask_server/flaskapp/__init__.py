from flask import Flask, jsonify, render_template, request, send_from_directory

# serving the route functions
from pathlib import Path
from time_stamp import On_Submit, On_Finish
from cpp_calculator import init_transfer_matrix, finish_transfer_matrix
from run_cpp import check_computation_status

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

# global variables to be accessed across functions
# No need for global declaration to read value of globvar
flask_path = str(Path.cwd())
cal_procs_dict = {}

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
        global flask_path
        global cal_procs_dict
        (new_cal_path,
         cal_proc,
         queue_ID) = init_transfer_matrix(
                              cal_params,
                              calculator_type,
                              submit_time,
                              flask_path)

        cal_procs_dict[queue_ID] = {}
        cal_procs_dict[queue_ID]["new_cal_path"] = new_cal_path
        cal_procs_dict[queue_ID]["cal_proc"] = cal_proc

        print("global variable cal_procs_dict is: ", cal_procs_dict)

        # first return the start_time, and wait for polling
        return jsonify(start_time=submit_time, tracking_ID=queue_ID)
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return error

@app.route('/cpp_cal/check_computation_status/<string:tracking_ID>')
def Poll_Calculator(tracking_ID):
    # cal_proc and new_cal_path are global
    global flask_path
    global cal_procs_dict

    print("check_computation_status()")
    cal_finished = check_computation_status(
                       cal_procs_dict[tracking_ID]["cal_proc"])

    print("calculation finished? ", cal_finished)
    if cal_finished:
        # cpp finished, proceed to collect the results
        (rel_extension,
         superhelical,
         output_file_id) = finish_transfer_matrix(
                              flask_path,
                              cal_procs_dict[tracking_ID]["new_cal_path"])

        finish_time = On_Finish()

        # now Cpp is finished, reset the global variables
        cal_procs_dict.pop(tracking_ID)

        return jsonify(
                  done_time = finish_time,
                  ext_array = rel_extension,
                  suphel_array = superhelical,
                  download_file = output_file_id
               )
    elif not cal_finished:
        # cpp is still processing
        return jsonify(CppStatus = "calculating")

# temporary serving the UserRequestDB from static/
@app.route('/<path:filename>')
def download_output(filename):
    return send_from_directory(directory=filename, filename=filename)

if __name__ == "__main__":
    app.run(debug=True, port=7717)
