import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-dataauthority',
  templateUrl: './datAauthority.page.html',
  styleUrls: ['./dataAuthority.page.less']
})
export class DataAuthorityComponent implements OnInit {
  fullHeight = { 'overflow-y': 'auto', 'height': document.body.clientHeight - 185 + 'px' };
  roleList: any = [];
  dataList: any = [];
  orgNodes: any = [];
  authorizeData: any = [];
  defaultExpandedKeys = [];
  orgIds = [];
  typeId = '';
  roleId = '';
  orgStatus = false;

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

  getDataList() {
    this.dataList = [
      { "name": "本部门和下级部门", "id": "0" },
      { "name": "自定义部门", "id": "1" }
    ]
  }

  getOrgList(type) {
    this.http.get(environment.apiBase + '/system/org/getOrgTree').subscribe((res: any) => {
      if (res.code === 0) {
        const checkedKeys = [];
        this.orgNodes = res.data;

        for (const i of this.orgNodes) {
          checkedKeys.push(this.checkedKeys(i));
          if (i.children && i.children.length !== 0) {
            for (const j of i.children) {
              checkedKeys.push(this.checkedKeys(j));
              if (j.children && j.children.length !== 0) {
                for (const k of j.children) {
                  checkedKeys.push(this.checkedKeys(k));
                }
              }
            }
          }
        }
        this.orgStatus = true;
        if (type === 'empty') {
          this.defaultExpandedKeys = [];
        } else {
          this.defaultExpandedKeys = checkedKeys;
        }
      }
    });
  }

  checkedKeys(obj) {
    for (const item of this.defaultExpandedKeys) {
      if (item === obj.key && !obj.children) {
        return obj.key;
      }
    }
  }

  backMenuData(callback) {
    this.defaultExpandedKeys = [];
    for (const item of this.authorizeData) {
      this.defaultExpandedKeys.push(item.orgId);
    }
    callback();
    // this.http.get(environment.apiBase + '/system/authorizeData/query?roleId=' + roleId).subscribe((res: any) => {
    //   if (res.code === 0) {
    //     for (const item of res.data) {
    //       this.defaultExpandedKeys.push(item.orgId);
    //     }
    //     callback();
    //   }
    // });
  }

  roleChecked(data, index) {
    if (data.checked) {
      for (const item of this.roleList) {
        item.checked = false;
      }
      this.roleList[index].checked = true;
      this.orgIds = [];
      this.roleId = data.id;
      this.getDataList();
      // 回填数据
      this.http.get(environment.apiBase + '/system/authorizeData/query?roleId=' + this.roleId).subscribe((res: any) => {
        if (res.code === 0) {
          this.authorizeData = res.data;
          let typeId = '';
          for (const item of res.data) {
            for (const list of this.dataList) {
              if (list.id === item.type) {
                list.checked = true;
                typeId = list.id;
              }
            }
          }
          this.typeId = typeId;
          if (this.typeId === '1') {
            this.backMenuData(() => {
              this.getOrgList('');
            });
          }
        }
      });
    } else {
      this.roleId = '';
    }
    this.typeId = '';
    this.orgNodes = [];
    this.orgIds = [];
    this.orgStatus = false;
  }

  dataChecked(data, index) {
    if (data.checked) {
      for (const item of this.dataList) {
        item.checked = false;
      }
      this.dataList[index].checked = true;
      this.typeId = data.id;
      switch (data.id) {
        case '1':
          this.backMenuData(() => {
            this.getOrgList('');
          });
          break;
        default:
          this.orgNodes = [];
          this.orgIds = [];
          this.orgStatus = false;
          break;
      }
    } else {
      this.typeId = '';
    }
  }

  menuTreeClick(event) {
    this.orgIds = [];
    for (const item of event.checkedKeys) {
      this.orgIds.push(item.key);
      if (item._children.length !== 0) {
        for (const data of item._children) {
          this.orgIds.push(data.key)
          if (data._children.length !== 0) {
            for (const list of data._children) {
              this.orgIds.push(list.key);
            }
          }
        }
      }
      if (item.parentNode) {
        this.orgIds.push(item.parentNode.key)
        if (item.parentNode.parentNode) {
          this.orgIds.push(item.parentNode.parentNode.key);
        }
      }
    }
    this.orgIds = this.uniq(this.orgIds);
  }

  uniq(array) {
    const temp = [];
    for (const item of array) {
      if (temp.indexOf(item) === -1) {
        temp.push(item);
      }
    }
    return temp;
  }

  save() {
    if (this.roleId === '') {
      this.msg.error('请选择角色');
      return;
    }
    if (this.typeId === '') {
      this.msg.error('请选择权限类型');
      return;
    }
    if (this.typeId === '1' && this.orgIds.length === 0) {
      this.msg.error('请选择部门');
      return;
    }

    this.http.post(environment.apiBase + '/system/authorizeData/add', {
      roleId: this.roleId,
      type: this.typeId,
      orgIds: this.orgIds.toString()
    }).subscribe((res: any) => {
      if (res.code === 0) {
        this.msg.success('提交成功');
        this.roleId = '';
        this.typeId = '';
        this.orgIds = [];
        for (const item of this.roleList) {
          item.checked = false;
        }
        for (const item of this.dataList) {
          item.checked = false;
        }
        this.backMenuData(() => {
          this.getOrgList('empty');
        });
      } else {
        this.msg.error(res.msg);
      }
    });
  }

}
