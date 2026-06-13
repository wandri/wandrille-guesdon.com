import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'app-graph-card',
  templateUrl: './graph-card.component.html',
  styleUrl: './graph-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphCardComponent {
  githubLink = input('');
  titleCard = input('');
}
