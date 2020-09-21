import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-tablefilter',
  templateUrl: './tablefilter.page.html',
  styleUrls: ['./tablefilter.page.less']
})

export class TablefilterComponent implements OnInit {
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  listOfAllData = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;
  isVisible = false;
  loading = true;
  dataIndex = 0;
  modalTitle = '';
  modalContent = '';
  editName = '';
  editAge = '';

  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfSearchData = [];
  listOfSearchAddress: string[] = [];
  mapOfSort: any = [];

  constructor(private message: NzMessageService) { }

  ngOnInit() {
    const word = '碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼 碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜';

    for (let i = 0; i < 25; i++) {
      this.listOfAllData.push({
        id: i,
        name: `名称 ${i + 1}`,
        age: 16,
        address: word.substring(0, Math.floor(Math.random() * (60 - 10)) + 10),
        level: i % 5,
        view: i % 3,
        date: `2020-01-01`,
        role: `测试角色 ${i + 1}`,
        org: `测试部门 ${i + 1}`,
        point: i % 3,
        pending: '一般',
        pended: '未知',
        sold: '人为',
        exceed: '改革',
        checked: false,
        color: '',
        disabled: i % 4 === 0
      });
    }
    this.listOfSearchData = [...this.listOfAllData];
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
  changeColor(index) {
    this.listOfAllData[index].checked = !this.listOfAllData[index].checked;
    if (this.listOfAllData[index].checked) {
      this.listOfAllData[index].color = 'checked';
    } else {
      this.listOfAllData[index].color = '';
    }
  }
  opera(type, item, index) {
    this.dataIndex = index;
    this.isVisible = true;
    this.modalTitle = type;
    switch (type) {
      case '编辑':
        this.editName = this.listOfAllData[this.dataIndex].name;
        this.editAge = this.listOfAllData[this.dataIndex].age;
        break;
      case '删除':
        this.modalContent = item.name + '（' + item.role + '）';
        break;
    }
  }

  handleOk() {
    switch (this.modalTitle) {
      case '编辑':
        if (this.editName == '' || this.editAge == '') {
          this.message.error('姓名和年龄不能为空');
          return;
        }
        this.listOfAllData[this.dataIndex].name = this.editName;
        this.listOfAllData[this.dataIndex].age = this.editAge;
        this.message.success('编辑成功');
        break;
      case '删除':
        this.listOfAllData = this.listOfAllData.filter(d => d.id !== this.dataIndex);
        this.message.success('删除成功');
        break;
    }
    this.isVisible = false;
  }

  handleCancel() {
    this.isVisible = false;
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

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.mapOfSort) {
      this.mapOfSort[key] = key === sortName ? value : null;
    }
    this.search(sortName);
  }

  reset(type): void {
    this.searchValue = '';
    this.search(type);
  }

  search(type): void {
    const filterFunc = (item: { name: string; level: number; address: string }) => {
      switch (type) {
        case 'name':
          return (
            (this.listOfSearchAddress.length
              ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
              : true) && item.name.indexOf(this.searchValue) !== -1
          );
        case 'address':
          return (
            (this.listOfSearchAddress.length
              ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
              : true) && item.address.indexOf(this.searchValue) !== -1
          );
        case 'level':
          return (
            (this.listOfSearchAddress.length
              ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
              : true) && JSON.stringify(item.level).indexOf(this.searchValue) !== -1
          );
      }

    };
    const data = this.listOfAllData.filter((item: { name: string; level: number; address: string }) => filterFunc(item));
    this.listOfSearchData = data.sort((a, b) =>
      this.sortValue === 'ascend'
        ? a[this.sortName!] > b[this.sortName!]
          ? 1
          : -1
        : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
    );
  }

}
