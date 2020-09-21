import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { LocalStorage } from '@core/local.storage';
import { DatePipe } from '@angular/common';
import { _HttpClient } from '@delon/theme';
import { environment } from '../../../../environments/environment';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-operamodal',
    templateUrl: './operaModal.component.html',
    styleUrls: ['./lineStation.page.less']
})
export class OperaModalComponent implements OnInit {
    @Input() apiUrl: any;
    @Input() operaType: any;
    @Input() width: any;
    @Input() responseData: any;
    @Input() popTitle: any;
    @Output() public closeModal = new EventEmitter();
    @Output() public reloadData = new EventEmitter();

    Visible = false;
    operaData: any = {};
    objData: any = {};
    lineType = [];
    thisData: any = { 'count': 0, 'id': [] };
    treeNodeStyle = { 'max-height': '300px', 'overflow-y': 'auto', 'overflow-x': 'hidden' };

    constructor(
        private msg: NzMessageService,
        public ls: LocalStorage,
        private http: _HttpClient,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
        if (!this.width) {
            this.width = '500';
        }
        switch (this.operaType) {
            case 'add':
                this.getOperaApi('update', () => {

                });
                break;
            case 'edit':
                let updateStatus = false;
                let updateCount = 0;
                for (const i in this.responseData) {
                    if (this.responseData[i].checked) {
                        updateCount += 1;
                        this.objData = this.responseData[i];
                        updateStatus = true;
                    }
                }
                if (updateStatus && updateCount === 1) {
                    this.getOperaApi('update', () => {
                        // 回填数据
                        this.operaData.id = this.objData.id;
                        this.operaData.name = this.objData.name;
                        this.operaData.lineType = this.objData.lineType;
                        console.log(this.objData)
                    });
                } else {
                    this.Cancel();
                    this.msg.error('请选择一条数据进行操作');
                }
                break;
            case 'del':
                let delStatus = false;
                for (const i in this.responseData) {
                    if (this.responseData[i].checked) {
                        this.objData = this.responseData[i];
                        this.thisData.count += 1;
                        this.thisData.id.push(this.responseData[i].id);
                        delStatus = true;
                    }
                }
                if (delStatus) {
                    this.getOperaApi('del', () => {
                        // to do
                    });
                } else {
                    this.Cancel();
                    this.msg.error('请选择数据进行操作');
                }
                break;
        }
    }
    getOperaApi(type, callback) {
        setTimeout(() => {
            this.Visible = true;
            switch (type) {
                case 'update':// 包含add和edit
                    const updateApi = [
                        this.http.get(environment.apiBase + '/system/dict/getByDictType?type=lineType')
                    ];
                    forkJoin(updateApi).subscribe((results: any) => {
                        if (results[0].code === 0) {
                            this.lineType = results[0].data;
                        }
                        if (callback) {
                            callback()
                        }
                    });
                    break;
                default:
                    if (callback) {
                        callback()
                    }
                    break;
            }
        }, 200);
    }
    Ok() {
        let param: any;
        switch (this.operaType) {
            case 'add':
            case 'edit':
                if (!this.operaData.lineType || !this.operaData.name) {
                    this.msg.error('必填项不能为空', { nzDuration: 1000 });
                    return;
                }
                param = JSON.parse(JSON.stringify(this.operaData));
                if (this.operaType === 'edit') {
                    param.id = this.operaData.id;
                }
                break;
            case 'del':
                param = this.thisData.id;
                break;
        }
        this.http.post(this.apiUrl, param).subscribe((res: any) => {
            if (res.code === 0) {
                this.Visible = false;
                setTimeout(() => {
                    this.closeModal.emit();
                    this.reloadData.emit();
                }, 200);
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