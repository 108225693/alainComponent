import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TableCheckPageComponent } from '../../../layout/components/tableCheckPage.component';

@Component({
  selector: 'app-linestation',
  templateUrl: './lineStation.page.html',
  styleUrls: ['./lineStation.page.less']
})
export class LineStationComponent implements OnInit {
  @ViewChild('tcp', { static: true }) tcp: TableCheckPageComponent;
  searchParam: any = {};
  apiUrl: any = {};
  tableScroll: any = {};
  exportUrl = '';
  headData = [];
  plainData = [];
  tempData = [];
  dqztSelect = [];

  addModalVisible = false;
  editModalVisible = false;
  delModalVisible = false;
  pzModalVisible = false;
  bhModalVisible = false;

  constructor() { }

  ngOnInit() {
    this.headData = [{ "name": "线路名", "width": "30%" }, { "name": "线路类别" }];
    this.plainData = ['name', 'lineTypeName'];
    this.apiUrl.add = environment.apiBase + '/system/line/add';
    this.apiUrl.edit = environment.apiBase + '/system/line/update';
    this.apiUrl.del = environment.apiBase + '/system/line/delete';
    this.loadList();
  }
  loadList() {
    this.tcp.loadList(environment.apiBase + '/system/line/getAllLine', '');
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
