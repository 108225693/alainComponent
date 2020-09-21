import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-delmodal',
    templateUrl: './delmodal.component.html'
})
export class DelModalComponent implements OnInit {
    Visible = false;
    deltext = '';
    data: any = {};
    @Input() responseData: any;
    @Input() apiUrl: any;
    @Input() apiType: any;
    @Output() public closeModal = new EventEmitter();
    @Output() public reloadData = new EventEmitter();

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
                if (this.data.loginName) {
                    this.deltext = this.data.loginName;
                }
                if (this.data.userName) {
                    this.deltext = this.data.userName;
                }
                if (this.data.name) {
                    this.deltext = this.data.name;
                }
                this.Visible = true;
            } else {
                this.Cancel();
                this.msg.error('请选择一条数据进行操作');
            }
        }, 200);
    }

    Ok() {
        let param: any = {};
        let url = environment.apiBase + this.apiUrl;
        if (this.apiType === 'array') {
            param = [this.data.id];
        } else {
            url += '/' + this.data.id;
        }
        console.log(param, url)
        this.http.post(url, param).subscribe((res: any) => {
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