/*
 * @abstract: JianJie
 * @version: 0.0.1
 * @Author: bhabgs
 * @Date: 2020-05-21 09:51:37
 * @LastEditors: bhabgs
 * @LastEditTime: 2020-05-21 09:58:08
 */
type PORMISEDATAS = Array<TCMCINFO>;

interface TCMCINFO {
  title: string;
  val: number | string;
  keyCode?: string;
  unit: unit;
  precision: number;
  show: boolean;
  child?: Array<TCMCINFO>;
}

interface ExportDefault<T = any> {
  url: string;
  name: string; // 名字是唯一标识
  data: T;
  filter: (data: STRINGKEY) => Promise<T>;
}
