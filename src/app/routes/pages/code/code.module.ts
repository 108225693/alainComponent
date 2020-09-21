import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { CodeComponent } from './code.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CodeComponent
      }
    ])
  ],
  declarations: [CodeComponent],
  exports: [RouterModule]
})
export class CodeModule { }
