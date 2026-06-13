import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  animations: [
    trigger(
      'navMobileAnimation',
      [
        transition(':enter', [
          style({opacity: 0, transform: 'scale(.95)'}),
          animate('200ms', style({opacity: 1, transform: 'scale(1)'}))
        ]),
        transition(':leave', [
          style({opacity: 1, transform: 'scale(1)'}),
          animate('200ms', style({opacity: 0, transform: 'scale(.95)'}))
        ])
      ]
    )
  ]
})
export class MenuComponent {
  showHide = signal(false);

  closeOrOpenPopup() {
    this.showHide.update(v => !v);
  }
}
