import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fromentry',
  templateUrl: './fromentry.page.html',
  styleUrls: ['./fromentry.page.less']
})
export class FromentryComponent implements OnInit {
  validateForm: FormGroup;
  selectedValue = 'lucy';
  value: string;
  nodes = [
    {
      title: '凤凰山',
      key: '100',
      children: [
        {
          title: '信号机',
          key: '1001',
          children: [
            { title: 'XX信号机', key: '10010', isLeaf: true },
            { title: 'XXXX信号机', key: '10011', isLeaf: true }
          ]
        },
        {
          title: '轨道电路',
          key: '1002',
          children: [{ title: 'XX轨道电路', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];
  inputValue: string;
  filteredOptions: string[] = [];
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  visible = false;
  placement = 'right';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.filteredOptions = this.options;
    this.value = '10011';
  }

  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  open(type): void {
    this.placement = type;
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

}
