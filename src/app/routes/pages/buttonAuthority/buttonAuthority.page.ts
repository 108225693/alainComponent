import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-buttonauthority',
  templateUrl: './buttonAuthority.page.html',
  styleUrls: ['./buttonAuthority.page.less']
})
export class ButtonAuthorityComponent implements OnInit {
  fullHeight = { 'overflow-y': 'auto', 'height': document.body.clientHeight - 170 + 'px' };
  roleList: any = [];
  menuNodes: any = [];
  defaultExpandedKeys = [];
  menuId = '';
  menuStatus = false;
  roleId = '';
  buttonList: any = [];
  btnIds = [];

  constructor(
    public http: HttpClient,
    public msg: NzMessageService
  ) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.http.get(environment.apiBase + '/system/role/query').subscribe((res: any) => {
      if (res.code === 0) {
        this.roleList = res.data;
        for (let i = 0; i < res.data.length; i++) {
          this.roleList[i].checked = false;
        }
      }
    });
  }

  roleChecked(data, index) {
    if (data.checked) {
      for (const item of this.roleList) {
        item.checked = false;
      }
      this.roleList[index].checked = true;
      this.menuId = '';
      this.roleId = data.id;
      this.getMenuList();
    } else {
      this.roleId = '';
    }
    this.buttonList = [];
  }

  menuTreeClick(event) {
    this.menuId = event.keys[0];
    this.http.get(environment.apiBase + '/system/menuBtn/query?menuId=' + this.menuId).subscribe((res: any) => {
      if (res.code === 0) {
        this.buttonList = res.data;
        // 回填
        this.http.get(environment.apiBase + '/system/authorizeBtn/query?roleId=' + this.roleId + '&menuId=' + this.menuId).subscribe((buttonRes: any) => {
          if (buttonRes.code === 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.buttonList[i].checked = false;
              for (let j = 0; j < buttonRes.data.length; j++) {
                if (buttonRes.data[j].btnId === this.buttonList[i].id) {
                  this.buttonList[i].checked = true;
                }
              }
            }
          }
        });
      }
    })
  }

  getMenuList() {
    this.http.get(environment.apiBase + '/system/authorizeMenu/getMenuByRole?roleId=' + this.roleId).subscribe((res: any) => {
      if (res.code === 0) {
        this.menuNodes = res.data;
        this.menuStatus = true;
      }
    });
  }

  checkedKeys(obj) {
    for (const item of this.defaultExpandedKeys) {
      if (item === obj.key && !obj.children) {
        console.log(obj)
        return obj.key;
      }
    }
  }

  save() {
    if (this.roleId === '') {
      this.msg.error('请选择角色');
      return;
    }
    if (this.menuId === '') {
      this.msg.error('请选择版友们');
      return;
    }
    for (const item of this.buttonList) {
      if (item.checked) {
        this.btnIds.push(item.id)
      }
    }
    // if (this.btnIds.length === 0) {
    //   this.msg.error('请选择按钮');
    //   return;
    // }

    this.http.post(environment.apiBase + '/system/authorizeBtn/add', {
      roleId: this.roleId,
      menuId: this.menuId,
      btnIds: this.btnIds.toString()
    }).subscribe((res: any) => {
      if (res.code === 0) {
        this.msg.success('提交成功');
        this.roleId = '';
        this.menuId = '';
        this.btnIds = [];
        this.menuNodes = [];
        this.menuStatus = false;
        this.buttonList = [];
        for (const item of this.roleList) {
          item.checked = false;
        }
      } else {
        this.msg.error(res.msg);
      }
    });
  }
}
