import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { XmindComponent } from './xmind.page';
import { StringDataComponent } from './xmind.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: XmindComponent
      }
    ])
  ],
  declarations: [XmindComponent, StringDataComponent],
  exports: [RouterModule]
})
export class XmindModule { }
