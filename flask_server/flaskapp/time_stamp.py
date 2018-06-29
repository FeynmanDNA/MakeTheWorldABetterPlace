from time import localtime, strftime

def On_Submit(calType, http_headers):
    # record the request submit time
    submit_time = strftime("%Y-%m-%d %H:%M:%S", localtime())

    # show submit time to stdout
    print("@", submit_time)

    # print out the request headers like user-agent etc
    print("==request.headers %s :==" % (calType))
    print(http_headers)
    return submit_time

def On_Finish():
    finish_time = strftime("%Y-%m-%d %H:%M:%S", localtime())
    print("calculation finished @: ", finish_time)
    return finish_time
