import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-operamodal',
    template: `
    <nz-modal [(nzVisible)]="Visible" nzWidth="700" [nzTitle]="popTitle" (nzOnCancel)="Cancel()" (nzOnOk)="Ok()">
        <div nz-row>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">登录名称</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input [disabled]="locked" nz-input [(ngModel)]="loginNameValue" /> </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">姓名</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input nz-input [(ngModel)]="nameValue" /> </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">归属部门</nz-form-label>
                    <nz-form-control [nzSpan]="12">
                        <!--<nz-select [(ngModel)]="orgValue" nzPlaceHolder="--请选择--" class="wd100">
                            <nz-option *ngFor="let item of orgSelect" [nzValue]="item.value" [nzLabel]="item.label">
                            </nz-option>
                        </nz-select>-->
                        <nz-tree-select class="wd100" [nzNodes]="orgSelect" nzPlaceHolder="--请选择--" [(ngModel)]="orgValue"></nz-tree-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">生日</nz-form-label>
                    <nz-form-control [nzSpan]="12">
                        <nz-date-picker [(ngModel)]="birthdayValue"></nz-date-picker>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">用户密码</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input [disabled]="locked" type="password" [(ngModel)]="passwordValue" nz-input />
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                <!-- 后端不愿意改字段，所以把原'手机号码'改成'取得资格证时间' -->
                    <nz-form-label [nzSpan]="8">取得资格证时间</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <nz-date-picker [(ngModel)]="teleValue"></nz-date-picker> </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">确认密码</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input [disabled]="locked" type="password" [(ngModel)]="repwdValue" nz-input />
                    </nz-form-control>
                </nz-form-item>
            </div>    
            <div nz-col nzSpan="12">
                <nz-form-item>
                <!-- 后端不愿意改字段，所以把原'固定电话'改成'资格证书名称' -->
                    <nz-form-label [nzSpan]="8">资格证书名称</nz-form-label>
                    <nz-form-control [nzSpan]="12"> 
                        <nz-select [(ngModel)]="phoneValue" class="wd100">
                            <nz-option *ngFor="let item of certSelect" [nzValue]="item" [nzLabel]="item"></nz-option> 
                        </nz-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">用户性别</nz-form-label>
                    <nz-form-control [nzSpan]="12">
                        <nz-select [(ngModel)]="sexValue" nzPlaceHolder="--请选择--" class="wd100">
                            <nz-option *ngFor="let item of sexSelect" [nzValue]="item.value" [nzLabel]="item.label">
                            </nz-option>
                        </nz-select>
                    </nz-form-control>
                </nz-form-item>
            </div>      
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">电子邮箱</nz-form-label>
                    <nz-form-control [nzSpan]="12"> <input nz-input [(ngModel)]="emailValue" /> </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">工作岗位</nz-form-label>
                    <nz-form-control [nzSpan]="12">
                        <nz-select [(ngModel)]="unitValue" nzPlaceHolder="--请选择--" class="wd100">
                            <nz-option *ngFor="let item of unitSelect" [nzValue]="item.value" [nzLabel]="item.label">
                            </nz-option>
                        </nz-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">政治面貌</nz-form-label>
                    <nz-form-control [nzSpan]="12">
                        <nz-select [(ngModel)]="zzmmValue" nzPlaceHolder="--请选择--" class="wd100">
                            <nz-option *ngFor="let item of zzmmSelect" [nzValue]="item.value" [nzLabel]="item.label">
                            </nz-option>
                        </nz-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">学历</nz-form-label>
                    <nz-form-control [nzSpan]="12">
                        <nz-select [(ngModel)]="xlValue" nzPlaceHolder="--请选择--" class="wd100">
                            <nz-option *ngFor="let item of xlSelect" [nzValue]="item.value" [nzLabel]="item.label">
                            </nz-option>
                        </nz-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
        </div>
    </nz-modal>
    `,
    styleUrls: ['./user.page.less']
})
export class OperaModalComponent implements OnInit {
    Visible = false;
    locked = false;
    okUrl = '';
    popTitle = '';
    id = '';
    loginNameValue = '';
    passwordValue = '';
    repwdValue = '';
    nameValue = '';
    birthdayValue = '';
    phoneValue = '';
    emailValue = '';
    teleValue = '';
    orgSelect = [];
    orgValue = null;
    sexSelect = [
        { 'value': '0', 'label': '男' },
        { 'value': '1', 'label': '女' }
    ];
    certSelect = [
        '联锁管理（试验）资格证',
        '联锁试验资格证'
    ]
    sexValue = null;
    unitSelect = [];
    unitValue = null;
    roleSelect = [];
    roleValue = null;
    zzmmSelect = [];
    zzmmValue = null;
    xlSelect = [
        { 'value': '高中', 'label': '高中' },
        { 'value': '大学', 'label': '大学' },
        { 'value': '研究生', 'label': '研究生' },
        { 'value': '硕士', 'label': '硕士' },
        { 'value': '博士', 'label': '博士' },
        { 'value': '其他', 'label': '其他' }
    ]
    xlValue = null;

    @Input() operaType: any;
    @Input() responseData: any;
    @Output() public closeModal = new EventEmitter();
    @Output() public reloadData = new EventEmitter();

    constructor(
        private msg: NzMessageService,
        private http: HttpClient,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
        switch (this.operaType) {
            case 'add':
                this.popTitle = '新增用户';
                this.okUrl = environment.apiBase + '/system/user/add';
                this.getApi(() => {
                    // to do
                });
                break;
            case 'edit':
                this.popTitle = '修改用户';
                this.okUrl = environment.apiBase + '/system/user/update';
                this.locked = true;
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
                        this.loginNameValue = data.loginName;
                        this.passwordValue = data.password;
                        this.nameValue = data.name;
                        this.orgValue = data.orgId;
                        this.sexValue = data.sex;
                        this.birthdayValue = data.birthday;
                        this.phoneValue = data.phone;
                        this.emailValue = data.email;
                        this.unitValue = data.position;
                        this.teleValue = data.tele;
                        this.xlValue = data.education;
                        this.zzmmValue = data.politics;
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
                this.http.get(environment.apiBase + '/system/org/getOrgTree'),
                this.http.get(environment.apiBase + '/system/role/query'),
                this.http.get(environment.apiBase + '/system/dict/getByDictType?type=position'),
                this.http.get(environment.apiBase + '/system/dict/getByDictType?type=politics')
            ];
            forkJoin(allApi).subscribe((results: any) => {
                if (results[0].code === 0) {
                    this.orgSelect = results[0].data;
                }
                if (results[1].code === 0) {
                    for (const item of results[1].data) {
                        this.roleSelect.push({
                            value: item.id,
                            label: item.name
                        })
                    }
                }
                if (results[2].code === 0) {
                    for (const item of results[2].data) {
                        this.unitSelect.push({
                            value: item.id,
                            label: item.name
                        })
                    }
                }
                if (results[3].code === 0) {
                    for (const item of results[3].data) {
                        this.zzmmSelect.push({
                            value: item.id,
                            label: item.name
                        })
                    }
                }
                if (callback) {
                    callback()
                }
            });
        }, 200);
    }
    Ok() {
        let biy = '';
        if (this.nameValue === '') {
            this.msg.error('用户名称不能为空');
            return;
        }
        if (!this.orgValue || this.orgValue === '') {
            this.msg.error('请选择部门');
            return;
        }
        if (this.birthdayValue) {
            const date = new Date(this.birthdayValue);
            const Y = date.getFullYear();
            const M: any = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            biy = Y + '-' + M + '-' + D;
        }
        const param: any = {
            loginName: this.loginNameValue,
            password: this.passwordValue,
            name: this.nameValue,
            orgId: this.orgValue,
            sex: this.sexValue,
            birthday: biy,
            phone: this.phoneValue,
            email: this.emailValue,
            position: this.unitValue,
            tele: this.datePipe.transform(this.teleValue, 'yyyy-MM-dd'),
            education: this.xlValue,
            politics: this.zzmmValue,
            del: 0
        }
        if (this.operaType === 'add') {
            if (this.loginNameValue === '') {
                this.msg.error('登录名称不能为空');
                return;
            }
            if (this.passwordValue.length < 6 || this.repwdValue.length < 6) {
                this.msg.error('密码长度太短');
                return;
            }
            if (this.passwordValue === '' || this.repwdValue === '') {
                this.msg.error('密码不能为空');
                return;
            }
            if (this.passwordValue !== this.repwdValue) {
                this.msg.error('两次密码不相同');
                return;
            }
        }
        if (this.operaType === 'edit') {
            param.id = this.id;
            delete param.password;
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