/**
 * provide some usefull functions
 */

import {
  Domain
} from '@/pages/group_intro/modules/const';
import {
  wxShare
} from '@/pages/group_intro/modules/wechat';

function setAppNavigationBar(type) {
  var param;
  const blank = '#00FFFFFF';
  const white = '#FEFFFFFF';
  const grey = '#FF474747';
  if (type === 'blank') {
    param = {
      bgColor: blank,
      titleColor: blank,
      subtitleColor: white,
      itemColor: white,
    };
  } else if (type == 'grey') {
    param = {
      bgColor: white,
      titleColor: grey,
      subtitleColor: grey,
      itemColor: grey,
    };
  }
  window.MFWAPP &&
    window.MFWAPP.webview &&
    window.MFWAPP.webview.setNavigationBarStyle(param);
}

/**
 * set og:meta title
 * @param {Object} param {title,description,image} the item that you want to share
 */
function setMetaOg(param = {}) {
  var ogMeta = {
    title: param.title,
    description: param.desc,
    image: param.imgUrl,
  };

  param.title && (document.title = param.title);
  for (let i in ogMeta) {
    if (document.querySelector(`meta[property="og:${i}"]`) && ogMeta[i]) {
      document.querySelector(`meta[property="og:${i}"]`).content = ogMeta[i];
    }
  }

  wxShare(param);
}

/**
 *
 * open the new webview in app with jssdk or location.href = url
 * @param {String} url
 */
function openNewPage(url) {
  if (window.MFWAPP) {
    window.MFWAPP.webview &&
      window.MFWAPP.webview.openNewPage({
        url: url,
      });
    return;
  }

  location.href = url;
}

/**
 * jump to login
 *
 */
function toLogin() {
  location.href =
    `https://passport${Domain}/?return_url=` +
    encodeURIComponent(location.href);
}

/**
 * get the query value from location.href
 *
 * @param {String} name
 * @returns return null for no result and value for the search value
 */
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * get cookie
 *
 * @returns cookie
 */
function getCookie() {
  for (var a = document.cookie.split(';'), i = 0; i < a.length; i++) {
    if (a[i].match(/cookie/i)) {
      var cookie = a[i].split('=')[1];
      return cookie;
    }
  }
}

const UA = window.navigator.userAgent.toLowerCase();
const isAndroid = UA && UA.indexOf('android') > 0;
const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
const isInWx = /MicroMessenger/i.test(window.navigator.userAgent);
const isInApp = window.MFWAPP;

export default {
  setAppNavigationBar,
  setMetaOg,
  openNewPage,
  toLogin,
  getCookie,
  getQueryString,
  UA,
  isAndroid,
  isIOS,
  isInWx,
  isInApp,
};