import {NgModule} from '@angular/core';
import {ProjectComponent} from './project-component/project.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectRoutingModule} from './project-routing.module';
import {ProjectService} from './project.service';
import {ProjectCardComponent} from './project-card/project-card.component';
import {CommonModule} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatIconModule
  ],
  declarations: [
    ProjectComponent,
    ProjectDetailComponent,
    ProjectListComponent,
    ProjectCardComponent,
  ],
  providers: [ProjectService]
})
export class ProjectModule {
}
