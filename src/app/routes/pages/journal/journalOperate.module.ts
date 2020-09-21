import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { JournalOperateComponent } from './journalOperate.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: JournalOperateComponent
      }
    ])
  ],
  declarations: [JournalOperateComponent],
  exports: [RouterModule]
})
export class JournalOperateModule { }
