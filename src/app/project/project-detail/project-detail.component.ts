import {Component, OnInit} from '@angular/core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../project.service';
import {takeWhile} from 'rxjs/operators';
import {Project} from '../project.interface';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  id: string = '';
  project: Project | undefined = undefined;

  constructor
  (private titleService: Title,
   private router: ActivatedRoute,
   private projectService: ProjectService,
   private domSanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.router.params.subscribe(params => {
      this.id = params['id'];
      this.projectService.getProject(this.id)
        .pipe(takeWhile(() => !this.project))
        .subscribe((projects) => {
          if (projects && projects.length > 0) {
            this.project = projects[0];

            this.titleService.setTitle('hackathon • ' + this.project.projectName);

            if (this.project.projectPowerpoint) {
              this.project.projectPowerpoint = this.domSanitizer.bypassSecurityTrustResourceUrl('https://docs.google.com/presentation/d/' +
                this.project.projectPowerpoint + '/embed?startDate=false&loop=true&delayms=5000');
            }
          }
        });
    });
  }
}
