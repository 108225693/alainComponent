import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-center',
  templateUrl: './center.page.html',
  styleUrls: ['./center.page.less']
})
export class CenterComponent implements OnInit {
  number = 0;
  tabStyle = { 'padding': '0', 'margin': '0' }
  tabs = [
    { name: '个人信息', disabled: false },
    { name: '待审批', disabled: true },
    { name: '待提交', disabled: true },
    { name: '待查看', disabled: true },
    { name: '待完成', disabled: true },
    { name: '被驳回', disabled: true }
  ];
  constructor() { }

  ngOnInit() {

  }

}
