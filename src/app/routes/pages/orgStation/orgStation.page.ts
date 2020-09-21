import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-orgstation',
  templateUrl: './orgStation.page.html',
  styleUrls: ['./orgStation.page.less']
})
export class OrgStationComponent implements OnInit {
  searchParam: any = {};
  bmNodes = [];
  czData = [];
  fullHeight = { 'overflow-y': 'auto', 'height': document.body.clientHeight - 130 + 'px' };
  // table
  allChecked = false;
  indeterminate = false;
  displayData = [];

  constructor(private http: _HttpClient, private msg: NzMessageService) { }

  ngOnInit() {
    this.loadList();
  }
  loadList() {
    this.http.get(environment.apiBase + '/system/org/getOrgTree').subscribe((res: any) => {
      if (res.code === 0) {
        this.bmNodes = res.data;
      }
    });
    this.http.get(environment.apiBase + '/system/station/getAllStation').subscribe((res: any) => {
      if (res.code === 0) {
        this.czData = res.data;
      }
    });
  }
  add() {
    const array = [];
    for (const item of this.czData) {
      if (item.checked) {
        array.push(item.id)
      }
    }
    if (array.length === 0 || !this.searchParam.bm) {
      this.msg.error('请选择部门和车站');
    }
    this.http.post(environment.apiBase + '/system/orgStation/add', {
      orgId: this.searchParam.bm,
      stationIds: array
    }).subscribe((res: any) => {
      if (res.code === 0) {
        this.msg.success('提交成功');
      }
    });
  }
  nzClick(e) {
    this.searchParam.bm = e.node.key;
    for (const item of this.czData) {
      item.checked = false;
    }
    this.http.get(environment.apiBase + '/system/station/getByOrg?orgId=' + this.searchParam.bm).subscribe((res: any) => {
      if (res.code === 0) {
        if (res.data.length !== 0) {
          for (const item of res.data) {
            for (const list of this.czData) {
              if (item.name === list.name) {
                list.checked = true;
              }
            }
          }
        }
      }
    });
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
