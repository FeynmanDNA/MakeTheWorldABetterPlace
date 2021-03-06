from pathlib import Path
import uuid

def generate_path(cal_Type="", timestamp=""):
    # create a folder for each calculation
    # timestamp pass here is '2018-06-29 13:49:34'
    timestamp= timestamp.replace("-", "").replace(" ", "").replace(":", "")
    # timestamp is now "20180629134934"
    # make a random UUID
    unique_id = uuid.uuid4()
    # convert a UUID to a string of hex digits in standard form
    id = str(unique_id)
    # the nginx is serving the static files from /static
    new_cal_path = Path('./static/UserRequestDB').joinpath(timestamp+"-"+cal_Type+"-"+id)
    #  new_cal_path is: PosixPath('static/UserRequestDB/20180629150455-BareDNA-ebbf704a-2bab-45cd-969f-c1a760c1599f')
    # from https://stackoverflow.com/questions/273192/how-can-i-create-a-directory-if-it-does-not-exist
    new_cal_path.mkdir(parents=True, exist_ok=True)
    # for python 3.5 and below, need to str(Path) for os.chdir()
    new_cal_path = str(new_cal_path)

    # generate a session ID for global variable in __init__ to be tracked
    queue_ID = new_cal_path.replace("static/UserRequestDB/", "")

    return (new_cal_path, queue_ID)
