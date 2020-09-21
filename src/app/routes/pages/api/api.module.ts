import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ApiComponent } from './api.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ApiComponent
      }
    ])
  ],
  declarations: [ApiComponent],
  exports: [RouterModule]
})
export class ApiModule { }
