import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { PageTagComponent } from './page.tag';
import { GridComponent } from './grid.page';
import { GridsterModule } from 'angular2gridster';

import { TagFormComponent } from './tag/form.component';
import { TagDescComponent } from './tag/desc.component';
import { TagTableComponent } from './tag/table.component';
import { TagEchartsLineComponent } from './tag/echartsline.component';
import { TagEchartsBarComponent } from './tag/echartsbar.component';
import { TagEchartsPieComponent } from './tag/echartspie.component';

const tagComponent = [
  TagEchartsLineComponent,
  TagEchartsBarComponent,
  TagEchartsPieComponent,
  TagFormComponent,
  TagDescComponent,
  TagTableComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GridsterModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: PageTagComponent
      }
    ])
  ],
  declarations: [GridComponent, PageTagComponent, ...tagComponent],
  exports: [RouterModule]
})
export class GridModule { }
