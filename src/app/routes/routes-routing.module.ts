import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { UserLoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    // canActivate: [SimpleGuard],
    // canActivateChild: [SimpleGuard],
    children: [
      // demo pages
      { path: '', redirectTo: 'pages/workspace', pathMatch: 'full' },
      { path: 'pages/center', loadChildren: () => import('./pages/center/center.module').then(m => m.CenterModule), data: { reuse: true, title: '用户中心' } },
      { path: 'pages/workspace', loadChildren: () => import('./pages/workspace/workspace.module').then(m => m.WorkspaceCModule), data: { reuse: true, title: '工作台' } },
      // menu
      { path: 'pages/user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule), data: { reuse: true, title: '用户管理' } },
      { path: 'pages/role', loadChildren: () => import('./pages/role/role.module').then(m => m.RoleModule), data: { reuse: true, title: '角色管理' } },
      { path: 'pages/associa', loadChildren: () => import('./pages/associa/associa.module').then(m => m.AssociaModule), data: { reuse: true, title: '用户角色关联' } },
      { path: 'pages/menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule), data: { reuse: true, title: '菜单管理' } },
      { path: 'pages/menurole', loadChildren: () => import('./pages/menurole/menurole.module').then(m => m.MenuroleModule), data: { reuse: true, title: '菜单角色关联' } },
      { path: 'pages/department', loadChildren: () => import('./pages/department/department.module').then(m => m.DepartmentModule), data: { reuse: true, title: '部门管理' } },
      { path: 'pages/dataAuthority', loadChildren: () => import('./pages/dataAuthority/dataAuthority.module').then(m => m.DataAuthorityModule), data: { reuse: true, title: '数据权限管理' } },
      { path: 'pages/button', loadChildren: () => import('./pages/button/button.module').then(m => m.ButtonModule), data: { reuse: true, title: '按钮管理' } },
      { path: 'pages/buttonAuthority', loadChildren: () => import('./pages/buttonAuthority/buttonAuthority.module').then(m => m.ButtonAuthorityModule), data: { reuse: true, title: '按钮权限管理' } },
      { path: 'pages/dictionary', loadChildren: () => import('./pages/dictionary/dictionary.module').then(m => m.DictionaryModule), data: { reuse: true, title: '字典管理' } },
      { path: 'pages/dictType', loadChildren: () => import('./pages/dictType/dictType.module').then(m => m.DictTypeModule), data: { reuse: true, title: '字典类型管理' } },
      { path: 'pages/grid', loadChildren: () => import('./pages/grid/grid.module').then(m => m.GridModule), data: { reuse: true, title: '自定义页面' } },
      { path: 'pages/xmind', loadChildren: () => import('./pages/xmind/xmind.module').then(m => m.XmindModule), data: { reuse: true, title: '思维导图' } },
      { path: 'pages/journalOperate', loadChildren: () => import('./pages/journal/journalOperate.module').then(m => m.JournalOperateModule), data: { reuse: true, title: '操作日志' } },
      { path: 'pages/dataManagement', loadChildren: () => import('./pages/dataManagement/dataManagement.module').then(m => m.DataManagementModule), data: { reuse: true, title: '数据管理' } },
      // menu
      { path: 'pages/lineStation', loadChildren: () => import('./pages/lineStation/lineStation.module').then(m => m.LineStationModule), data: { reuse: true, title: '线别管理' } },
      { path: 'pages/manageStation', loadChildren: () => import('./pages/manageStation/manageStation.module').then(m => m.ManageStationModule), data: { reuse: true, title: '车站管理' } },
      { path: 'pages/orgStation', loadChildren: () => import('./pages/orgStation/orgStation.module').then(m => m.OrgStationModule), data: { reuse: true, title: '部门车站管理' } },
      // menu
      { path: 'pages/online', loadChildren: () => import('./pages/online/online.module').then(m => m.OnlineModule), data: { reuse: true, title: '在线用户' } },
      { path: 'pages/task', loadChildren: () => import('./pages/task/task.module').then(m => m.TaskModule), data: { reuse: true, title: '定时任务' } },
      { path: 'pages/data', loadChildren: () => import('./pages/data/data.module').then(m => m.DataModule), data: { reuse: true, title: '数据监控' } },
      { path: 'pages/server', loadChildren: () => import('./pages/server/server.module').then(m => m.ServerModule), data: { reuse: true, title: '服务监控' } },
      // menu
      { path: 'pages/code', loadChildren: () => import('./pages/code/code.module').then(m => m.CodeModule), data: { reuse: true, title: '代码生成' } },
      { path: 'pages/api', loadChildren: () => import('./pages/api/api.module').then(m => m.ApiModule), data: { reuse: true, title: '系统接口' } },
      { path: 'pages/param', loadChildren: () => import('./pages/param/param.module').then(m => m.ParamModule), data: { reuse: true, title: '参数配置' } },
      { path: 'pages/cpoe', loadChildren: () => import('./pages/cpoe/cpoe.module').then(m => m.CpoeModule), data: { reuse: true, title: '录入系统' } },
      // standard of ui 
      { path: 'ui/standard', loadChildren: () => import('./ui/standard/standard.module').then(m => m.StandardModule), data: { reuse: true, title: '前端规范' } },
      { path: 'ui/fontstyle', loadChildren: () => import('./ui/fontstyle/fontstyle.module').then(m => m.FontstyleModule), data: { reuse: true, title: '字体样式' } },
      { path: 'ui/buttontype', loadChildren: () => import('./ui/buttontype/buttontype.module').then(m => m.ButtontypeModule), data: { reuse: true, title: '按钮类型' } },
      { path: 'ui/tablefilter', loadChildren: () => import('./ui/tablefilter/tablefilter.module').then(m => m.TablefilterModule), data: { reuse: true, title: '表格筛选' } },
      { path: 'ui/fromentry', loadChildren: () => import('./ui/fromentry/fromentry.module').then(m => m.FromentryModule), data: { reuse: true, title: '表单录入' } },
      { path: 'ui/tipsinfo', loadChildren: () => import('./ui/tipsinfo/tipsinfo.module').then(m => m.TipsinfoModule), data: { reuse: true, title: '提示信息' } },
      { path: 'ui/popmodal', loadChildren: () => import('./ui/popmodal/popmodal.module').then(m => m.PopmodalModule), data: { reuse: true, title: '弹出层' } },
      { path: 'ui/other', loadChildren: () => import('./ui/other/other.module').then(m => m.OtherModule), data: { reuse: true, title: '其他' } }
    ]
  },
  // 作为单页面被其他项目调用，需要哪些页面手动添加
  { path: 'third/login', component: UserLoginComponent, data: { title: '登录', titleI18n: '登录' } },
  { path: 'third/user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule), data: { reuse: true, title: '用户管理' } },
  { path: 'third/role', loadChildren: () => import('./pages/role/role.module').then(m => m.RoleModule), data: { reuse: true, title: '角色管理' } },
  { path: 'third/associa', loadChildren: () => import('./pages/associa/associa.module').then(m => m.AssociaModule), data: { reuse: true, title: '用户角色关联' } },
  { path: 'third/menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule), data: { reuse: true, title: '菜单管理' } },
  { path: 'third/menurole', loadChildren: () => import('./pages/menurole/menurole.module').then(m => m.MenuroleModule), data: { reuse: true, title: '菜单角色关联' } },
  { path: 'third/department', loadChildren: () => import('./pages/department/department.module').then(m => m.DepartmentModule), data: { reuse: true, title: '部门管理' } },
  { path: 'third/dataAuthority', loadChildren: () => import('./pages/dataAuthority/dataAuthority.module').then(m => m.DataAuthorityModule), data: { reuse: true, title: '数据权限管理' } },
  { path: 'third/button', loadChildren: () => import('./pages/button/button.module').then(m => m.ButtonModule), data: { reuse: true, title: '按钮管理' } },
  { path: 'third/buttonAuthority', loadChildren: () => import('./pages/buttonAuthority/buttonAuthority.module').then(m => m.ButtonAuthorityModule), data: { reuse: true, title: '按钮权限管理' } },
  { path: 'third/dictionary', loadChildren: () => import('./pages/dictionary/dictionary.module').then(m => m.DictionaryModule), data: { reuse: true, title: '字典管理' } },
  { path: 'third/dictType', loadChildren: () => import('./pages/dictType/dictType.module').then(m => m.DictTypeModule), data: { reuse: true, title: '字典类型管理' } },
  { path: 'third/journalOperate', loadChildren: () => import('./pages/journal/journalOperate.module').then(m => m.JournalOperateModule), data: { reuse: true, title: '操作日志' } },
  { path: 'third/dataManagement', loadChildren: () => import('./pages/dataManagement/dataManagement.module').then(m => m.DataManagementModule), data: { reuse: true, title: '数据管理' } },
  // thrid
  { path: 'third/lineStation', loadChildren: () => import('./pages/lineStation/lineStation.module').then(m => m.LineStationModule), data: { reuse: true, title: '线别管理' } },
  { path: 'third/manageStation', loadChildren: () => import('./pages/manageStation/manageStation.module').then(m => m.ManageStationModule), data: { reuse: true, title: '车站管理' } },
  { path: 'third/orgStation', loadChildren: () => import('./pages/orgStation/orgStation.module').then(m => m.OrgStationModule), data: { reuse: true, title: '部门车站管理' } },
  // exception
  { path: 'exception/404', loadChildren: () => import('./exception/404.module').then(m => m.Exception404Module), data: { title: '页面未找到' } },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
