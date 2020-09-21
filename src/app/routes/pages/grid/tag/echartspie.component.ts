import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
declare const echarts: any;

@Component({
  selector: 'app-tagechartspie',
  template: `
    <div [id]="'echartsPie'+rid" style="width:95%;height:95%;"></div>
  `
})

export class TagEchartsPieComponent implements OnInit {
  option = {};
  rid = '';

  constructor(private modal: NzModalService) { }

  ngOnInit() {
    this.rid = JSON.stringify(Math.floor(Math.random() * (1 - 10000000) + 10000000));
    this.option = {
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    setTimeout(() => {
      echarts.init(document.getElementById('echartsPie' + this.rid)).setOption(this.option, true);
    }, 500);
  }

}