import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.page.html',
  styleUrls: ['./standard.page.less']
})
export class StandardComponent implements OnInit {
  menuAnchor = [];

  constructor() { }

  ngOnInit() {
    this.menuAnchor = [
      { 'id': 'title', 'name': 'Web前端开发标准规范', 'content': 'Web前端作为开发团队中不可或缺的一部分，需要按照相关规定进行合理编写（一部分不良习惯可能给自己和他人造成不必要的麻烦）。不同公司不同团队具有不同的规范和文档。下面是根据不同企业和团队的要求进行全面详细的整理结果。备注：实际开发请以本公司的规范为标准', 'children': [] },
      { 'id': 'web1', 'name': '基本原则', 'content': '符合web标准（UTF-8，HTML5），语义化html（HTML5新增要求，减少div和span等无特定语义的标签使用），结构表现行为分离（HTML-CSS-JS代码分离，不同行为代码高内聚低耦合），兼容性优良（早期版本浏览器兼容，移动端和PC端设备兼容）.页面性能方面（减少请求次数，例如使用精灵图和sass语法），代码要求简洁明了有序，尽可能的减小服务器负载，保证最快的解析速度（减小repaint和reflow）', 'children': [] },
      {
        'id': 'web2', 'name': '文件命名规范', 'content': '', 'children': [
          { 'id': 'web201', 'content': 'html，css，ts，json，images文件均存放至项目的目录中。如果使用相关前端框架，根据框架的文件格式进行合理布局' },
          { 'id': 'web202', 'content': '所有文件夹及文件使用英文命名（避免使用中文路径）' },
          { 'id': 'web203', 'content': 'css文件命名：后缀.css。首页index.css，其他页面按照对应的html命名' },
          { 'id': 'web204', 'content': '文件名采用feature.type.**，feature表示特性，type表示类型' },
          { 'id': 'web205', 'content': '模块用 .module.ts' },
          { 'id': 'web206', 'content': '路由模块用 -routing.module.ts' },

          { 'id': 'web207', 'content': '组件用 .component.ts|html|css' },
          { 'id': 'web208', 'content': '服务用 .service.ts' },
          { 'id': 'web209', 'content': '管道用 .pipe.ts' },
          { 'id': 'web210', 'content': '指令用 .directive.ts' },
          { 'id': 'web211', 'content': '类型用 .model.ts' },
          { 'id': 'web212', 'content': '数据用 .data.ts' },
          { 'id': 'web213', 'content': '用”-“来分割单词，比如hero-list.component.ts' },
          { 'id': 'web214', 'content': '单元测试文件名保持和测试对象一致，并以.spec.ts结尾' },
          { 'id': 'web215', 'content': '端到端测试文件名保持和测试对象一致，并以.e2e-spec.ts结尾' },
          { 'id': 'web216', 'content': '类名用大写驼峰规则，并且保持跟文件名的一致' },
          { 'id': 'web217', 'content': '模块：比如app.module.ts定义的类名为AppModule' },
          { 'id': 'web218', 'content': '路由模块：比如app-routing.module.ts定义的类名魏AppRoutingModule' },
          { 'id': 'web219', 'content': '组件：比如hero-list.component.ts定义的类名为HeroListComponent' },
          { 'id': 'web220', 'content': '服务：比如logger.service.ts定义的类名为LoggerService' },
          { 'id': 'web221', 'content': '管道：比如address.pipe.ts定义的类名为AddressPipe' },
          { 'id': 'web222', 'content': '指令：比如highlight.directive.ts定义的类名为HighlightDirective' },
          { 'id': 'web223', 'content': '类型例外：按模块来划分，一个.model.ts定义多个类型' },
          { 'id': 'web224', 'content': '数据：比如address-book.data.ts定义的变量名为addressBook' }
        ]
      },
      {
        'id': 'web3', 'name': 'HTML规范', 'content': '', 'children': [
          { 'id': 'web301', 'content': '文档类型声明及编码：统一为html5声明类型。书写时利用IDE实现层次分明的缩进（默认缩进2空格）' },
          { 'id': 'web302', 'content': '非特殊情况下CSS文件放在body部分meta标签后。非特殊情况下大部分JS文件放在body标签尾部（如果需要界面未加载前执行的代码可以放在head标签后）避免行内JS和CSS代码' },
          { 'id': 'web303', 'content': '所有编码需要遵循html（XML）标准，标签&属性&属性命名必须由小写字母及下划线数字组成，且所有标签必须闭合，包括br()，hr()等。属性值用双引号' },
          { 'id': 'web304', 'content': '引入JS库文件，文件名须包含库名称及版本号及是否为压缩版，比如echarts-1.4.1.min.js。引入插件，文件名格式为库名称+插件名称，比如jQuery.bootstrap.js' },
          { 'id': 'web305', 'content': '书写页面过程中，请考虑向后扩展性。class&id参见css书写规范' },
          { 'id': 'web307', 'content': '语义化html，如标题根据重要性用h*(同一页面只能有一个h1)，段落标记用p，列表用ul，内联元素中不可嵌套块级元素' },
          { 'id': 'web308', 'content': '尽可能减少div多层级嵌套' },
          { 'id': 'web309', 'content': '书写链接地址时，必须避免重定向，例如：href="http：//myVue.com/"，即须在URL地址后面加上“/”' },
          { 'id': 'web310', 'content': '在页面中尽量避免使用style属性，即style="…"' },
          { 'id': 'web311', 'content': '必须为含有描述性表单元素(input，textarea)添加label，如姓名：须写成：姓名：' },
          { 'id': 'web312', 'content': '能以背景形式呈现的图片，尽量写入css样式中' },
          { 'id': 'web313', 'content': '重要图片必须加上alt属性。给重要的元素和截断的元素加上title' },
          { 'id': 'web314', 'content': '给区块代码及重要功能(比如循环)加上注释，方便后台添加功能' },
          { 'id': 'web315', 'content': '特殊符号使用：尽可能使用代码替代：比如<(<)&>(>)&空格()&»(»)等等' }
        ]
      },
      {
        'id': 'web4', 'name': 'CSS规范', 'content': '', 'children': [
          { 'id': 'web401', 'content': '编码规范为utf-8' },
          { 'id': 'web402', 'content': '协作开发及分工：i会根据各个模块，同时根据页面相似程序，事先写**体框架文件，分配给前端人员实现内部结构&表现&行为。共用css文件base.css由i书写，协作开发过程中，每个页面请务必都要引入，此文件包含reset及头部底部样式，此文件不可随意修改' },
          { 'id': 'web403', 'content': 'class与id的使用：id是唯一的并是父级的，class是可以重复的并是子级的，所以id仅使用在大的模块上，class可用在重复使用率高及子级中。id原则上都是由我分发框架文件时命名的，为JS预留钩子的除外' },
          { 'id': 'web404', 'content': '为JS预留钩子的命名，请以js_起始，比如：js_hide，js_show' },
          { 'id': 'web405', 'content': 'class与id命名：大的框架命名比如header/footer/wrapper/left/right之类的在2中由i统一命名.其他样式名称由小写英文&数字&来组合命名，如i_comment，fontred，width200。避免使用中文拼音，尽量使用简易的单词组合。总之，命名要语义化，简明化' },
          { 'id': 'web406', 'content': '规避class与id命名(此条重要，若有不明白请及时与i沟通)：a）通过从属写法规避，示例见d。b）取父级元素id/class命名部分命名，示例见d。c）重复使用率高的命名，请以自己代号加下划线起始，比如i_clear。d）a，b两条，适用于在2中已建好框架的页面，如，要在2中已建好框架的页面代码中加入新的div元素，按a命名法则：...，样式写法：#mainnav.firstnav{.......}按b命名法则：...，样式写法：.main_firstnav{.......}' },
          { 'id': 'web407', 'content': 'css属性书写顺序，建议遵循：布局定位属性-->自身属性-->文本属性-->其他属性.此条可根据自身习惯书写，但尽量保证同类属性写在一起' },
          { 'id': 'web408', 'content': '书写代码前，提高样式重复使用率' },
          { 'id': 'web409', 'content': '充分利用html自身属性及样式继承原理减少代码量' },
          { 'id': 'web410', 'content': '样式表中中文字体名，请务必转码成unicode码，以避免编码错误时乱码' },
          { 'id': 'web411', 'content': '背景图片请尽可能使用精灵图技术，减小http请求，考虑到多人协作开发，精灵图按模块制作' },
          { 'id': 'web412', 'content': '使用table标签时(尽量避免使用table标签)，请不要用width/height/cellspacing/cellpadding等table属性直接定义表现，应尽可能的利用table自身私有属性分离结构与表现，如thead，tr，th，td，tbody，tfoot，colgroup，scope。(cellspaing及cellpadding的css控制方法：table{border：0。margin：0。border-collapse：collapse。}tableth，tabletd{padding：0。}，base.css文件中我会初始化表格样式' },
          { 'id': 'web413', 'content': '杜绝使用兼容ie8' },
          { 'id': 'web414', 'content': '用png图片做图片时，要求图片格式为png-8格式，若png-8实在影响图片质量或其中有半透明效果' },
          { 'id': 'web415', 'content': '避免兼容性属性的使用，比如text-shadow||css3的相关属性' },
          { 'id': 'web416', 'content': '减少使用影响性能的属性，比如position：absolute||float' },
          { 'id': 'web417', 'content': '必须为大区块样式添加注释，小区块适量注释' },
          { 'id': 'web418', 'content': '代码缩进与格式：建议单行书写，可根据自身习惯，后期优化会统一处理' }
        ]
      },
      {
        'id': 'web5', 'name': 'JS/TS书写规范', 'content': '', 'children': [
          { 'id': 'web51', 'content': '文件编码统一为utf-8，书写过程过，每行代码结束必须有分号。原则上所有功能均根据XXX项目需求原生开发，以避免网上down下来的代码造成的代码污染(沉冗代码||与现有代码冲突||...)' },
          { 'id': 'web52', 'content': '库引入：原则上仅引入jQuery库，若需引入第三方库，须与团队其他人员讨论决定' },
          { 'id': 'web53', 'content': '变量命名：驼峰式命名.原生JS变量要求是纯英文字母，首字母须小写，如myVue。jQuery变量要求首字符为_，其他与原生JS规则相同，如：_myVue。另，要求变量集中声明，避免全局变量' },
          { 'id': 'web54', 'content': '类命名：首字母大写，驼峰式命名.如MyVue' },
          { 'id': 'web55', 'content': '函数命名：首字母小写驼峰式命名.如myVue()' },
          { 'id': 'web56', 'content': '命名语义化，尽可能利用英文单词或其缩写' },
          { 'id': 'web57', 'content': '尽量避免使用存在兼容性及消耗资源的方法或属性，比如eval_r()&innerText' },
          { 'id': 'web58', 'content': '后期优化中，JS非注释类中文字符须转换成unicode编码使用，以避免编码错误时乱码显示' },
          { 'id': 'web59', 'content': '代码结构明了，加适量注释.提高函数重用率' },
          { 'id': 'web510', 'content': '注重与html分离，减小reflow，注重浏览器性能' }
        ]
      },
      {
        'id': 'web6', 'name': '单一职责', 'content': '', 'children': [
          { 'id': 'web61', 'content': '一个文件定义一样东西，比如一个组件、一个服务、一个管道、一个指令' },
          { 'id': 'web62', 'content': '每个文件最多不要超过400行' },
          { 'id': 'web63', 'content': '定义功能单一的函数' },
          { 'id': 'web64', 'content': '一个函数最多不要超过75行' }
        ]
      }
    ];
  }

}
