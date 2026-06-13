import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, OnChanges} from '@angular/core';
import {Axis, axisBottom, AxisScale, max, min, scaleTime, select, Selection, timeFormatDefaultLocale, zoom} from 'd3';
import {SvgSelection} from '../../svg.selection';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'(window:resize)': 'onResize()'}
})
export class TimelineComponent implements AfterViewInit, OnChanges {
  data = input<TimelineDatum[]>([]);

  private container = inject(ElementRef);
  private svg: Selection<Element, unknown, null, undefined> | null = null;
  private contentContainer: SvgSelection | null = null;
  private contentContainerBackground: SvgSelection | null = null;
  private xAxis: Axis<Date>;
  private scaleX: AxisScale<Date>;
  private groupWidth = 100;
  private textSize = 10;
  private height = 0;
  private width = 0;

  constructor() {
    timeFormatDefaultLocale({
      dateTime: '%A, le %e %B %Y, %X',
      date: '%d/%m/%Y',
      time: '%H:%M:%S',
      periods: ['AM', 'PM'],
      days: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
      shortDays: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
      months: ['janvier', 'fÃ©vrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aoÃ»t', 'septembre', 'octobre', 'novembre', 'dÃ©cembre'],
      shortMonths: ['janv.', 'fÃ©vr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'aoÃ»t', 'sept.', 'oct.', 'nov.', 'dÃ©c.']
    });
    this.scaleX = scaleTime();
    this.xAxis = axisBottom(this.scaleX);
  }

  onResize() {
    this.reloadChart();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeSvg();
      this.generateGraphFromData();
    });
  }

  ngOnChanges() {
    if (this.contentContainer) {
      this.generateGraphFromData();
    }
  }

  private initializeSvg() {
    const wrapper = select(this.container.nativeElement.querySelector('.timeline-chart'));
    const widthWrapper = this.container.nativeElement.querySelector('.timeline-chart').clientWidth;
    const heightWrapper = 250;
    const margin = {top: 0, right: 0, bottom: 40, left: 0};

    this.width = widthWrapper - margin.left - margin.right;
    this.height = heightWrapper - margin.top - margin.bottom;

    this.scaleX = scaleTime()
      .domain([new Date(2010, 1, 1), new Date(2020, 1, 1)])
      .range([this.groupWidth, this.width]);

    this.xAxis = axisBottom(this.scaleX).ticks(this.width / 125);

    this.svg = wrapper.append<Element>('svg')
      .attr('cursor', 'pointer')
      .attr('width', widthWrapper + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom);

    const svgContainer = this.svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svgContainer.append('defs').append('clipPath')
      .attr('id', 'chart-content').append('rect')
      .attr('x', this.groupWidth).attr('y', 0)
      .attr('height', this.height).attr('width', this.width - this.groupWidth);

    svgContainer.append('line')
      .attr('clip-path', 'url(#chart-content)')
      .attr('class', 'vertical-marker now')
      .attr('y1', 0).attr('y2', this.height);

    this.contentContainerBackground = svgContainer.append<SVGSVGElement>('g');
    this.contentContainer = svgContainer.append<SVGSVGElement>('g');

    svgContainer.append('line')
      .attr('x1', this.groupWidth).attr('x2', this.groupWidth)
      .attr('y1', 0).attr('y2', this.height)
      .attr('stroke', 'black');
  }

  private generateGraphFromData() {
    const data = this.data();
    data.forEach(event => this.generatePosition(event));
    const allElements: Datum[] = data.map(datum => datum.data).reduce((agg, e) => agg.concat(e), []);

    const minDate = min(allElements, (datum: Datum) => datum.startDate) || new Date();
    const maxDate = max(allElements, (datum: Datum) => datum.endDate) || new Date();

    this.scaleX = scaleTime()
      .domain([minDate, maxDate])
      .range([this.groupWidth, this.width]);

    const groupHeight = this.height / data.length;

    this.contentContainerBackground!.selectAll('.group-background')
      .data(data).enter().append('rect')
      .attr('class', 'group-background')
      .attr('x', 0)
      .attr('y', (d: TimelineDatum, i: number) => groupHeight * i)
      .attr('height', groupHeight)
      .attr('width', this.width + this.groupWidth)
      .attr('fill', (d: TimelineDatum, i: number) => i % 2 ? '#FFFFFF' : '#F3F3F3');

    const xAxisElement = this.contentContainerBackground!.append<SVGSVGElement>('g')
      .attr('class', 'scaleX axis')
      .attr('transform', `translate(0,${this.height})`);

    xAxisElement.call(this.xAxis);
    this.customXAxis(xAxisElement);
    this.svg!.call(this.zoomD3js(xAxisElement));

    this.contentContainer!.selectAll('.group-label')
      .data(data).enter().append('text')
      .attr('class', 'group-label')
      .attr('x', 0)
      .attr('y', (d: TimelineDatum, i: number) => (groupHeight * i) + (groupHeight / 2) + 5.5)
      .attr('dx', '0.5em')
      .text((d: TimelineDatum) => d.source);

    const groupIntervalItems = this.contentContainer!.selectAll('.group-interval-item')
      .data(data).enter().append('g')
      .attr('clip-path', 'url(#chart-content)')
      .attr('class', 'item')
      .attr('transform', (d: TimelineDatum, i: number) => `translate(0, ${groupHeight * i})`)
      .selectAll('.dot').data((d: TimelineDatum) => d.data).enter();

    const intervalBarHeight = 0.8 * groupHeight;
    const intervalBarMargin = (groupHeight - intervalBarHeight) / 2;
    const intervalReductionRatio = 0.9;

    groupIntervalItems.append('rect')
      .attr('class', 'interval')
      .attr('width', (d: Datum) => Math.max(2, (this.scaleX(d.endDate) || 0) - (this.scaleX(d.startDate) || 0)))
      .attr('height', (d: Datum) => d.position !== undefined
        ? this.getReducedIntervalHeight(intervalBarHeight, d, intervalReductionRatio)
        : intervalBarHeight)
      .attr('y', (d: Datum) => {
        if (d.position !== undefined) {
          const ratio = (1 - intervalReductionRatio) / 2;
          return (d.position + ratio) * intervalBarHeight / ((d.maxPosition || 0) + 1) + intervalBarMargin;
        }
        return intervalBarMargin;
      })
      .attr('x', (d: Datum) => this.scaleX(d.startDate) || 0)
      .attr('fill', '#FECD2F');

    groupIntervalItems.append('text')
      .attr('class', 'interval-value')
      .attr('y', (d: Datum) => {
        if (d.position !== undefined) {
          const ratio = (1 - intervalReductionRatio) / 2;
          return (d.position + ratio) * intervalBarHeight / ((d.maxPosition || 0) + 1) + intervalBarMargin
            + this.getReducedIntervalHeight(intervalBarHeight, d, intervalReductionRatio) / 2 + this.textSize / 2;
        }
        return intervalBarHeight / 2 + this.textSize / 2 + intervalBarMargin;
      })
      .attr('x', (d: Datum) => (this.scaleX(d.startDate) || 0) + this.textSize)
      .text((d: Datum) => this.formatIntervalValue(d, this.scaleX));
  }

  private getIntervalValueXPosition(updatedScaleX: AxisScale<Date>, data: Datum) {
    const value = data.value ? this.formatIntervalValue(data, updatedScaleX) : null;
    const updatedScaleEndDate = updatedScaleX(data.endDate) || 0;
    const updatedScaleStartDate = updatedScaleX(data.startDate) || 0;
    if (value && updatedScaleEndDate <= this.groupWidth + (1 + value.length) * this.textSize) {
      return -1000;
    } else if (updatedScaleStartDate <= this.groupWidth) {
      return this.groupWidth + this.textSize;
    } else {
      return updatedScaleStartDate + this.textSize;
    }
  }

  private getReducedIntervalHeight(intervalBarHeight: number, d: Datum, intervalReductionRatio: number) {
    return intervalBarHeight / ((d.maxPosition || 0) + 1) * intervalReductionRatio;
  }

  zoomD3js(xAxisElement: SvgSelection) {
    return zoom().on('zoom', (event) => this.zoomFunction(event, xAxisElement));
  }

  private generatePosition(event: TimelineDatum): void {
    const data = event.data;
    let maxPosition = 0;
    let dataToReturn: Datum[] = [];

    for (let i = 0; i < data.length; i++) {
      const datum = data[i];
      const intersectData = this.intersectData(datum, data);
      if (intersectData.length > 0) {
        const positions = intersectData.map(d => d.position).filter(p => p !== undefined);
        for (let j = 0; j < positions.length + 1; j++) {
          if (positions.findIndex(p => p === j) === -1) {
            data[i] = {...datum, position: j};
            if (maxPosition < j) maxPosition = j;
            dataToReturn.push(data[i]);
            break;
          }
        }
      } else {
        dataToReturn.push(datum);
      }
    }
    event.data = dataToReturn.map(datum => ({...datum, maxPosition}));
  }

  private intersectData(referenceDatum: Datum, data: Datum[]): Datum[] {
    return data.filter(datum =>
      datum !== referenceDatum &&
      datum.endDate > referenceDatum.startDate &&
      datum.startDate < referenceDatum.endDate
    );
  }

  private zoomFunction(event: {transform: {rescaleX: (s: AxisScale<Date>) => AxisScale<Date>}}, xAxisElement: SvgSelection) {
    const updatedScaleX = event.transform.rescaleX(this.scaleX);
    xAxisElement.call(this.xAxis.scale(updatedScaleX));
    this.customXAxis(xAxisElement);

    this.contentContainer!.selectAll<SVGSVGElement, Datum>('rect.interval')
      .attr('x', (d: Datum) => updatedScaleX(d.startDate) || 0)
      .attr('width', (d: Datum) => Math.max(2, (updatedScaleX(d.endDate) || 0) - (updatedScaleX(d.startDate) || 0)));

    this.contentContainer!.selectAll<SVGSVGElement, Datum>('text.interval-value')
      .attr('x', (d: Datum) => this.getIntervalValueXPosition(updatedScaleX, d))
      .text((d: Datum) => this.formatIntervalValue(d, updatedScaleX));
  }

  private customXAxis(xAxisElement: SvgSelection) {
    xAxisElement.select('.domain').remove();
    xAxisElement.selectAll('.tick line')
      .attr('stroke', '#c5c5c5').attr('stroke-dasharray', '5, 3')
      .attr('stroke-width', 1).attr('y1', -this.height);
    xAxisElement.selectAll('.tick text')
      .attr('class', 'fill-text-light').attr('color', '#7a7a7a')
      .attr('y', 20).attr('font-size', 12);
  }

  private formatIntervalValue(data: Datum, scaleX: AxisScale<Date>) {
    const value = data.value ? data.value.toString() : null;
    const intervalWidth = Math.max(2, (scaleX(data.endDate) || 0) - (scaleX(data.startDate) || 0));
    if (intervalWidth < 30) return '';
    if (value && value.length * this.textSize + 20 >= intervalWidth) {
      const size = Math.floor(value.length * this.textSize + 3 * this.textSize - intervalWidth);
      return value.slice(0, value.length - size / this.textSize) + '...';
    }
    return value;
  }

  private reloadChart() {
    const wrapper = select(this.container.nativeElement.querySelector('.timeline-chart'));
    wrapper.select('svg').remove();
    this.initializeSvg();
    this.generateGraphFromData();
  }
}

export interface Datum {
  startDate: Date;
  endDate: Date;
  value: number | string | Date | boolean;
  position?: number;
  maxPosition?: number;
}

export interface TimelineDatum {
  source: string;
  data: Datum[];
}
