import subprocess
import os

subprocess.call('start python backend/server.py', shell = True)
subprocess.call('start npm --prefix backend/app run start', shell = True)
subprocess.call('npm --prefix frontend run start', shell = True)


