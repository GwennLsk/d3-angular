import {AfterContentInit, AfterViewChecked, Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterContentInit {

  data: number[] = [30, 86, 168, 281, 303, 365];
  constructor() {
  }

  ngOnInit() {

  }

  ngAfterContentInit(): void {
    const width = 420;
    const barHeight = 20;
    const x = d3.scaleLinear()
      .domain([0, d3.max(this.data)])
      .range([0, width]);

    const chart = d3.select('.chart-svg')
      .attr('width', width)
      .attr('height', barHeight * this.data.length);

    const bar = chart.selectAll('g')
        .data(this.data)
      .enter().append('g')
      .attr('transform', (d, i) => {
        return 'translate(0,' + i * barHeight + ')';
      });

    bar.append('rect')
      .attr('width', x)
      .attr('height', barHeight - 1);

    bar.append('text')
      .attr('x', (d) => x(d) - 3 )
      .attr('y', barHeight/2)
      .attr('dy', '.35em')
      .text((d) => d);

    d3.select('.chart')
      .selectAll('div')
        .data([30, 86, 168, 281, 303, 365])
      .enter()
      .append('div')
        .style('width', (d) => x(d) + 'px')
        .text((d) => d)
        .attr('class', 'bar');
  }
}

import * as d3 from 'd3';
