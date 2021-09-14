import time
import json
import psutil
import subprocess
from urllib.request import Request, urlopen
from datetime import datetime
import tzlocal
import time

timer = 119

poolHash = 0
poolBlocksPerHour = 0
poolTImeSinceLastBlock = 0
poolErgoPrice = 0

poolCurrentHashrate = 0
poolAverageHashrate = 0
poolValidShares = 0
poolActiveWorkers = 0
poolUnpaid = 0
poolUnconfirmed = 0
poolCoinsPerDay = 0
poolUSDPerDay = 0

networkDiff = 0
networkHash = 0
networkBlockTime = 0
while(True):

    with open(r"/sys/class/thermal/thermal_zone0/temp") as File:
        CurrentTemp = File.readline()

    t = subprocess.run(['uptime', '-p'], stdout=subprocess.PIPE).stdout.decode().rstrip()
    #print(t)
    #print(str(float(CurrentTemp) / 1000))
    #print(psutil.virtual_memory().percent)

    
    
    timer = timer + 1
    # 4 apis upto
    if timer == 120:
      timer = 0
      req = Request('https://api-ergo.flypool.org/poolStats', headers={'User-Agent': 'Mozilla/5.0'})
      req1 = Request('https://api-ergo.flypool.org/networkStats', headers={'User-Agent': 'Mozilla/5.0'})
      req2 = Request('https://api-ergo.flypool.org/miner/9fjmUKuKrsv6eQKyomddHGYPJKHf1rqX6VuHMYGetbv5BgaNF7Z/currentStats', headers={'User-Agent': 'Mozilla/5.0'})
      with urlopen(req) as url:
        data = json.loads(url.read().decode())
        #print(data)
        timeStamp = int(data['data']['minedBlocks'][0]['time']) # minutes
        
        now = int(time.time()) 
        poolTimeSinceLastBlock = (now - timeStamp) / 60
        poolHash = int(data['data']['poolStats']['hashRate']) / 1000000000
         # gh
        poolBlocksPerHour = data['data']['poolStats']['blocksPerHour']
        
        poolErgoPrice = data['data']['price']['usd'] # $

      with urlopen(req2) as url:
        data = json.loads(url.read().decode())
        poolCurrentHashrate = int(data['data']['currentHashrate']) / 1000000
        poolAverageHashrate = int(data['data']['averageHashrate']) / 1000000
        poolValidShares = data['data']['validShares']
        poolActiveWorkers = data['data']['activeWorkers']
        poolUnpaid = float(data['data']['unpaid']) / 1000000000
        poolUnconfirmed = float(data['data']['unconfirmed']) / 1000000000
        poolCoinsPerDay = float(data['data']['coinsPerMin'] * 60 * 24)
        poolUSDPerDay = float(data['data']['usdPerMin'] * 60 * 24)
      
      with urlopen(req1) as url:
        data = json.loads(url.read().decode())
        
        networkDiff = float(data['data']['difficulty']) / 1000000000000000
        networkHash = float(data['data']['hashrate']) / 1000000000000
        networkBlockTime = data['data']['blocktime']
        
    data = {
      "cpuTemp": str(float(CurrentTemp) / 1000),
      "cpuLoad": str(float(psutil.cpu_percent())),
      "ram": psutil.virtual_memory().percent,
      "uptime": t,
      "poolTimeSinceLastBlock": poolTimeSinceLastBlock,
      "poolHashRate": poolHash,
      "poolBlocksPerHour": poolBlocksPerHour,
      "ergoPrice": poolErgoPrice,

      "poolCurrentHashrate": poolCurrentHashrate,
      "poolAverageHashrate": poolAverageHashrate,
      "poolValidShares": poolValidShares,
      "poolActiveWorkers": poolActiveWorkers,
      "poolUnpaid": poolUnpaid,
      "poolUnconfirmed": poolUnconfirmed,
      "poolCoinsPerDay": poolCoinsPerDay,
      "poolUSDPerDay": poolUSDPerDay,
      "networkDiff": networkDiff,
      "networkHash": networkHash,
      "networkBlockTime": networkBlockTime 
    }

    with open('../dist/angular-monitor/api/server.json', 'w') as outfile:
      json.dump(data, outfile)

    time.sleep(1)
