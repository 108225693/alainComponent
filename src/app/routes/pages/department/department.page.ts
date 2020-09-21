import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.less']
})
export class DepartmentComponent implements OnInit {
  // table
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  mapOfCheckedId = {};
  numberOfChecked = 0;
  listOfAllData = [];
  mapOfExpandedData = {};
  // allChecked = false;
  // indeterminate = false;

  nameValue = '';
  typeSelect = [];
  typeValue = null;
  tempData: any = {};
  editModalVisible = false;
  addModalVisible = false;
  delModalVisible = false;

  constructor(
    public http: HttpClient,
    public msg: NzMessageService
  ) { }

  ngOnInit() {
    this.loadList();
    this.http.get(environment.apiBase + '/system/dict/getByDictType?type=orgType').subscribe((res: any) => {
      if (res.code === 0) {
        for (const item of res.data) {
          this.typeSelect.push({
            value: item.id,
            label: item.name
          });
        }
      }
    });
  }
  loadList() {
    this.http.get(environment.apiBase + '/system/org/query').subscribe((res: any) => {
      if (res.code === 0) {
        this.listOfAllData = this.transData(res.data, 'id', 'pid', 'children');
        this.listOfAllData.forEach(item => {
          this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
        });
      }
    });
  }
  search() {
    let url = '';
    if (this.nameValue === '' && !this.typeValue) {
      url = environment.apiBase + '/system/org/query';
    }
    if (this.nameValue === '' && this.typeValue) {
      url = environment.apiBase + '/system/org/query?orgType=' + this.typeValue;
    }
    if (this.nameValue !== '' && !this.typeValue) {
      url = environment.apiBase + '/system/org/query?name=' + this.nameValue;
    }
    if (this.nameValue !== '' && this.typeValue) {
      url = environment.apiBase + '/system/org/query?name=' + this.nameValue + '&orgType=' + this.typeValue;
    }
    this.http.get(url).subscribe((res: any) => {
      if (res.code === 0) {
        this.listOfAllData = this.transData(res.data, 'id', 'pid', 'children');
        this.listOfAllData.forEach(item => {
          this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
        });
      }
    });
  }
  transData(resdata, idStr, pidStr, chindrenStr) {
    const r = [];
    const hash = {};
    const id = idStr;
    const pid = pidStr;
    const children = chindrenStr
    let i = 0;
    let j = 0;
    const len = resdata.length;
    for (; i < len; i++) {
      hash[resdata[i][id]] = resdata[i];
    }
    for (; j < len; j++) {
      const aVal = resdata[j];
      const hashVP = hash[aVal[pid]];
      if (hashVP) {
        !hashVP[children] && (hashVP[children] = []);
        hashVP[children].push(aVal);

      } else {
        r.push(aVal);
      }
    }
    return r;
  }
  delModalShow(data) {
    data.checked = true;
    data.name = data.title;
    this.tempData = [data];
    this.delModalVisible = true;
  }
  delModalHide() {
    this.delModalVisible = false;
  }
  // editModalShow(data) {
  //   data.checked = true;
  //   this.tempData = [data];
  //   this.editModalVisible = true;
  // }
  // editModalHide() {
  //   this.editModalVisible = false;
  // }
  addModalShow() {
    this.addModalVisible = true;
  }
  addModalHide() {
    this.addModalVisible = false;
  }

  collapse(array, data, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root) {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node, hashMap: { [id: string]: boolean }, array): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
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
    const aaa = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id])
    console.log(this.numberOfChecked)
  }

  // checkAll(value: boolean): void {
  //   this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
  //   this.refreshStatus();
  // }

  operateData(): void {
    this.isOperating = true;
    setTimeout(() => {
      this.listOfAllData.forEach(item => (this.mapOfCheckedId[item.id] = false));
      this.refreshStatus();
      this.isOperating = false;
    }, 1000);
  }
}
