import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ButtonComponent } from './button.page';
import { OperaModalComponent } from './operaModal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ButtonComponent
      }
    ])
  ],
  declarations: [ButtonComponent, OperaModalComponent],
  exports: [RouterModule]
})
export class ButtonModule { }
