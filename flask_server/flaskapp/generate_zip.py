import zipfile

# thanks to: https://stackoverflow.com/questions/1855095/how-to-create-a-zip-archive-of-a-directory/
# and also: https://www.pythonmania.net/en/2017/06/25/zip-files-in-python/
def generate_zip(filename=""):
    zip_name = '{}.zip'.format(filename)
    compression = zipfile.ZIP_DEFLATED
    zipf = zipfile.ZipFile(zip_name, mode='w')
    zipf.write('input_list.txt', compress_type=compression)
    zipf.write('output.dat', compress_type=compression)
    zipf.close()
