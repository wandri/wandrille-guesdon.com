import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ProjectService} from '../project.service';
import {takeUntil} from 'rxjs/operators';
import {ReducedProject} from '../project.interface';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {
    hackathons: ReducedProject[] = [];
    startups: ReducedProject[] = [];
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private titleService: Title, private projectService: ProjectService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Projects & hackathons');
        this.projectService.getProjects()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                projects => {
                    this.hackathons = [];
                    this.startups = [];
                    projects.forEach(project => {
                        if (project.type === 'hackathon') {
                            this.hackathons.push({
                                title: project.projectName,
                                subtitle: project.name,
                                speciality: project.domain,
                                description: project.description,
                                id: project.id,
                                urlPicture: project.urlPicture
                            });
                        } else if (project.type === 'startup') {
                            this.startups.push({
                                title: project.projectName,
                                subtitle: project.name,
                                speciality: project.domain,
                                description: project.description,
                                id: project.id,
                                urlPicture: project.urlPicture
                            });
                        }
                    });
                },
                error => console.error(error)
            );
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
