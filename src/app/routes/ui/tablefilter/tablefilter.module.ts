import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TablefilterComponent } from './tablefilter.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TablefilterComponent
      }
    ])
  ],
  declarations: [TablefilterComponent],
  exports: [RouterModule]
})
export class TablefilterModule { }
