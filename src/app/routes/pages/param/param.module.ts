import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ParamComponent } from './param.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ParamComponent
      }
    ])
  ],
  declarations: [ParamComponent],
  exports: [RouterModule]
})
export class ParamModule { }
