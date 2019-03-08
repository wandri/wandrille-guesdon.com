import {Component, Input, OnInit} from '@angular/core';
import {ReducedProject} from '../project.interface';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() data: ReducedProject | undefined = undefined;

  constructor() {
  }

  ngOnInit() {
  }

}
