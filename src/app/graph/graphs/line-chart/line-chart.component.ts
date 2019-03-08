/* tslint:disable:space-before-function-paren */
import {Component, ElementRef, HostListener, Input, OnChanges, OnInit} from '@angular/core';
import {select} from 'd3-selection';
import {scaleBand, scaleLinear} from 'd3-scale';
import {Axis, axisBottom, AxisScale} from 'd3-axis';
import {max, min, range} from 'd3-array';
import {ScaleBand, ScaleLinear, Selection} from "d3";
import {SvgSelection} from "../../svg.selection";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input()
  data: LineChartDatum[] = [];

  @Input()
  unit: string = '';

  private svg: Selection<Element, unknown, null, undefined> | null;
  private contentContainer: SvgSelection | null;
  private scaleX: ScaleBand<string>;
  private scaleY: ScaleLinear<number, number>;
  private xAxis: Axis<string> | null;
  private width: number = 0;
  private height: number = 0;

  constructor(private container: ElementRef) {
    this.scaleY = scaleLinear();
    this.scaleX = scaleBand();
    this.svg = null;
    this.contentContainer = null;
    this.xAxis = null;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.reloadChart();
  }

  ngOnInit() {
    setTimeout(() => {
      this.initializeSvg();
      this.generateGraphFromData();
    });
  }

  ngOnChanges(): void {
    if (this.contentContainer) {
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

  private generatePoints(element: SvgSelection, data: LineChartDatum[]) {
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

  private generateInvisiblePointsForTip(element: SvgSelection, data: LineChartDatum[]) {
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

  private generatePolygonBackground(mainContent: SvgSelection) {
    let points: string = this.getXPosition(this.data[0]) + ' ' + this.height;
    for (const datum of this.data) {
      points += ',' + this.getXPosition(datum) + ' ' + this.getYPosition(datum);
    }
    const pointCornerRightBottom = this.getXPosition(this.data[this.data.length - 1]) + ' ' + this.height;
    points += ',' + pointCornerRightBottom;
    mainContent.append('polygon')
      .attr('points', points)
      .attr('fill', 'url(#gradient)');
  }

  private getXPosition(d: LineChartDatum) {
    return (this.scaleX(d.year?.toString()) || 0) + this.scaleX.bandwidth() / 2;
  }

  private generateXScale(): ScaleBand<string> {
    const minYear = min(this.data, datum => datum.year) || 0;
    const maxYear = max(this.data, datum => datum.year) || 0;

    const years: string[] = range(minYear, maxYear + 1, 1).map(year => year.toString());

    return scaleBand()
      .domain(years)
      .range([0, this.width]);
  }

  private generateYScale(): ScaleLinear<number, number> {
    const minValue = min(this.data, datum => datum.value) || 0;
    const maxValue = max(this.data, datum => datum.value) || 0;

    return scaleLinear()
      .domain([minValue * 0.9, maxValue * 1.1])
      .range([0, this.height]);
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

  private customXAxis(xAxisElement: SvgSelection) {
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

  private generateLines(element: SvgSelection, data: LineChartDatum[]) {
    for (let i = 0; i < this.data.length - 1; i++) {
      element.append('line')
        .attr('x1', this.getXPosition(data[i]))
        .attr('y1', this.getYPosition(data[i]))
        .attr('x2', this.getXPosition(data[i + 1]))
        .attr('y2', this.getYPosition(data[i + 1]))
        .attr('stroke-width', 1)
        .attr('stroke', '#1C7C8B');
    }
  }

  private getYPosition(datum: LineChartDatum) {
    return this.height - this.scaleY(datum.value);
  }

  private generateTipOnMouseOver(backgroundPlan: SvgSelection, firstPlan: SvgSelection) {
    const values = firstPlan.selectAll('.invisible-point');
    const self = this;
    values
      .on('mouseover', function (event: MouseEvent) {
        select(this)
          .style('cursor', 'pointer');
        self.generateTip(backgroundPlan, event);
      })
      .on('mouseout', () => {
        backgroundPlan.selectAll('.tooltip')
          .remove();
      });
  }

  private generateTip(backgroundPlan: SvgSelection, event: MouseEvent) {
    // @ts-ignore
    const data: LineChartDatum = event.target['__data__'] as LineChartDatum;
    const value = data.value;
    const padding = 15;
    const formattedValue = `${Intl.NumberFormat('fr-FR', {minimumFractionDigits: 0}).format(value)} ${this.unit}`;
    const tooltipWidth = formattedValue.length * 6.5 + padding * 2;
    const xPosition = this.getXPosition(data);
    const yPosition = this.getYPosition(data);
    const tooltipContainer = backgroundPlan
      .append('g')
      .attr('class', 'tooltip')
      .attr('transform', `translate(${xPosition},${yPosition})`);

    const rectangleHeight = 40;
    tooltipContainer.append('rect')
      .attr('transform', `translate(1, 1)`)
      .attr('x', -tooltipWidth / 2)
      .attr('y', yPosition < this.height / 2 ? 15 : -15 - rectangleHeight)
      .attr('width', tooltipWidth + 2)
      .attr('height', rectangleHeight + 2)
      .attr('fill', '#008794')
      .attr('opacity', '0.13')
      .attr('stroke-width', 1);
    tooltipContainer.append('rect')
      .attr('x', -tooltipWidth / 2)
      .attr('y', yPosition < this.height / 2 ? 15 : -15 - rectangleHeight)
      .attr('width', tooltipWidth)
      .attr('height', rectangleHeight)
      .attr('fill', '#FFFFFF')
      .attr('stroke', '#DFDFDF')
      .attr('stroke-width', 1);

    tooltipContainer.append('text')
      .attr('x', -tooltipWidth / 2 + padding)
      .attr('y', yPosition < this.height / 2 ? 15 + 25 : -15 - rectangleHeight + 25)
      .attr('font-size', 14)
      .text(formattedValue);

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
