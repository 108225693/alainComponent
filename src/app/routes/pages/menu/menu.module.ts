import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { MenuComponent } from './menu.page';
import { OperaModalComponent } from './operaModal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MenuComponent
      }
    ])
  ],
  declarations: [MenuComponent, OperaModalComponent],
  exports: [RouterModule]
})
export class MenuModule { }
