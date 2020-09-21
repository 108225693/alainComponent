import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-operamodal',
    template: `
    <nz-modal [(nzVisible)]="Visible" nzWidth="500" [nzTitle]="popTitle" (nzOnCancel)="Cancel()" (nzOnOk)="Ok()">
        <div nz-row>
            <div nz-col nzSpan="24">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="6">用户名称</nz-form-label>
                    <nz-form-control [nzSpan]="16"> 
                        <nz-select [disabled]="operaType == 'del' || operaType == 'data'" nzPlaceHolder="--请选择--" [(ngModel)]="userValue" class="wd100">
                            <nz-option *ngFor="let item of userSelect" [nzValue]="item.value" [nzLabel]="item.label">
                            </nz-option>
                        </nz-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div *ngIf="operaType == 'add' || operaType == 'edit'" nz-col nzSpan="24">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="6">角色名称</nz-form-label>
                    <nz-form-control [nzSpan]="16">
                        <nz-tree-select class="wd100" nzPlaceHolder="--请选择--" [(ngModel)]="roleValue" [nzNodes]="roleSelect" [nzCheckable]="true" [nzMultiple]="true"></nz-tree-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div *ngIf="operaType == 'data'" nz-col nzSpan="24">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="6">权限类型</nz-form-label>
                    <nz-form-control [nzSpan]="16">
                    <nz-select nzPlaceHolder="--请选择--" [(ngModel)]="limitValue" class="wd100">
                        <nz-option nzValue="0" nzLabel="本部门和下级部门"></nz-option>
                        <nz-option nzValue="1" nzLabel="自定义部门"></nz-option>
                    </nz-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div *ngIf="operaType == 'data'" nz-col nzSpan="24">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="6">机构列表</nz-form-label>
                    <nz-form-control [nzSpan]="16">
                    <nz-tree-select class="wd100" nzPlaceHolder="--请选择--" [(ngModel)]="orgListValue" [nzNodes]="orgListSelect" [nzCheckable]="true" [nzMultiple]="true"></nz-tree-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
        </div>
    </nz-modal>
    `,
    styleUrls: ['./associa.page.less']
})
export class OperaModalComponent implements OnInit {
    Visible = false;
    userSelect: any = [];
    userValue = null;
    roleSelect: any = [];
    roleValue = null;
    orgListSelect: any = [];
    orgListValue = null;
    limitValue = null;
    popTitle = '';
    okUrl = environment.apiBase + '/system/userRole/add';

    @Input() operaType: any;
    @Input() responseData: any;
    @Output() public closeModal = new EventEmitter();
    @Output() public reloadData = new EventEmitter();

    constructor(
        private msg: NzMessageService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        switch (this.operaType) {
            case 'add':
                this.popTitle = '新增角色关联';
                this.getApi(() => {
                    // to do
                });
                break;
            case 'edit':
                this.popTitle = '修改角色关联';
                this.checkpoint((data) => {
                    this.getApi(() => {
                        // 回填数据
                        this.userValue = data.userId;
                        this.roleValue = [data.roleId];
                    });
                });
                // let status = false;
                // let count = 0;
                // let data: any = {};
                // for (const i in this.responseData) {
                //     if (this.responseData[i].checked) {
                //         count = count + 1;
                //         data = this.responseData[i];
                //         status = true;
                //     }
                // }
                // if (status && count === 1) {
                //     this.getApi(() => {
                //         // 回填数据
                //         this.userValue = data.userId;
                //         this.roleValue = [data.roleId];
                //     });
                // } else {
                //     this.Cancel();
                //     this.msg.error('请选择一条数据进行修改');
                // }
                break;
            case 'del':
                this.popTitle = '删除角色关联';
                this.checkpoint((data) => {
                    this.getApi(() => {
                        // 回填数据
                        this.userValue = data.userId;
                    });
                });
                break;
            case 'data':
                this.popTitle = '数据权限';
                this.checkpoint((data) => {
                    this.dataApi(() => {
                        // 回填数据 
                        this.userValue = data.userId;
                    });
                });
                break;
        }
    }

    checkpoint(callback) {
        let status = false;
        let count = 0;
        let data: any = {};
        for (const i in this.responseData) {
            if (this.responseData[i].checked) {
                count = count + 1;
                data = this.responseData[i];
                status = true;
            }
        }
        if (status && count === 1) {
            callback(data);
        } else {
            this.Cancel();
            this.msg.error('请选择一条数据进行修改');
        }
    }

    getApi(callback) {
        setTimeout(() => {
            this.Visible = true;
            const allApi = [
                this.http.get(environment.apiBase + '/system/user/query?del=0'),
                this.http.get(environment.apiBase + '/system/role/query')
            ];
            forkJoin(allApi).subscribe((results: any) => {
                if (results[0].code === 0) {
                    for (const item of results[0].data) {
                        this.userSelect.push({
                            value: item.id,
                            label: item.name
                        })
                    }
                }
                if (results[1].code === 0) {
                    for (const item of results[1].data) {
                        this.roleSelect.push({
                            title: item.name,
                            key: item.id,
                            isLeaf: true
                        })
                    }
                }
                if (callback) {
                    callback()
                }
            });
        }, 200);
    }

    dataApi(callback) {
        setTimeout(() => {
            this.Visible = true;
            const allApi = [
                this.http.get(environment.apiBase + '/system/org/query')
            ];
            forkJoin(allApi).subscribe((results: any) => {
                if (results[0].code === 0) {
                    const newdata = this.transData(results[0].data, 'id', 'pid', 'children');
                    for (let i = 0; i < newdata.length; i++) {
                        if (newdata[i].children) {
                            this.orgListSelect.push({
                                title: newdata[i].name,
                                key: newdata[i].id,
                                children: []
                            })
                            for (let j = 0; j < newdata[i].children.length; j++) {
                                if (newdata[i].children[j].children) {
                                    this.orgListSelect[i].children.push({
                                        title: newdata[i].children[j].name,
                                        key: newdata[i].children[j].id,
                                        children: []
                                    })
                                    for (const k of newdata[i].children[j].children) {
                                        this.orgListSelect[i].children[j].children.push({
                                            title: k.name,
                                            key: k.id,
                                            isLeaf: true
                                        })
                                    }
                                } else {
                                    this.orgListSelect[i].children.push({
                                        title: newdata[i].children[j].name,
                                        key: newdata[i].children[j].id,
                                        isLeaf: true
                                    })
                                }
                            }
                        } else {
                            this.orgListSelect.push({
                                title: newdata[i].name,
                                key: newdata[i].id,
                                isLeaf: true
                            })
                        }
                    }
                }
                if (callback) {
                    callback()
                }
            });
        }, 200);
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

    Ok() {
        let ids = '';
        switch (this.operaType) {
            case 'add':
            case 'edit':
                if (!this.userValue || this.userValue === '') {
                    this.msg.error('请选择用户名称');
                    return;
                }
                if (!this.roleValue || this.roleValue.length === 0) {
                    this.msg.error('请选择角色名称');
                    return;
                }
                ids = this.roleValue.join(',');
                this.http.post(this.okUrl, {
                    userId: this.userValue,
                    roleIds: ids
                }).subscribe((res: any) => {
                    if (res.code === 0) {
                        this.Visible = false;
                        setTimeout(() => {
                            this.closeModal.emit();
                            this.reloadData.emit();
                        }, 200);
                    } else {
                        this.msg.error('操作失败');
                    }
                });
                break;
            case 'del':
                ids = '';
                break;
        }

    }

    Cancel() {
        this.Visible = false;
        setTimeout(() => {
            this.closeModal.emit();
        }, 200);
    }
}