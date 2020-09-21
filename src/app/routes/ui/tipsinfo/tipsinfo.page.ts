import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-tipsinfo',
  templateUrl: './tipsinfo.page.html',
  styleUrls: ['./tipsinfo.page.less']
})
export class TipsinfoComponent implements OnInit {
  isVisible = false;
  current = 1;

  constructor(private message: NzMessageService) { }

  ngOnInit() {

  }

  createMessage(type: string): void {
    this.message.create(type, `这条信息是 ${type}`);
  }

  confirm() {
    this.message.info('点击了确认回调');
  }

  cancel() {
    this.message.info('点击了取消回调');
  }

  handleOk() {
    this.isVisible = false;
  }

  handleCancel() {
    this.isVisible = false;
  }

}
