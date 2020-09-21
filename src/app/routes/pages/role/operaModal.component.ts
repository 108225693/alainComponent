import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-operamodal',
    template: `
    <nz-modal [(nzVisible)]="Visible" nzWidth="700" [nzTitle]="popTitle" (nzOnCancel)="Cancel()" (nzOnOk)="Ok()">
        <div nz-row>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">角色名称</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input nz-input [(ngModel)]="roleValue" /> </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">备注</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input nz-input [(ngModel)]="remarksValue" /> </nz-form-control>
                </nz-form-item>
            </div>
        </div>
    </nz-modal>
    `,
    styleUrls: ['./role.page.less']
})
export class OperaModalComponent implements OnInit {
    Visible = false;
    okUrl = '';
    id = '';
    popTitle = '';
    roleValue = '';
    remarksValue = '';

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
                setTimeout(() => {
                    this.Visible = true;
                    this.popTitle = '新增角色';
                    this.okUrl = environment.apiBase + '/system/role/add';
                }, 200);
                break;
            case 'edit':
                setTimeout(() => {
                    this.popTitle = '修改角色';
                    this.okUrl = environment.apiBase + '/system/role/update';
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
                        this.Visible = true;
                        // 回填数据
                        this.id = data.id;
                        this.roleValue = data.name;
                        this.remarksValue = data.remarks;
                    } else {
                        this.Cancel();
                        this.msg.error('请选择一条数据进行修改');
                    }
                }, 200);
                break;
        }
    }

    Ok() {
        const param: any = { name: this.roleValue, remarks: this.remarksValue };
        if (this.roleValue === '') {
            this.msg.error('角色名称不能为空');
            return;
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