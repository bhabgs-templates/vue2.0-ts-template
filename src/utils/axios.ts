/*
 * @Descripttion:
 * @version:
 * @Author:
 * @Date: 2019-11-18 14:02:39
 * @LastEditors: bhabgs
 * @LastEditTime: 2020-05-20 16:41:58
 */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { message } from 'ant-design-vue';

const clientType: CLINTTYPE = 'app';

const headers: STRINGKEY = {
  'X-Custom-Header': 'foobar',
  clientType,
  'Content-Type': 'application/json;charset=UTF-8',
};

const instance = axios.create({
  baseURL: '/api/', // http://192.168.6.166:18003/webapi
  timeout: 60000,
  validateStatus(status) {
    if (status > 400 && status < 500) {
      message.error(`请求失败. status:${status}`);
    }
    return status < 500;
  },
  headers,
});

const getToken = (): string => {
  return `Bearer ${sessionStorage.getItem('token')}`;
};

instance.interceptors.request.use(
  (conf) => {
    conf.headers.Authorization = getToken();
    if (sessionStorage.getItem('corpId')) {
      conf.headers.corpId = sessionStorage.getItem('corpId');
    }
    return conf;
  },
  (err) => {
    return Promise.reject(err);
  },
);

let status: boolean = false;

instance.interceptors.response.use(
  (res) => {
    const resData = res.data;
    status = resData.code === 'M0000';
    if (status) {
      return Promise.resolve(resData);
    }
    return Promise.resolve(resData);
  },
  (err) => {
    return Promise.reject(err);
  },
);

export { instance };

export default axios;
