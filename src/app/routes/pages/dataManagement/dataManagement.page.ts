import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
  selector: 'app-datamanagement',
  templateUrl: './dataManagement.page.html',
  styleUrls: ['./dataManagement.page.less']
})
export class DataManagementComponent implements OnInit {
  LoadDatabaseUrl = environment.rTabBase + '/interlock/data/import';
  LoadDatabaseText = '';

  constructor(public http: HttpClient) { }

  ngOnInit() {

  }

  LoadDatabaseReq = (item) => {
    const formData = new FormData();
    formData.append('file', item.file);

    const req = new HttpRequest('POST', item.action!, formData, {
      reportProgress: false,
      withCredentials: true
    });
    return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
      if (event instanceof HttpResponse) {
        // 处理成功
        item.onSuccess!(event.body, item.file!, event);
        const res: any = event.body;
        this.LoadDatabaseText = !res.code ? '导入成功' : res.msg;
      }
    });
  }

  exportDatabase() {
    this.http.post(environment.rTabBase + '/interlock/data/export', {}, { responseType: 'blob' }).subscribe((res: any) => {
      if (res instanceof Blob) {
        const link: HTMLAnchorElement = document.createElement('a');
        link.style.display = 'none';
        link.href = URL.createObjectURL(res);
        link.setAttribute('download', 'data.sql');
        document.documentElement.appendChild(link);
        link.click();
        document.documentElement.removeChild(link);
      }
    })
  }
}
