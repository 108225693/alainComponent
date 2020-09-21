import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { DepartmentComponent } from './department.page';
import { OperaModalComponent } from './operaModal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DepartmentComponent
      }
    ])
  ],
  declarations: [DepartmentComponent, OperaModalComponent],
  exports: [RouterModule]
})
export class DepartmentModule { }
