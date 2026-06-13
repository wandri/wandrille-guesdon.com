import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {ReducedProject} from '../project.interface';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIcon]
})
export class ProjectCardComponent {
  data = input<ReducedProject | undefined>(undefined);
}
