import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { LineStationComponent } from './lineStation.page';
import { OperaModalComponent } from './operaModal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LineStationComponent
      }
    ])
  ],
  declarations: [LineStationComponent, OperaModalComponent],
  exports: [RouterModule]
})
export class LineStationModule { }
