import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LocalStorage } from '@core/local.storage';
import { Router } from '@angular/router';

@Component({
  selector: 'exception-404',
  templateUrl: './404.component.html'
})
export class Exception404Component {
  safe: any;

  constructor(
    modalSrv: NzModalService,
    private router: Router,
    public ls: LocalStorage
  ) {
    modalSrv.closeAll();
  }

  history() {
    history.go(-1);
  }

  logout() {
    if (window !== top) {
      top.postMessage('logout', '*');
    } else {
      this.ls.set('loginInfo', '');
      this.router.navigateByUrl('third/login');
    }
  }
}