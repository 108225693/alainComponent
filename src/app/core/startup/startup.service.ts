import { Injectable, Inject } from '@angular/core';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { I18NService } from '../i18n/i18n.service';
import { NzIconService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private titleService: TitleService
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaData(resolve: any, reject: any) {
    const app: any = {
      name: ``,
      description: `一个基于 Antd 中后台前端解决方案，提供更多通用性业务模块，让开发者更加专注于业务。`
    };
    // 应用信息：包括站点名、描述、年份
    this.settingService.setApp(app);
    // 设置页面标题的后缀
    this.titleService.suffix = app.name;
    this.menuService.add([{
      "text": "主导航",
      "i18n": "pages",
      "group": true,
      "hideInBreadcrumb": true,
      "children": [
        {
          "text": "系统管理",
          "i18n": "系统管理",
          "icon": "anticon-global",
          "children": [
            {
              "text": "用户管理",
              "link": "/pages/user",
              "i18n": "用户管理"
            },
            {
              "text": "角色管理",
              "link": "/pages/role",
              "i18n": "角色管理"
            },
            {
              "text": "用户角色关联",
              "link": "/pages/associa",
              "i18n": "用户角色关联"
            },
            {
              "text": "菜单管理",
              "link": "/pages/menu",
              "i18n": "菜单管理"
            },
            {
              "text": "菜单角色关联",
              "link": "/pages/menurole",
              "i18n": "菜单角色关联"
            },
            {
              "text": "部门管理",
              "link": "/pages/department",
              "i18n": "部门管理"
            },
            {
              "text": "数据权限管理",
              "link": "/pages/dataAuthority",
              "i18n": "数据权限管理"
            },
            {
              "text": "按钮管理",
              "link": "/pages/button",
              "i18n": "按钮管理"
            },
            {
              "text": "按钮权限管理",
              "link": "/pages/buttonAuthority",
              "i18n": "按钮权限管理"
            },
            {
              "text": "字典管理",
              "link": "/pages/dictionary",
              "i18n": "字典管理"
            },
            {
              "text": "字典类型管理",
              "link": "/pages/dictType",
              "i18n": "字典类型管理"
            },
            {
              "text": "操作日志",
              "link": "/pages/journalOperate",
              "i18n": "操作日志"
            },
            {
              "text": "数据管理",
              "link": "/pages/dataManagement",
              "i18n": "数据管理"
            },
            {
              "text": "录入系统",
              "link": "/pages/cpoe",
              "i18n": "录入系统"
            }
          ]
        },
        {
          "text": "车站维护",
          "i18n": "车站维护",
          "icon": "anticon-home",
          "children": [
            {
              "text": "线别管理",
              "i18n": "线别管理",
              "link": "/pages/lineStation"
            },
            {
              "text": "车站管理",
              "i18n": "车站管理",
              "link": "/pages/manageStation"
            },
            {
              "text": "部门车站管理",
              "i18n": "部门车站管理",
              "link": "/pages/orgStation"
            }
          ]
        },
        {
          "text": "系统监控",
          "i18n": "系统监控",
          "icon": "anticon-dashboard",
          "children": [
            {
              "text": "在线用户",
              "link": "/pages/online",
              "i18n": "在线用户"
            },
            {
              "text": "定时任务",
              "link": "/pages/task",
              "i18n": "定时任务"
            },
            {
              "text": "系统监控",
              "externalLink": window.location.protocol + '//' + window.location.host.split(":")[0] + ":9000/instances/d91146b510f0/details",
              "target": "_blank",
              "i18n": "系统监控"
            },
            {
              "text": "数据监控",
              "link": "/pages/data",
              "i18n": "数据监控"
            },
            {
              "text": "服务监控",
              "link": "/pages/server",
              "i18n": "服务监控"
            }
          ]
        },
        {
          "text": "系统工具",
          "i18n": "系统工具",
          "icon": "anticon-api",
          "children": [
            {
              "text": "自定义页面",
              "link": "/pages/grid",
              "i18n": "自定义页面"
            },
            {
              "text": "思维导图",
              "link": "/pages/xmind",
              "i18n": "思维导图"
            },
            {
              "text": "代码生成",
              "link": "/pages/code",
              "i18n": "代码生成"
            },
            {
              "text": "系统接口",
              "link": "/pages/api",
              "i18n": "系统接口"
            },
            {
              "text": "参数配置",
              "link": "/pages/param",
              "i18n": "参数配置"
            }
          ]
        },
        {
          "text": "UI规范",
          "i18n": "UI规范",
          "icon": "anticon-bell",
          "children": [
            {
              "text": "前端规范",
              "link": "/ui/standard",
              "i18n": "前端规范"
            },
            {
              "text": "字体样式",
              "link": "/ui/fontstyle",
              "i18n": "字体样式"
            },
            {
              "text": "按钮类型",
              "link": "/ui/buttontype",
              "i18n": "按钮类型"
            },
            {
              "text": "表格筛选",
              "link": "/ui/tablefilter",
              "i18n": "表格筛选"
            },
            {
              "text": "表单录入",
              "link": "/ui/fromentry",
              "i18n": "表单录入"
            },
            {
              "text": "提示信息",
              "link": "/ui/tipsinfo",
              "i18n": "提示信息"
            },
            {
              "text": "弹出层",
              "link": "/ui/popmodal",
              "i18n": "弹出层"
            },
            {
              "text": "其他",
              "link": "/ui/other",
              "i18n": "其他"
            }
          ]
        }
      ]
    }]);
    resolve({});
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.viaData(resolve, reject);
    });
  }

}
