import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-role',
  templateUrl: './role.page.html',
  styleUrls: ['./role.page.less']
})
export class RoleComponent implements OnInit {
  // table
  allChecked = false;
  indeterminate = false;
  displayData = [];
  listOfAllData = [];

  tempData: any = {};
  delModalVisible = false;
  editModalVisible = false;
  addModalVisible = false;
  userValue = '';

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.loadList();
  }
  loadList() {
    this.http.get(environment.apiBase + '/system/role/query').subscribe((res: any) => {
      if (res.code === 0) {
        this.listOfAllData = res.data;
      }
    });
  }
  search() {
    let url = '';
    switch (true) {
      case this.userValue === '':
        url = environment.apiBase + '/system/role/query';
        break;
      default:
        url = environment.apiBase + '/system/role/query?name=' + this.userValue;
        break;
    }
    this.http.get(url).subscribe((res: any) => {
      if (res.code === 0) {
        this.listOfAllData = res.data;
      }
    });
  }
  delModalShow() {
    this.tempData = this.displayData;
    this.delModalVisible = true;
  }
  delModalHide() {
    this.delModalVisible = false;
  }
  editModalShow() {
    this.tempData = this.displayData;
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
