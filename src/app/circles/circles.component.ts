import {AfterContentInit, Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-circles',
  templateUrl: './circles.component.html',
  styleUrls: ['./circles.component.scss']
})
export class CirclesComponent implements OnInit, AfterContentInit {

  data: number[] = [ 40, 80, 120, 160];
  attr: object = {
    cy: 60,
    cx: (d , i ) => i * 100 + 30,
    r: (r) => Math.sqrt(r)
  };

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    const svg = d3.select('.circle');
    const circle = svg.selectAll('circle').data(this.data);
    const circleEnter = circle.enter().append('circle');

    console.log(Object.values(this.attr));
    forEach(this.attr, )

  }

}
