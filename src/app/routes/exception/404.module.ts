import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Exception404Component } from './404.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: Exception404Component
      }
    ])
  ],
  declarations: [Exception404Component],
  exports: [RouterModule]
})
export class Exception404Module { }
