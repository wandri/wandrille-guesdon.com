import { Component, OnInit } from '@angular/core';
import { TimelineData } from '../timeline/timeline.component';
import { LineChartData } from '../line-chart/line-chart.component';

@Component({
  selector: 'app-graph-list',
  templateUrl: './graph-list.component.html',
  styleUrls: ['./graph-list.component.scss']
})
export class GraphListComponent implements OnInit {
  timelineData: TimelineData[];
  timelineGithubLink: string;
  lineChartData: LineChartData[];
  lineChartGithubLink: string;

  constructor() {
  }

  ngOnInit() {
    // TODO : get correct link
    this.timelineData = [
      {
        source: 'source 1',
        data: [
          {
            startDate: new Date(2010, 1, 1),
            endDate: new Date(2011, 10, 3),
            value: 5
          },
          {
            startDate: new Date(2012, 1, 1),
            endDate: new Date(2016, 10, 3),
            value: 5
          },
          {
            startDate: new Date(2015, 2, 3),
            endDate: new Date(2017, 8, 2),
            value: 10
          },
          {
            startDate: new Date(2014, 2, 3),
            endDate: new Date(2016, 2, 3),
            value: 15
          },
          {
            startDate: new Date(2017, 1, 1),
            endDate: new Date(2018, 2, 3),
            value: 20
          }
        ]
      },
      {
        source: 'source 2',
        data: [
          {
            startDate: new Date(2014, 8, 3),
            endDate: new Date(2015, 8, 3),
            value: 15
          },
          {
            startDate: new Date(2016, 8, 3),
            endDate: new Date(2017, 8, 3),
            value: 15
          }
        ]
      },
      {
        source: 'source 3',
        data: [
          {
            startDate: new Date(2012, 1, 3),
            endDate: new Date(2018, 7, 3),
            value: 'Lorem Ipsum.'
          },
          {
            startDate: new Date(2015, 7, 3),
            endDate: new Date(2017, 7, 3),
            value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
          }
        ]
      }
    ];
    this.lineChartData = [
      {
        year: 2010,
        value: 150.3
      },
      {
        year: 2011,
        value: 1000.7
      },
      {
        year: 2013,
        value: 2507.9
      },
      {
        year: 2014,
        value: 2102.4
      },
      {
        year: 2015,
        value: 1300.1
      },
      {
        year: 2016,
        value: 2400.7
      }
    ];
    this.timelineGithubLink = 'https://github.com/wandri/wwww.wandrille-guesdon.com/blob/master/src/app/graph/timeline/timeline.component.ts';
    this.lineChartGithubLink = 'https://github.com/wandri/wwww.wandrille-guesdon.com/blob/master/src/app/graph/line-chart/line-chart.component.ts';
  }

}
