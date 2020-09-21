import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, OnInit, OnDestroy, ElementRef, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationError, NavigationCancel } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { updateHostClass } from '@delon/util';
import { SettingsService } from '@delon/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'layout-default',
  templateUrl: './default.component.html',
  styles: [`
    :host ::ng-deep .alain-default__header{height: 60px;}
    :host ::ng-deep .alain-default__aside{margin-top: 60px;}
    :host ::ng-deep .alain-default__fixed .alain-default__content{margin: 60px 16px 16px 218px;}
    :host ::ng-deep .alain-default__fixed .reuse-tab{top:60px;}
    :host ::ng-deep .alain-default__fixed .reuse-tab + router-outlet {height:52px;}
    :host ::ng-deep .sidebar-nav .sidebar-nav__group-title {display:none;}
    :host ::ng-deep .reuse-tab__line{padding:0 8px 2px 8px;}
    :host ::ng-deep .ant-tabs-ink-bar{height:0;}
    :host ::ng-deep .ant-tabs-nav .ant-tabs-tab{margin:4px 8px 4px 0;}
    :host ::ng-deep .ant-tabs-nav .ant-tabs-tab-active{font-weight:bold;}
    :host ::ng-deep .reuse-tab__line .ant-tabs-nav .ant-tabs-tab .reuse-tab__name{padding:3px 20px;background:#f3f3f3;}
    :host ::ng-deep .reuse-tab__line .ant-tabs-nav .ant-tabs-tab .reuse-tab__op{top:9px;right:5px;}
    :host ::ng-deep .top-nav{margin-right:100px;}
    :host ::ng-deep .top-nav a{color:#fff;margin-right:10px;padding:5px 15px;background:#45a6ff;}    
  `]
})
export class LayoutDefaultComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @ViewChild('settingHost', { read: ViewContainerRef, static: true })
  private settingHost: ViewContainerRef;
  isFetching = false;

  constructor(
    router: Router,
    _message: NzMessageService,
    private resolver: ComponentFactoryResolver,
    private settings: SettingsService,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: any,
  ) {
    // scroll to top in change page
    router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
        this.isFetching = false;
        if (evt instanceof NavigationError) {
          _message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        }
        return;
      }
      if (!(evt instanceof NavigationEnd || evt instanceof RouteConfigLoadEnd)) {
        return;
      }
      if (this.isFetching) {
        setTimeout(() => {
          this.isFetching = false;
        }, 100);
      }
    });
  }

  private setClass() {
    const { el, doc, renderer, settings } = this;
    const layout = settings.layout;
    updateHostClass(el.nativeElement, renderer, {
      ['alain-default']: true,
      [`alain-default__fixed`]: layout.fixed,
      [`alain-default__collapsed`]: layout.collapsed,
    });

    doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    const { settings, unsubscribe$ } = this;
    settings.notify.pipe(takeUntil(unsubscribe$)).subscribe(() => this.setClass());
    this.setClass();
  }

  ngOnDestroy() {
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }
}
