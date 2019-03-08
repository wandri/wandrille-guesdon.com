import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges } from '@angular/core';
import * as  d3 from 'd3';
import { Axis, axisBottom, AxisScale, max, min, scaleTime, select, timeFormatDefaultLocale, zoom } from 'd3';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements AfterViewInit, OnChanges {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.reloadChart();
  }

  @Input()
  data: TimelineData[] = [];

  private svg;
  private contentContainer;
  private contentContainerBackground;
  private xAxis: Axis<Date>;
  private scaleX: AxisScale<Date>;
  private groupWidth = 100;
  private textSize = 10;
  private width: number;
  private height: number;

  constructor(private container: ElementRef) {
    timeFormatDefaultLocale(
      {
        'dateTime': '%A, le %e %B %Y, %X',
        'date': '%d/%m/%Y',
        'time': '%H:%M:%S',
        'periods': ['AM', 'PM'],
        'days': ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        'shortDays': ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
        'months': ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
        'shortMonths': ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
      }
    );
  }

  ngAfterViewInit() {
    // SetTimout is used to finish the initialization of the component.
    setTimeout(() => {
      this.initializeSvg();
      this.generateGraphFromData();
    });
  }

  ngOnChanges() {
    if ( this.contentContainer ) {
      this.generateGraphFromData();
    }
  }

  private initializeSvg() {
    const wrapper = select(this.container.nativeElement.querySelector('.timeline-chart'));

    const widthWrapper = this.container.nativeElement.querySelector('.timeline-chart').clientWidth;
    const heightWrapper = 250;
    const margin = {
      top: 0,
      right: 0,
      bottom: 40,
      left: 0
    };

    this.width = widthWrapper - margin.left - margin.right;
    this.height = heightWrapper - margin.top - margin.bottom;

    this.scaleX = scaleTime()
      .domain([new Date(2010, 1, 1), new Date(2020, 1, 1)])
      .range([this.groupWidth, this.width]);

    this.xAxis = axisBottom(this.scaleX)
      .ticks(this.width / 125);

    this.svg = wrapper.append('svg')
      .attr('cursor', 'pointer')
      .attr('width', widthWrapper + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom);

    let svgContainer = this.svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svgContainer.append('defs')
      .append('clipPath')
      .attr('id', 'chart-content')
      .append('rect')
      .attr('x', this.groupWidth)
      .attr('y', 0)
      .attr('height', this.height)
      .attr('width', this.width - this.groupWidth);

    svgContainer.append('line')
      .attr('clip-path', 'url(#chart-content)')
      .attr('class', 'vertical-marker now')
      .attr('y1', 0)
      .attr('y2', this.height);

    this.contentContainerBackground = svgContainer.append('g');

    this.contentContainer = svgContainer.append('g');

    svgContainer.append('line')
      .attr('x1', this.groupWidth)
      .attr('x2', this.groupWidth)
      .attr('y1', 0)
      .attr('y2', this.height)
      .attr('stroke', 'black');
  }

  private generateGraphFromData() {
    this.data.forEach(event => this.generatePosition(event));
    let allElements: Datum[] = this.data.reduce((agg, e) => agg.concat(e.data), []);

    let minDate = min(allElements, (datum: Datum) => datum.startDate);
    let maxDate = max(allElements, (datum: Datum) => datum.endDate);

    this.scaleX = scaleTime()
      .domain([minDate, maxDate])
      .range([this.groupWidth, this.width]);

    let groupHeight = this.height / this.data.length;

    this.contentContainerBackground.selectAll('.group-background')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'group-background')
      .attr('x', 0)
      .attr('y', (d, i) => groupHeight * i)
      .attr('height', groupHeight)
      .attr('width', this.width + this.groupWidth)
      .attr('fill', (d, i) => i % 2 ? '#FFFFFF' : '#F3F3F3');

    let xAxisElement = this.contentContainerBackground.append('g')
      .attr('class', 'scaleX axis')
      .attr('transform', `translate(0,${this.height})`);

    xAxisElement.call(this.xAxis);
    this.customXAxis(xAxisElement);

    let zoomD3js = zoom()
      .on('zoom', () => {
        return this.zoomFunction(xAxisElement);
      });

    this.svg.call(zoomD3js);

    this.contentContainer.selectAll('.group-label')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'group-label')
      .attr('x', 0)
      .attr('y', (d, i) => {
        return (groupHeight * i) + (groupHeight / 2) + 5.5;
      })
      .attr('dx', '0.5em')
      .text(d => d.source);

    let groupIntervalItems = this.contentContainer.selectAll('.group-interval-item')
      .data(this.data)
      .enter()
      .append('g')
      .attr('clip-path', 'url(#chart-content)')
      .attr('class', 'item')
      .attr('transform', (d, i) => `translate(0, ${groupHeight * i})`)
      .selectAll('.dot')
      .data(d => d.data)
      .enter();

    let intervalBarHeight = 0.8 * groupHeight;
    let intervalBarMargin = (groupHeight - intervalBarHeight) / 2;
    const intervalReductionRatio = 0.9;

    groupIntervalItems
      .append('rect')
      .attr('class', 'interval')
      .attr('width', d => Math.max(2, this.scaleX(d.endDate) - this.scaleX(d.startDate)))
      .attr('height', d => {
        if ( d.position !== undefined ) {
          return (this.getReducedIntervalHeight(intervalBarHeight, d, intervalReductionRatio));
        } else {
          return intervalBarHeight;
        }
      })
      .attr('y', d => {
        if ( d.position !== undefined ) {
          let reducedIntervalMarginRatio = (1 - intervalReductionRatio) / 2;
          return ((d.position + reducedIntervalMarginRatio) * intervalBarHeight / (d.maxPosition + 1) + intervalBarMargin);
        } else {
          return intervalBarMargin;
        }
      })
      .attr('x', d => this.scaleX(d.startDate))
      .attr('fill', '#FECD2F');

    groupIntervalItems
      .append('text')
      .attr('class', 'interval-value')
      .attr('y', d => {
        if ( d.position !== undefined ) {
          let reducedIntervalMarginRatio = (1 - intervalReductionRatio) / 2;
          return ((d.position + reducedIntervalMarginRatio) * intervalBarHeight / (d.maxPosition + 1) + intervalBarMargin)
            + this.getReducedIntervalHeight(intervalBarHeight, d, intervalReductionRatio) / 2 + this.textSize / 2;
        } else {
          return intervalBarHeight / 2 + this.textSize / 2 + intervalBarMargin;
        }
      })
      .attr('x', d => this.scaleX(d.startDate) + this.textSize)
      .text(d => this.formatIntervalValue(d, this.scaleX));
  }

  private getIntervalValueXPosition(updatedScaleX: AxisScale<Date>, data: Datum) {
    // TODO : Optimize for long text and not just Integer.
    let value = data.value ? this.formatIntervalValue(data, updatedScaleX) : null;
    if ( updatedScaleX(data.endDate) <= this.groupWidth + (1 + value.length) * this.textSize ) {
      return -1000;
    } else if ( updatedScaleX(data.startDate) <= this.groupWidth ) {
      return this.groupWidth + this.textSize;
    } else {
      return updatedScaleX(data.startDate) + this.textSize;
    }
  }

  private getReducedIntervalHeight(intervalBarHeight: number, d, intervalReductionRatio: number) {
    return intervalBarHeight / (d.maxPosition + 1) * intervalReductionRatio;
  }

  private generatePosition(event) {
    let dataToReturn = [];
    let data = event.data;
    let maxPosition = 0;

    for ( let i = 0; i < data.length; i++ ) {
      const datum = data[i];
      let intersectData = this.intersectData(datum, data);
      if ( intersectData.length > 0 ) {
        const positions = intersectData.map(intersectDatum => intersectDatum.position).filter(position => position !== undefined);
        for ( let j = 0; j < positions.length + 1; j++ ) {
          let isNumberNotInPositions = positions.findIndex(position => position === j) === -1;
          if ( isNumberNotInPositions ) {
            data[i] = {...datum, position: j};
            if ( maxPosition < j ) {
              maxPosition = j;
            }
            dataToReturn.push(data[i]);
            break;
          }
        }
      } else {
        dataToReturn.push(datum);
      }
    }
    dataToReturn = dataToReturn.map(datum => ({
      ...datum,
      maxPosition: maxPosition
    }));
    event.data = dataToReturn;
  }

  private intersectData(referenceDatum: Datum, data: Datum[]): Datum[] {

    let startDate = referenceDatum.startDate;
    let endDate = referenceDatum.endDate;

    let intersectedData = [];

    data.forEach(datum => {
      if ( datum != referenceDatum && datum.endDate > startDate && datum.startDate < endDate ) {
        intersectedData.push(datum);
      }
    });

    return intersectedData;
  }

  private zoomFunction(xAxisElement) {
    // TODO : import only event so we can remove the full import of d3. (https://github.com/d3/d3-selection#event)
    const updatedScaleX: AxisScale<Date> = d3.event.transform.rescaleX(this.scaleX);

    xAxisElement.call(this.xAxis.scale(updatedScaleX));
    this.customXAxis(xAxisElement);

    this.contentContainer.selectAll('rect.interval')
      .attr('x', d => updatedScaleX(d.startDate))
      .attr('width', d => Math.max(2, updatedScaleX(d.endDate) - updatedScaleX(d.startDate)));

    this.contentContainer.selectAll('text.interval-value')
      .attr('x', d => this.getIntervalValueXPosition(updatedScaleX, d))
      .text(d => this.formatIntervalValue(d, updatedScaleX));
  }

  private customXAxis(xAxisElement) {
    xAxisElement.select('.domain').remove();
    xAxisElement.selectAll('.tick line')
      .attr('stroke', '#c5c5c5')
      .attr('stroke-dasharray', '5, 3')
      .attr('stroke-width', 1)
      .attr('y1', -this.height);
    xAxisElement.selectAll('.tick text')
      .attr('class', 'fill-text-light')
      .attr('color', '#7a7a7a')
      .attr('y', 20)
      .attr('font-size', 12);
  }

  private formatIntervalValue(data: Datum, scaleX: AxisScale<Date>) {
    let value = data.value ? data.value.toString() : null;
    let intervalWidth = Math.max(2, scaleX(data.endDate) - scaleX(data.startDate));
    if ( intervalWidth < 30 ) {
      return '';
    } else if ( value.length * this.textSize + 20 >= intervalWidth ) {
      let characterToRemoveNumber = value.length - Math.floor(value.length * this.textSize + 3 * this.textSize - intervalWidth) / this.textSize;
      return value.slice(0, characterToRemoveNumber) + '...';
    } else {
      return value;
    }
  }

  private reloadChart() {
    const wrapper = select(this.container.nativeElement.querySelector('.timeline-chart'));
    wrapper.select('svg').remove();
    this.initializeSvg();
    this.generateGraphFromData();
  }
}

interface Datum {
  startDate: Date,
  endDate: Date,
  value: number | string | Date | boolean,
  position?: number;
  maxPosition?: number;
}

export interface TimelineData {
  source: string,
  data: Datum[]
}
