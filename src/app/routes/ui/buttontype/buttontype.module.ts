import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ButtontypeComponent } from './buttontype.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ButtontypeComponent
      }
    ])
  ],
  declarations: [ButtontypeComponent],
  exports: [RouterModule]
})
export class ButtontypeModule { }
