import time
import json
import psutil
import subprocess

while(True):

    with open(r"/sys/class/thermal/thermal_zone0/temp") as File:
        CurrentTemp = File.readline()

    t = subprocess.run(['uptime', '-p'], stdout=subprocess.PIPE).stdout.decode().rstrip()
    #print(t)
    #print(str(float(CurrentTemp) / 1000))
    #print(psutil.virtual_memory().percent)

    data = {
      "cpuTemp": str(float(CurrentTemp) / 1000),
      "cpuLoad": str(float(psutil.cpu_percent())),
      "ram": psutil.virtual_memory().percent,
      "uptime": t
    }

    with open('../dist/angular-monitor/api/server.json', 'w') as outfile:
      json.dump(data, outfile)

    time.sleep(1)
