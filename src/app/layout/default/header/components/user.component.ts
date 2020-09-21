import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
// import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { LocalStorage } from '@core/local.storage';

@Component({
  selector: 'header-user',
  template: `
    <div
      class="alain-default__nav-item d-flex align-items-center px-sm"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <nz-avatar [nzSrc]="'./assets/avatar.jpg'" nzSize="small" class="mr-sm"></nz-avatar>
      {{ userName }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">        
        <div nz-menu-item (click)="user()">
          <i nz-icon nzType="user" class="mr-sm"></i>
          个人中心
        </div>
        <div nz-menu-item (click)="home()">
          <i nz-icon nzType="home" class="mr-sm"></i>
          后台首页
        </div>
        <div nz-menu-item>
          <i nz-icon nzType="fullscreen" class="mr-sm"></i>
          全屏查看
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          退出登录
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {
  userName = '';

  constructor(
    public settings: SettingsService,
    private router: Router,
    // private tokenService: ITokenService,
    public ls: LocalStorage
  ) {
    const loginInfo = JSON.parse(this.ls.get('loginInfo'));
    if (loginInfo) {
      this.userName = loginInfo.loginName;
    }
  }

  logout() {
    // this.tokenService.clear();
    this.ls.set('loginInfo', '');
    this.router.navigateByUrl('third/login');
  }
  user() {
    this.router.navigate(['pages/center']);
  }
  home() {
    this.router.navigate(['pages/workspace']);
  }
}
