import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-operamodal',
    template: `
    <nz-modal [(nzVisible)]="Visible" nzWidth="700" [nzTitle]="popTitle" (nzOnCancel)="Cancel()" (nzOnOk)="Ok()">
        <div nz-row>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">按钮名称</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input nz-input [(ngModel)]="buttonNameValue" /> </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">按钮图标名</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input nz-input [(ngModel)]="buttonIconValue" /> </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">菜单名称</nz-form-label>
                    <nz-form-control [nzSpan]="12">
                        <nz-tree-select class="wd100" [nzNodes]="menuNodes" nzPlaceHolder="--请选择--" [(ngModel)]="menuValue"></nz-tree-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">按钮URL</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input nz-input [(ngModel)]="buttonUrlValue" /> </nz-form-control>
                </nz-form-item>
            </div>
        </div>
    </nz-modal>
    `,
    styleUrls: ['./button.page.less']
})
export class OperaModalComponent implements OnInit {
    Visible = false;
    okUrl = '';
    popTitle = '';
    buttonNameValue = '';
    buttonIconValue = '';
    buttonUrlValue = 'http://';
    menuNodes: any = [];
    menuValue = '';
    buttonId = '';

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
                this.popTitle = '新增按钮';
                this.okUrl = environment.apiBase + '/system/menuBtn/add';
                this.getApi(() => {
                    // to do
                });
                break;
            case 'edit':
                this.popTitle = '修改按钮';
                this.okUrl = environment.apiBase + '/system/menuBtn/update';

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
                    this.getApi(() => {
                        // 回填数据
                        this.buttonId = data.id;
                        this.buttonNameValue = data.name;
                        this.buttonIconValue = data.code;
                        this.buttonUrlValue = data.url;
                        this.menuValue = data.menuId;
                    });
                } else {
                    this.Cancel();
                    this.msg.error('请选择一条数据进行修改');
                }
                break;
        }
    }
    getApi(callback) {
        setTimeout(() => {
            this.Visible = true;
            const allApi = [
                this.http.get(environment.apiBase + '/system/menu/query')
            ];
            forkJoin(allApi).subscribe((results: any) => {
                if (results[0].code === 0) {
                    const treeNode = results[0].data[0].list;

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
                if (callback) {
                    callback()
                }
            });
        }, 200);
    }
    Ok() {
        if (this.buttonNameValue === '') {
            this.msg.error('请输入按钮名称');
            return;
        }
        if (this.buttonIconValue === '') {
            this.msg.error('请输入按钮图标名');
            return;
        }
        if (!this.menuValue || this.menuValue === '') {
            this.msg.error('请选择菜单名称');
            return;
        }
        const param: any = { name: this.buttonNameValue, code: this.buttonIconValue, menuId: this.menuValue, url: this.buttonUrlValue }
        if (this.operaType === 'edit') {
            param.id = this.buttonId;
        }

        this.http.post(this.okUrl, param).subscribe((res: any) => {
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
    }

    Cancel() {
        this.Visible = false;
        setTimeout(() => {
            this.closeModal.emit();
        }, 200);
    }
}