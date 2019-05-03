import {AfterContentInit, Component, OnInit} from '@angular/core';

import * as d3 from 'd3';


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
    let width = 420;
    const barHeight = 20;
    let x = d3.scaleLinear()
      .range([0, width]);

    const chartv = d3.select('.chart-svg')
      .attr('width', width);

    d3.tsv('assets/files/data.tsv', type).then((data) => {
      x.domain([0, d3.max(data, (d) => d.value)]);

      chartv.attr('height', barHeight * data.length);

      const bar = chartv.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', (d, i) => 'translate(0,' + i * barHeight + ')');

      bar.append('rect')
        .attr('width', (d) => {
          console.log(d);
          return x(d.value);
        })
        .attr('height', barHeight - 1);

      bar.append('text')
        .attr('x', (d) => x(d.value) - 3)
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text((d) => d.value);

    });
    function type(d) {
      d.value = +d.value;
      return d;
    }

    x = d3.scaleLinear()
      .domain([0, d3.max(this.data)])
      .range([0, width]);

    d3.select('.chart')
      .selectAll('div')
        .data([30, 86, 168, 281, 303, 365])
      .enter()
      .append('div')
        .style('width', (d) => x(d) + 'px')
        .text((d) => d)
        .attr('class', 'bar');

    width = 960;
    let height = 500;

    const y = d3.scaleLinear()
      .range([height, 0]);

    const chart = d3.select('.chart-v')
      .attr('width', width)
      .attr('height', height);

    d3.tsv('assets/files/data.tsv', type).then((data) => {
      const barWidth = width / data.length;

      y.domain([0, d3.max(data, (d) => d.value)]);

      const bar = chart.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', (d, i) => 'translate(' + i * barWidth + ', 0)');

      bar.append('rect')
        .attr('y', (d) => {
          return y(d.value);
        })
        .attr('height', (d => height - y(d.value)))
        .attr('width', barWidth - 1);

      bar.append('text')
        .attr('y', (d) => y(d.value) + 3)
        .attr('x', barWidth / 2)
        .attr('dy', '.75em')
        .text((d) => d.value);

    });

    const margin = { top: 20, right: 30, bottom: 30, left: 40};
    width = width - margin.left - margin.right;
    height = height - margin.left - margin.right;


    const x2 = d3.scaleBand().rangeRound([0, width]).padding(.1);
    const y2 = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x2);
    const yAxis = d3.axisLeft(y2).ticks(10, '%');

    const charto = d3.select('.chart-o')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    d3.tsv('assets/files/data.tsv', type).then((data) => {
      const barWidth = width / data.length;
      x2.domain(data.map(d => d.name));
      y2.domain([0, d3.max(data, (d) => d.value)]);

      charto.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis)

      charto.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('fill', 'currentColor')
          .attr('y', 6)
          .attr('dy', '.71em')
          .attr('width', 15)
          .style('text-anchor', 'end')
          .text('Frequency');

      // const bar = charto.selectAll('g')
      //   .data(data)
      //   .enter().append('g')
      //   .attr('transform', (d, i) => 'translate(' + x2(d.name) + ', 0)');

      charto.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x2(d.name))
        .attr('y', (d) => y2(d.value))
        .attr('height', (d => height - y2(d.value)))
        .attr('width', x2.bandwidth);

      // bar.append('text')
      //   .attr('y', (d) => y2(d.value) + 3)
      //   .attr('x', barWidth / 2)
      //   .attr('dy', '.75em')
      //   .text((d) => d.value);

    });
  }
}
