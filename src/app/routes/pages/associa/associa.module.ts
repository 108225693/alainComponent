import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { AssociaComponent } from './associa.page';
import { OperaModalComponent } from './operaModal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AssociaComponent
      }
    ])
  ],
  declarations: [AssociaComponent, OperaModalComponent],
  exports: [RouterModule]
})
export class AssociaModule { }
