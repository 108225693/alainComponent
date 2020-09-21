import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-online',
  templateUrl: './online.page.html',
  styleUrls: ['./online.page.less']
})
export class OnlineComponent implements OnInit {
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  mapOfCheckedId = {};
  numberOfChecked = 0;
  listOfAllData = [
    { id: '1', number: '11622', user: 'admin', section: '研发部', ip: '43.242.111.62', browser: 'ie11', os: 'win10', address: '湖北武汉', date: '2020-02-01' },
    { id: '2', number: '11623', user: 'sanshang', section: '测试部', ip: '43.242.111.67', browser: 'chrome', os: 'win7', address: '湖北武汉', date: '2020-02-01' },
    { id: '3', number: '11624', user: '测试工长', section: '产品部', ip: '43.242.111.41', browser: 'ie11', os: 'win10', address: '湖北武汉', date: '2020-02-01' },
    { id: '4', number: '11625', user: '测试主任', section: '行政部', ip: '43.242.111.3', browser: 'firefox', os: 'win10', address: '湖北武汉', date: '2020-02-01' },
    { id: '5', number: '11626', user: '测试段长', section: '人事部', ip: '43.242.111.3', browser: '360', os: 'win7', address: '湖北武汉', date: '2020-02-01' }
  ];

  constructor() { }

  ngOnInit() {

  }


  currentPageDataChange($event): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  operateData(): void {
    this.isOperating = true;
    setTimeout(() => {
      this.listOfAllData.forEach(item => (this.mapOfCheckedId[item.id] = false));
      this.refreshStatus();
      this.isOperating = false;
    }, 1000);
  }

}
