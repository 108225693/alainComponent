import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '@env/environment';

@Component({
  selector: 'app-associa',
  templateUrl: './associa.page.html',
  styleUrls: ['./associa.page.less']
})
export class AssociaComponent implements OnInit {
  fullHeight = { 'overflow-y': 'auto', 'height': document.body.clientHeight - 185 + 'px' };
  orgNodes: any = [{ title: '集团公司', key: '-1', children: [] }];
  treeStatus = false;
  userId = '';
  userList = [];
  roleList = [];
  menuNodes: any = [];

  constructor(
    public http: HttpClient,
    public msg: NzMessageService
  ) { }

  ngOnInit() {
    this.loadList();
  }
  loadList() {
    this.http.get(environment.apiBase + '/system/org/query').subscribe((res: any) => {
      if (res.code === 0) {
        this.treeStatus = true;
        const treeNode = this.transData(res.data, 'id', 'pid', 'children');

        for (let i = 0; i < treeNode.length; i++) {
          if (treeNode[i].children) {
            this.orgNodes[0].children.push({
              title: treeNode[i].name,
              key: treeNode[i].id,
              children: []
            });
            for (let j = 0; j < treeNode[i].children.length; j++) {
              if (treeNode[i].children[j].children) {
                this.orgNodes[0].children[i].children.push({
                  title: treeNode[i].children[j].name,
                  key: treeNode[i].children[j].id,
                  children: []
                });
                for (let k = 0; k < treeNode[i].children[j].children.length; k++) {
                  this.orgNodes[0].children[i].children[j].children.push({
                    title: treeNode[i].children[j].children[k].name,
                    key: treeNode[i].children[j].children[k].id,
                    isLeaf: true
                  });
                }
              } else {
                this.orgNodes[0].children[i].children.push({
                  title: treeNode[i].children[j].name,
                  key: treeNode[i].children[j].id,
                  isLeaf: true
                });
              }
            }
          } else {
            this.orgNodes[0].children.push({
              title: treeNode[i].name,
              key: treeNode[i].id,
              isLeaf: true
            });
          }
        }
      }
    });
  }
  getUserList(orgId) {
    let url = '';
    if (orgId === '-1') {
      url = environment.apiBase + '/system/user/query?del=0';
    } else {
      url = environment.apiBase + '/system/user/query?del=0&orgId=' + orgId;
    }
    this.http.get(url).subscribe((res: any) => {
      if (res.code === 0) {
        this.userList = [];
        this.userList = res.data;
        for (let i = 0; i < res.data.length; i++) {
          this.userList[i].checked = false;
        }
      }
    });
  }
  getRoleList(userId) {
    const url = environment.apiBase + '/system/role/query';
    this.http.get(url).subscribe((res: any) => {
      if (res.code === 0) {
        this.roleList = [];
        this.roleList = res.data;
        // 还原数据
        this.http.get(environment.apiBase + '/system/userRole/query?userId=' + userId).subscribe((userRes: any) => {
          // console.log(userRes)
          if (userRes.code === 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.roleList[i].checked = false;
              for (let j = 0; j < userRes.data.length; j++) {
                if (this.roleList[i].id === userRes.data[j].roleId) {
                  this.roleList[i].checked = true;
                }
              }
            }
          }
        });

      }
    });
  }
  getMenuList(userId) {
    const url = environment.apiBase + '/system/menu/getMenuList?userId=' + userId;
    this.http.get(url).subscribe((res: any) => {
      if (res.code === 0) {
        this.menuNodes = [];
        const treeNode = res.data[0].list;
        for (let i = 0; i < treeNode.length; i++) {
          if (treeNode[i].children && treeNode[i].children.length !== 0) {
            this.menuNodes.push({
              title: treeNode[i].title,
              key: treeNode[i].id,
              children: []
            });
            for (let j = 0; j < treeNode[i].children.length; j++) {
              if (treeNode[i].children[j].children && treeNode[i].children[j].children.length !== 0) {
                this.menuNodes[i].children.push({
                  title: treeNode[i].children[j].title,
                  key: treeNode[i].children[j].id,
                  children: []
                });
                for (let k = 0; k < treeNode[i].children[j].children.length; k++) {
                  this.menuNodes[i].children[j].children.push({
                    title: treeNode[i].children[j].children[k].title,
                    key: treeNode[i].children[j].children[k].id,
                    isLeaf: true
                  });
                }
              } else {
                this.menuNodes[i].children.push({
                  title: treeNode[i].children[j].title,
                  key: treeNode[i].children[j].id,
                  isLeaf: true
                });
              }
            }
          } else {
            this.menuNodes.push({
              title: treeNode[i].title,
              key: treeNode[i].id,
              isLeaf: true
            });
          }
        }
      }
    });
  }
  orgTreeClick(event): void {
    const key = event.node.key;
    this.roleList = [];
    this.menuNodes = [];
    this.getUserList(key);
  }
  userChecked(data, index) {
    if (data.checked) {
      for (const item of this.userList) {
        item.checked = false;
      }
      this.userList[index].checked = true;
      this.menuNodes = [];
      this.userId = data.id;
      this.getRoleList(data.id);
      this.getMenuList(data.id);
    } else {
      this.userId = '';
    }
  }
  save() {
    const roleIds = [];
    for (const item of this.roleList) {
      if (item.checked) {
        roleIds.push(item.id)
      }
    }
    if (this.userId === '' || roleIds.toString() === '') {
      this.msg.error('请选择用户或角色')
      return;
    }
    this.http.post(environment.apiBase + '/system/userRole/add', {
      userId: this.userId,
      roleIds: roleIds.toString()
    }).subscribe((res: any) => {
      if (res.code === 0) {
        this.msg.success('提交成功');
        this.userId = '';
        for (const item of this.userList) {
          item.checked = false;
        }
        for (const item of this.roleList) {
          item.checked = false;
        }
      } else {
        this.msg.error(res.msg);
      }
    });
  }
  transData(resdata, idStr, pidStr, chindrenStr) {
    const r = [];
    const hash = {};
    const id = idStr;
    const pid = pidStr;
    const children = chindrenStr
    let i = 0;
    let j = 0;
    const len = resdata.length;
    for (; i < len; i++) {
      hash[resdata[i][id]] = resdata[i];
    }
    for (; j < len; j++) {
      const aVal = resdata[j];
      const hashVP = hash[aVal[pid]];
      if (hashVP) {
        !hashVP[children] && (hashVP[children] = []);
        hashVP[children].push(aVal);

      } else {
        r.push(aVal);
      }
    }
    return r;
  }

}
