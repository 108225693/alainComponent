import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-operamodal',
    template: `
    <nz-modal [(nzVisible)]="Visible" nzWidth="700" nzTitle="添加" (nzOnCancel)="Cancel()" (nzOnOk)="Ok()">
        <div nz-row>           
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">菜单名称</nz-form-label>
                    <nz-form-control [nzSpan]="12"> 
                        <input type="text" [(ngModel)]="titleValue" nz-input class="wd100" />
                    </nz-form-control>
                </nz-form-item>
            </div>            
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label nzRequired [nzSpan]="8">排序</nz-form-label>
                    <nz-form-control [nzSpan]="12"> 
                        <nz-select nzPlaceHolder="--请选择--" [(ngModel)]="numValue" class="wd100">
                            <nz-option *ngFor="let item of numSelect" [nzValue]="item.value" [nzLabel]="item.label"></nz-option>
                        </nz-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">菜单链接</nz-form-label>
                    <nz-form-control [nzSpan]="12"> 
                        <input type="text" [(ngModel)]="hrefValue" nz-input class="wd100" />
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">父级菜单</nz-form-label>
                    <nz-form-control [nzSpan]="12"> 
                        <!--<nz-select nzPlaceHolder="--请选择--" [(ngModel)]="parentValue" class="wd100">
                        <nz-option *ngFor="let item of parentSelect" [nzValue]="item.value" [nzLabel]="item.label"></nz-option>
                        </nz-select>-->
                        <nz-tree-select class="wd100" [nzNodes]="parentSelect" nzPlaceHolder="-请选择-" [(ngModel)]="parentValue">
                        </nz-tree-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">是否外链</nz-form-label>
                    <nz-form-control [nzSpan]="12"> 
                        <nz-select nzPlaceHolder="--请选择--" [(ngModel)]="extraValue" class="wd100">
                            <nz-option nzValue="0" nzLabel="否"></nz-option>
                            <nz-option nzValue="1" nzLabel="是"></nz-option>
                        </nz-select>
                    </nz-form-control>
                </nz-form-item>
            </div>
            <div nz-col nzSpan="12">
                <nz-form-item>
                    <nz-form-label [nzSpan]="8">图标</nz-form-label>
                    <nz-form-control [nzSpan]="12"> 
                        <input type="text" [(ngModel)]="iconValue" nz-input class="wd100" />
                    </nz-form-control>
                </nz-form-item>
            </div>
        </div>
    </nz-modal>
    `,
    styleUrls: ['./menu.page.less']
})
export class OperaModalComponent implements OnInit {
    Visible = false;
    popTitle = '';
    okUrl = '';
    id = '';
    titleValue = '';
    hrefValue = '';
    parentSelect = [];
    parentValue = null;
    numSelect = [];
    numValue = null;
    extraValue = '0';
    iconValue = '';

    @Input() operaType: any;
    @Input() responseData: any;
    @Output() public closeModal = new EventEmitter();
    @Output() public reloadData = new EventEmitter();

    constructor(
        private msg: NzMessageService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.Visible = true;
        for (let i = 1; i < 100; i++) {
            this.numSelect.push({
                value: i,
                label: i
            });
        }
        setTimeout(() => {
            this.Visible = true;
            switch (this.operaType) {
                case 'add':
                    this.popTitle = '新增菜单';
                    this.okUrl = environment.apiBase + '/system/menu/add';
                    this.menuList(() => {
                        // to do
                    });
                    break;
                case 'edit':
                    this.popTitle = '修改菜单';
                    this.okUrl = environment.apiBase + '/system/menu/update';
                    this.menuList(() => {
                        // 回填数据
                        this.id = this.responseData[0].id;
                        this.titleValue = this.responseData[0].title;
                        this.hrefValue = this.responseData[0].href;
                        this.parentValue = this.responseData[0].pid;
                        this.numValue = this.responseData[0].num;
                        this.extraValue = this.responseData[0].extra;
                        this.iconValue = this.responseData[0].icon;
                    });
                    break;
            }
        }, 200);
    }

    menuList(callback) {
        this.http.get(environment.apiBase + '/system/menu/query').subscribe((res: any) => {
            if (res.code === 0) {
                const treeNode = res.data[0].list;

                for (let i = 0; i < treeNode.length; i++) {
                    if (treeNode[i].children && treeNode[i].children.length !== 0) {
                        this.parentSelect.push({
                            title: treeNode[i].title,
                            key: treeNode[i].id,
                            children: []
                        });
                        for (let j = 0; j < treeNode[i].children.length; j++) {
                            if (treeNode[i].children[j].children && treeNode[i].children[j].children.length !== 0) {
                                this.parentSelect[i].children.push({
                                    title: treeNode[i].children[j].title,
                                    key: treeNode[i].children[j].id,
                                    children: []
                                });
                                for (let k = 0; k < treeNode[i].children[j].children.length; k++) {
                                    this.parentSelect[i].children[j].children.push({
                                        title: treeNode[i].children[j].children[k].title,
                                        key: treeNode[i].children[j].children[k].id,
                                        isLeaf: true
                                    });
                                }
                            } else {
                                this.parentSelect[i].children.push({
                                    title: treeNode[i].children[j].title,
                                    key: treeNode[i].children[j].id,
                                    isLeaf: true
                                });
                            }
                        }
                    } else {
                        this.parentSelect.push({
                            title: treeNode[i].title,
                            key: treeNode[i].id,
                            isLeaf: true
                        });
                    }
                }
                callback();
            }
        });
    }

    Ok() {
        if (!this.titleValue || this.titleValue === '') {
            this.msg.error('菜单名称不能为空');
            return;
        }
        if (!this.numValue || this.numValue === '') {
            this.msg.error('排序不能为空');
            return;
        }
        const param: any = {
            title: this.titleValue,
            href: this.hrefValue,
            pid: this.parentValue,
            num: !this.numValue ? '' : this.numValue,
            extra: this.extraValue,
            icon: this.iconValue
        }
        switch (this.operaType) {
            case 'edit':
                param.id = this.id;
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