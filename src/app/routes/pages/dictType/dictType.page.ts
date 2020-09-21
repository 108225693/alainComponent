import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-dictyype',
  templateUrl: './dictType.page.html',
  styleUrls: ['./dictType.page.less']
})
export class DictTypeComponent implements OnInit {
  dictValue = '';
  typeTemp = [];
  tableList = environment.apiBase + '/system/dictType/query';
  // table
  allChecked = false;
  indeterminate = false;
  displayData = [];
  listOfAllData = [];

  tempData: any = {};
  delModalVisible = false;
  editModalVisible = false;
  addModalVisible = false;

  constructor(
    public http: HttpClient,
    public msg: NzMessageService
  ) { }

  ngOnInit() {
    this.loadList(this.tableList);
  }

  loadList(url) {
    this.http.get(url).subscribe((res: any) => {
      if (res.code === 0) {
        this.listOfAllData = res.data;
      }
    });
  }

  search() {
    let url = this.tableList;
    if (this.dictValue !== '') {
      url += '?name=' + this.dictValue;
    }
    this.loadList(url);
  }

  delModalShow() {
    this.tempData = this.listOfAllData;
    this.delModalVisible = true;
  }
  delModalHide() {
    this.delModalVisible = false;
  }
  editModalShow() {
    this.tempData = this.listOfAllData;
    this.editModalVisible = true;
  }
  editModalHide() {
    this.editModalVisible = false;
  }
  addModalShow() {
    this.addModalVisible = true;
  }
  addModalHide() {
    this.addModalVisible = false;
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
