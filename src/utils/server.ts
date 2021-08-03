/*
 * @abstract: JianJie
 * @version: 0.0.1
 * @Author: bhabgs
 * @Date: 2020-02-24 09:25:43
 * @LastEditors: bhabgs
 * @LastEditTime: 2020-05-20 15:37:03
 */
/**
 * 通用接口通过tc mc获取数据(批量)
 * @param that 传入的实例
 * @param data 传入的数据
 */

import { Vue } from 'vue-property-decorator';

const that = Vue.prototype;

interface TcMc {
  dt: number;
  mc: string;
  tc: string;
  v: number;
}
interface ResData {
  code: string;
  ctime: Date;
  data: TcMc[];
}

function GET_COMMON_BATCH(data: TcMc[]) {
  return that.$axios
    .post(`${that.$api.commonServer}/data/v2/get/list`, data)
    .then((res: ResData) => {
      return res;
    })
    .catch((err: any) => {
      that.$message.error(err.msg || err.message);
    });
}

/**
 * 向通用接口下发信号（批量）
 * @param that 传入的实例
 * @param data 传入的数据
 */

function SEND_COMMON_BATCH(data: TcMc[]) {
  return that.$axios
    .post(`${that.$api.commonServer}/data/v2/set/list`, data)
    .then((res: any) => {
      return res;
    })
    .catch((err: any) => {
      that.$message.error(err.msg || err.message);
    });
}

/**
 * 单个信号下发(单个)
 * @param that 当前实例
 * @param data 传入数据 { tc, mc， v }
 */
function SEND_COMMON_SINGLE({ tc, mc, v }: any) {
  return that.$axios
    .post(`${that.$api.commonServer}/set`, { tc, mc, v })
    .then((res: any) => {
      return res;
    })
    .catch((err: any) => {
      that.$message.error(err.msg || err.message);
    });
}

/**
 * 单个信号读取（单个）
 * @param that 当前实例
 * @param data 传入数据 { tc: '', mc: ''}
 */
function GET_COMMON_SINGLE({ tc, mc }: any) {
  return that.$axios
    .get(`${that.$api.commonServer}/get/thing/${tc}/metric/${mc}`)
    .then((res: any) => {
      return res;
    })
    .catch((err: any) => {
      that.$message.error(err.msg || err.message);
    });
}

/**
 * 获取历史数据
 * @param that 当前实例
 * @param data 传入数据
 */
function GET_COMMON_HISTORY(data: TcMc[]) {
  return that.$axios
    .post(`${that.$api.commonServer}/history/query`, data)
    .then((res: any) => {
      return res;
    })
    .catch((err: any) => {
      that.$message.error(err.msg || err.message);
    });
}

export default {
  GET_COMMON_BATCH,
  SEND_COMMON_BATCH,
  SEND_COMMON_SINGLE,
  GET_COMMON_SINGLE,
  GET_COMMON_HISTORY,
};
