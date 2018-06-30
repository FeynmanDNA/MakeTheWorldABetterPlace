def create_inputdat(input_JSON={}):
    # parse input_JSON
    if not isinstance(input_JSON['force'], list):
        input_JSON['force'] = [input_JSON['force']]
    if not isinstance(input_JSON['torque'], list):
        input_JSON['torque'] = [input_JSON['torque']]

    # ft stands for force-torque
    file_ft = open('input_ft.dat', 'w')
    for i in input_JSON['force']:
        for j in input_JSON['torque']:
            file_ft.write('%s %s\n' % (i, j))
    file_ft.close()

def create_inputJSON(input_JSON={}):
    # generate a input_JSON based txt summary for zip
    file_JSON = open('input_list.txt', 'w')
    file_JSON.write(str(input_JSON))
    file_JSON.close()
