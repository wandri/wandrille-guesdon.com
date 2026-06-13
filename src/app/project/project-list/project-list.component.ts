import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ProjectService} from '../project.service';
import {ReducedProject} from '../project.interface';
import {ProjectCardComponent} from '../project-card/project-card.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectCardComponent]
})
export class ProjectListComponent implements OnInit, OnDestroy {
  private titleService = inject(Title);
  private projectService = inject(ProjectService);
  private ngUnsubscribe = new Subject<void>();

  hackathons = signal<ReducedProject[]>([]);
  startups = signal<ReducedProject[]>([]);

  ngOnInit() {
    this.titleService.setTitle('Projects & hackathons');
    this.projectService.getProjects()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: projects => {
          const hackathons: ReducedProject[] = [];
          const startups: ReducedProject[] = [];
          projects.forEach(project => {
            const reduced: ReducedProject = {
              title: project.projectName,
              subtitle: project.name,
              speciality: project.domain,
              description: project.description,
              id: project.id,
              urlPicture: project.urlPicture
            };
            if (project.type === 'hackathon') {
              hackathons.push(reduced);
            } else if (project.type === 'startup') {
              startups.push(reduced);
            }
          });
          this.hackathons.set(hackathons);
          this.startups.set(startups);
        },
        error: err => console.error(err)
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
