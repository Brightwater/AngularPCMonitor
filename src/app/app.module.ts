import { MatGridListModule } from '@angular/material/grid-list';
import { ChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MeterComponent } from './meter/meter.component';
import { GraphComponent } from './graph/graph.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { Graph2Component } from './graph2/graph2.component';


@NgModule({
  declarations: [
    AppComponent,
    MeterComponent,
    GraphComponent,
    Graph2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
