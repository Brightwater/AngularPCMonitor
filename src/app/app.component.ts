import { APP_BOOTSTRAP_LISTENER, Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

  test = -1;

  d: any;
  interval: any;
  num = 0;
  private data: any = [];
  private data2: any = [];
  private data3: any = [];
  cpuLoad: any;

  objects = {
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
  }

  //cpuFrequencies: number[] = [];
  cpuFrequencyIndexes: number[] = [];






  cpuTemp: any;

  cpuPower: any;

  cpuVoltage: any;

  cpuFrequency: any;
  cpuRPM: any;


  moboMosfetTemp: any;


  ramUsage: any;


  gpuLoad: any;
  gpuVRAM: any;
  gpuFrequency: any;
  gpuMemFrequency: any;
  gpuTemp: any;
  gpuRPM: any;
  gpuPower: any;

  waterTemp: any;

  ssdLoad: any;
  ssdTemp: any;

  ethernetUp: any;
  ethernetDown: any;

  serverCpuTemp: any;
  serverCpuLoad: any;
  serverRam: any;
  serverUptime: any;

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
    console.log(screen.height);
    let firstCall = true
    //alert(Object.keys({"success":"You are welcome"})[0]);
    console.log(this.objects);
    setInterval( () => {
      this.http.get(url2).subscribe((res) => {
        this.data2 = res;
        let data = JSON.parse(JSON.stringify(this.data2));
        console.log(data);

        this.serverCpuLoad = data['cpuLoad'] + ' %'
        this.serverCpuTemp = data['cpuTemp'] + ' ℃'
        this.serverRam = data['ram'] + ' %'
        this.serverUptime = data['uptime']
      });


      // MAYBE TRY BLCOK??? to check if time out aka lost connection
      this.http.get(url3).subscribe((res) => {
        this.data = res;
        if (firstCall) {
          for (let i = 0; i < this.data.length; i++) {
            let currStr = this.data[i]['SensorName'];

            switch(currStr) {
              case 'Total CPU Usage': {
                this.objects.cpuLoadO.index = i;
                break;
              }
              case 'CPU CCD1 (Tdie)': {
                this.objects.cpuTempCCD1O.index = i;
                break;
              }
              case 'CPU CCD2 (Tdie)': {
                this.objects.cpuTempCCD2O.index = i;
                break;
              }
              case 'CPU Package Power (SMU)': {
                this.objects.cpuPowerO.index = i;
                break;
              }
              case 'SoC Voltage (SVI2 TFN)': {
                this.objects.cpuVoltageO.index = i;
                break;
              }
              case 'System 5/Pump1': {
                this.objects.cpuRPMO.index = i;
                break;
              }
              case 'VRM MOS': {
                this.objects.moboMosfetTempO.index = i;
                break;
              }
              case 'Physical Memory Load': {
                this.objects.ramUsageO.index = i;
                break;
              }
              case 'GPU Core Load': {
                this.objects.gpuLoadO.index = i;
                break;
              }
              case 'GPU Memory Usage': {
                this.objects.gpuVRAMO.index = i;
                break;
              }
              case 'GPU Clock': {
                this.objects.gpuFrequencyO.index = i;
                break;
              }
              case 'GPU Memory Clock': {
                this.objects.gpuMemoryFreqO.index = i;
                break;
              }
              case 'GPU Temperature': {
                this.objects.gpuTempO.index = i;
                break;
              }
              case 'GPU Fan1': {
                this.objects.gpuRPMO.index = i;
                break;
              }
              case 'GPU Power': {
                this.objects.gpuPowerO.index = i;
                break;
              }
              case 'EC_TEMP1': {
                this.objects.waterTempO.index = i;
                break;
              }
              case 'Drive Temperature': {
                this.objects.sn850TempO.index = i;
                break;
              }
              case 'Drive Airflow Temperature': {
                this.objects.evo840TempO.index = i;
                break;
              }
              case 'DIMM[2] Temperature': {
                this.objects.ramTempO.index = i;
                break;
              }
              case 'System 2': {
                this.objects.fan1O.index = i;
                break;
              }
              case 'System 4': {
                this.objects.fan2O.index = i;
                break;
              }
              case 'CPU_OPT': {
                this.objects.fan3O.index = i;
                break;
              }
              case 'Current UP rate': {
                this.objects.internetUpActivityO.index = i;
                break;
              }
              case 'Current DL rate': {
                this.objects.internetDownActivityO.index = i;
                break;
              }
              case 'GPU Memory Junction Temperature': {
                this.objects.vramTempO.index = i;
                break;
              }
              case 'GPU Hot Spot Temperature': {
                this.objects.hotSpotTempO.index = i;
                break;
              }
              default: {
                if (currStr.includes('clock (perf', 0)) {
                  this.cpuFrequencyIndexes.push(i);
                }
                break;
              }
            }
          }
          firstCall = false;
        }
        //console.log(this.data);
        //
        let data = JSON.parse(JSON.stringify(this.data));



        //let cpu = data.Children[0].Children[1];
        //let cpu = data[0]["SensorValue"]


        //let cpuV = cpu.Children[0];
        //this.cpuVoltage = cpuV.Children[0].Value; //
        //this.cpuVoltage = data[84]['SensorValue'] + ' V'
        this.objects.cpuVoltageO.value = data[84]['SensorValue'];
        if (this.objects.cpuVoltageO.value > this.objects.cpuVoltageO.max) {
          this.objects.cpuVoltageO.max = this.objects.cpuVoltageO.value;
        }
        if (this.objects.cpuVoltageO.value < this.objects.cpuVoltageO.min) {
          this.objects.cpuVoltageO.min = this.objects.cpuVoltageO.value;
        }

        //this.cpuLoad = cpu.Children[3].Children[0].Value; //
        this.objects.cpuLoadO.value = data[this.objects.cpuLoadO.index]['SensorValue'];
        if (this.objects.cpuLoadO.value > this.objects.cpuLoadO.max) {
          this.objects.cpuLoadO.max = this.objects.cpuLoadO.value;
        }
        if (this.objects.cpuLoadO.value < this.objects.cpuLoadO.min) {
          this.objects.cpuLoadO.min = this.objects.cpuLoadO.value;
        }

        //this.cpuPower = cpu.Children[5].Children[0].Value; //
        this.objects.cpuPowerO.value = data[this.objects.cpuPowerO.index]['SensorValue']
        if (this.objects.cpuPowerO.value > this.objects.cpuPowerO.max) {
          this.objects.cpuPowerO.max = this.objects.cpuPowerO.value;
        }
        if (this.objects.cpuPowerO.value < this.objects.cpuPowerO.min) {
          this.objects.cpuPowerO.min = this.objects.cpuPowerO.value;
        }

        //this.cpuTemp = cpu.Children[2].Children[3].Value; //
        this.objects.cpuTempCCD1O.value = data[this.objects.cpuTempCCD1O.index]['SensorValue']
        if (this.objects.cpuTempCCD1O.value > this.objects.cpuTempCCD1O.max) {
          this.objects.cpuTempCCD1O.max = this.objects.cpuTempCCD1O.value;
        }
        if (this.objects.cpuTempCCD1O.value < this.objects.cpuTempCCD1O.min) {
          this.objects.cpuTempCCD1O.min = this.objects.cpuTempCCD1O.value;
        }

        this.objects.cpuTempCCD2O.value = data[this.objects.cpuTempCCD2O.index]['SensorValue']
        if (this.objects.cpuTempCCD2O.value > this.objects.cpuTempCCD2O.max) {
          this.objects.cpuTempCCD2O.max = this.objects.cpuTempCCD2O.value;
        }
        if (this.objects.cpuTempCCD2O.value < this.objects.cpuTempCCD2O.min) {
          this.objects.cpuTempCCD2O.min = this.objects.cpuTempCCD2O.value;
        }

        //let cpuC = cpu.Children[1];
        let freqs: Array<number> = [];
        // for (let i = 0; i < freqs.length; i++) {
        //   freqs.push(parseFloat(cpuC.Children[i].Value));
        // }

        //let mobo = data.Children[0].Children[0].Children[0]
        //this.moboMosfetTemp = mobo.Children[1].Children[4].Value //
        this.objects.moboMosfetTempO.value = data[this.objects.moboMosfetTempO.index]['SensorValue']
        if (this.objects.moboMosfetTempO.value > this.objects.moboMosfetTempO.max) {
          this.objects.moboMosfetTempO.max = this.objects.moboMosfetTempO.value;
        }
        if (this.objects.moboMosfetTempO.value < this.objects.moboMosfetTempO.min) {
          this.objects.moboMosfetTempO.min = this.objects.moboMosfetTempO.value;
        }

        //this.cpuRPM = mobo.Children[2].Children[0].Value //
        this.objects.cpuRPMO.value = data[this.objects.cpuRPMO.index]['SensorValue']
        if (this.objects.cpuRPMO.value > this.objects.cpuRPMO.max) {
          this.objects.cpuRPMO.max = this.objects.cpuRPMO.value;
        }
        if (this.objects.cpuRPMO.value < this.objects.cpuRPMO.min) {
          this.objects.cpuRPMO.min = this.objects.cpuRPMO.value;
        }
        //this.cpuRPM = data.Children[0].Children[0].Children[1].Children[2].Children[0].Value

        this.objects.waterTempO.value = data[this.objects.waterTempO.index]['SensorValue']
        //this.waterTemp = mobo.Children[1].Children[1].Value
        if (this.objects.waterTempO.value > this.objects.waterTempO.max) {
          this.objects.waterTempO.max = this.objects.waterTempO.value;
        }
        if (this.objects.waterTempO.value < this.objects.waterTempO.min) {
          this.objects.waterTempO.min = this.objects.waterTempO.value;
        }

        this.objects.ramUsageO.value = data[this.objects.ramUsageO.index]['SensorValue']
        if (this.objects.ramUsageO.value > this.objects.ramUsageO.max) {
          this.objects.ramUsageO.max = this.objects.ramUsageO.value;
        }
        if (this.objects.ramUsageO.value < this.objects.ramUsageO.min) {
          this.objects.ramUsageO.min = this.objects.ramUsageO.value;
        }
        //this.ramUsage = data.Children[0].Children[2].Children[0].Children[0].Value //


        //let gpu = data.Children[0].Children[3]

        this.objects.gpuLoadO.value = data[this.objects.gpuLoadO.index]['SensorValue']
        if (this.objects.gpuLoadO.value > this.objects.gpuLoadO.max) {
          this.objects.gpuLoadO.max = this.objects.gpuLoadO.value;
        }
        if (this.objects.gpuLoadO.value < this.objects.gpuLoadO.min) {
          this.objects.gpuLoadO.min = this.objects.gpuLoadO.value;
        }
        //this.gpuLoad = gpu.Children[2].Children[0].Value //

        this.objects.gpuVRAMO.value = data[this.objects.gpuVRAMO.index]['SensorValue']
        if (this.objects.gpuVRAMO.value > this.objects.gpuVRAMO.max) {
          this.objects.gpuVRAMO.max = this.objects.gpuVRAMO.value;
        }
        if (this.objects.gpuVRAMO.value < this.objects.gpuVRAMO.min) {
          this.objects.gpuVRAMO.min = this.objects.gpuVRAMO.value;
        }
        //this.gpuVRAM = gpu.Children[2].Children[3].Value //

        this.objects.gpuFrequencyO.value = data[this.objects.gpuFrequencyO.index]['SensorValue']
        if (this.objects.gpuFrequencyO.value > this.objects.gpuFrequencyO.max) {
          this.objects.gpuFrequencyO.max = this.objects.gpuFrequencyO.value;
        }
        if (this.objects.gpuFrequencyO.value < this.objects.gpuFrequencyO.min) {
          this.objects.gpuFrequencyO.min = this.objects.gpuFrequencyO.value;
        }
        //this.gpuFrequency = gpu.Children[0].Children[0].Value //

        this.objects.gpuMemoryFreqO.value = data[this.objects.gpuMemoryFreqO.index]['SensorValue']
        if (this.objects.gpuMemoryFreqO.value > this.objects.gpuMemoryFreqO.max) {
          this.objects.gpuMemoryFreqO.max = this.objects.gpuMemoryFreqO.value;
        }
        if (this.objects.gpuMemoryFreqO.value < this.objects.gpuMemoryFreqO.min) {
          this.objects.gpuMemoryFreqO.min = this.objects.gpuMemoryFreqO.value;
        }
        //this.gpuMemFrequency = gpu.Children[0].Children[1].Value //

        this.objects.gpuTempO.value = data[this.objects.gpuTempO.index]['SensorValue']
        if (this.objects.gpuTempO.value > this.objects.gpuTempO.max) {
          this.objects.gpuTempO.max = this.objects.gpuTempO.value;
        }
        if (this.objects.gpuTempO.value < this.objects.gpuTempO.min) {
          this.objects.gpuTempO.min = this.objects.gpuTempO.value;
        }
        //this.gpuTemp = gpu.Children[1].Children[0].Value //

        this.objects.gpuRPMO.value = data[this.objects.gpuRPMO.index]['SensorValue']
        if (this.objects.gpuRPMO.value > this.objects.gpuRPMO.max) {
          this.objects.gpuRPMO.max = this.objects.gpuRPMO.value;
        }
        if (this.objects.gpuRPMO.value < this.objects.gpuRPMO.min) {
          this.objects.gpuRPMO.min = this.objects.gpuRPMO.value;
        }
        //this.gpuRPM = gpu.Children[3].Children[0].Value //

        this.objects.gpuPowerO.value = data[this.objects.gpuPowerO.index]['SensorValue']
        if (this.objects.gpuPowerO.value > this.objects.gpuPowerO.max) {
          this.objects.gpuPowerO.max = this.objects.gpuPowerO.value;
        }
        if (this.objects.gpuPowerO.value < this.objects.gpuPowerO.min) {
          this.objects.gpuPowerO.min = this.objects.gpuPowerO.value;
        }

        this.objects.sn850TempO.value = data[this.objects.sn850TempO.index]['SensorValue']
        this.objects.evo840TempO.value = data[this.objects.evo840TempO.index]['SensorValue']
        if (this.objects.sn850TempO.value > this.objects.sn850TempO.max) {
          this.objects.sn850TempO.max = this.objects.sn850TempO.value;
        }
        if (this.objects.sn850TempO.value < this.objects.sn850TempO.min) {
          this.objects.sn850TempO.min = this.objects.sn850TempO.value;
        }

        this.objects.ramTempO.value = data[this.objects.ramTempO.index]['SensorValue']
        if (this.objects.ramTempO.value > this.objects.ramTempO.max) {
          this.objects.ramTempO.max = this.objects.ramTempO.value;
        }
        if (this.objects.ramTempO.value < this.objects.ramTempO.min) {
          this.objects.ramTempO.min = this.objects.ramTempO.value;
        }


        this.objects.fan1O.value = data[this.objects.fan1O.index]['SensorValue']
        this.objects.fan2O.value = data[this.objects.fan2O.index]['SensorValue']
        this.objects.fan3O.value = data[this.objects.fan3O.index]['SensorValue']

        this.objects.internetUpActivityO.value = (data[this.objects.internetUpActivityO.index]['SensorValue'] / 125);
        if (this.objects.internetUpActivityO.value > this.objects.internetUpActivityO.max) {
          this.objects.internetUpActivityO.max = this.objects.internetUpActivityO.value;
        }
        if (this.objects.internetUpActivityO.value < this.objects.internetUpActivityO.min) {
          this.objects.internetUpActivityO.min = this.objects.internetUpActivityO.value;
        }

        this.objects.internetDownActivityO.value = (data[this.objects.internetDownActivityO.index]['SensorValue'] / 125);
        if (this.objects.internetDownActivityO.value > this.objects.internetDownActivityO.max) {
          this.objects.internetDownActivityO.max = this.objects.internetDownActivityO.value;
        }
        if (this.objects.internetDownActivityO.value < this.objects.internetDownActivityO.min) {
          this.objects.internetDownActivityO.min = this.objects.internetDownActivityO.value;
        }

        let maxF = 0;
        for (let index of this.cpuFrequencyIndexes) {
          if (data[index]['SensorValue'] > maxF) {
            maxF = data[index]['SensorValue'];
          }
        }
        this.objects.cpuMaxFreqO.value = maxF;
        if (this.objects.cpuMaxFreqO.value > this.objects.cpuMaxFreqO.max) {
          this.objects.cpuMaxFreqO.max = this.objects.cpuMaxFreqO.value;
        }
        if (this.objects.cpuMaxFreqO.value < this.objects.cpuMaxFreqO.min) {
          this.objects.cpuMaxFreqO.min = this.objects.cpuMaxFreqO.value;
        }

        this.objects.hotSpotTempO.value = data[this.objects.hotSpotTempO.index]['SensorValue']
        if (this.objects.hotSpotTempO.value > this.objects.hotSpotTempO.max) {
          this.objects.hotSpotTempO.max = this.objects.hotSpotTempO.value;
        }
        if (this.objects.hotSpotTempO.value < this.objects.hotSpotTempO.min) {
          this.objects.hotSpotTempO.min = this.objects.hotSpotTempO.value;
        }

        this.objects.vramTempO.value = data[this.objects.vramTempO.index]['SensorValue']
        if (this.objects.vramTempO.value > this.objects.vramTempO.max) {
          this.objects.vramTempO.max = this.objects.vramTempO.value;
        }
        if (this.objects.vramTempO.value < this.objects.vramTempO.min) {
          this.objects.vramTempO.min = this.objects.vramTempO.value;
        }


        //this.gpuPower = gpu.Children[4].Children[0].Value //

        //let ssd = data.Children[0].Children[4]

        //this.ssdLoad = (ssd.Children[1].Children[2].Value + ssd.Children[1].Children[2].Value) / 2 + ' %'; //
        //this.objects..value = data[80]['SensorValue']
        //this.ssdTemp = ssd.Children[0].Children[0].Value //

        //let eth = data.Children[0].Children[6]

        //this.ethernetUp = eth.Children[0].Children[0].Value //
        //this.ethernetDown = eth.Children[2].Children[1].Value //



        // tslint:disable-next-line: max-line-length
        this.chartData = [this.objects.cpuLoadO.value, this.objects.cpuTempCCD1O.value, this.objects.gpuLoadO.value, this.objects.gpuTempO.value];
        //this.chartData1 = [this.cpuLoad];
        this.ref.markForCheck();
        console.log(this.objects);
      });
    }, 1000);

  }

  onResize() {
    this.setH = Math.floor((screen.height / 4) / 10) + 'px';
    this.w = screen.width
  }

}



