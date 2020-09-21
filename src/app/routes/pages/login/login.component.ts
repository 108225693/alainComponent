import { _HttpClient } from '@delon/theme';
import { Component, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
// import { SocialService, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core';
import { LocalStorage } from '@core/local.storage';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
  // providers: [SocialService],
})
export class UserLoginComponent {
  passwordVisible = false;
  form: FormGroup;
  error = '';
  fullHeight = { 'height': document.body.clientHeight - 1 + 'px' };

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private reuseTabService: ReuseTabService,
    // @Optional()
    // @Inject(ReuseTabService)
    // @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    public ls: LocalStorage
  ) {
    if (this.ls.get('loginInfo')) {
      this.router.navigateByUrl('pages/workspace');
    }
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      remember: [true]
    });
    modalSrv.closeAll();
  }
  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get remember() {
    return this.form.controls.remember;
  }

  submit() {
    // this.tokenService.set({
    //   token: "123456789",
    //   name: this.userName.value,
    //   email: this.userName.value + "@gmail.com",
    //   id: 10000,
    //   time: 1584332743742,
    //   pwd: this.password.value
    // });
    // return;

    this.error = '';
    this.userName.markAsDirty();
    this.userName.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.userName.invalid || this.password.invalid) {
      return;
    }

    this.http.post(environment.apiBase + '/system/sys/login', {
      loginName: this.userName.value,
      password: this.password.value,
    }).subscribe((res: any) => {
      if (res.code === 0) {
        if (this.remember) {
          this.ls.set('userpwd', '{"loginName":"' + this.userName.value + '","password":"' + this.password.value + '"}');
        } else {
          this.ls.set('userpwd', '{"loginName":"","password":""}');
        }
        // this.tokenService.set({
        //   token: "123456789",
        //   name: this.userName.value,
        //   email: this.userName.value + "@gmail.com",
        //   id: 10000,
        //   time: 1584332743742,
        //   pwd: this.password.value
        // });
        this.reuseTabService.clear();
        this.ls.set('loginInfo', JSON.stringify(res.data[0]));
        // this.startupSrv.load().then(() => {
        // let url = this.tokenService.referrer!.url || '/';
        // if (url.includes('/third/login')) {
        //   url = '/';
        // }         
        // });
        this.router.navigateByUrl('pages/workspace');
      } else {
        this.msg.error('用户或密码错误');
      }
    });
  }
}
