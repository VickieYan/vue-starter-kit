var wx = require('weixin-js-sdk');

var weixin = {
  shareParam: {},
  waitedEvents: [],
  isConfigOk: false,
  init() {
    if (location.host.match('mafengwo')) {
      this.getDefaultParam();
      this.getWxConfig();
    } else {
      console.log('当前不在mafengwo域下，微信配置不可获取');
    }
  },
  getWxConfig() {
    var jsonp = require('jsonp');
    jsonp(
      'https://www.mafengwo.cn/ajax/refresh_weixin_ticket.php',
      null,
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          weixin.config(data.conf);
        }
      }
    );
  },

  // 从 meta 的 og 属性中取默认参数
  getDefaultParam() {
    var defaultParam = {
      title: '',
      description: '',
      url: '',
      image: '',
    };
    for (let i in defaultParam) {
      if (document.querySelector(`meta[property="og:${i}"]`))
        defaultParam[i] = document.querySelector(
          `meta[property="og:${i}"]`
        ).content;
    }
    this.shareParam = {
      title: defaultParam.title,
      desc: defaultParam.description,
      link: defaultParam.url || document.location.href,
      imgUrl: defaultParam.image,
      success: function () {
        // if (methodName.match('onMenuShareTimeline')) {
        // } else if (methodName.match('onMenuShareAppMessage')) {
        // } else if (methodName.match('onMenuShareQQ')) {
        // } else if (methodName.match('onMenuShareWeibo')) {
        // } else if (methodName.match('onMenuShareQZone')) {
        // }
      },
    };
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
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard',
      ],
    });
    wx.ready(function () {
      weixin.isConfigOk = true;
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
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
    ];
    if (param) {
      var ogParam = {
        title: param.title,
        description: param.desc,
        url: param.link,
        image: param.imgUrl,
      };
      param.title && (document.title = param.title);

      for (let i in ogParam) {
        if (document.querySelector(`meta[property="og:${i}"]`) && ogParam[i])
          document.querySelector(`meta[property="og:${i}"]`).content =
            ogParam[i];
      }
    }
    weixinShareMethod.forEach(methodName => {
      wx[methodName]({
        title: (param && param.title) || weixin.shareParam.title,
        desc: (param && param.desc) || weixin.shareParam.desc,
        link: (param && param.link) || weixin.shareParam.link,
        imgUrl: (param && param.imgUrl) || weixin.shareParam.imgUrl,
        success: function () {
          var func = (param && param.success) || weixin.shareParam.success;
          func(methodName);
        },
      });
    });
  },
  dispatchWaitedEvent(param, name) {
    if (this.isConfigOk) {
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

export default {
  share: function (param) {
    weixin.dispatchWaitedEvent(param, 'share');
  },
};

/**
 * 对外暴露的share方法参数都为选填项，参数如下
 * {
 *    title
 *    desc
 *    link
 *    imgUrl
 *    success:function(methodName){}
 * }
 */
