import {ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {takeWhile} from 'rxjs/operators';
import {ProjectService} from '../project.service';
import {Project} from '../project.interface';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private titleService = inject(Title);
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private domSanitizer = inject(DomSanitizer);

  project = signal<Project | undefined>(undefined);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.route.params.subscribe(params => {
      this.project.set(undefined);
      this.projectService.getProject(params['id'])
        .pipe(takeWhile(() => !this.project()))
        .subscribe(projects => {
          if (projects && projects.length > 0) {
            const project = {...projects[0]};
            this.titleService.setTitle('hackathon â€¢ ' + project.projectName);
            if (project.projectPowerpoint) {
              project.projectPowerpoint = this.domSanitizer.bypassSecurityTrustResourceUrl(
                'https://docs.google.com/presentation/d/' + project.projectPowerpoint + '/embed?startDate=false&loop=true&delayms=5000'
              );
            }
            this.project.set(project);
          }
        });
    });
  }
}
