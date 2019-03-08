/* tslint:disable:space-before-function-paren */
import { Component, ElementRef, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { Axis, axisBottom, AxisScale } from 'd3-axis';
import { max, min, range } from 'd3-array';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input()
  data: LineChartData[] = [];

  @Input()
  unit: string;

  private svg;
  private contentContainer;
  private xAxis: Axis<string>;
  private scaleX: AxisScale<string>;
  private scaleY: AxisScale<number>;
  private width: number;
  private height: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.reloadChart();
  }

  constructor(private container: ElementRef) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.initializeSvg();
      this.generateGraphFromData();
    });
  }

  ngOnChanges(): void {
    if ( this.contentContainer ) {
      this.generateGraphFromData();
    }
  }

  private initializeSvg() {
    const wrapper = select(this.container.nativeElement.querySelector('.line-chart'));

    const widthWrapper = this.container.nativeElement.querySelector('.line-chart').clientWidth;
    const heightWrapper = 250;
    const margin = {
      top: 10,
      right: 40,
      bottom: 40,
      left: 40
    };

    this.width = widthWrapper - margin.left - margin.right;
    this.height = heightWrapper - margin.top - margin.bottom;

    this.svg = wrapper.append('svg')
      .attr('width', widthWrapper + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom);

    const svgContainer = this.svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    this.contentContainer = svgContainer.append('g')
      .attr('class', 'content-container');
  }

  private generateGraphFromData() {

    const backgroundPlan = this.contentContainer.append('g').attr('class', 'background-plan');
    const firstPlan = this.contentContainer.append('g').attr('class', 'first-plan');
    this.scaleX = this.generateXScale();

    this.generateCustomXAxis(backgroundPlan, this.scaleX);

    this.scaleY = this.generateYScale();

    this.generateGradient(backgroundPlan);

    this.generatePolygonBackground(backgroundPlan);

    this.generatePoints(backgroundPlan, this.data);

    this.generateInvisiblePointsForTip(firstPlan, this.data);

    this.generateLines(backgroundPlan, this.data);

    this.generateTipOnMouseOver(backgroundPlan, firstPlan);
  }

  private generatePoints(element, data: LineChartData[]) {
    element
      .selectAll('.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', d => this.getXPosition(d))
      .attr('cy', d => this.getYPosition(d))
      .attr('r', 1.8)
      .attr('fill', '#1C7C8B');
  }

  private generateInvisiblePointsForTip(element, data: LineChartData[]) {
    element
      .selectAll('.invisible-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'invisible-point')
      .attr('cx', d => this.getXPosition(d))
      .attr('cy', d => this.getYPosition(d))
      .attr('r', 13)
      .attr('fill', 'transparent');
  }

  private generatePolygonBackground(mainContent) {
    const pointCornerLeftBottom = this.getXPosition(this.data[0]) + ' ' + this.height;
    let points: string = pointCornerLeftBottom;
    for ( const datum of this.data ) {
      points += ',' + this.getXPosition(datum) + ' ' + this.getYPosition(datum);
    }
    const pointCornerRightBottom = this.getXPosition(this.data[this.data.length - 1]) + ' ' + this.height;
    points += ',' + pointCornerRightBottom;
    mainContent.append('polygon')
      .attr('points', points)
      .attr('fill', 'url(#gradient)');
  }

  private getXPosition(d) {
    return this.scaleX(d.year.toString()) + this.scaleX.bandwidth() / 2;
  }

  private generateXScale() {
    const minYear = min(this.data, datum => datum.year);
    const maxYear = max(this.data, datum => datum.year);

    const years: string[] = range(minYear, maxYear + 1, 1).map(year => year.toString());

    return scaleBand()
      .domain(years)
      .range([0, this.width]);
  }

  private generateYScale() {
    const minValue = min(this.data, datum => datum.value);
    const maxValue = max(this.data, datum => datum.value);

    return scaleLinear()
      .domain([minValue * 0.9, maxValue * 1.1])
      .range([0, this.height]);
  }

  private generateCustomXAxis(element, scaleX: AxisScale<string>) {
    this.xAxis = axisBottom(scaleX);

    const xAxisElement = element.append('g')
      .attr('class', 'scaleX axis')
      .attr('transform', `translate(0,${this.height})`);
    xAxisElement.call(this.xAxis);

    this.customXAxis(xAxisElement);
  }

  private generateGradient(mainContent) {
    const defs = mainContent.append('defs');

    const gradient = defs.append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    gradient.append('stop')
      .attr('class', 'start')
      .attr('offset', '0%')
      .attr('stop-color', '#4EC9CD')
      .attr('stop-opacity', 0.5);

    gradient.append('stop')
      .attr('class', 'end')
      .attr('offset', '100%')
      .attr('stop-color', '#EEFDFF')
      .attr('stop-opacity', 0.5);
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

  private generateLines(element, data: LineChartData[]) {
    for ( let i = 0; i < this.data.length - 1; i++ ) {
      element.append('line')
        .attr('x1', this.getXPosition(data[i]))
        .attr('y1', this.getYPosition(data[i]))
        .attr('x2', this.getXPosition(data[i + 1]))
        .attr('y2', this.getYPosition(data[i + 1]))
        .attr('stroke-width', 1)
        .attr('stroke', '#1C7C8B');
    }
  }

  private getYPosition(datum: LineChartData) {
    return this.height - this.scaleY(datum.value);
  }

  private generateTipOnMouseOver(backgroundPlan, firstPlan) {
    const values = firstPlan.selectAll('.invisible-point');
    const self = this;
    values
      .on('mouseover', function (d) {
        select(this)
          .style('cursor', 'pointer');
        self.generateTip(backgroundPlan, d);
      })
      .on('mouseout', () => {
        backgroundPlan.selectAll('.tooltip')
          .remove();
      });
  }

  private generateTip(element: any, datum: LineChartData) {
    const value = datum.value;
    const padding = 15;
    const formatedValue = `${Intl.NumberFormat('fr-FR', {minimumFractionDigits: 0}).format(value)} ${this.unit}`;
    const tooltipWidth = formatedValue.length * 6.5 + padding * 2;
    const tooltipContainer = element
      .append('g')
      .attr('class', 'tooltip')
      .attr('transform', `translate(${this.getXPosition(datum)},${this.getYPosition(datum)})`);

    const rectangleHeight = 40;
    tooltipContainer.append('rect')
      .attr('transform', `translate(1, 1)`)
      .attr('x', -tooltipWidth / 2)
      .attr('y', this.getYPosition(datum) < this.height / 2 ? 15 : -15 - rectangleHeight)
      .attr('width', tooltipWidth + 2)
      .attr('height', rectangleHeight + 2)
      .attr('fill', '#008794')
      .attr('opacity', '0.13')
      .attr('stroke-width', 1);
    tooltipContainer.append('rect')
      .attr('x', -tooltipWidth / 2)
      .attr('y', this.getYPosition(datum) < this.height / 2 ? 15 : -15 - rectangleHeight)
      .attr('width', tooltipWidth)
      .attr('height', rectangleHeight)
      .attr('fill', '#FFFFFF')
      .attr('stroke', '#DFDFDF')
      .attr('stroke-width', 1);

    tooltipContainer.append('text')
      .attr('x', -tooltipWidth / 2 + padding)
      .attr('y', this.getYPosition(datum) < this.height / 2 ? 15 + 25 : -15 - rectangleHeight + 25)
      .attr('font-size', 14)
      .text(formatedValue);

  }

  private reloadChart() {
    const wrapper = select(this.container.nativeElement.querySelector('.line-chart'));
    wrapper.select('svg').remove();
    this.initializeSvg();
    this.generateGraphFromData();
  }
}

export interface LineChartData {
  year: number;
  value: number;
}
