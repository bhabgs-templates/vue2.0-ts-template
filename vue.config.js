/*
 * @abstract: JianJie
 * @version: 0.0.1
 * @Author: bhabgs
 * @Date: 2020-03-16 15:52:17
 * @LastEditors: bhabgs
 * @LastEditTime: 2020-05-20 16:46:57
 */

const path = require('path');
const VueConf = require('./vueconf/index').default;
const configWebpack = require('./vueconf/configureWebpack').default;

const ip = 'http://192.168.5.183';

module.exports = {
  publicPath: VueConf.publicPath,
  runtimeCompiler: true,
  css: {
    extract: false, // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
  },
  chainWebpack: (config) => {
    VueConf.chainWebpack(config);
  },
  configureWebpack: configWebpack,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    proxy: {
      '/api/': {
        target: ip,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          // '^/api/': '', // rewrite path
        },
      },
    },
  },
};
