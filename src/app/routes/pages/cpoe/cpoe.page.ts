import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-cpoe',
  templateUrl: './cpoe.page.html',
  styleUrls: ['./cpoe.page.less']
})
export class CpoeComponent implements OnInit {
  param: any = {};
  data: any = [];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService
  ) { }

  ngOnInit() {
    this.http.get('./assets/data/name.json').subscribe((res: any) => {
      this.data.name = res;
    });
    this.http.get('./assets/data/address.json').subscribe((res: any) => {
      this.data.address = res;
    });
    // this.http.post('http://10.128.168.21:10000/system/org/query', { id: 1 }).subscribe((res: any) => {

    // });
  }
  Ok() {
    const params = {};
    for (const item of Object.keys(this.param)) {
      const data = this.param[item];
      if (data || data === 0) {
        params[item] = data;
      }
    }
    if (Object.keys(params).length) {
      this.msg.info('参数：' + JSON.stringify(params), { nzDuration: 1000 });
    } else {
      this.msg.info('请选择下拉数据', { nzDuration: 1000 });
    }
  }
}
