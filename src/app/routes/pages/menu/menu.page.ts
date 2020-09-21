import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.less']
})
export class MenuComponent implements OnInit {
  // table
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  mapOfCheckedId = {};
  numberOfChecked = 0;
  listOfAllData = [];
  mapOfExpandedData = {};

  nameValue = '';
  tempData: any = {};
  delModalVisible = false;
  editModalVisible = false;
  addModalVisible = false;

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.http.get(environment.apiBase + '/system/menu/query').subscribe((res: any) => {
      if (res.code === 0) {
        this.listOfAllData = res.data[0].list;
        this.listOfAllData.forEach(item => {
          this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
        });
      }
    });
  }
  search() {
    let url = environment.apiBase + '/system/menu/query';
    if (this.nameValue !== '') {
      url = environment.apiBase + '/system/menu/query?title=' + this.nameValue;
    }
    this.http.get(url).subscribe((res: any) => {
      if (res.code === 0) {
        this.listOfAllData = res.data[0].list;
        this.listOfAllData.forEach(item => {
          this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
        });
      }
    });
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
  editModalShow(data) {
    data.checked = true;
    this.tempData = [data];
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

  // allChecked
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
