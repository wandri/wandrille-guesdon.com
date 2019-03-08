import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResumeComponent} from './resume/resume.component';
import {ContactComponent} from './contact/contact.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'cv', component: ResumeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)},
  {path: 'graph', loadChildren: () => import('./graph/graph.module').then(m => m.GraphModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
