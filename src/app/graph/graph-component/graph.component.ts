import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-graph-component',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet]
})
export class GraphComponent {}
