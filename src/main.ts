/*
 * @abstract: JianJie
 * @version: 0.0.1
 * @Author: bhabgs
 * @Date: 2020-03-16 15:50:03
 * @LastEditors: bhabgs
 * @LastEditTime: 2020-04-02 14:56:57
 */
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import reg from './utils/registered';
import App from './app';
import router from './router';

Vue.use(reg);

const vueOptions = {
  el: '#childs', // 项目模块唯一名
  router,
  // ...， 可注入其他配置参数
  render: (h: any) => h(App),
};

Vue.config.productionTip = false;

if (!(window as any).singleSpaNavigate) {
  // 如果不是single-spa模式
  delete vueOptions.el;
  new Vue(vueOptions).$mount('#app');
}

// 包装一个vue微前端服务对象
const VueMicro = singleSpaVue({
  Vue,
  appOptions: vueOptions,
});

// 导出生命周期对象
export const { bootstrap, mount, unmount } = VueMicro; // 启动时 挂载时 卸载时

export default VueMicro;
