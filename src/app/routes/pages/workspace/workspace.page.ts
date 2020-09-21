import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.page.html',
  styleUrls: ['./workspace.page.less']
})

export class WorkspaceComponent implements OnInit {
  versatile = [
    { 'icon': 'pie-chart', 'name': '常用功能', 'color': '#2b90f7' },
    { 'icon': 'menu-unfold', 'name': '设备管理', 'color': '#f72bc5' },
    { 'icon': 'question-circle', 'name': '安全信息', 'color': '#33db7d' },
    { 'icon': 'info-circle', 'name': '日计划管理', 'color': '#fdbe13' },
    { 'icon': 'database', 'name': '材料管理', 'color': '#ff4f4f' },
    { 'icon': 'bulb', 'name': '网络设备', 'color': '#2bd3f7' },
    { 'icon': 'dashboard', 'name': '统计分析', 'color': '#ab7cf4' },
    { 'icon': 'message', 'name': '报警分析', 'color': '#25fff2' },
    { 'icon': 'star', 'name': '报警信息', 'color': '#fdbe13' },
    { 'icon': 'book', 'name': '维修计划', 'color': '#ff4f4f' },
    { 'icon': 'eye', 'name': '交班信息', 'color': '#2b90f7' },
    { 'icon': 'mail', 'name': '发邮件', 'color': '#ab7cf4' },
  ];
  banner = ['./assets/banner1.png', './assets/banner2.png'];
  notice = [
    { 'name': '北京昌平有人驾车冲撞疫情防控检查站致2人伤', 'time': '2020-02-04' },
    { 'name': '全面排查1月20日以来发热患者、买退烧止咳药品人员', 'time': '2020-02-02' },
    { 'name': '新冠疫苗研发，涉药央企进度如何？国资委回应', 'time': '2020-02-02' },
    { 'name': '央企承诺并做到欠费不停电、不停气、不停机', 'time': '2020-02-02' },
    { 'name': '中疾控数据显示八成新冠病例病情较轻，病亡率2%', 'time': '2020-02-01' }
  ];
  listOfData = [
    { class: '材料出库', attchments: '武汉电务段申请表.doc', person: '张小乔', time: '2020-02-01 12:15:20', section: '武汉电务段', area: '流芳工区', content: '有线电路改造，需200个电路', remarks: '--' },
    { class: '材料出库', attchments: '武汉电务段申请表.doc', person: '张小乔', time: '2020-02-01 12:15:20', section: '武汉电务段', area: '流芳工区', content: '有线电路改造，需200个电路', remarks: '--' },
    { class: '材料出库', attchments: '武汉电务段申请表.doc', person: '张小乔', time: '2020-02-01 12:15:20', section: '武汉电务段', area: '流芳工区', content: '有线电路改造，需200个电路', remarks: '--' },
    { class: '材料出库', attchments: '武汉电务段申请表.doc', person: '张小乔', time: '2020-02-01 12:15:20', section: '武汉电务段', area: '流芳工区', content: '有线电路改造，需200个电路', remarks: '--' }
  ];

  constructor() { }

  ngOnInit() {

  }

  transform(value) {
    return value.substring(0, 5);
  }

  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

}
