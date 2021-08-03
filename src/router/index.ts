/*
 * @abstract: JianJie
 * @version: 0.0.1
 * @Author: bhabgs
 * @Date: 2020-03-16 15:50:03
 * @LastEditors: bhabgs
 * @LastEditTime: 2020-05-26 10:40:01
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Lay from '@/views/lay';

import DATAREPORT from './data_report';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: Lay,
    children: [DATAREPORT],
  },
  {
    path: '/n404',
    name: '404',
    component: {
      template: '<div>404</div>',
    },
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export { routes };
export default router;
