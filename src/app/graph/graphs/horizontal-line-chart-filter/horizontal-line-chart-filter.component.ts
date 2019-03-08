import {Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {select} from 'd3-selection';
import {AxisScale} from 'd3-axis';
import {scaleBand, scaleLinear} from 'd3-scale';
import {ascending, descending, max} from 'd3-array';
import {Selection} from "d3";
import {SvgSelection} from "../../svg.selection";

@Component({
  selector: 'app-horitontal-line-chart-filter',
  templateUrl: './horizontal-line-chart-filter.component.html',
  styleUrls: ['./horizontal-line-chart-filter.component.scss']
})
export class HorizontalLineChartFilterComponent implements OnInit, OnChanges {

  @Input()
  data: HorizontalLineChartDatum[] = [];

  @Input()
  filter: 'label' | 'value' = 'label';

  private svg: Selection<Element, unknown, null, undefined> | null;
  private contentContainer: SvgSelection | null;
  private scaleX: AxisScale<number>;
  private scaleY: AxisScale<string>;
  private width: number = 0;
  private height: number = 0;
  private margin = {
    top: 20,
    right: 40,
    bottom: 40,
    left: 40
  };
  private orders: { label: string[], value: string[] } = {label: [], value: []};

  constructor(private container: ElementRef) {
    this.scaleX = scaleLinear();
    this.scaleY = scaleBand();
    this.svg = null;
    this.contentContainer = null;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.reloadChart();
  }

  ngOnInit() {
    setTimeout(() => {
      this.initializeSvg();
      this.generateGraphFromData(this.data);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue !== changes.data.previousValue) {
      if (this.contentContainer) {
        this.generateGraphFromData(changes.data.currentValue);
      }
    }
    if (changes.filter && changes.filter.currentValue !== changes.filter.previousValue) {
      this.filterBy(changes.filter.currentValue);
    }
  }

  filterBy(filterLabel: 'label' | 'value') {
    this.filter = filterLabel;
    if (this.contentContainer && this.data) {
      this.scaleY = scaleBand()
        .domain(this.orders[this.filter])
        .range([0, this.height]);
      const transition = this.contentContainer.transition().duration(1000);
      transition.selectAll<SVGSVGElement, Datum>('.horitontal-line')
        .delay(100)
        .attr('transform', (d: Datum) => `translate(0,${this.scaleY(d.label)})`);
    }
  }

  private initializeSvg() {
    const component = this.container.nativeElement.querySelector('.horizontal-line-chart-filter');
    const wrapper = select(component);

    const widthWrapper = component.clientWidth;
    const heightWrapper = 250;

    this.width = widthWrapper - this.margin.left - this.margin.right;
    this.height = heightWrapper - this.margin.top - this.margin.bottom;

    this.svg = wrapper.append<Element>('svg')
      .attr('width', widthWrapper + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    const svgContainer = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    this.contentContainer = svgContainer.append<SVGSVGElement>('g')
      .attr('class', 'content-container');
  }

  private generateGraphFromData(data: HorizontalLineChartDatum[]) {

    const sortedData: Datum[] = data.sort((a, b) => descending(a.value, b.value))
      .map((datum, i) => ({
        ...datum,
        order: i + 1
      }));

    this.orders = {
      label: sortedData.concat().sort((a, b) => ascending(a.label, b.label)).map(datum => datum.label),
      value: sortedData.map(datum => datum.label)
    };

    this.height = this.data.length * 45 - this.margin.top - this.margin.bottom;

    select(this.container.nativeElement.querySelector('.horizontal-line-chart-filter'))
      .select('svg')
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    const maxValue = max(this.data, datum => datum.value) || 0;

    this.scaleX = scaleLinear()
      .domain([0, maxValue])
      .range([0, this.width]);
    this.scaleY = scaleBand()
      .domain(this.orders[this.filter])
      .range([0, this.height]);

    const lines = this.contentContainer!.selectAll('.horitontal-line')
      .data(sortedData)
      .enter()
      .append('g')
      .attr('class', 'horitontal-line')
      .attr('transform', (d: Datum) => `translate(0,${this.scaleY(d.label)})`);

    lines
      .append('line')
      .attr('stroke-width', 4)
      .attr('stroke', '#FCF8FA')
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', 8)
      .attr('y2', 8);

    lines
      .append('line')
      .attr('stroke-width', 4)
      .attr('stroke', '#FAC33F')
      .attr('x1', 0)
      .attr('x2', (d: Datum) => this.scaleX(d.value) || 0)
      .attr('y1', 8)
      .attr('y2', 8);

    lines
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', 12)
      .text((d: Datum) => `${d.order}. ${d.label}`);
  }

  private reloadChart() {
    const wrapper = select(this.container.nativeElement.querySelector('.horizontal-line-chart-filter'));
    wrapper.select('svg').remove();
    this.initializeSvg();
    this.generateGraphFromData(this.data);
  }
}

export interface HorizontalLineChartDatum {
  label: string;
  value: number;
}

interface Datum {
  label: string;
  value: number;
  order: number;
}

