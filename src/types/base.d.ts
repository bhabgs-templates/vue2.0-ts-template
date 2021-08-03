/*
 * @abstract: JianJie
 * @version: 0.0.1
 * @Author: bhabgs
 * @Date: 2020-05-20 15:14:29
 * @LastEditors: bhabgs
 * @LastEditTime: 2020-05-21 10:01:26
 */
// 客户端类型
type CLINTTYPE = 'webapp';

type APIKEYS = 'videoServer' | 'commonServer' | 'authServer';

interface API {
  videoServer: string;
  authServer: string;
  commonServer: string;
}

// 基础tc mc 结构
interface BASETCMC {
  tc?: string;
  mc?: string;
  val?: number | string;
}

interface STRINGKEY<T = string> {
  [k: string]: T;
}

interface AXIOSRES<T = any> {
  code: string;
  msg?: string;
  ctime: number;
  requestID: string;
  data: T;
}
