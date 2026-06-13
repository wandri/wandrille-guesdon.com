import {Routes} from '@angular/router';
import {ProjectComponent} from './project-component/project.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';

export const projectRoutes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {path: '', component: ProjectListComponent},
      {path: ':id', component: ProjectDetailComponent}
    ],
  },
  {path: '**', redirectTo: ''}
];
