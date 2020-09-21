import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-popmodal',
  templateUrl: './popmodal.page.html',
  styleUrls: ['./popmodal.page.less']
})
export class PopmodalComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;

  constructor(private modal: NzModalService) { }

  ngOnInit() {

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>抒情</i>',
      nzContent: '<b>抒情的特点是叙述时感情强烈，节奏快、紧张，情感直露，容易把握</b>',
      nzOnOk: () => console.log('OK')
    });
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: '伏笔?',
      nzContent: '<b style="color: red;">伏笔为以后的情节做铺垫，制造一个“原因”，目的是产生以后的“结果”</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => console.log('OK'),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  info(): void {
    this.modal.info({
      nzTitle: 'This is a notification message',
      nzContent: '<p>some messages...some messages...</p><p>some messages...some messages...</p>',
      nzOnOk: () => console.log('Info OK')
    });
  }

  success(): void {
    this.modal.success({
      nzTitle: 'This is a success message',
      nzContent: 'some messages...some messages...'
    });
  }

  error(): void {
    this.modal.error({
      nzTitle: 'This is an error message',
      nzContent: 'some messages...some messages...'
    });
  }

  warning(): void {
    this.modal.warning({
      nzTitle: 'This is an warning message',
      nzContent: 'some messages...some messages...'
    });
  }

}
