import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.less']
})
export class DataComponent implements OnInit {
  number = 0;
  tabs = [
    { name: '首页', disabled: false },
    { name: '数据源', disabled: true },
    { name: 'SQL监控', disabled: true },
    { name: 'SQL防火墙', disabled: true },
    { name: 'Web应用', disabled: true },
    { name: 'URI应用', disabled: true },
    { name: 'Session监控', disabled: true },
    { name: 'Spring监控', disabled: true },
    { name: 'JSON API', disabled: true }
  ];
  constructor() { }

  ngOnInit() {

  }

}
