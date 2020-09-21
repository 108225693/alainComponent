import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ManageStationComponent } from './manageStation.page';
import { OperaModalComponent } from './operaModal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManageStationComponent
      }
    ])
  ],
  declarations: [ManageStationComponent, OperaModalComponent],
  exports: [RouterModule]
})
export class ManageStationModule { }
