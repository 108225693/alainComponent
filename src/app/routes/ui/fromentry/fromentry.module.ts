import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { FromentryComponent } from './fromentry.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: FromentryComponent
      }
    ])
  ],
  declarations: [FromentryComponent],
  exports: [RouterModule]
})
export class FromentryModule { }
