import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-menurole',
  templateUrl: './menurole.page.html',
  styleUrls: ['./menurole.page.less']
})
export class MenuroleComponent implements OnInit {
  fullHeight = { 'overflow-y': 'auto', 'height': document.body.clientHeight - 170 + 'px' };
  roleList: any = [];
  menuNodes: any = [];
  defaultExpandedKeys = [];
  menuIds = [];
  menuStatus = false;
  roleId = '';

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
      this.menuIds = [];
      this.roleId = data.id;
      this.backMenuData(this.roleId, () => {
        this.getMenuList('');
      });
    } else {
      this.roleId = '';
    }
  }

  menuTreeClick(event) {
    this.menuIds = [];
    for (const item of event.checkedKeys) {
      this.menuIds.push(item.key);
      if (item._children.length !== 0) {
        for (const data of item._children) {
          this.menuIds.push(data.key)
          if (data._children.length !== 0) {
            for (const list of data._children) {
              this.menuIds.push(list.key);
            }
          }
        }
      }
      if (item.parentNode) {
        this.menuIds.push(item.parentNode.key)
        if (item.parentNode.parentNode) {
          this.menuIds.push(item.parentNode.parentNode.key);
        }
      }
    }
    this.menuIds = this.uniq(this.menuIds);
  }

  save() {
    if (!this.roleId || this.roleId === '') {
      this.msg.error('请选择角色');
      return;
    }
    if (!this.menuIds || this.menuIds.length === 0) {
      this.msg.error('请选择菜单');
      return;
    }

    this.http.post(environment.apiBase + '/system/authorizeMenu/add', {
      menuIds: this.menuIds.toString(),
      roleId: this.roleId
    }).subscribe((res: any) => {
      if (res.code === 0) {
        this.msg.success('提交成功');
        this.menuIds = [];
        for (const item of this.roleList) {
          item.checked = false;
        }
        this.backMenuData(this.roleId, () => {
          this.getMenuList('empty');
        });
      } else {
        this.msg.error(res.msg);
      }
    })
  }

  getMenuList(type) {
    this.http.get(environment.apiBase + '/system/menu/query').subscribe((res: any) => {
      if (res.code === 0) {
        this.menuNodes = [];
        const treeNode = res.data[0].list;
        const checkedKeys = [];

        for (let i = 0; i < treeNode.length; i++) {
          checkedKeys.push(this.checkedKeys(treeNode[i]));
          if (treeNode[i].children && treeNode[i].children.length !== 0) {
            this.menuNodes.push({
              title: treeNode[i].title,
              key: treeNode[i].id,
              children: []
            });
            for (let j = 0; j < treeNode[i].children.length; j++) {
              checkedKeys.push(this.checkedKeys(treeNode[i].children[j]));
              if (treeNode[i].children[j].children && treeNode[i].children[j].children.length !== 0) {
                this.menuNodes[i].children.push({
                  title: treeNode[i].children[j].title,
                  key: treeNode[i].children[j].id,
                  children: []
                });
                for (let k = 0; k < treeNode[i].children[j].children.length; k++) {
                  checkedKeys.push(this.checkedKeys(treeNode[i].children[j].children[k]));
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
        this.menuStatus = true;
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
      if (item === obj.id && obj.children.length === 0) {
        return obj.id;
      }
    }
  }

  backMenuData(roleId, callback) {
    this.defaultExpandedKeys = [];
    this.http.get(environment.apiBase + '/system/authorizeMenu/query?roleId=' + roleId).subscribe((res: any) => {
      if (res.code === 0) {
        for (const item of res.data) {
          this.defaultExpandedKeys.push(item.menuId);
        }
        callback();
      }
    });
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

}
