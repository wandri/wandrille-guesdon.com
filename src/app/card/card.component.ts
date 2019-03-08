import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MenuProject} from '../main/project.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {

  @Input()
  project: MenuProject | null = null;

  title: string = '';
  subTitle: string | null = null;
  backgroundColor: string = '#ffffff';
  backgroundImageLink: string | null = null;
  logoLink: string | null = null;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedProject = changes.project;
    let currentProject: MenuProject = updatedProject.currentValue;
    if (updatedProject && (updatedProject.isFirstChange() || currentProject !== updatedProject.previousValue)) {
      this.title = currentProject.title;
      this.subTitle = currentProject.subTitle;
      let backgroundColor = currentProject.backgroundColor;
      if (backgroundColor) {
        this.backgroundColor = backgroundColor;
      }
      let backgroundImageLink = currentProject.backgroundImagePath;
      if (backgroundImageLink) {
        this.backgroundImageLink = backgroundImageLink;
      }
      let logoLink = currentProject.logoPath;
      if (logoLink) {
        this.logoLink = logoLink;
      }
    }
  }
}
