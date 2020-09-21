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
                    <nz-form-label nzRequired [nzSpan]="8">部门名称</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input nz-input [(ngModel)]="nameValue" /> </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">部门简称</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input nz-input [(ngModel)]="shortNameValue" /> </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">部门类型</nz-form-label>
                    <nz-form-control [nzSpan]="12">
                        <nz-select [(ngModel)]="orgValue" nzPlaceHolder="--请选择--" class="wd100">
                            <nz-option *ngFor="let item of orgSelect" [nzValue]="item.value" [nzLabel]="item.label">
                            </nz-option>
                        </nz-select>
                    </nz-form-control>
                </nz-form-item>
            </div> 
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">父菜单</nz-form-label>
                    <nz-form-control [nzSpan]="12">
                        <!--<nz-select [(ngModel)]="parentValue" nzPlaceHolder="--请选择--" class="wd100">
                            <nz-option *ngFor="let item of parentSelect" [nzValue]="item.value" [nzLabel]="item.label">
                            </nz-option>
                        </nz-select>-->
                        <nz-tree-select class="wd100" [nzNodes]="parentSelect" nzPlaceHolder="--请选择--" [(ngModel)]="parentValue"></nz-tree-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">排序</nz-form-label>
                    <nz-form-control [nzSpan]="12">
                        <nz-select [(ngModel)]="numValue" nzPlaceHolder="--请选择--" class="wd100">
                            <nz-option *ngFor="let item of numSelect" [nzValue]="item.value" [nzLabel]="item.label">
                            </nz-option>
                        </nz-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
        </div>
    </nz-modal>
    `,
    styleUrls: ['./department.page.less']
})
export class OperaModalComponent implements OnInit {
    Visible = false;
    okUrl = '';
    popTitle = '';
    id = '';
    nameValue = '';
    shortNameValue = '';
    orgSelect = [];
    orgValue = null;
    parentSelect = [];
    parentValue = null;
    numSelect = [];
    numValue = '1';

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
                this.popTitle = '新增部门';
                this.okUrl = environment.apiBase + '/system/org/add';
                this.getApi(() => {
                    // to do
                });
                break;
            case 'edit':
                this.popTitle = '修改部门';
                this.okUrl = environment.apiBase + '/system/org/update';
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
                        this.id = data.id;
                        this.nameValue = data.name;
                        this.shortNameValue = data.shortName;
                        this.orgValue = data.orgType;
                        this.parentValue = data.pid;
                        this.numValue = JSON.stringify(data.num);
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
                this.http.get(environment.apiBase + '/system/dict/getByDictType?type=orgType'),
                this.http.get(environment.apiBase + '/system/org/getOrgTree')
            ];
            forkJoin(allApi).subscribe((results: any) => {
                if (results[0].code === 0) {
                    for (const item of results[0].data) {
                        this.orgSelect.push({
                            value: item.id,
                            label: item.name
                        })
                    }
                }
                if (results[1].code === 0) {
                    this.parentSelect = results[1].data;
                }
                for (let i = 1; i < 100; i++) {
                    this.numSelect.push({
                        value: JSON.stringify(i),
                        label: JSON.stringify(i)
                    });
                }

                if (callback) {
                    callback()
                }
            });
        }, 200);
    }
    Ok() {
        if (this.nameValue === '') {
            this.msg.error('部门名称不能为空');
            return;
        }
        if (!this.orgValue && this.orgValue === '') {
            this.msg.error('部门类型不能为空');
            return;
        }
        const param: any = {
            name: this.nameValue,
            shortName: this.shortNameValue,
            orgType: this.orgValue,
            pid: this.parentValue,
            num: this.numValue
        }
        if (this.operaType === 'edit') {
            param.id = this.id;
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