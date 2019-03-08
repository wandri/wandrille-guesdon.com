import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graph-card',
  templateUrl: './graph-card.component.html',
  styleUrls: ['./graph-card.component.scss']
})
export class GraphCardComponent implements OnInit {
  @Input()
  githubLink: string = '';

  @Input()
  titleCard: string = '';

  constructor() {
  }

  ngOnInit() {
  }

}
