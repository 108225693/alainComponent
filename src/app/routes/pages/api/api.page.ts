import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.less']
})
export class ApiComponent implements OnInit {
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  mapOfCheckedId = {};
  numberOfChecked = 0;
  listOfAllData = [
    { id: '1', name: 'api-code-role', describe: '部门角色关系', entity: 'apicoderole', great: '2020-02-02 10:22:54', update: '2020-02-03 07:32:34' },
    { id: '2', name: 'api-code-role', describe: '报警字典数据', entity: 'apicoderole', great: '2020-02-02 10:22:54', update: '2020-02-03 07:32:34' },
    { id: '3', name: 'api-code-role', describe: '施工维修信息', entity: 'apicoderole', great: '2020-02-02 10:22:54', update: '2020-02-03 07:32:34' },
    { id: '4', name: 'api-code-role', describe: '登录角色权限', entity: 'apicoderole', great: '2020-02-02 10:22:54', update: '2020-02-03 07:32:34' },
    { id: '5', name: 'api-code-role', describe: '操作统计数据', entity: 'apicoderole', great: '2020-02-02 10:22:54', update: '2020-02-03 07:32:34' }
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
