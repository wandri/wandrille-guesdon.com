import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, OnChanges} from '@angular/core';
import {select} from 'd3-selection';
import {scaleBand, scaleLinear} from 'd3-scale';
import {Axis, axisBottom, AxisScale} from 'd3-axis';
import {max, min, range} from 'd3-array';
import {ScaleBand, ScaleLinear, Selection} from 'd3';
import {SvgSelection} from '../../svg.selection';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'(window:resize)': 'onResize()'}
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  data = input<LineChartDatum[]>([]);
  unit = input('');

  private container = inject(ElementRef);
  private svg: Selection<Element, unknown, null, undefined> | null = null;
  private contentContainer: SvgSelection | null = null;
  private scaleX: ScaleBand<string> = scaleBand();
  private scaleY: ScaleLinear<number, number> = scaleLinear();
  private xAxis: Axis<string> | null = null;
  private width = 0;
  private height = 0;

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
    const wrapper = select(this.container.nativeElement.querySelector('.line-chart'));
    const widthWrapper = this.container.nativeElement.querySelector('.line-chart').clientWidth;
    const heightWrapper = 250;
    const margin = {top: 10, right: 40, bottom: 40, left: 40};

    this.width = widthWrapper - margin.left - margin.right;
    this.height = heightWrapper - margin.top - margin.bottom;

    this.svg = wrapper.append<Element>('svg')
      .attr('width', widthWrapper + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom);

    const svgContainer = this.svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    this.contentContainer = svgContainer.append<SVGSVGElement>('g')
      .attr('class', 'content-container');
  }

  private generateGraphFromData() {
    const backgroundPlan: SvgSelection = this.contentContainer!.append<SVGSVGElement>('g').attr('class', 'background-plan');
    const firstPlan: SvgSelection = this.contentContainer!.append<SVGSVGElement>('g').attr('class', 'first-plan');
    const data = this.data();

    this.scaleX = this.generateXScale(data);
    this.generateCustomXAxis(backgroundPlan, this.scaleX);
    this.scaleY = this.generateYScale(data);
    this.generateGradient(backgroundPlan);
    this.generatePolygonBackground(backgroundPlan, data);
    this.generatePoints(backgroundPlan, data);
    this.generateInvisiblePointsForTip(firstPlan, data);
    this.generateLines(backgroundPlan, data);
    this.generateTipOnMouseOver(backgroundPlan, firstPlan);
  }

  private generatePoints(element: SvgSelection, data: LineChartDatum[]) {
    element.selectAll('.point').data(data).enter().append('circle')
      .attr('class', 'point')
      .attr('cx', d => this.getXPosition(d))
      .attr('cy', d => this.getYPosition(d))
      .attr('r', 1.8).attr('fill', '#1C7C8B');
  }

  private generateInvisiblePointsForTip(element: SvgSelection, data: LineChartDatum[]) {
    element.selectAll('.invisible-point').data(data).enter().append('circle')
      .attr('class', 'invisible-point')
      .attr('cx', d => this.getXPosition(d))
      .attr('cy', d => this.getYPosition(d))
      .attr('r', 13).attr('fill', 'transparent');
  }

  private generatePolygonBackground(mainContent: SvgSelection, data: LineChartDatum[]) {
    let points = this.getXPosition(data[0]) + ' ' + this.height;
    for (const datum of data) {
      points += ',' + this.getXPosition(datum) + ' ' + this.getYPosition(datum);
    }
    points += ',' + this.getXPosition(data[data.length - 1]) + ' ' + this.height;
    mainContent.append('polygon').attr('points', points).attr('fill', 'url(#gradient)');
  }

  private getXPosition(d: LineChartDatum) {
    return (this.scaleX(d.year?.toString()) || 0) + this.scaleX.bandwidth() / 2;
  }

  private generateXScale(data: LineChartDatum[]): ScaleBand<string> {
    const minYear = min(data, datum => datum.year) || 0;
    const maxYear = max(data, datum => datum.year) || 0;
    const years = range(minYear, maxYear + 1, 1).map(year => year.toString());
    return scaleBand().domain(years).range([0, this.width]);
  }

  private generateYScale(data: LineChartDatum[]): ScaleLinear<number, number> {
    const minValue = min(data, datum => datum.value) || 0;
    const maxValue = max(data, datum => datum.value) || 0;
    return scaleLinear().domain([minValue * 0.9, maxValue * 1.1]).range([0, this.height]);
  }

  private generateCustomXAxis(element: SvgSelection, scaleX: AxisScale<string>) {
    this.xAxis = axisBottom(scaleX);
    const xAxisElement = element.append<SVGSVGElement>('g')
      .attr('class', 'scaleX axis')
      .attr('transform', `translate(0,${this.height})`);
    xAxisElement.call(this.xAxis);
    this.customXAxis(xAxisElement);
  }

  private generateGradient(mainContent: SvgSelection) {
    const gradient = mainContent.append('defs').append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    gradient.append('stop').attr('class', 'start').attr('offset', '0%')
      .attr('stop-color', '#4EC9CD').attr('stop-opacity', 0.5);
    gradient.append('stop').attr('class', 'end').attr('offset', '100%')
      .attr('stop-color', '#EEFDFF').attr('stop-opacity', 0.5);
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

  private generateLines(element: SvgSelection, data: LineChartDatum[]) {
    for (let i = 0; i < data.length - 1; i++) {
      element.append('line')
        .attr('x1', this.getXPosition(data[i])).attr('y1', this.getYPosition(data[i]))
        .attr('x2', this.getXPosition(data[i + 1])).attr('y2', this.getYPosition(data[i + 1]))
        .attr('stroke-width', 1).attr('stroke', '#1C7C8B');
    }
  }

  private getYPosition(datum: LineChartDatum) {
    return this.height - this.scaleY(datum.value);
  }

  private generateTipOnMouseOver(backgroundPlan: SvgSelection, firstPlan: SvgSelection) {
    const self = this;
    firstPlan.selectAll('.invisible-point')
      .on('mouseover', function (event: MouseEvent) {
        select(this as SVGCircleElement).style('cursor', 'pointer');
        self.generateTip(backgroundPlan, event);
      })
      .on('mouseout', () => backgroundPlan.selectAll('.tooltip').remove());
  }

  private generateTip(backgroundPlan: SvgSelection, event: MouseEvent) {
    const data = (event.target as SVGCircleElement & {'__data__': LineChartDatum})['__data__'];
    const formattedValue = `${Intl.NumberFormat('fr-FR', {minimumFractionDigits: 0}).format(data.value)} ${this.unit()}`;
    const padding = 15;
    const tooltipWidth = formattedValue.length * 6.5 + padding * 2;
    const xPosition = this.getXPosition(data);
    const yPosition = this.getYPosition(data);
    const rectangleHeight = 40;

    const tooltipContainer = backgroundPlan.append('g')
      .attr('class', 'tooltip')
      .attr('transform', `translate(${xPosition},${yPosition})`);

    tooltipContainer.append('rect')
      .attr('transform', 'translate(1, 1)')
      .attr('x', -tooltipWidth / 2)
      .attr('y', yPosition < this.height / 2 ? 15 : -15 - rectangleHeight)
      .attr('width', tooltipWidth + 2).attr('height', rectangleHeight + 2)
      .attr('fill', '#008794').attr('opacity', '0.13').attr('stroke-width', 1);

    tooltipContainer.append('rect')
      .attr('x', -tooltipWidth / 2)
      .attr('y', yPosition < this.height / 2 ? 15 : -15 - rectangleHeight)
      .attr('width', tooltipWidth).attr('height', rectangleHeight)
      .attr('fill', '#FFFFFF').attr('stroke', '#DFDFDF').attr('stroke-width', 1);

    tooltipContainer.append('text')
      .attr('x', -tooltipWidth / 2 + padding)
      .attr('y', yPosition < this.height / 2 ? 15 + 25 : -15 - rectangleHeight + 25)
      .attr('font-size', 14).text(formattedValue);
  }

  private reloadChart() {
    const wrapper = select(this.container.nativeElement.querySelector('.line-chart'));
    wrapper.select('svg').remove();
    this.initializeSvg();
    this.generateGraphFromData();
  }
}

export interface LineChartDatum {
  year: number;
  value: number;
}
