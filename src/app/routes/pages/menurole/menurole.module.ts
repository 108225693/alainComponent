import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { MenuroleComponent } from './menurole.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MenuroleComponent
      }
    ])
  ],
  declarations: [MenuroleComponent],
  exports: [RouterModule]
})
export class MenuroleModule { }
