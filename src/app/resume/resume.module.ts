import {NgModule} from '@angular/core';
import {ResumeComponent} from './resume.component';
import {SvgRegistryService} from './svg-registry.service';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    ResumeComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    SvgRegistryService
  ]
})
export class ResumeModule {
}
