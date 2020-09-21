import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-journaloperate',
  templateUrl: './journalOperate.page.html',
  styleUrls: ['./journalOperate.page.less']
})
export class JournalOperateComponent implements OnInit {
  permission = false;
  forbidden = false;
  condition: any = {};
  tempData: any = {};
  delModalVisible = false;
  lockHeadScroll = { 'x': '2000px', 'y': window.innerHeight - 330 + 'px' };
  // table
  allChecked = false;
  indeterminate = false;
  displayData = [];
  listOfAllData = [];
  limitValue = '10';
  selectedValue = '10';
  pageTotal = '';
  rowTotalTable = 0;
  pageIndexTable = 1;
  pageValue = 1;

  constructor(
    public http: HttpClient,
    public msg: NzMessageService
  ) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.pageIndexTable = this.pageValue;
    this.listOfAllData = [];
    this.http.get(environment.apiBase + '/system/sysLog/query?limit=' + this.limitValue + '&page=' + this.pageValue).subscribe((res: any) => {
      if (res.code === 0) {
        this.permission = true;
        this.listOfAllData = res.data;
        this.pageTotal = res.count;
        this.rowTotalTable = res.count;
      } else {
        this.forbidden = true;
      }
    });
  }

  search() {
    let url = environment.apiBase + '/system/sysLog/query?limit=' + this.limitValue + '&page=' + this.pageValue;
    if (this.condition.requestIp) {
      url += '&requestIp=' + this.condition.requestIp;
    }
    if (this.condition.module) {
      url += '&module=' + this.condition.module;
    }
    if (this.condition.userName) {
      url += '&userName=' + this.condition.userName;
    }
    if (this.condition.startTime) {
      url += '&startTime=' + this.formatDate(this.condition.startTime);
    }
    if (this.condition.finishTime) {
      url += '&finishTime=' + this.formatDate(this.condition.finishTime);
    }
    this.pageIndexTable = this.pageValue;
    this.listOfAllData = [];
    this.http.get(url).subscribe((res: any) => {
      if (res.code === 0) {
        this.permission = true;
        this.listOfAllData = res.data;
        this.pageTotal = res.count;
        this.rowTotalTable = res.count;
      } else {
        this.forbidden = true;
      }
    });
  }

  formatDate(data) {
    const d = new Date(data);
    const datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    return datetime;
  }

  delModalShow() {
    this.tempData = this.displayData;
    this.delModalVisible = true;
  }

  delModalHide() {
    this.delModalVisible = false;
  }

  yearselectedChange() {
    this.limitValue = this.selectedValue;
    this.loadList();
  }

  rowChangeTable1(ev) {
    this.pageValue = ev;
    this.loadList();
  }

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
}
