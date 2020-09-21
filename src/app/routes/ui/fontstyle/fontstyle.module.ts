import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { FontstyleComponent } from './fontstyle.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: FontstyleComponent
      }
    ])
  ],
  declarations: [FontstyleComponent],
  exports: [RouterModule]
})
export class FontstyleModule { }
