import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GraphComponent} from './graph-component/graph.component';
import {GraphListComponent} from './graph-list/graph-list.component';

const routes: Routes = [
  {
    path: '',
    component: GraphComponent,
    children: [
      {path: '', component: GraphListComponent}
    ],
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphRoutingModule {
}
