import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { DataComponent } from './data.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DataComponent
      }
    ])
  ],
  declarations: [DataComponent],
  exports: [RouterModule]
})
export class DataModule { }
