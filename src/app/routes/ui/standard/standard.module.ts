import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { StandardComponent } from './standard.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: StandardComponent
      }
    ])
  ],
  declarations: [StandardComponent],
  exports: [RouterModule]
})
export class StandardModule { }
