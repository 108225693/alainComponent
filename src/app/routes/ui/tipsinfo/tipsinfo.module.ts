import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TipsinfoComponent } from './tipsinfo.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TipsinfoComponent
      }
    ])
  ],
  declarations: [TipsinfoComponent],
  exports: [RouterModule]
})
export class TipsinfoModule { }
