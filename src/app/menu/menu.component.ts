import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger(
      'navMobileAnimation',
      [
        transition(':enter', [
          style({
            opacity: 0,
            transform: 'scale(.95)'
          }),
          animate('200ms', style({
            opacity: 1,
            transform: 'scale(1)'
          }))
        ]),
        transition(':leave', [
          style({
            opacity: 1,
            transform: 'scale(1)'
          }),
          animate('200ms', style({
            opacity: 0,
            transform: 'scale(.95)'
          }))
        ])
      ]
    )
  ]
})
export class MenuComponent implements OnInit {
  showHide = false;

  constructor() {
  }

  ngOnInit() {
  }

  closeOrOpenPopup() {
    this.showHide = !this.showHide;
  }
}
