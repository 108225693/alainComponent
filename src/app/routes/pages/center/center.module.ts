import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { CenterComponent } from './center.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CenterComponent
      }
    ])
  ],
  declarations: [CenterComponent],
  exports: [RouterModule]
})
export class CenterModule { }
