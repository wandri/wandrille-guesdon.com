import {RouterModule, Routes} from '@angular/router';
import {ProjectComponent} from './project-component/project.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: ProjectComponent,
        children: [
            {path: '', component: ProjectListComponent},
            {path: ':id', component: ProjectDetailComponent}
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
export class ProjectRoutingModule {
}
