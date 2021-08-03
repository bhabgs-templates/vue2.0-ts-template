/*
 * @abstract: JianJie
 * @version: 0.0.1
 * @Author: bhabgs
 * @Date: 2020-03-31 13:08:26
 * @LastEditors: bhabgs
 * @LastEditTime: 2020-05-26 10:39:35
 */
/* eslint-disable import/no-extraneous-dependencies */
import ant from 'ant-design-vue';
import { VueConstructor } from 'vue';
import 'moment/locale/zh-cn';
import 'ant-design-vue/dist/antd.css';
import '@/assets/less/index.less';
import apiConfig from './apiConfig';
import { instance } from './axios';
// 公共接口请求
import server from './server';

export default {
  install(Vue: VueConstructor<Vue>): void {
    Vue.use(ant);
    Vue.prototype.$api = apiConfig;
    Vue.prototype.$axios = instance;
    Vue.prototype.$server = server;
  },
};
