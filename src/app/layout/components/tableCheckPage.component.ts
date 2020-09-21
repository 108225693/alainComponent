import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-tablecheckpage',
    templateUrl: './tableCheckPage.component.html',
    styles: [`
        .pageWrap {position:relative;}
        .pageWrap .pageSelect{margin:15px 0 0 0;}
        .pageWrap .pageSelect .pageTotal{padding:0 5px;font-weight:bold;font-size:16px;color:#1890ff;}
        .pageWrap .pageInation{position:absolute;top:0;right:0;}
        .round{display:block;width:20px;height:20px;line-height:20px;margin:2px auto 0 auto;border-radius:50%;}
        .problemStatusText{margin:2px 0 0 3px;}
        .linkScroll{overflow-x:hidden;overflow-y:auto;max-height:105px;}
        .linkScroll a{display:block;}
        :host ::ng-deep .ant-input:focus{box-shadow:0 0 0 transparent}
    `]
})

@Injectable({ providedIn: 'root' })

export class TableCheckPageComponent implements OnInit {
    @Output() private tableLink = new EventEmitter();
    @Input() headData: any;
    @Input() tableId: any;
    @Input() tableScroll: any;
    @Input() plainData: any;

    apiUrl = '';
    apiParam = '';
    lockHeadScroll: any = { y: document.body.clientHeight - 295 + 'px' };
    screenWidth = { 'width': window.screen.width - 268 + 'px' };
    bodyData: any = [];
    ObjectKeys = [];

    allChecked = false;
    indeterminate = false;
    loading = true;
    displayData = [];
    selectedValue = '20';
    pageTotal = '';
    rowTotalTable = '0';
    pageValue = '1';

    constructor(
        public msg: NzMessageService,
        private http: _HttpClient
    ) { }

    ngOnInit() {
        if (this.tableScroll) {
            if (this.tableScroll.x) {
                this.lockHeadScroll.x = this.tableScroll.x;
            }
            if (this.tableScroll.y) {
                this.lockHeadScroll.y = this.tableScroll.y;
            }
        }
    }

    loadList(url, param) {
        this.apiUrl = url;
        this.apiParam = param;
        const newParam = '?page=' + this.pageValue + '&limit=' + this.selectedValue + param;
        // 请求后获取的数据
        this.http.get(url + newParam).subscribe((res: any) => {
            if (res.code === 0) {
                this.bodyData = res.data;
                this.pageTotal = res.count;
                this.rowTotalTable = res.count;
                // 字段和表头排序 
                this.ObjectKeys = this.plainData ? this.plainData : Object.keys(this.bodyData);
            }
            this.loading = false;
        });
    }

    getAllData() {
        return this.displayData;
    }
    rowChangeTable(ev) {
        this.pageValue = ev;
        this.loadList(this.apiUrl, this.apiParam);
    }
    selectedChange() {
        this.pageValue = '1';
        this.loadList(this.apiUrl, this.apiParam);
    }
    currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
        this.displayData = $event;
        this.refreshStatus();
    }
    refreshStatus(): void {
        const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
        const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
    }
    checkAll(value: boolean): void {
        this.displayData.forEach(data => {
            if (!data.disabled) {
                data.checked = value;
            }
        });
        this.refreshStatus();
    }
}
