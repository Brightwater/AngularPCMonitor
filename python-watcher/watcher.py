import csv
import json
import requests
import time

#print("test")

while (True):
  time.sleep(1)
  with open('./remote/LibreHardwareMonitorLog-2021-02-14.csv', 'r') as f:
    for row in reversed(list(csv.reader(f))):
          s = ', '.join(row)
          sL = s.split(', ')
          print(sL[0])

          data = {}

          data['CPU Load'] = sL[66]
          data['CPU Temp'] = sL[119]
          data['CPU PWR'] = sL[67]
          data['CPU Fan'] = sL[20]

          freq = []
          freq.append(sL[68])
          freq.append(sL[72])
          freq.append(sL[76])
          freq.append(sL[80])
          freq.append(sL[84])
          freq.append(sL[88])
          freq.append(sL[92])
          freq.append(sL[96])
          freq.append(sL[100])
          freq.append(sL[104])
          freq.append(sL[108])
          freq.append(sL[112])

          data['CPU Freq'] = max(freq)

          data['RAM'] = sL[126]

          data['GPU Usage'] = sL[135]
          data['GPU Clock'] = sL[131]
          data['GPU Mem Clock'] = sL[132]
          data['VRAM'] = sL[143]
          data['GPU Temp'] = sL[130]
          data['GPU Fan'] = sL[134]
          data['GPU Pwr'] = sL[144]

          data['SSD Load'] = sL[151]
          data['SSD Temp'] = sL[147]

          data['DL'] = sL[163]
          data['UP'] = sL[162]

          json_str = json.dumps(data)

          with open("./api/data", 'w') as outfile:
            json.dump(data, outfile)

          break
          #print(json_str)
          #Cpu fit: 122
          # CPU Load: 67
          # CCD Max Temp: 120
          # CPU Pkg Power: 68
          # CPU Fan RPM: 21
          # Max Cpu Freq: MAX(69, 73, 77, 81, 85, 89, 93, 97, 101, 105, 109, 113)

          # RAM usage perc: 127

          # GPU core clock: 132
          # GPU Memory clock: 133
          # GPU temp: 131
          # GPU fan RPM: 135
          # VRAM usage perc: 144
          # GPU Pwr: 145

          # SSD temp: 148
          # SSD load: 152

          # NIC up: 163
          # NIC down: 164










