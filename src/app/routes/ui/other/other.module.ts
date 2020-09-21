import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { OtherComponent } from './other.page';
import { GridsterModule } from 'angular2gridster';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GridsterModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: OtherComponent
      }
    ])
  ],
  declarations: [OtherComponent],
  exports: [RouterModule]
})
export class OtherModule { }
