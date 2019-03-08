import {Component, OnInit} from '@angular/core';
import {TimelineDatum} from '../graphs/timeline/timeline.component';
import {LineChartDatum} from '../graphs/line-chart/line-chart.component';
import {HorizontalLineChartDatum} from '../graphs/horizontal-line-chart-filter/horizontal-line-chart-filter.component';

@Component({
  selector: 'app-graph-list',
  templateUrl: './graph-list.component.html',
  styleUrls: ['./graph-list.component.scss']
})
export class GraphListComponent implements OnInit {
  timelineData: TimelineDatum[] = [];
  timelineGithubLink: string = '';
  lineChartData: LineChartDatum[] = [];
  lineChartGithubLink: string = '';
  horizontalLineChartData: HorizontalLineChartDatum[] = [];
  horizontalLineChartGithubLink: string = '';

  constructor() {
  }

  ngOnInit() {
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
            value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut ' +
              'labore et dolore magna aliquyam erat, sed diam voluptua.'
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
    this.horizontalLineChartData = [
      {
        value: 2190327,
        label: 'Paris'
      },
      {
        value: 862211,
        label: 'Marseille'
      },
      {
        value: 515695,
        label: 'Lyon'
      },
      {
        value: 475438,
        label: 'Toulouse'
      },
      {
        value: 342637,
        label: 'Nice'
      },
      {
        value: 306694,
        label: 'Nantes'
      },
      {
        value: 281613,
        label: 'Montpellier'
      },
      {
        value: 279284,
        label: 'Strasbourg'
      },
      {
        value: 252040,
        label: 'Bordeaux'
      },
      {
        value: 232440,
        label: 'Lille'
      }
    ];
    this.timelineGithubLink = 'https://github.com/wandri/wandrille-guesdon.com/blob/master/src/app/graph/' +
      'timeline/timeline.component.ts';
    this.lineChartGithubLink = 'https://github.com/wandri/wandrille-guesdon.com/blob/master/src/app/graph/' +
      'line-chart/line-chart.component.ts';
    this.horizontalLineChartGithubLink = 'https://github.com/wandri/wandrille-guesdon.com/blob/master/src/app/graph/' +
      'horitontal-line-chart-filter/horitontal-line-chart-filter.component.ts';
  }

}
