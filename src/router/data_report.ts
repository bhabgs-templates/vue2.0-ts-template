/*
 * @abstract: JianJie
 * @version: 0.0.1
 * @Author: bhabgs
 * @Date: 2020-05-25 15:25:46
 * @LastEditors: bhabgs
 * @LastEditTime: 2020-05-26 10:41:17
 */
import { RouteConfig } from 'vue-router';

const DATAREPORTCHILD: RouteConfig[] = [
  {
    path: '/',
    meta: {
      name: '模块默认页面',
    },
    component: {
      template: '<div>模块默认页面</div>',
    },
  },
  {
    path: 'po',
    meta: {
      name: '模块其他页面',
    },
    component: {
      template: '<div>模块其他页面</div>',
    },
  },
];

const DATAREPORT: RouteConfig = {
  path: '/',
  meta: {
    name: '模块名称',
  },
  component: {
    template: '<router-view />',
  },
  children: DATAREPORTCHILD,
};

export default DATAREPORT;
