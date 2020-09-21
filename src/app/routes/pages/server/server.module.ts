import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ServerComponent } from './server.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ServerComponent
      }
    ])
  ],
  declarations: [ServerComponent],
  exports: [RouterModule]
})
export class ServerModule { }
