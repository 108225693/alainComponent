import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { GridsterComponent, IGridsterOptions, IGridsterDraggableOptions } from 'angular2gridster';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.less'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {
  static X_PROPERTY_MAP: any = {
    sm: 'xSm',
    md: 'xMd',
    lg: 'xLg',
    xl: 'xXl'
  };

  static Y_PROPERTY_MAP: any = {
    sm: 'ySm',
    md: 'yMd',
    lg: 'yLg',
    xl: 'yXl'
  };

  static W_PROPERTY_MAP: any = {
    sm: 'wSm',
    md: 'wMd',
    lg: 'wLg',
    xl: 'wXl'
  };

  static H_PROPERTY_MAP: any = {
    sm: 'hSm',
    md: 'hMd',
    lg: 'hLg',
    xl: 'hXl'
  };
  @Input() gridEdit: any;
  @Input() gridData: any;
  @ViewChild(GridsterComponent, { static: true }) gridster: GridsterComponent;

  itemOptions = {
    maxWidth: 6,
    maxHeight: 4
  };
  gridsterOptions: IGridsterOptions = {
    lanes: 1, // amount of lanes (cells) in the grid
    direction: 'vertical', // floating top - vertical, left - horizontal
    floating: true,
    dragAndDrop: true, // enable/disable drag and drop for all items in grid
    resizable: true, // enable/disable resizing by drag and drop for all items in grid
    resizeHandles: {
      s: true,
      e: true,
      se: true
    },
    widthHeightRatio: 1.5, // proportion between item width and height
    lines: {
      visible: true,
      color: '#afafaf',
      width: 1
    },
    shrink: true,
    useCSSTransforms: true,
    responsiveView: true, // turn on adopting items sizes on window resize and enable responsiveOptions
    responsiveDebounce: 500, // window resize debounce time
    responsiveSizes: true,
    responsiveToParent: true,
    responsiveOptions: [
      {
        breakpoint: 'sm',
        // minWidth: 480,
        lanes: 3
      },
      {
        breakpoint: 'md',
        minWidth: 768,
        lanes: 4
      },
      {
        breakpoint: 'lg',
        minWidth: 1250,
        lanes: 6
      },
      {
        breakpoint: 'xl',
        minWidth: 1800,
        lanes: 8
      }
    ]
  };
  gridsterDraggableOptions: IGridsterDraggableOptions = {
    handlerClass: 'moveOpera'
  };
  title = 'Angular2Gridster';
  widgetsCopy = [];
  widgets: Array<any> = [];
  widthValue = 3;
  heightValue = 2;
  dataSelect: any = ['折线图', '柱状图', '饼图', '物资信息录入', '集中监测明细', '应急处置列表'];

  ngOnInit() {
    this.widgetsCopy = this.widgets.map(widget => ({ ...widget }));
    if (this.gridData) {
      this.widgets = this.gridData;
    }
  }

  onReflow(event) {
    // console.log('onReflow', event);
  }

  optionsChange(options: IGridsterOptions) {
    this.gridsterOptions = options;
    // console.log('options change:', options);
  }

  data() {
    console.log(JSON.stringify(this.widgets))
  }

  addWidgetWithoutData() {
    const newid = Math.floor(Math.random() * (1 - 100000) + 100000);
    this.widgets.push({
      id: newid, dataValue: null,
      x: 0, y: 0, w: this.widthValue, h: this.heightValue,
      title: '',
      dragAndDrop: true,
      resizable: true
    });
  }

  remove($event, index: number, gridster: GridsterComponent) {
    $event.preventDefault();
    this.widgets.splice(index, 1);
  }

  removeAllWidgets() {
    this.widgets = [];
  }

  itemChange($event: any, gridster, index, id) {

  }

  contChange(e, id) {

  }

}