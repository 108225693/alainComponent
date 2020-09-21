import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TableCheckPageComponent } from '../../../layout/components/tableCheckPage.component';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-managestation',
  templateUrl: './manageStation.page.html',
  styleUrls: ['./manageStation.page.less']
})
export class ManageStationComponent implements OnInit {
  @ViewChild('tcp', { static: true }) tcp: TableCheckPageComponent;
  searchParam: any = {};
  apiUrl: any = {};
  tableScroll: any = {};
  exportUrl = '';
  headData = [];
  plainData = [];
  tempData = [];
  xlSelect = [];
  addModalVisible = false;
  editModalVisible = false;
  delModalVisible = false;
  treeNodeStyle = { 'max-height': '300px', 'overflow-y': 'auto', 'overflow-x': 'hidden' };

  constructor(private http: _HttpClient) { }

  ngOnInit() {
    this.headData = [{ "name": "车站名" }, { "name": "车站码", "width": "20%" }, { "name": "线路名", "width": "30%" }, { "name": "排序", "width": "20%" }];
    this.plainData = ['name', 'code', 'lineName', 'nOrder'];
    this.apiUrl.add = environment.apiBase + '/system/station/add';
    this.apiUrl.edit = environment.apiBase + '/system/station/update';
    this.apiUrl.del = environment.apiBase + '/system/station/delete';
    this.http.get(environment.apiBase + '/system/line/getAllLine').subscribe((res: any) => {
      if (!res.code) {
        this.xlSelect = res.data;
      }
    });
    this.loadList();
  }
  loadList() {
    this.tcp.loadList(environment.apiBase + '/system/station/query', '');
  }
  search() {
    let params = '';
    if (this.searchParam.cz) {
      params += '&name=' + this.searchParam.cz;
    }
    if (this.searchParam.xllb) {
      params += '&lineId=' + this.searchParam.xllb;
    }
    this.tcp.loadList(environment.apiBase + '/system/station/query', params);
  }
  addModalShow() {
    this.addModalVisible = true;
  }
  addModalHide() {
    this.addModalVisible = false;
  }
  editModalShow() {
    this.tempData = this.tcp.getAllData();
    this.editModalVisible = true;
  }
  editModalHide() {
    this.editModalVisible = false;
  }
  delModalShow() {
    this.tempData = this.tcp.getAllData();
    this.delModalVisible = true;
  }
  delModalHide() {
    this.delModalVisible = false;
  }

}
