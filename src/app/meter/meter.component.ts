import { Component, OnInit, Input, SimpleChange, SimpleChanges, ElementRef } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, SingleDataSet } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.css'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class MeterComponent implements OnInit {
  @Input() data!: string;
  @Input() label!: any;
  @Input() max!: number;
  // @Input() fontSize!: number;
  @Input() labelOffset!: number;
  unit = '';

  dynamicWidth!: number;
  dynamicHeight!: number;
  labelHeight!: number;
  labelWidth!: number;
  label2Height!: number;
  label2Width!: number;

  @Input() flag = 0;

  rendered = false;
  disp = 'none';

  title = 'meter';

  // public doughnutChartLabels: Label[] = ['Cpu Usage'];
  public doughnutChartData!: SingleDataSet;
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors: any[] = [{backgroundColor: ['rgb(65, 216, 65)', 'dark gray'], borderWidth: 0, borderColor: 'black'}];

  public chartOptions = { responsive: false, maintainAspectRatio: false, cutoutPercentage: 70,
    circumference: 1.19 * Math.PI, rotation: .905 * Math.PI,
    tooltips: { enabled: false },
    animation: {
      duration: 0
    }
  };

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    const d = this.data.split(' ');

    const dNum = +d[0];

    if (d.length > 1 && this.flag === 0) {
      const unit = d[1];
      this.unit = unit;
    }

    this.doughnutChartData = [dNum, (this.max - dNum)];

    // colors
    // low
    const percent = dNum / this.max;
    if (percent <= 0.4) {
      // this.color = 'rgb(65, 216, 65)';
      this.doughnutChartColors = [{backgroundColor: ['rgb(65, 216, 65)', 'dark gray'], borderWidth: 0, borderColor: 'black'}];
    }
    if (0.4 < percent && percent <= 0.6) {
      // this.color = 'lightBlue';
      this.doughnutChartColors = [{backgroundColor: ['aqua', 'dark gray'], borderWidth: 0, borderColor: 'black'}];
    }
    if (0.6 < percent && percent <= 0.85) {
      // this.color = 'yellow';
      this.doughnutChartColors = [{backgroundColor: ['yellow', 'dark gray'], borderWidth: 0, borderColor: 'black'}];
    }
    if (0.85 < percent) {
      // this.color = 'red';
      this.doughnutChartColors = [{backgroundColor: ['red', 'dark gray'], borderWidth: 0, borderColor: 'black'}];
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



    this.dynamicWidth = parentWidth + (parentWidth / 4);
    this.dynamicHeight = this.dynamicWidth / 2;

    this.labelWidth = -(parentWidth / 2);

    if (parentHeight > parentWidth) {
      this.labelHeight = -(parentHeight / 6);
      this.label2Height = (parentHeight * .7);
      this.label2Width = (parentWidth * 1.03);
    }
    else {
      this.labelHeight = -(parentHeight / 1.9);
      this.label2Height = (parentHeight * 1.05);
      this.label2Width = (parentWidth * 1.03);
      //this.label2Height = this.dynamicHeight - (this.dynamicHeight / 3);
      //this.label2Width = this.dynamicWidth - (this.dynamicWidth / 4.4);

    }



    if (this.labelOffset) {
      //this.labelWidth += this.labelOffset;

      if (parentHeight > parentWidth) {
        this.label2Height -= (this.labelOffset * 6.5);
      }
      else {
        this.label2Height -= (this.labelOffset * 1.4);
        this.labelHeight += this.labelOffset;
      }

      //this.label2Width += (this.labelOffset);
    }

    this.disp = 'inline-block';
  }




}
