import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-pwdmodal',
    template: `
    <nz-modal [(nzVisible)]="Visible" nzWidth="500" [nzTitle]="title" (nzOnCancel)="Cancel()" (nzOnOk)="Ok()">
        <div nz-row *ngIf="responseType === 'edit'">
            <div nz-col nzSpan="24">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">旧密码</nz-form-label>
                    <nz-form-control [nzSpan]="12"> 
                        <input nz-input type="password" [(ngModel)]="oldPwd" /> 
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="24">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">新密码</nz-form-label>
                    <nz-form-control [nzSpan]="12"> 
                        <input nz-input type="password" [(ngModel)]="newPwd" /> 
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="24">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">确认新密码</nz-form-label>
                    <nz-form-control [nzSpan]="12"> 
                        <input nz-input type="password" [(ngModel)]="rePwd" /> 
                    </nz-form-control>
                </nz-form-item>
            </div>
        </div>
        <div nz-row *ngIf="responseType === 'reset'">
            <p>确定将密码重置为 <span style="color: #ff0000;">123456</span> 吗？</p>
        </div>
    </nz-modal>
    `,
    styleUrls: ['./user.page.less']
})
export class PwdModalComponent implements OnInit {
    Visible = false;
    title = '';
    dataurl = '';
    params = {};
    oldPwd = '';
    newPwd = '';
    rePwd = '';
    data: any = {};
    @Input() responseData: any;
    @Input() responseType: any;
    @Output() public closeModal = new EventEmitter();

    constructor(
        private msg: NzMessageService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        setTimeout(() => {
            let status = false;
            let count = 0;
            for (const i in this.responseData) {
                if (this.responseData[i].checked) {
                    count = count + 1;
                    this.data = this.responseData[i];
                    status = true;
                }
            }
            if (status && count === 1) {
                this.Visible = true;
            } else {
                this.Cancel();
                this.msg.error('请选择一条数据重置密码');
            }
            switch (this.responseType) {
                case 'reset':
                    this.title = '重置密码';
                    break;
                case 'edit':
                    this.title = '修改密码';
                    break;
            }
        }, 200);
    }

    Ok() {
        switch (this.responseType) {
            case 'reset':
                this.dataurl = environment.apiBase + '/system/user/resetPassword';
                this.params = { 'id': this.data.id };
                break;
            case 'edit':
                if (this.newPwd !== this.rePwd) {
                    this.msg.error('新密码和确认密码不一致');
                    return;
                }
                if (this.oldPwd === this.newPwd) {
                    this.msg.error('新密码和旧密码不能相同');
                    return;
                }
                this.dataurl = environment.apiBase + '/system/user/changePass';
                this.params = { 'userId': this.data.id, 'oldPass': this.oldPwd, 'newPass': this.newPwd };
                break;
        }
        this.http.post(this.dataurl, this.params).subscribe((res: any) => {
            if (res.code === 0) {
                this.Cancel();
                this.msg.info(res.msg);
            } else {
                this.msg.error(res.msg);
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