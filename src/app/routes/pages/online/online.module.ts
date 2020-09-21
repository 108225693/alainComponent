import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { OnlineComponent } from './online.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OnlineComponent
      }
    ])
  ],
  declarations: [OnlineComponent],
  exports: [RouterModule]
})
export class OnlineModule { }
