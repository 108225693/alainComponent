import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { RoleComponent } from './role.page';
import { OperaModalComponent } from './operaModal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: RoleComponent
      }
    ])
  ],
  declarations: [RoleComponent, OperaModalComponent],
  exports: [RouterModule]
})
export class RoleModule { }
