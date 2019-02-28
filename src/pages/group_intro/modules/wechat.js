var wx = require('weixin-js-sdk');

var weixin = {
  isReady: false,
  defaultShareParam: {},
  waitedEvents: [],

  init() {
    // 获取wx签名只能在白名单 .mafengwo 域下
    if (
      location.host.match('mafengwo') &&
      /MicroMessenger/i.test(window.navigator.userAgent)
    ) {
      this.getWxConfig();
      // 取 meta og: 属性为默认分享值
      this.getDefaultShareParam();
    }
  },

  // 从 meta 的 og 属性中取默认参数
  getDefaultShareParam() {
    var ogMeta = {
      title: '',
      description: '',
      image: '',
    };
    for (let i in ogMeta) {
      if (document.querySelector(`meta[property="og:${i}"]`))
        ogMeta[i] = document.querySelector(`meta[property="og:${i}"]`).content;
    }
    this.defaultShareParam = {
      title: ogMeta.title,
      desc: ogMeta.description,
      link: document.location.href,
      imgUrl: ogMeta.image,
    };
  },

  getWxConfig() {
    var jsonp = require('jsonp');
    jsonp(
      'https://www.mafengwo.cn/ajax/refresh_weixin_ticket.php',
      null,
      function (err, data) {
        if (err) {
          console.error(err);
        } else {
          weixin.config(data.conf);
        }
      }
    );
  },

  config(config) {
    wx.config({
      debug: false,
      appId: config.appId,
      nonceStr: config.nonceStr,
      signature: config.signature,
      timestamp: config.timestamp,
      jsApiList: [
        'checkJsApi',
        /**
         * 这两个暂时有bug，等待1.4正式版本以及安卓修复bug后再使用
         * 'updateAppMessageShareData',
         * 'updateTimelineShareData',
         */

        // 以下几个即将废弃 客户端 6.7.2 jsdk 1.4
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
      ],
    });
    wx.ready(function () {
      weixin.isReady = true;
      // 默认调用分享
      weixin.share();
      if (weixin.waitedEvents[0]) {
        weixin.waitedEvents.forEach(item => {
          weixin[item.name](item.param);
        });
      }
    });
    wx.error(function (err) {
      console.error(err);
    });
  },

  share(param) {
    var weixinShareMethod = [
      /**
       * 1.4 版本目前有问题
       * 'updateAppMessageShareData', 'updateTimelineShareData',
       */

      // 以下5个即将废弃 客户端 6.7.2 jsdk 1.4
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
    ];
    // 指定分享信息
    var shareParam = param ?
      this.handleSpecificShareParam(param) :
      weixin.defaultShareParam;

    weixinShareMethod.forEach(methodName => {
      wx[methodName](shareParam, shareParam.callback || function () {});
    });
  },

  // 处理指定调用传入的参数
  handleSpecificShareParam(param) {
    for (var key in this.defaultShareParam) {
      if (!param[key]) {
        param[key] = this.defaultShareParam[key];
      }
    }
    return param;
  },

  // 做事件队列等待机制，支持多种方法【目前只有 share 方法】
  dispatchWaitedEvent(param, name) {
    if (this.isReady) {
      weixin[name](param);
    } else {
      this.waitedEvents.push({
        name: name,
        param: param,
      });
    }
  },
};

weixin.init();

function wxShare(param) {
  weixin.dispatchWaitedEvent(param, 'share');
}
export {
  wxShare
};

/**
 * 对外暴露的share方法参数都为选填项，参数如下
 * {
 *    title
 *    desc
 *    link
 *    imgUrl
 * }
 *
 */