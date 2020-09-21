import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.less']
})
export class CodeComponent implements OnInit {
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  mapOfCheckedId = {};
  numberOfChecked = 0;
  listOfAllData = [
    { id: '1', name: 'sys-role-dept', describe: '部门角色关系', entity: 'sysroledept', great: '2020-02-01 11:32:28', update: '2020-02-01 12:20:54' },
    { id: '2', name: 'sys-role-dept', describe: '报警字典数据', entity: 'sysroledept', great: '2020-02-01 11:32:28', update: '2020-02-01 12:20:54' },
    { id: '3', name: 'sys-role-dept', describe: '施工维修信息', entity: 'sysroledept', great: '2020-02-01 11:32:28', update: '2020-02-01 12:20:54' },
    { id: '4', name: 'sys-role-dept', describe: '登录角色权限', entity: 'sysroledept', great: '2020-02-01 11:32:28', update: '2020-02-01 12:20:54' },
    { id: '5', name: 'sys-role-dept', describe: '操作统计数据', entity: 'sysroledept', great: '2020-02-01 11:32:28', update: '2020-02-01 12:20:54' }
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
