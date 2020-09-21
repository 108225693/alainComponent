import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { PopmodalComponent } from './popmodal.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PopmodalComponent
      }
    ])
  ],
  declarations: [PopmodalComponent],
  exports: [RouterModule]
})
export class PopmodalModule { }
