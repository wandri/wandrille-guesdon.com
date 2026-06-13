import {Routes} from '@angular/router';
import {GraphComponent} from './graph-component/graph.component';
import {GraphListComponent} from './graph-list/graph-list.component';

export const graphRoutes: Routes = [
  {
    path: '',
    component: GraphComponent,
    children: [
      {path: '', component: GraphListComponent}
    ],
  },
  {path: '**', redirectTo: ''}
];
