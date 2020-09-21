import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { UserComponent } from './user.page';
import { OperaModalComponent } from './operaModal.component';
import { PwdModalComponent } from './pwdModal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent
      }
    ])
  ],
  declarations: [UserComponent, OperaModalComponent, PwdModalComponent],
  exports: [RouterModule]
})
export class UserModule { }
