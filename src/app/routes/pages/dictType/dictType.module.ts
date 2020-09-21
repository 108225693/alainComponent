import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { DictTypeComponent } from './dictType.page';
import { OperaModalComponent } from './operaModal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DictTypeComponent
      }
    ])
  ],
  declarations: [DictTypeComponent, OperaModalComponent],
  exports: [RouterModule]
})
export class DictTypeModule { }
