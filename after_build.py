import os, shutil, subprocess

try:
    os.mkdir("./build/static")
except FileExistsError as e:
    print("already exists, ", e)

try:
    os.mkdir("./build/static/PublicationPdfs")
except FileExistsError as e:
    print("already exists, ", e)

pdf_path = "./src/Assets/PublicationPdfs"
pdf_source = os.listdir(pdf_path)

for pdf in pdf_source:
    full_path = os.path.join(pdf_path, pdf)
    try:
        shutil.copy(full_path, "./build/static/PublicationPdfs")
    except FileExistsError as e:
        print("already exists, ", e)

flask_path = os.listdir("./flask_server")

for folder in flask_path:
    src_path = os.path.join("./flask_server", folder)
    if os.path.isfile(src_path):
        continue
    else:
        print(src_path)
        p = subprocess.Popen(
            ["cp", "-R", src_path, "./build"],
            stdout = subprocess.PIPE,
            stderr = subprocess.PIPE
        )
        stdout, stderr = p.communicate()
        print(stdout, stderr)
    print(src_path, " copied over")

print("############### NOW READY FOR DEPLOYMENT ###################")
