import { Component, Input, OnInit, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { BaseChartDirective, Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  styleUrls: ['./graph2.component.css'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class Graph2Component implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  @Input() idata0: number[] = [];
  @Input() idata1: number[] = [];
  @Input() idata2: number[] = [];
  @Input() idata3: number[] = [];
  @Input() idata4: number[] = [];

  data: any[] = [];
  @Input() width = 1100;
  @Input() height = 450;
  set = false;
  rendered = false;

  @Input() chartData = [
    { data: Array<any>(), label: '1070', },
    { data: Array<any>(), label: '2060' },
    { data: Array<any>(), label: '3070 ti', borderColor: "green" },
    { data: Array<any>(), label: '3060 ti', borderColor: "orange"},
    { data: Array<any>(), label: 'All', borderColor: "purple"}
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
    elements: { point: { radius: .0000000, borderWidth: 0, backgroundColor: 'rgba(0,0,0, 0)', pointStyle: 'circle' as const},
                line: { fill: false}},
    scales: {
      fontColor: 'white',
      yAxes: [{
        ticks: { suggestedMin: 0, suggestedMax: 500, fontColor: 'white'},
        gridLines: {display: false, drawBorder: true, zeroLineColor: 'white'      }
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
    this.chartLabels = []
    for (let i = 0; i < this.idata0.length; i++) {
      this.chartLabels.push('')
    }
    this.chartData[0].data = this.idata0;
    console.log("data")
    console.log(this.chartData[0].data)
    this.chartData[1].data = this.idata1;
    //this.chartLabels = ['','','']
    this.chartData[2].data = this.idata2;
    this.chartData[3].data = this.idata3;
    this.chartData[4].data = this.idata4;

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
