import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { OrgStationComponent } from './orgStation.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrgStationComponent
      }
    ])
  ],
  declarations: [OrgStationComponent],
  exports: [RouterModule]
})
export class OrgStationModule { }
