import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fontstyle',
  templateUrl: './fontstyle.page.html',
  styleUrls: ['./fontstyle.page.less']
})
export class FontstyleComponent implements OnInit {
  editStr = '这是一个可编辑的文本.';
  copyStr = '这是一个可复制的文本.';

  constructor() { }

  ngOnInit() {

  }

}
