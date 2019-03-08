import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphRoutingModule} from './graph-routing.module';
import {GraphComponent} from './graph-component/graph.component';
import {GraphListComponent} from './graph-list/graph-list.component';
import {GraphCardComponent} from './graph-card/graph-card.component';
import {TimelineComponent} from './graphs/timeline/timeline.component';
import {LineChartComponent} from './graphs/line-chart/line-chart.component';
import {
  HorizontalLineChartFilterComponent
} from './graphs/horizontal-line-chart-filter/horizontal-line-chart-filter.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
  imports: [
    GraphRoutingModule,
    CommonModule,
    MatButtonToggleModule,
    MatButtonToggleModule
  ],
  declarations: [
    GraphComponent,
    GraphListComponent,
    GraphCardComponent,
    TimelineComponent,
    LineChartComponent,
    HorizontalLineChartFilterComponent
  ],
  providers: []
})
export class GraphModule {
}
