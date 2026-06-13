import {Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ContactComponent} from './contact/contact.component';
import {ResumeComponent} from './resume/resume.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'cv', component: ResumeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'project', loadChildren: () => import('./project/project.routes').then(m => m.projectRoutes)},
  {path: 'graph', loadChildren: () => import('./graph/graph.routes').then(m => m.graphRoutes)},
  {path: '**', redirectTo: ''}
];
