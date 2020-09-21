import { Component } from '@angular/core';

@Component({
    selector: 'app-pagetag',
    template: `<app-grid [gridEdit]="true" [gridData]="data"></app-grid>`
})
/*
 * <app-grid [gridEdit]="true" [gridType]="typeId"></app-grid> 
 * gridEdit=true时可编辑，可不带
 * gridData模板数据，可不带
*/

export class PageTagComponent {
    data = [];

    constructor() {
        this.data = [
            { "id": 100, "dataValue": "折线图", "x": 3, "y": 2, "w": 0, "h": 1, "title": "测试标题111", "dragAndDrop": true, "resizable": true, "xSm": 0, "ySm": 0, "wSm": 1, "hSm": 1, "xMd": 0, "yMd": 0, "wMd": 1, "hMd": 1, "xLg": 0, "yLg": 0, "wLg": 3, "hLg": 2, "xXl": 0, "yXl": 0, "wXl": 1, "hXl": 1 },
            { "id": 200, "dataValue": "柱状图", "x": 3, "y": 2, "w": 0, "h": 1, "title": "测试标题222", "dragAndDrop": true, "resizable": true, "xSm": 0, "ySm": 0, "wSm": 1, "hSm": 1, "xMd": 0, "yMd": 0, "wMd": 1, "hMd": 1, "xLg": 3, "yLg": 0, "wLg": 3, "hLg": 2, "xXl": 0, "yXl": 0, "wXl": 1, "hXl": 1 },
            { "id": 300, "dataValue": "饼图", "x": 3, "y": 2, "w": 0, "h": 1, "title": "测试标题333", "dragAndDrop": true, "resizable": true, "xSm": 0, "ySm": 0, "wSm": 1, "hSm": 1, "xMd": 0, "yMd": 0, "wMd": 1, "hMd": 1, "xLg": 0, "yLg": 2, "wLg": 6, "hLg": 2, "xXl": 0, "yXl": 0, "wXl": 1, "hXl": 1 }
        ];
    }
}