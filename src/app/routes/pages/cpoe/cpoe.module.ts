import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { CpoeComponent } from './cpoe.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CpoeComponent
      }
    ])
  ],
  declarations: [CpoeComponent],
  exports: [RouterModule]
})
export class CpoeModule { }
