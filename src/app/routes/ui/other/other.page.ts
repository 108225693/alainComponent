import { Component, OnInit } from '@angular/core';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-other',
  templateUrl: './other.page.html',
  styleUrls: ['./other.page.less']
})
export class OtherComponent implements OnInit {
  date = new Date(2020, 1, 1);
  mode = 'month';
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  value1 = 1;
  value2 = 0;
  list = [];
  fileList = [
    {
      uid: '1',
      name: 'xxx.jsp',
      status: 'done',
      response: 'Server Error 500',
      url: 'http://www.baidu.com/xxx.jsp'
    },
    {
      uid: '2',
      name: 'yyy.mp4',
      status: 'done',
      url: 'http://www.baidu.com/yyy.mp4'
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500',
      url: 'http://www.baidu.com/zzz.png'
    },
    {
      uid: '4',
      name: 'aaa.doc',
      status: 'done',
      response: 'Server Error 500',
      url: 'http://www.baidu.com/aaa.doc'
    },
    {
      uid: '5',
      name: 'bbb.txt',
      status: 'done',
      response: 'Server Error 500',
      url: 'http://www.baidu.com/bbb.txt'
    },
    {
      uid: '6',
      name: 'ccc.exe',
      status: 'done',
      response: 'Server Error 500',
      url: 'http://www.baidu.com/ccc.exe'
    }
  ];
  marks: NzMarks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50'
      },
      label: '<strong>100°C</strong>'
    }
  };
  min = 0;
  max = 20;
  mid = parseFloat(((this.max - this.min) / 2).toFixed(5));
  preHighLight = false;
  nextHighLight = false;
  _sliderValue = 0;
  disabled = false;

  set sliderValue(value: number) {
    this._sliderValue = value;
    this.highlightIcon();
  }

  get sliderValue(): number {
    return this._sliderValue;
  }

  ngOnInit() {
    this.sliderValue = 0;
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : undefined
      });
    }
  }

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
  highlightIcon(): void {
    const lower = this._sliderValue >= this.mid;
    this.preHighLight = !lower;
    this.nextHighLight = lower;
  }
  // tslint:disable-next-line:no-any
  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  search(ret: {}): void {
    console.log('nzSearchChange', ret);
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }
  changeMarks(): void {
    this.marks = {
      20: '20%',
      99: '99%'
    };
  }
}
