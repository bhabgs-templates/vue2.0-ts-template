/*
 * @abstract: JianJie
 * @version: 0.0.1
 * @Author: bhabgs
 * @Date: 2020-02-24 09:25:43
 * @LastEditors: bhabgs
 * @LastEditTime: 2020-05-21 09:58:21
 */

// 深拷贝
export const deepCopy = (source: any): any => {
  const target: STRINGKEY<any> = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        target[key] = deepCopy(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
};

export default {};
