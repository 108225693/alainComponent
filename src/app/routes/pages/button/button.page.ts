import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-button',
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.less']
})
export class ButtonComponent implements OnInit {
  // table
  allChecked = false;
  indeterminate = false;
  displayData = [];
  listOfAllData = [];

  tempData: any = {};
  delModalVisible = false;
  editModalVisible = false;
  addModalVisible = false;
  buttonValue = '';
  menuNodes: any = [];
  menuValue = '';

  constructor(
    public http: HttpClient,
    public msg: NzMessageService
  ) { }

  ngOnInit() {
    this.loadList();
    this.loadMenu();
  }
  loadList() {
    this.http.get(environment.apiBase + '/system/menuBtn/query').subscribe((res: any) => {
      if (res.code === 0) {
        this.listOfAllData = res.data;
      }
    });
  }
  loadMenu() {
    this.http.get(environment.apiBase + '/system/menu/query').subscribe((res: any) => {
      if (res.code === 0) {
        const treeNode = res.data[0].list;

        for (let i = 0; i < treeNode.length; i++) {
          if (treeNode[i].children && treeNode[i].children.length !== 0) {
            this.menuNodes.push({
              title: treeNode[i].title,
              key: treeNode[i].id,
              children: []
            });
            for (let j = 0; j < treeNode[i].children.length; j++) {
              if (treeNode[i].children[j].children && treeNode[i].children[j].children.length !== 0) {
                this.menuNodes[i].children.push({
                  title: treeNode[i].children[j].title,
                  key: treeNode[i].children[j].id,
                  children: []
                });
                for (let k = 0; k < treeNode[i].children[j].children.length; k++) {
                  this.menuNodes[i].children[j].children.push({
                    title: treeNode[i].children[j].children[k].title,
                    key: treeNode[i].children[j].children[k].id,
                    isLeaf: true
                  });
                }
              } else {
                this.menuNodes[i].children.push({
                  title: treeNode[i].children[j].title,
                  key: treeNode[i].children[j].id,
                  isLeaf: true
                });
              }
            }
          } else {
            this.menuNodes.push({
              title: treeNode[i].title,
              key: treeNode[i].id,
              isLeaf: true
            });
          }
        }
      }
    });
  }
  search() {
    let url = environment.apiBase + '/system/menuBtn/query?debug=0';
    if (this.buttonValue !== '') {
      url += '&name=' + this.buttonValue;
    }
    if (this.menuValue && this.menuValue !== '') {
      url += '&menuId=' + this.menuValue;
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
