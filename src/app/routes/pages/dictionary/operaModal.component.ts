import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-operamodal',
    template: `
    <nz-modal [(nzVisible)]="Visible" nzWidth="700" [nzTitle]="popTitle" (nzOnCancel)="Cancel()" (nzOnOk)="Ok()">
        <div *ngIf="operaType !== 'del'" nz-row>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">字典名称</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input nz-input [(ngModel)]="nameValue" /> </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">字典类型</nz-form-label>
                    <nz-form-control [nzSpan]="12"> 
                        <nz-select nzPlaceHolder="-请选择-" [(ngModel)]="typeValue" class="wd100">
                            <nz-option *ngFor="let item of typeSelect" [nzLabel]="item.label" [nzValue]="item.value"></nz-option> 
                        </nz-select> 
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">排序</nz-form-label>
                    <nz-form-control [nzSpan]="12"> 
                        <nz-select nzPlaceHolder="-请选择-" [(ngModel)]="orderValue" class="wd100">
                            <nz-option *ngFor="let item of orderSelect" [nzLabel]="item.label" [nzValue]="item.value"></nz-option> 
                        </nz-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">备注</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input nz-input [(ngModel)]="remarkValue" /> </nz-form-control>
                </nz-form-item>
            </div>
        </div>
        <div *ngIf="operaType === 'del'" nz-row>
            <p>确定要删除 <span style="color: #ff0000;">{{deltext}}</span> 吗？</p>
            <nz-alert nzType="warning" nzMessage="删除后将无法恢复" nzShowIcon></nz-alert>
        </div> 
    </nz-modal>
    `,
    styleUrls: ['./dictionary.page.less']
})
export class OperaModalComponent implements OnInit {
    Visible = false;
    okUrl = '';
    popTitle = '';
    deltext = '';
    operaData: any = {};
    nameValue = '';
    typeSelect: any = [];
    typeValue = null;
    orderSelect: any = [];
    orderValue = null;
    remarkValue = '';
    operaId = '';

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
                this.popTitle = '新增字典';
                this.okUrl = environment.apiBase + '/system/dict/add';
                setTimeout(() => {
                    this.Visible = true;
                    this.getType(() => {
                        // to do
                    });
                });
                break;
            case 'edit':
                this.popTitle = '修改字典';
                this.okUrl = environment.apiBase + '/system/dict/update';
                let editstatus = false;
                let editcount = 0;
                for (const i in this.responseData) {
                    if (this.responseData[i].checked) {
                        editcount = editcount + 1;
                        this.operaData = this.responseData[i];
                        editstatus = true;
                    }
                }
                if (editstatus && editcount === 1) {
                    // 回填数据
                    this.getType(() => {
                        this.operaId = this.operaData.id;
                        this.nameValue = this.operaData.name;
                        this.typeValue = this.operaData.typeId;
                        this.orderValue = this.operaData.nOrder;
                        this.remarkValue = this.operaData.remark;
                    });
                } else {
                    this.Cancel();
                    this.msg.error('请选择一条数据进行修改');
                }
                break;
            case 'del':
                this.popTitle = '删除字典';
                this.okUrl = environment.apiBase + '/system/dict/delete';
                let delstatus = false;
                let delcount = 0;
                for (const i in this.responseData) {
                    if (this.responseData[i].checked) {
                        delcount = delcount + 1;
                        this.operaData = this.responseData[i];
                        delstatus = true;
                    }
                }
                if (delstatus && delcount === 1) {
                    // 回填数据
                    setTimeout(() => {
                        this.Visible = true;
                        this.deltext = this.operaData.name;
                    });
                } else {
                    this.Cancel();
                    this.msg.error('请选择一条数据进行修改');
                }
                break;
        }
    }

    getType(callback) {
        setTimeout(() => {
            this.Visible = true;
            this.http.get(environment.apiBase + '/system/dictType/query').subscribe((res: any) => {
                if (res.code === 0) {
                    for (const item of res.data) {
                        this.typeSelect.push({
                            value: item.id,
                            label: item.name
                        })
                    }
                    callback()
                }
            });
            for (let i = 1; i < 100; i++) {
                this.orderSelect.push({
                    value: JSON.stringify(i),
                    label: JSON.stringify(i)
                });
            }
            this.orderValue = this.orderSelect[0].value;
        });
    }

    Ok() {
        let param: any;
        switch (this.operaType) {
            case 'add':
                if (this.nameValue === '') {
                    this.msg.error('字典名称不能为空');
                    return;
                }
                if (!this.typeValue || this.typeValue === '') {
                    this.msg.error('请选择字典类型');
                    return;
                }
                param = { 'name': this.nameValue, 'typeId': this.typeValue, 'nOrder': this.orderValue, 'remark': this.remarkValue };
                break;
            case 'edit':
                if (this.nameValue === '') {
                    this.msg.error('字典名称不能为空');
                    return;
                }
                if (!this.typeValue || this.typeValue === '') {
                    this.msg.error('请选择字典类型');
                    return;
                }
                param = { id: this.operaId, 'name': this.nameValue, 'typeId': this.typeValue, 'nOrder': this.orderValue, 'remark': this.remarkValue };
                break;
            case 'del':
                param = [this.operaData.id];
                break;
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