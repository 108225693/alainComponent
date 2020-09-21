import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-param',
  templateUrl: './param.page.html',
  styleUrls: ['./param.page.less']
})
export class ParamComponent implements OnInit {
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  mapOfCheckedId = {};
  numberOfChecked = 0;
  listOfAllData = [
    { id: '1', name: '验证码开关', param: 'GUNS-KAPTCHADH-ICO', value: 'gunskapico', remarks: '验证码接口属性', great: '2020-02-03 10:11:00', update: '2020-02-03 12:10:00' },
    { id: '2', name: '验证码开关', param: 'GUNS-KAPTCHADH-ICO', value: 'gunskapico', remarks: '验证码接口属性', great: '2020-02-03 10:11:00', update: '2020-02-03 12:10:00' },
    { id: '3', name: '验证码开关', param: 'GUNS-KAPTCHADH-ICO', value: 'gunskapico', remarks: '验证码接口属性', great: '2020-02-03 10:11:00', update: '2020-02-03 12:10:00' },
    { id: '4', name: '验证码开关', param: 'GUNS-KAPTCHADH-ICO', value: 'gunskapico', remarks: '验证码接口属性', great: '2020-02-03 10:11:00', update: '2020-02-03 12:10:00' },
    { id: '5', name: '验证码开关', param: 'GUNS-KAPTCHADH-ICO', value: 'gunskapico', remarks: '验证码接口属性', great: '2020-02-03 10:11:00', update: '2020-02-03 12:10:00' }
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
