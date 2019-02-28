/**
 * 提供一些常用函数
 */
import { Domain } from '@/pages/reserve_note/utils/domain';

const UA = window.navigator.userAgent.toLowerCase();
const isAndroid = UA && UA.indexOf('android') > 0;
const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

// 跳转到登陆页面
function toLogin() {
  location.href =
    `https://passport${Domain}/?return_url=` +
    encodeURIComponent(location.href);
}

// 判断 app 版本
// ver1 > ver 2 返回1 相等返回0 小于返回-1
function compareVersion(ver1, ver2) {
  var arrLength = 10;
  var arr = [...new Array(10)].map(() => 0);
  var arr1 = arr.map((item, index) => {
    return (
      (ver1.split('.')[index] != undefined && ver1.split('.')[index] * 1) ||
      item
    );
  });
  var arr2 = arr.map((item, index) => {
    return (
      (ver2.split('.')[index] != undefined && ver2.split('.')[index] * 1) ||
      item
    );
  });

  var result = 0;
  for (var index = 0; index < arrLength; index++) {
    if (arr1[index] > arr2[index]) {
      result = 1;
      break;
    } else if (arr1[index] < arr2[index]) {
      result = -1;
      break;
    }
  }
  return result;
}

// 获取 query 字段
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// 获取 cookie
function getCookie() {
  for (var a = document.cookie.split(';'), i = 0; i < a.length; i++) {
    if (a[i].match(/cookie/i)) {
      var cookie = a[i].split('=')[1];
      return cookie;
    }
  }
}

export default {
  UA,
  isAndroid,
  isIOS,
  compareVersion,
  toLogin,
  getCookie,
  getQueryString,
};
