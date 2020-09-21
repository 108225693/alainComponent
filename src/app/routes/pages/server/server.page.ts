import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.page.html',
  styleUrls: ['./server.page.less']
})
export class ServerComponent implements OnInit {
  number = percent => percent;
  size = percent => percent + 'GB';
  nzStrokeColorPurple = { '0%': '#ab7cf4', '100%': '#ab7cf4' };
  nzStrokeColorYellow = { '0%': '#fdbe13', '100%': '#fdbe13' };
  nzStrokeColorGreen = { '0%': '#52c41a', '100%': '#52c41a' };

  serverData = [
    { name: '武汉项目部', ip: '43.242.121.47', os: 'Linux', frame: 'amd64', address: '--' },
    { name: '武汉项目部', ip: '43.242.121.48', os: 'Linux', frame: 'amd64', address: '--' },
    { name: '武汉项目部', ip: '43.242.121.49', os: 'Linux', frame: 'amd64', address: '--' }
  ];
  javaData = [
    { info: '武汉项目部', time: '2020-02-01 12:00:05', install: '/user/java/jdk1.8.0-111/jre', project: '/home/tddx/projects', version: '1.8.0', 'duration': '7天20小时50分钟' },
    { info: '武汉项目部', time: '2020-02-01 12:00:12', install: '/user/java/jdk1.8.0-111/jre', project: '/home/tddx/projects', version: '1.8.0', 'duration': '7天20小时50分钟' },
    { info: '武汉项目部', time: '2020-02-01 12:00:38', install: '/user/java/jdk1.8.0-111/jre', project: '/home/tddx/projects', version: '1.8.0', 'duration': '7天20小时50分钟' }
  ];

  constructor() { }

  ngOnInit() {

  }

}
