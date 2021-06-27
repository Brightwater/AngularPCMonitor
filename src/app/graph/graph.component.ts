import { Component, Input, OnInit, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { BaseChartDirective, Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class GraphComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  @Input() idata: number[] = [];

  data: any[] = [];
  @Input() width = 975;
  @Input() height = 450;
  set = false;
  rendered = false;

  @Input() chartData = [
    { data: Array<any>(), label: 'Cpu Load', },
    { data: Array<any>(), label: 'Cpu Temp' },
    { data: Array<any>(), label: 'Gpu Load', borderColor: "green" },
    { data: Array<any>(), label: 'Gpu Temp', borderColor: "orange"}
  ];

  chartLabels: Label[] = [];
  chartOptions = {
    legend: {
      labels: {fontColor: 'white'}
    },
    responsive: false,
    animation: {
      duration: 0
    },
    showXAxisLabel: false,
    elements: { point: { radius: 0.5, borderWidth: 0, backgroundColor: 'rgba(0,0,0, 0)', pointStyle: 'circle' as const},
                line: { fill: false}},
    scales: {
      fontColor: 'white',
      yAxes: [{
        ticks: { suggestedMin: 0, suggestedMax: 100, fontColor: 'white'},
        gridLines: {display: true, drawBorder: true, zeroLineColor: 'white'      }
      }],
      xAxes: [{
        gridLines: {zeroLineColor: 'white'}
      }]
    }
  };
  chartLegend = true;
  chartPlugins = [];
  dynamicWidth: any;
  dynamicHeight: any;

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {

    const max = 100;
    let current = this.chartData[0].data.length + 1;

    for (let i = 0; i < this.idata.length; i++) {
      /*
      if (i >= this.chartData.length) {
        console.log("I greater");
        let t = this.chartData[i - 1];
        this.chartData.push(t);
        this.chartData[i].label = 'test';
        console.log(this.chartData);
      }

      console.log("got here");
      */

      // let d = this.idata[i].split(' ');
      // let dNum = +d[0];


      if (current >= max) {
        this.chartData[i].data.shift();
      }
      this.chartData[i].data.push(this.idata[i]);
    }
    if (current >= max) {
      this.chartLabels.shift();
    }
    this.chartLabels.push('');

    if (this.rendered){
      this.chart.chart.update();
    }
    if (this.elRef.nativeElement.parentElement.parentElement.clientWidth !== 0 && this.rendered === false) {
      this.rendered = true;
      this.fixSize();
    }
  }

  onResize(): void {
    this.fixSize();

  }

  fixSize(): void {
    let parentWidth = this.elRef.nativeElement.parentElement.parentElement.clientWidth;
    let parentHeight = this.elRef.nativeElement.parentElement.parentElement.clientHeight;

    if (parentHeight * 1.3 > parentWidth) {
      this.dynamicWidth = parentWidth * 0.98;
      this.dynamicHeight = parentWidth * 0.5;
    }
    else {
      this.dynamicWidth = parentWidth * 0.98; // parentWidth + (parentWidth / 4);
      this.dynamicHeight = parentHeight * 1.00; // this.dynamicWidth / 2;
    }
  }


}
