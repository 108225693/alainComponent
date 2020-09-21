import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.less']
})
export class UserComponent implements OnInit {
  fullHeight = { 'overflow-y': 'auto', 'height': document.body.clientHeight - 130 + 'px' };
  nodes: any = [{ title: '集团公司', key: '-1', children: [] }];
  searchValue = '';
  selectedValue = '0';
  orgId = '';
  pwdType = '';
  // table
  scrollConfig = { x: '1500px' };
  allChecked = false;
  indeterminate = false;
  displayData = [];
  listOfAllData = [];

  tempData: any = {};
  delModalVisible = false;
  editModalVisible = false;
  addModalVisible = false;
  userValue = '';
  telValue = '';
  treeStatus = false;
  pwdModalVisible = false;

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.loadList();
  }
  loadList() {
    this.http.get(environment.apiBase + '/system/org/query').subscribe((res: any) => {
      if (res.code === 0) {
        this.treeStatus = true;
        const treeNode = this.transData(res.data, 'id', 'pid', 'children');

        for (let i = 0; i < treeNode.length; i++) {
          if (treeNode[i].children) {
            this.nodes[0].children.push({
              title: treeNode[i].name,
              key: treeNode[i].id,
              children: []
            });
            for (let j = 0; j < treeNode[i].children.length; j++) {
              if (treeNode[i].children[j].children) {
                this.nodes[0].children[i].children.push({
                  title: treeNode[i].children[j].name,
                  key: treeNode[i].children[j].id,
                  children: []
                });
                for (let k = 0; k < treeNode[i].children[j].children.length; k++) {
                  this.nodes[0].children[i].children[j].children.push({
                    title: treeNode[i].children[j].children[k].name,
                    key: treeNode[i].children[j].children[k].id,
                    isLeaf: true
                  });
                }
              } else {
                this.nodes[0].children[i].children.push({
                  title: treeNode[i].children[j].name,
                  key: treeNode[i].children[j].id,
                  isLeaf: true
                });
              }
            }
          } else {
            this.nodes[0].children.push({
              title: treeNode[i].name,
              key: treeNode[i].id,
              isLeaf: true
            });
          }
        }
        this.search();
      }
    });
  }
  search() {
    let url = environment.apiBase + '/system/user/query?del=' + this.selectedValue;
    if (this.userValue !== '') {
      url += '&name=' + this.userValue;
    }
    if (this.telValue !== '') {
      url += '&phone=' + this.telValue;
    }
    if (this.orgId && this.orgId !== '-1') {
      url += '&orgId=' + this.orgId;
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
  pwdModalShow(type) {
    this.tempData = this.displayData;
    this.pwdType = type;
    this.pwdModalVisible = true;
  }
  pwdModalHide() {
    this.pwdModalVisible = false;
  }

  nzClick(event): void {
    const key = event.node.key;
    this.orgId = key;
    this.search();
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
}
