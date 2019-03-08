import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GraphRoutingModule } from './graph-routing.module';
import { GraphComponent } from './graph-component/graph.component';
import { GraphListComponent } from './graph-list/graph-list.component';
import { GraphCardComponent } from './graph-card/graph-card.component';
import { TimelineComponent } from './timeline/timeline.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  imports: [
    GraphRoutingModule,
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    GraphComponent,
    GraphListComponent,
    GraphCardComponent,
    TimelineComponent,
    LineChartComponent
  ],
  providers: []
})
export class GraphModule {
}
