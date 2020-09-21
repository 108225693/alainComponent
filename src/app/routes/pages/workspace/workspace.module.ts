import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { WorkspaceComponent } from './workspace.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: WorkspaceComponent
      }
    ])
  ],
  declarations: [WorkspaceComponent],
  exports: [RouterModule]
})
export class WorkspaceCModule { }
