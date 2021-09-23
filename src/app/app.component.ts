import { Sensor } from './model/sensor';
import { APP_BOOTSTRAP_LISTENER, Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class AppComponent implements OnInit {
  title = 'angular-monitor';
  w = screen.width;
  setH = Math.floor(Math.floor(Math.floor(document.documentElement.clientHeight / 4) / 10) * 0.99) + 'px';

  switch = false;
  skip = 0;
  test = -1;

  poolHash = ''
  poolBlocksPerDay = ''
  poolTImeSinceLastBlock = ''
  poolErgoPrice = ''
  poolCurrentLuck = ''
  poolCurrentHashrate = ''
  poolExpectedBlocksPerDay = ''
  poolAverageHashrate = ''
  poolValidShares = ''
  poolActiveWorkers = ''
  poolUnpaid = ''
  poolUnconfirmed = ''
  poolCoinsPerDay = ''
  poolUSDPerDay = ''
  actualHashrate = ''
  networkDiff = ''
  networkHash = ''
  networkBlockTime = ''
  timestamp = 0

  card1070H = ''
  card1070T = ''
  card1070E = ''
  card1070P = ''

  card2060H = ''
  card2060T = ''
  card2060E = ''
  card2060P = ''

  card3070tiH = ''
  card3070tiT = ''
  card3070tiE = ''
  card3070tiP = ''
  card3070tiMT = ''

  card3060tiH = ''
  card3060tiT = ''
  card3060tiE = ''
  card3060tiP = ''

  card1070Store: number[] = [];
  card2060Store: number[] = [];
  card3060tiStore: number[] = [];
  card3070tiStore: number[] = [];
  cardAllStore: number[] = [];


  d: any;
  interval: any;
  num = 0;
  private data: any = [];
  private data2: any = [];
  private data3: any = [];
  cpuLoad: any;

  sensors: Record<string, Sensor> = {
    cpuLoadO: {
      value: 0,
      unit: '%',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    cpuTempO: {
      value: 0,
      unit: '°C',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    cpuPowerO: {
      value: 0,
      unit: 'W',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    cpuVoltageO: {
      value: 0,
      unit: 'V',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    cpuRPMO: {
      value: 0,
      unit: 'rpm',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    moboMosfetTempO: {
      value: 0,
      unit: '°C',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    ramUsageO: {
      value: 0,
      unit: '%',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    cpuTempCCD1O: {
      value: 0,
      unit: '°C',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    cpuTempCCD2O: {
      value: 0,
      unit: '°C',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    gpuLoadO: {
      value: 0,
      unit: '%',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    gpuVRAMO: {
      value: 0,
      unit: '%',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    gpuFrequencyO: {
      value: 0,
      unit: 'mhz',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    gpuMemoryFreqO: {
      value: 0,
      unit: 'mhz',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    gpuTempO: {
      value: 0,
      unit: '°C',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    gpuRPMO: {
      value: 0,
      unit: 'rpm',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    gpuPowerO: {
      value: 0,
      unit: 'W',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    waterTempO: {
      value: 0,
      unit: '°C',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    sn850TempO: {
      value: 0,
      unit: '°C',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    evo840TempO: {
      value: 0,
      unit: '°C',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    ramTempO: {
      value: 0,
      unit: '°C',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    fan1O: {
      value: 0,
      unit: 'rpm',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    fan2O: {
      value: 0,
      unit: 'rpm',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    fan3O: {
      value: 0,
      unit: 'rpm',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    internetUpActivityO: {
      value: 0,
      unit: 'mbps',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    internetDownActivityO: {
      value: 0,
      unit: 'mbps',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    hotSpotTempO: {
      value: 0,
      unit: '°C',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    vramTempO: {
      value: 0,
      unit: '°C',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    maxCoreLoadO: {
      value: 0,
      unit: '%',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    },
    cpuMaxFreqO: {
      value: 0,
      unit: 'mhz',
      min: 99999,
      avg: 0,
      max: 0,
      index: 0
    }
  };

  cpuFrequencyIndexes: number[] = [];

  timeStamp!: moment.Moment;

  serverCpuTemp: any;
  serverCpuLoad: any;
  serverRam: any;
  serverUptime: any;
  refresh = 0

  cD1 = [
    { data: Array<any>(), label: 'Cpu Voltage', },
    { data: Array<any>(), label: 'Cpu Fan RPM', },
    { data: Array<any>(), label: 'Cpu Fequency', },
  ];

  chartData: number[] = [];
  chartData1: string[] = [];

  constructor(private http: HttpClient, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log(this.setH)
    const url = 'https://data.bright-waters.com/data.json';
    const url3 = 'https://test.bright-waters.com';
    const url2 = 'https://monitor.bright-waters.com/api/server.json';
    const url4 = 'https://data.bright-waters.com/value.json'
    const url5 = 'https://monitor.bright-waters.com/api/miningData.json'
    const urlGaming = '.bright-waters.com/summary?last-stat-ts='
    console.log(screen.height);
    let firstCall = true

    console.log(this.sensors);
    this.http.get(url5).subscribe((res) => {
      let data = JSON.parse(JSON.stringify(res));

      this.poolHash = data['poolHashRate'].toFixed(2) + ' Gh/s'
      this.poolBlocksPerDay = data['poolBlocksPerDay'].toFixed(2)
      this.poolExpectedBlocksPerDay = data['poolExpectedBlocksPerDay'].toFixed(2)
      this.poolTImeSinceLastBlock = data['poolTimeSinceLastBlock'].toFixed(2) + ' hrs'
      this.poolErgoPrice = '$' + data['ergoPrice'].toFixed(2)
      this.poolCurrentLuck = data['poolCurrentLuck'].toFixed(0) + ' %'
      this.poolCurrentHashrate = data['poolCurrentHashrate'].toFixed(2) + ' Mh/s'
      //this.poolAverageHashrate = data['poolAverageHashrate'].toFixed(2) + ' Mh/s'
      //this.poolValidShares = data['poolValidShares']
      this.poolActiveWorkers = data['poolActiveWorkers']
      this.poolUnpaid = data['poolUnpaid'].toFixed(2) + ' ERG'
      this.poolUnconfirmed = data['poolUnconfirmed'].toFixed(2) + ' ERG'
      this.poolCoinsPerDay = data['poolCoinsPerDay'].toFixed(2) + ' ERG'
      this.poolUSDPerDay = '$' + data['poolUSDPerDay'].toFixed(2)
      this.actualHashrate = data['actualHashrate'].toFixed(2) + ' Mh/s'
      this.networkDiff = data['networkDiff'].toFixed(2) + ' p'
      this.networkHash = data['networkHash'].toFixed(2) + ' Th/s'
      this.networkBlockTime = data['networkBlockTime'].toFixed(2) + ' s'

      this.card1070H = data['cardData']['1070']['hashrate'].toFixed(0) + ' Mh/s'
      this.card1070T = data['cardData']['1070']['temperature'].toFixed(0) + ' ℃'
      this.card1070E = data['cardData']['1070']['efficiency']
      this.card1070P = data['cardData']['1070']['power'].toFixed(0) + ' W'

      this.card2060H = data['cardData']['2060']['hashrate'].toFixed(0) + ' Mh/s'
      this.card2060T = data['cardData']['2060']['temperature'].toFixed(0) + ' ℃'
      this.card2060E = data['cardData']['2060']['efficiency']
      this.card2060P = data['cardData']['2060']['power'].toFixed(0) + ' W'

      this.card3070tiH = data['cardData']['3070ti']['hashrate'].toFixed(0) + ' Mh/s'
      this.card3070tiT = data['cardData']['3070ti']['temperature'].toFixed(0) + ' ℃'
      this.card3070tiE = data['cardData']['3070ti']['efficiency']
      this.card3070tiP = data['cardData']['3070ti']['power'].toFixed(0) + ' W'
      this.card3070tiMT = data['cardData']['3070ti']['memTemp'].toFixed(0) + ' ℃'

      this.card3060tiH = data['cardData']['3060ti']['hashrate'].toFixed(0) + ' Mh/s'
      this.card3060tiT = data['cardData']['3060ti']['temperature'].toFixed(0) + ' ℃'
      this.card3060tiE = data['cardData']['3060ti']['efficiency']
      this.card3060tiP = data['cardData']['3060ti']['power'].toFixed(0) + ' W'

      this.card1070Store = data['hashStore']['1070']
      this.card2060Store = data['hashStore']['2060']
      this.card3060tiStore = data['hashStore']['3060ti']
      this.card3070tiStore = data['hashStore']['3070ti']
      this.cardAllStore = data['hashStore']['all']
      console.log(this.cardAllStore)
      //this.timestamp = data['hoursAgo']
    });
    setInterval( () => {
      this.http.get(url5).subscribe((res) => {
        let data = JSON.parse(JSON.stringify(res));

        this.poolHash = data['poolHashRate'].toFixed(2) + ' Gh/s'
        this.poolBlocksPerDay = data['poolBlocksPerDay'].toFixed(2)
        this.poolExpectedBlocksPerDay = data['poolExpectedBlocksPerDay'].toFixed(2)
        this.poolTImeSinceLastBlock = data['poolTimeSinceLastBlock'].toFixed(2) + ' hrs'
        this.poolErgoPrice = '$' + data['ergoPrice'].toFixed(2)
        this.poolCurrentLuck = data['poolCurrentLuck'].toFixed(0) + ' %'
        this.poolCurrentHashrate = data['poolCurrentHashrate'].toFixed(2) + ' Mh/s'
        //this.poolAverageHashrate = data['poolAverageHashrate'].toFixed(2) + ' Mh/s'
        //this.poolValidShares = data['poolValidShares']
        this.poolActiveWorkers = data['poolActiveWorkers']
        this.poolUnpaid = data['poolUnpaid'].toFixed(2) + ' ERG'
        this.poolUnconfirmed = data['poolUnconfirmed'].toFixed(2) + ' ERG'
        this.poolCoinsPerDay = data['poolCoinsPerDay'].toFixed(2) + ' ERG'
        this.poolUSDPerDay = '$' + data['poolUSDPerDay'].toFixed(2)
        this.actualHashrate = data['actualHashrate'].toFixed(2) + ' Mh/s'
        this.networkDiff = data['networkDiff'].toFixed(2) + ' p'
        this.networkHash = data['networkHash'].toFixed(2) + ' Th/s'
        this.networkBlockTime = data['networkBlockTime'].toFixed(2) + ' s'

        this.card1070H = data['cardData']['1070']['hashrate'].toFixed(0) + ' Mh/s'
        this.card1070T = data['cardData']['1070']['temperature'].toFixed(0) + ' ℃'
        this.card1070E = data['cardData']['1070']['efficiency']
        this.card1070P = data['cardData']['1070']['power'].toFixed(0) + ' W'

        this.card2060H = data['cardData']['2060']['hashrate'].toFixed(0) + ' Mh/s'
        this.card2060T = data['cardData']['2060']['temperature'].toFixed(0) + ' ℃'
        this.card2060E = data['cardData']['2060']['efficiency']
        this.card2060P = data['cardData']['2060']['power'].toFixed(0) + ' W'

        this.card3070tiH = data['cardData']['3070ti']['hashrate'].toFixed(0) + ' Mh/s'
        this.card3070tiT = data['cardData']['3070ti']['temperature'].toFixed(0) + ' ℃'
        this.card3070tiE = data['cardData']['3070ti']['efficiency']
        this.card3070tiP = data['cardData']['3070ti']['power'].toFixed(0) + ' W'
        this.card3070tiMT = data['cardData']['3070ti']['memTemp'].toFixed(0) + ' ℃'

        this.card3060tiH = data['cardData']['3060ti']['hashrate'].toFixed(0) + ' Mh/s'
        this.card3060tiT = data['cardData']['3060ti']['temperature'].toFixed(0) + ' ℃'
        this.card3060tiE = data['cardData']['3060ti']['efficiency']
        this.card3060tiP = data['cardData']['3060ti']['power'].toFixed(0) + ' W'

        this.card1070Store = data['hashStore']['1070']
        this.card2060Store = data['hashStore']['2060']
        this.card3060tiStore = data['hashStore']['3060ti']
        this.card3070tiStore = data['hashStore']['3070ti']
        this.cardAllStore = data['hashStore']['all']
        //this.timestamp = data['hoursAgo']
      });
    }, 60000);

    setInterval( () => {
      let timeNow: moment.Moment = moment();
      if (timeNow.diff(this.timeStamp, 'minutes') >= 1) {
        firstCall = true;
        console.log("Reset app time")
        this.timeStamp = moment();
      }

      this.http.get(url4).subscribe((res) => {
        this.timeStamp = moment();
        let test = res;
        let data = JSON.parse(JSON.stringify(test));
        console.log(data['value'])
        if (this.skip > 0) {
          console.log(this.skip)
          this.skip = this.skip - 1;
        }
        if (data['value'] === true && this.skip === 0) {
          this.switch = !this.switch
          if (this.switch === true) {
            this.refresh = 10;
          }
          this.onResize()
          this.skip = 6;
        }
      });

      this.http.get(url2).subscribe((res) => {
        this.data2 = res;
        let data = JSON.parse(JSON.stringify(this.data2));
        //console.log(data);

        this.serverCpuLoad = data['cpuLoad'] + ' %'
        this.serverCpuTemp = data['cpuTemp'] + ' ℃'
        this.serverRam = data['ram'] + ' %'
        this.serverUptime = data['uptime']


      });

      // if (this.switch) {
      //   if (this.refresh >= 10) {
      //     let s = "https://" //3070ti
      //     let a = ["3070ti", "3060ti", "2060", "1070"]
      //     for (let c of a) {
      //       let newUrl = s + c + urlGaming + (this.timestamp)
      //       console.log(newUrl)
      //     }


      //     this.http.get(url4).subscribe((res) => {
      //       let test = res;
      //       let data = JSON.parse(JSON.stringify(test));
      //       // console.log(data['value'])
      //     });
      //   }
      //   this.refresh = this.refresh + 1;
      // }

      this.http.get(url3).subscribe((res) => {
        this.data = res;
        this.timeStamp = moment();
        if (firstCall) {
          for (let i = 0; i < this.data.length; i++) {
            let currStr = this.data[i]['SensorName'];

            switch(currStr) {
              case 'Total CPU Usage': {
                this.sensors.cpuLoadO.index = i;
                break;
              }
              case 'CPU CCD1 (Tdie)': {
                this.sensors.cpuTempCCD1O.index = i;
                break;
              }
              case 'CPU CCD2 (Tdie)': {
                this.sensors.cpuTempCCD2O.index = i;
                break;
              }
              case 'CPU Package Power (SMU)': {
                this.sensors.cpuPowerO.index = i;
                break;
              }
              case 'CPU Core Voltage (SVI2 TFN)': {
                this.sensors.cpuVoltageO.index = i;
                break;
              }
              case 'System 5/Pump1': {
                this.sensors.cpuRPMO.index = i;
                break;
              }
              case 'VRM MOS': {
                this.sensors.moboMosfetTempO.index = i;
                break;
              }
              case 'Physical Memory Load': {
                this.sensors.ramUsageO.index = i;
                break;
              }
              case 'GPU Core Load': {
                this.sensors.gpuLoadO.index = i;
                break;
              }
              case 'GPU Memory Usage': {
                this.sensors.gpuVRAMO.index = i;
                break;
              }
              case 'GPU Clock': {
                this.sensors.gpuFrequencyO.index = i;
                break;
              }
              case 'GPU Memory Clock': {
                this.sensors.gpuMemoryFreqO.index = i;
                break;
              }
              case 'GPU Temperature': {
                this.sensors.gpuTempO.index = i;
                break;
              }
              case 'GPU Fan1': {
                this.sensors.gpuRPMO.index = i;
                break;
              }
              case 'GPU Power': {
                this.sensors.gpuPowerO.index = i;
                break;
              }
              case 'EC_TEMP1': {
                this.sensors.waterTempO.index = i;
                break;
              }
              case 'Drive Temperature': {
                this.sensors.sn850TempO.index = i;
                break;
              }
              case 'Drive Airflow Temperature': {
                this.sensors.evo840TempO.index = i;
                break;
              }
              case 'DIMM[2] Temperature': {
                this.sensors.ramTempO.index = i;
                break;
              }
              case 'System 2': {
                this.sensors.fan1O.index = i;
                break;
              }
              case 'System 4': {
                this.sensors.fan2O.index = i;
                break;
              }
              case 'CPU_OPT': {
                this.sensors.fan3O.index = i;
                break;
              }
              case 'Current UP rate': {
                this.sensors.internetUpActivityO.index = i;
                break;
              }
              case 'Current DL rate': {
                this.sensors.internetDownActivityO.index = i;
                break;
              }
              case 'GPU Memory Junction Temperature': {
                this.sensors.vramTempO.index = i;
                break;
              }
              case 'GPU Hot Spot Temperature': {
                this.sensors.hotSpotTempO.index = i;
                break;
              }
              case 'Max CPU/Thread Usage': {
                this.sensors.maxCoreLoadO.index = i;
                break;
              }
              default: {

                if (currStr.includes('T1 Effective Clock') || currStr.includes('T0 Effective Clock')) {
                  this.cpuFrequencyIndexes.push(i);
                }
                break;
              }
            }
          }

          // tslint:disable-next-line: forin
          for (let s in this.sensors) {
            this.sensors[s].max = -1;
            this.sensors[s].min = 99999999;
          }
          console.log(this.cpuFrequencyIndexes);
          firstCall = false;
        }

        let data = JSON.parse(JSON.stringify(this.data));

        let maxF = 0;
        for (let index of this.cpuFrequencyIndexes) {
          if (parseFloat(data[index]['SensorValue']) > maxF) {
            maxF = parseFloat(data[index]['SensorValue']);
          }
        }

        // tslint:disable-next-line: forin
        for (let s in this.sensors) {
          if (s === "cpuMaxFreqO") {
            this.sensors.cpuMaxFreqO.value = maxF;
          }
          else if (s === "internetUpActivityO" || s === "internetDownActivityO") {
            this.sensors[s].value = parseFloat(data[this.sensors[s].index]['SensorValue']) / 125;
          }
          else {
            this.sensors[s].value = parseFloat(data[this.sensors[s].index]['SensorValue']);
          }

          if (this.sensors[s].value > this.sensors[s].max) {
            this.sensors[s].max = this.sensors[s].value;
          }
          if (this.sensors[s].value < this.sensors[s].min) {
            this.sensors[s].min = this.sensors[s].value;
          }
        }

        // tslint:disable-next-line: max-line-length
        this.chartData = [this.sensors.cpuLoadO.value, this.sensors.cpuTempCCD1O.value, this.sensors.gpuLoadO.value, this.sensors.gpuTempO.value, this.sensors.maxCoreLoadO.value];
        //this.chartData1 = [this.cpuLoad];
        this.ref.markForCheck();
        //console.log(this.sensors);
      });


    }, 1000);

  }

  onResize() {
    this.setH = Math.floor(Math.floor(Math.floor(document.documentElement.clientHeight / 4) / 10) * 0.99) + 'px';
    this.w = screen.width
  }

  setSwitch() {
    this.switch = !this.switch;
  }

}



