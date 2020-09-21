import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TaskComponent } from './task.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TaskComponent
      }
    ])
  ],
  declarations: [TaskComponent],
  exports: [RouterModule]
})
export class TaskModule { }
