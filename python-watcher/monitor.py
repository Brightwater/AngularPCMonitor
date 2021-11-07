from flask import Flask, jsonify
from threading import *
import time

import json
import psutil
import subprocess
from urllib.request import Request, urlopen
from datetime import datetime
import tzlocal
from datetime import timedelta

app = Flask(__name__)
data = 0
data2 = 0


@app.route('/api/server.json')
def server():
    return jsonify(data)

@app.route('/api/miningData.json')
def miningData():
    return jsonify(data2)

def logicOld():
    global count
    while count < 20:
      count = count + 1
      time.sleep(2)

def logic():
  global data
  global data2
  timer = 59

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
  networkHashBig = 0
  networkBlockTime = 0
  poolExpectedBlocksPerDay = 0
  poolAvgBlockTime = 0
  actualBlocksPerDay = 0
  hashStore = {}
  while(True):
      now = int(time.time())

      with open(r"/sys/class/thermal/thermal_zone0/temp") as File:
          CurrentTemp = File.readline()

      t = subprocess.run(['uptime', '-p'], stdout=subprocess.PIPE).stdout.decode().rstrip()
      #print(t)
      #print(str(float(CurrentTemp) / 1000))
      #print(psutil.virtual_memory().percent)



      timer = timer + 1
      # 4 apis upto
      if timer == 60:
        timer = 0
        req = Request('https://api-ergo.leafpool.com/api/block_stats?ergo', headers={'User-Agent': 'Mozilla/5.0'})
        req1 = Request('https://api-ergo.flypool.org/networkStats', headers={'User-Agent': 'Mozilla/5.0'}) # can use poolsstatus api to replace
        req2 = Request('https://api-ergo.leafpool.com/api/worker_stats?9fjmUKuKrsv6eQKyomddHGYPJKHf1rqX6VuHMYGetbv5BgaNF7Z', headers={'User-Agent': 'Mozilla/5.0'})
        req3 = Request('https://api-ergo.leafpool.com/api/stats', headers={'User-Agent': 'Mozilla/5.0'})

      # flypool one still need for blocktime
        try:
          with urlopen(req1) as url:
            data = json.loads(url.read().decode())
            networkBlockTime = data['data']['blocktime']
            networkDiff = float(data['data']['difficulty']) / 1000000000000000
            #networkHashBig = float(data['data']['hashrate'])
        except:
          continue

        with urlopen(req3) as url:
          data = json.loads(url.read().decode())
          poolHashBig = data['pools']['ergo']['hashrate']
          networkHashBig = float(data['pools']['ergo']['poolStats']['networkSols'])
          networkHash = networkHashBig / 1000000000000
          poolHash = poolHashBig / 1000000000

          poolErgoPrice = float(data['pools']['ergo']['marketStats']['usd_price'])

          poolHashPortion = poolHashBig / networkHashBig
          networkBlocksPerDay = 86400 / networkBlockTime
          poolExpectedBlocksPerDay = poolHashPortion * networkBlocksPerDay

          oppratio = networkHashBig / poolHashBig

          poolAvgBlockTime = (oppratio * networkBlockTime) / 60


        with urlopen(req) as url:
          data = json.loads(url.read().decode())
          s = ''
          if len(data['pending']['blocks']) > 0:
            s = data['pending']['blocks'][0]
          else:
            s = data['confirmed']['blocks'][0]

          lastBlockTime = float(s.split(":")[4]) / 1000

          poolTimeSinceLastBlock = ((now - lastBlockTime) / 60 / 60)

          weekAgo = now - 604800
          count = 0
          for block in data['pending']['blocks']:
            count = count + 1

          for block in data['confirmed']['blocks']:
            if int(block.split(":")[4]) / 1000 < weekAgo:
                break
            count = count + 1
          actualBlocksPerDay = count / 7

          poolCurrentLuck =  ((poolTimeSinceLastBlock * 60) / poolAvgBlockTime) * 100


          # timeStamp = int(data['data']['minedBlocks'][0]['time']) # minutes


          # poolTimeSinceLastBlock = (now - timeStamp) / 60
          # poolHash = int(data['data']['poolStats']['hashRate']) / 1000000000
          #  # gh
          # poolBlocksPerHour = data['data']['poolStats']['blocksPerHour']

          # poolErgoPrice = data['data']['price']['usd'] # $

        with urlopen(req2) as url:
          data = json.loads(url.read().decode())
          # poolCurrentHashrate = int(data['data']['currentHashrate']) / 1000000
          # poolAverageHashrate = int(data['data']['averageHashrate']) / 1000000
          # poolValidShares = data['data']['validShares']
          # poolActiveWorkers = data['data']['activeWorkers']
          workers = data['workers']

          count = 0
          for w in workers:
            if workers[w]['active'] == True:
              count = count + 1
          poolActiveWorkers = count

          try:
            poolUnpaid = float(data['confirmed']) / 1000000000
            poolUnconfirmed = float(data['unconfirmed']) / 1000000000
            poolCurrentHashrate = float(data['totalHash']) / 1000000
          except:
            print("ded")
          # try:
          #   poolUnpaid = float(data['data']['unpaid']) / 1000000000
          #   poolUnconfirmed = float(data['data']['unconfirmed']) / 1000000000
          #   poolCoinsPerDay = float(data['data']['coinsPerMin'] * 60 * 24)
          #   poolUSDPerDay = float(data['data']['usdPerMin'] * 60 * 24)
          # except:
          #   print("Ded")

        # trex stuff here
        cardData = {

        }
        a = ["3070ti", "3060ti", "2060", "1070", "all"]
        totalHash = 0
        #a = ["3070ti", "2060"]
        for c in a:
          if c != 'all':
            try:
              cardUrlS = 'https://' + c + '.bright-waters.com/summary'
              cardUrl = Request(cardUrlS, headers={'User-Agent': 'Mozilla/5.0'})
              with urlopen(cardUrl) as url:
                data = json.loads(url.read().decode())
                totalHash = totalHash + data['gpus'][0]['hashrate']
                obj = {

                  "hashrate": data['gpus'][0]['hashrate'] / 1000000,
                  "temperature": data['gpus'][0]['temperature'],
                  "efficiency": data['gpus'][0]['efficiency'],
                  "power": data['gpus'][0]['power']

                }
                try:
                  obj['memTemp'] = data['gpus'][0]['memory_temperature']
                except:
                  pass
                try:
                  temp = hashStore[c]

                  hashStore[c].append(obj['hashrate'])
                except:
                  hashStore[c] = [obj['hashrate']]

                cardData[c] = obj
            except:
              print("Api failure for: " + c)
              # if here then a cards miner is down
              # we still want to append to the cards hashrate
              # record to keep it up to date
              try:
                temp = hashStore[c]
                hashStore[c].append(0)
              except:
                hashStore[c] = [0]

              try:
                cardData[c] = obj
              except:
                pass
          if c == 'all':
            try:
              temp = hashStore[c]
              hashStore[c].append(totalHash / 1000000)
            except:
              hashStore[c] = [totalHash / 1000000]
          max = 1080
          if len(hashStore[c]) >= max:
            hashStore[c].pop(0)

        hashRatio = totalHash / networkHashBig
        networkErgPerDay = (86400 / networkBlockTime) * 67.5
        poolCoinsPerDay = hashRatio * networkErgPerDay
        poolUSDPerDay = poolCoinsPerDay * poolErgoPrice

        #print(json.dumps(cardData))
        #print(json.dumps(hashStore))





        data2 = {
          "poolTimeSinceLastBlock": poolTimeSinceLastBlock,
          "poolHashRate": poolHash,
          "poolBlocksPerDay": actualBlocksPerDay,
          "poolExpectedBlocksPerDay": poolExpectedBlocksPerDay,
          "ergoPrice": poolErgoPrice,
          "poolCurrentLuck": poolCurrentLuck,

          "poolCurrentHashrate": poolCurrentHashrate,

          "poolActiveWorkers": poolActiveWorkers,
          "poolUnpaid": poolUnpaid,
          "poolUnconfirmed": poolUnconfirmed,
          "poolCoinsPerDay": poolCoinsPerDay,
          "poolUSDPerDay": poolUSDPerDay,
          "networkDiff": networkDiff,
          "networkHash": networkHash,
          "networkBlockTime": networkBlockTime,
          "cardData": cardData,
          "hashStore": hashStore,
          "actualHashrate": totalHash / 1000000
        }

        #with open('../dist/angular-monitor/api/miningData.json', 'w') as outfile:
        #  json.dump(data2, outfile)


      ts = now - 64800

      data = {
        "cpuTemp": str(float(CurrentTemp) / 1000),
        "cpuLoad": str(float(psutil.cpu_percent())),
        "ram": psutil.virtual_memory().percent,
        "uptime": t,
      }

      #with open('../dist/angular-monitor/api/server.json', 'w') as outfile:
      #  json.dump(data, outfile)

      time.sleep(1)


if __name__ == '__main__':
    app.debug = True
    t1 = Thread(target = logic)
    count = 0
    t1.daemon = True
    t1.start()
    app.run(host = '0.0.0.0', port = 5003)




