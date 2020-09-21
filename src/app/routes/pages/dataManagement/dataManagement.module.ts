import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { DataManagementComponent } from './dataManagement.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DataManagementComponent
      }
    ])
  ],
  declarations: [DataManagementComponent],
  exports: [RouterModule]
})
export class DataManagementModule { }
