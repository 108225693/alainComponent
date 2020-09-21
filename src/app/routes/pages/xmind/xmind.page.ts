import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { LocalStorage } from '@core/local.storage';
declare const jsMind: any;

@Component({
  selector: 'app-xmind',
  templateUrl: './xmind.page.html',
  styleUrls: ['./xmind.page.less']
})

export class XmindComponent implements OnInit {
  tableshow = 'show';
  opershow = 'hide';
  operaType = '';
  delModalVisible = false;
  tempData: any = {};
  editNodeData = '';
  param: any = [];
  rootId = '';
  deltext = '';
  nameValue = '';
  tempShowData: any = [];
  alert: any = {};
  ws: WebSocket;
  menuList: any = [];
  onlineUser = '在线用户';
  lockStatus = true;
  updateStatus = true;
  interval: any;
  editStatus = false;
  detailModalVisible = false;
  base64Src = '';
  modalOperaType = '';
  modalModalVisible = false;
  xmindDate = '';
  xmindId = '';
  buttonDisabled = true;
  personValue = null;
  personSelect = [{ "value": "1", "label": "张三" }, { "value": "2", "label": "李四" }, { "value": "3", "label": "王五" }];
  split = { "date": "日期：", "person": "人员：" };
  // jsmind
  _jm = null;
  fullHeight = { 'height': document.body.clientHeight - 185 + 'px' };
  imageChooser: any;
  zoomInButton: any = document.getElementById("zoom-in-button");
  zoomOutButton: any = document.getElementById("zoom-out-button");
  // table 
  allChecked = false;
  indeterminate = false;
  displayData = [];
  listOfAllData = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private msg: NzMessageService,
    public http: HttpClient,
    public ls: LocalStorage

  ) { }

  ngOnInit() {
    // 注册jsmind
    this.open_empty();
    this.imageChooser = document.getElementById('image-chooser');

    // 图片节点
    this.imageChooser.addEventListener('change', (event) => {
      const reader = new FileReader();
      reader.onloadend = (() => {
        const selected_node = this._jm.get_selected_node();
        const nodeid = jsMind.util.uuid.newid();
        const topic = '';
        const data = {
          "background-image": reader.result,
          "width": "100",
          "height": "100"
        };
        const node = this._jm.add_node(selected_node, nodeid, topic, data);
        switch (this.operaType) {
          case 'edit':
            this.setIntertime();
            this.add_update_node(nodeid, () => {
              this._jm.enable_edit();
            });
            break;
          default:
            this._jm.enable_edit();
            break;
        }
      });
      const file = this.imageChooser.files[0];
      if (file) {
        reader.readAsDataURL(file);
      };
    }, false);

    // 鼠标滚动大小
    window.onmousewheel = (e: any) => {
      if (e.wheelDelta) {  // 判断浏览器IE，谷歌滑轮事件               
        if (e.wheelDelta > 0) { // 当滑轮向上滚动时  
          this._jm.view.zoomIn()
        }
        if (e.wheelDelta < 0) { // 当滑轮向下滚动时  
          this._jm.view.zoomOut();
        }
      } else if (e.detail) {  // Firefox滑轮事件  
        if (e.detail > 0) { // 当滑轮向下滚动时  
          this._jm.view.zoomOut();
        }
        if (e.detail < 0) { // 当滑轮向上滚动时  
          this._jm.view.zoomIn()
        }
      }
    }

    // 参数
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.rootId) {
        this.operaType = 'edit';
        this.edit(params.rootId);
        this.rootId = params.rootId;
        this.setIntertime();
      } else {
        this.operaType = 'add';
        this.loadList();
      }
      window.addEventListener('message', (data) => {
        this.editNodeData = data.data;
        if (this.operaType === 'edit') {
          this.show_data();
          // 进入编辑
          if (JSON.stringify(this.editNodeData).indexOf('edit_node_begin') !== -1) {
            if (this.editNodeData.indexOf('http://') !== -1 || this.editNodeData.indexOf('https://') !== -1) {// 链接
              window.open(this.editNodeData.split('#')[1], '_blank');
              return;
            }
            this.dateType(this.editNodeData);
            this.datePerson(this.editNodeData);
            this.setIntertime();
            this.lock();
          }
          // 进入离开
          if (JSON.stringify(this.editNodeData).indexOf('edit_node_end') !== -1) {
            if (this.editNodeData.split('#')[1].indexOf(this.split.date) === -1 || this.editNodeData.split('#')[1].indexOf(this.split.person) === -1) {
              this.setIntertime();
              this.update(this.editNodeData.split('#')[1]);
            }
          }
          // 拖动
          if (JSON.stringify(this.editNodeData).indexOf('move_node') !== -1) {
            this.setIntertime();
            this.moveupdate(this.editNodeData.split('#')[1]);
            this.moveupdate(this.editNodeData.split('#')[2]);
          }
          // 进入图片base64
          if (JSON.stringify(this.editNodeData).indexOf('edit_image_nodes') !== -1) {
            this.base64Src = this.editNodeData.split('#')[1];
            this.detailModalVisible = true;
          }
        }

        if (JSON.stringify(this.editNodeData).indexOf('edit_node_begin') !== -1) {
          this.dateType(this.editNodeData);
          this.datePerson(this.editNodeData);
        }
      }, false);
    });
  }

  // 日期
  dateType(data) {
    if (data.split('#')[1].indexOf(this.split.date) !== -1) {
      this.xmindId = this.get_selected_nodeid();
      if (!this.xmindId) {
        this.msg.error('请先选择一个节点');
        return;
      }
      this.modalOperaType = 'date';
      this.modalModalVisible = true;
      this.xmindDate = this._jm.get_selected_node().topic.replace(this.split.date, '');
      return;
    }
  }

  // 人员
  datePerson(data) {
    if (data.split('#')[1].indexOf(this.split.person) !== -1) {
      this.xmindId = this.get_selected_nodeid();
      if (!this.xmindId) {
        this.msg.error('请先选择一个节点');
        return;
      }
      this.modalOperaType = 'person';
      this.modalModalVisible = true;
      for (const item of this.personSelect) {
        if (item.label === this._jm.get_selected_node().topic.replace(this.split.person, '')) {
          this.personValue = item.value;
          break;
        }
      }
      return;
    }
  }

  modalModalOk() {
    switch (this.modalOperaType) {
      case 'date':
        this._jm.update_node(this.xmindId, this.split.date + this.dateFormat(this.xmindDate));
        break;
      case 'person':
        let value = '';
        for (const item of this.personSelect) {
          if (item.value === this.personValue) {
            value = this.split.person + item.label;
            break;
          }
        }
        this._jm.update_node(this.xmindId, value);
        break;
    }
    this.modalModalVisible = false;
    if (this.operaType === 'edit') {
      this.update(this.editNodeData.split('#')[1]);
      this.setIntertime();
    }
  }

  modalModalCancel() {
    this.modalModalVisible = false;
  }

  webSocket(url) {
    this.ws = new WebSocket(url);
    this.ws.onopen = () => { };
    this.ws.onmessage = (data: any) => {
      const newdata = JSON.parse(data.data);
      const user = newdata.currXmindOnlineUsers;
      let count = newdata.currXmindOnlineCount;
      this.alert.message = newdata.editTips;

      if (newdata.data) {
        this.reData(newdata.data);
      }
      this.editStatus = newdata.canEdit;
      if (newdata.canEdit) {
        this._jm.enable_edit();
      } else {
        this._jm.disable_edit();
      }
      if (user) {
        this.menuList = [];
        for (const item of user) {
          if (!item || item === '' || item === 'undefined') {
            count -= 1;
          } else {
            this.menuList.push(item);
          }
        }
      }
      if (count) {
        this.onlineUser = '在线用户 (' + count + ')';
      }
    };
    this.ws.onerror = () => { };
    this.ws.onclose = () => { };
  }

  setIntertime() {
    if (!this.editStatus) {
      this.interval = setInterval(() => {
        this.http.get(environment.apiBase + '/system/xmind/unlock?rootId=' + this.rootId).subscribe((res: any) => {
          // to do
        });
        clearInterval(this.interval);
        this._jm.enable_edit();
        this.editStatus = true;
      }, 5000);
    }
  }

  loadList() {
    this.http.get(environment.apiBase + '/system/xmind/query').subscribe((res: any) => {
      if (res.code === 0) {
        this.listOfAllData = res.data;
      } else {
        this.msg.error(res.msg);
      }
    });
  }

  search() {
    let url = '';
    switch (true) {
      case this.nameValue === '':
        url = environment.apiBase + '/system/xmind/query';
        break;
      default:
        url = environment.apiBase + '/system/xmind/query?topic=' + this.nameValue;
        break;
    }
    this.http.get(url).subscribe((res: any) => {
      if (res.code === 0) {
        this.listOfAllData = res.data;
      } else {
        this.msg.error(res.msg);
      }
    });
  }

  add() {
    this.operaType = 'add';
    this.tableshow = 'hide';
    this.opershow = 'show';
  }

  compare(property) {
    return (a, b) => {
      const value1 = a[property];
      const value2 = b[property];
      return value1 - value2;
    }
  }

  edit(rootId) {
    this.tableshow = 'hide';
    this.opershow = 'show';
    // 返回数据
    this.http.get(environment.apiBase + '/system/xmind/query/' + rootId).subscribe((res: any) => {
      if (res.code === 0) {
        this.reData(res.data);
        const loginInfo = JSON.parse(this.ls.get('loginInfo'));
        if (loginInfo) {
          const url = environment.wsBase + '/ws/xMindServer/' + this.rootId + '/' + loginInfo.loginName;
          this.webSocket(url);
        }
      } else {
        this.msg.error(res.msg);
      }
    });
  }

  reData(data) {
    let newdata: any = [];
    newdata = data.sort(this.compare('nOrder'));

    for (const item of newdata) {
      item.parentid = item.parentId;
      if (item.backgroundImage) {
        item['background-image'] = item.backgroundImage;
      }
      switch (item.isroot) {
        case "0": item.isroot = false; break;
        default: item.isroot = true; break;
      }
      switch (item.expanded) {
        case "1": item.expanded = true; break;
        default: item.expanded = false; break;
      }
    }
    const mind = {
      "meta": {
        "name": "xMind remote",
        "author": "test@gmail.com",
        "version": "1.0"
      },
      "format": "node_array",
      "data": newdata
    }
    this._jm.show(mind);
  }

  delModalShow() {
    let status = false;
    let count = 0;
    let data: any = {};

    for (const i in this.displayData) {
      if (this.displayData[i].checked) {
        count = count + 1;
        data = this.displayData[i];
        status = true;
      }
    }
    if (status && count === 1) {
      this.deltext = data.topic + '（' + data.operUser + '）';
      this.tempData = data;
      this.delModalVisible = true;
    } else {
      this.msg.error('请选择一条数据进行修改');
    }
  }

  delModalOk() {
    this.http.post(environment.apiBase + '/system/xmind/deleteXmind', [this.tempData.id]).subscribe((res: any) => {
      if (res.code === 0) {
        this.delModalVisible = false;
        this.loadList();
      } else {
        this.msg.error(res.msg);
      }
    });
  }

  delModalCancel() {
    this.delModalVisible = false;
  }

  detail() {
    this.operaType = 'edit';
    let status = false;
    let count = 0;
    let data: any = {};
    for (const i in this.displayData) {
      if (this.displayData[i].checked) {
        count = count + 1;
        data = this.displayData[i];
        status = true;
      }
    }
    if (status && count === 1) {
      this.router.navigate(['pages/xmind'], { queryParams: { rootId: data.id } });
    } else {
      this.msg.error('请选择一条数据进行修改/查看');
    }
  }

  back() {
    if (this.ws) {
      this.ws.close();
    }
    this.router.navigate(['pages/xmind']);
    this._jm.show();
    this.tableshow = 'show';
    this.opershow = 'hide';
    this.loadList();
  }

  submit() {
    this.param = [];
    this.show_data();
    this.findrootId();
    this.findChild();
    this.xmindAdd(this.param, 'newAdd');
  }

  xmindAdd(param, type) {
    this.http.post(environment.apiBase + '/system/xmind/add', param).subscribe((res: any) => {
      if (type === 'newAdd' && res.code === 0) {
        this.msg.info(res.msg);
        this.back();
      }
      if (res.code !== 0) {
        this.msg.error(res.msg);
      }
    });
  }

  findChild() {
    const data = this.tempShowData;
    for (let i = 0; i < data.length; i++) {
      this.param.push({
        'rootId': this.rootId,
        'id': data[i].id ? data[i].id : '',
        'parentId': data[i].parentid ? data[i].parentid : '-1',
        'isroot': data[i].parentid ? false : true,
        'topic': data[i].topic ? data[i].topic : '',
        'expanded': data[i].expanded ? data[i].expanded : false,
        'backgroundImage': data[i]['background-image'] ? data[i]['background-image'] : '',
        'direction': data[i].direction ? data[i].direction : '',
        'nOrder': i,
        'width': data[i].width ? data[i].width : '',
        'height': data[i].height ? data[i].height : ''
      });
    }
  }

  findrootId() {
    for (const item of this.tempShowData) {
      if (item.isroot) {
        this.rootId = item.id;
        return;
      }
    }
  }

  open_empty() {
    const options = {
      container: 'jsmind_container',
      theme: 'belizehole',
      editable: true
    }
    this._jm = jsMind.show(options);
  }

  show_data() {
    const mind_data = this._jm.get_data('node_array');
    this.tempShowData = mind_data.data;
  }

  get_selected_nodeid() {
    const selected_node = this._jm.get_selected_node();
    if (!!selected_node) {
      return selected_node.id;
    } else {
      return null;
    }
  }

  operaNode(type) {
    if (this.buttonDisabled) {
      this.buttonDisabled = false;
      setTimeout(() => {
        this.buttonDisabled = true;
      }, 1000);
      const selected_node = this._jm.get_selected_node();
      if (!selected_node) {
        this.msg.error('请先选择一个节点');
        return;
      }
      if (type === 'addImage') {
        this.imageChooser.focus();
        this.imageChooser.click();
      } else {
        const nodeid = jsMind.util.uuid.newid();
        let topic = '';
        switch (type) {
          case 'addText':
            topic = '新建节点 ' + nodeid.substr(nodeid.length - 6);
            break;
          case 'copyPaste':
            topic = selected_node.topic;
            break;
          case 'addCalendar':
            topic = this.split.date + this.dateFormat('');
            break;
          case 'addPerson':
            topic = this.split.person + '新建姓名';
            break;
        }
        const node = this._jm.add_node(selected_node, nodeid, topic);
        if (this.operaType === 'edit') {
          this.add_update_node(nodeid, () => {
            this._jm.enable_edit();
          });
        }
      }
    }
  }

  add_update_node(nodeid, callback) {
    setTimeout(() => {
      this.supplement(nodeid, (obj) => {
        this.xmindAdd(obj, 'editAdd');
        callback();
      });
    }, 500);
  }

  supplement(id, callback) {
    this.show_data();
    let nodeObj: any = {};
    for (const item of this.tempShowData) {
      if (item.id === id) {
        nodeObj = item;
        break;
      }
    }
    const dataObj = [{
      id: nodeObj.id,
      topic: !nodeObj.topic ? '' : nodeObj.topic,
      expanded: nodeObj.expanded,
      parentId: nodeObj.parentid,
      rootId: this.rootId,
      isroot: nodeObj.parentId === '-1' ? true : false,
      backgroundImage: !nodeObj['background-image'] ? '' : nodeObj['background-image'],
      direction: !nodeObj.direction ? '' : nodeObj.direction,
      nOrder: !nodeObj.nOrder ? 0 : nodeObj.nOrder,
      width: !nodeObj.width ? '' : nodeObj.width,
      height: !nodeObj.height ? '' : nodeObj.height
    }];
    callback(dataObj);
  }

  update(id) {
    if (this.updateStatus) {
      this.updateStatus = false;
      this.supplement(id, (obj) => {
        this.http.post(environment.apiBase + '/system/xmind/update', obj).subscribe((res: any) => {
          this.updateStatus = true;
          if (res.code !== 0) {
            this.msg.error(res.msg);
          }
        });
      });
    }
  }

  dateFormat(GMT) {
    let newdate;
    switch (GMT) {
      case '':
        newdate = new Date();
        break;
      default:
        newdate = new Date(GMT);
        break;
    }
    const year = newdate.getFullYear();
    const month = newdate.getMonth() + 1 < 10 ? "0" + (newdate.getMonth() + 1) : newdate.getMonth() + 1;
    const date = newdate.getDate() < 10 ? "0" + newdate.getDate() : newdate.getDate();
    const currentTime = year + '-' + month + '-' + date;
    return currentTime;
  }

  moveupdate(id) {
    this.show_data();
    let nodeObj: any = {};
    for (let i = 0; i < this.tempShowData.length; i++) {
      this.tempShowData[i].nOrder = i;
      if (this.tempShowData[i].id === id) {
        nodeObj = this.tempShowData[i];
      }
    }
    const dataObj = [{
      id: nodeObj.id,
      topic: !nodeObj.topic ? '' : nodeObj.topic,
      expanded: nodeObj.expanded,
      parentId: nodeObj.parentid,
      rootId: this.rootId,
      isroot: nodeObj.parentId === '-1' ? true : false,
      backgroundImage: !nodeObj['background-image'] ? '' : nodeObj['background-image'],
      direction: !nodeObj.direction ? '' : nodeObj.direction,
      nOrder: !nodeObj.nOrder ? 0 : nodeObj.nOrder,
      width: !nodeObj.width ? '' : nodeObj.width,
      height: !nodeObj.height ? '' : nodeObj.height
    }];
    if (dataObj[0].id && this.updateStatus) {
      this.updateStatus = false;
      this.http.post(environment.apiBase + '/system/xmind/update', dataObj).subscribe((res: any) => {
        this.updateStatus = true;
        if (res.code !== 0) {
          this.msg.error(res.msg);
        }
        this._jm.enable_edit();
      });
    }
  }

  lock() {
    if (this.lockStatus) {
      this.lockStatus = false;
      this.http.get(environment.apiBase + '/system/xmind/startEdit?rootId=' + this.rootId).subscribe((res: any) => {
        this.lockStatus = true;
        if (res.code !== 0) {
          this.msg.error(res.msg);
        }
      });
    }
  }

  removeNode() {
    const selected_id = this.get_selected_nodeid();
    if (!selected_id) {
      this.msg.error('请先选择一个节点');
      return;
    }
    const formData = new FormData();
    formData.append('id', selected_id);
    formData.append('rootId', this.rootId);
    this.http.post(environment.apiBase + '/system/xmind/deleteNode', formData).subscribe((res: any) => {
      if (res.code === 0) {
        this._jm.remove_node(selected_id);
      } else {
        this.msg.error(res.msg);
      }
    });
  }

  detailModalOk() {
    this.detailModalVisible = false;
  }

  detailModalCancel() {
    this.detailModalVisible = false;
  }

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
} 