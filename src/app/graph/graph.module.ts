import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GraphRoutingModule } from './graph-routing.module';
import { GraphComponent } from './graph-component/graph.component';
import { GraphListComponent } from './graph-list/graph-list.component';
import { GraphCardComponent } from './graph-card/graph-card.component';
import { TimelineComponent } from './timeline/timeline.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { HoritontalLineChartFilterComponent } from './horitontal-line-chart-filter/horitontal-line-chart-filter.component';
import { MatButtonToggleModule } from '@angular/material';

@NgModule({
  imports: [
    GraphRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonToggleModule
  ],
  declarations: [
    GraphComponent,
    GraphListComponent,
    GraphCardComponent,
    TimelineComponent,
    LineChartComponent,
    HoritontalLineChartFilterComponent
  ],
  providers: []
})
export class GraphModule {
}
