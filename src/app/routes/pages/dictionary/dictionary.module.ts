import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { DictionaryComponent } from './dictionary.page';
import { OperaModalComponent } from './operaModal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DictionaryComponent
      }
    ])
  ],
  declarations: [DictionaryComponent, OperaModalComponent],
  exports: [RouterModule]
})
export class DictionaryModule { }
