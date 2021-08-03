/*
 * @abstract: JianJie
 * @version: 0.0.1
 * @Author: bhabgs
 * @Date: 2020-04-14 16:25:33
 * @LastEditors: bhabgs
 * @LastEditTime: 2020-04-26 13:59:27
 */
const StatsPlugin = require('stats-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const VueConf = require('./index').default;

const plugins = [
  new StatsPlugin('manifest.json', {
    // 方便后期父项目动态加载
    chunkModules: false,
    entrypoints: true,
    source: false,
    chunks: false,
    modules: false,
    assets: false,
    children: false,
    exclude: [/node_modules/],
  }),
];

const buildZip = new FileManagerPlugin({
  onEnd: {
    delete: [`./dist/${VueConf.library}.zip`],
    archive: [
      {
        source: `./dist`,
        destination: `./dist/${VueConf.library}.zip`,
      },
    ],
  },
});

// 当命令为build时，进行zip打包模式
if (VueConf.isProd) {
  plugins.push(buildZip);
}

exports.default = {
  devtool: 'none', // 不打包sourcemap
  output: {
    library: VueConf.library, // 导出名称
    libraryTarget: 'window', // 挂载目标
  },
  performance: {
    hints: false,
  },
  externals: process.env.INTERNET === 'intranet' ? {} : VueConf.externals,
  plugins,
};
