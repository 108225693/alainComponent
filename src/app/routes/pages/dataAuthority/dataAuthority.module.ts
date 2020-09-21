import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { DataAuthorityComponent } from './dataAuthority.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DataAuthorityComponent
      }
    ])
  ],
  declarations: [DataAuthorityComponent],
  exports: [RouterModule]
})
export class DataAuthorityModule { }
