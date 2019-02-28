import axios from 'axios';
import qs from 'qs';

let baseURL;
if (process.env.NODE_ENV == 'development') {
  baseURL = 'https://m.zhiwei.ab';
} else {
  baseURL = 'https://m.mafengwo.cn';
}
const option = {
  baseURL: baseURL,
  withCredentials: true,
};
const instance = axios.create(option);

function isWebview() {
  const ua = navigator.userAgent;
  const isChrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
  const webview =
    !isChrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/);

  return webview;
}

const axios_ = {
  post(url, data) {
    return instance
      .post(url, qs.stringify(data))
      .then(res => {
        if (res && res.data && res.data.data && res.data.data.code === 5) {
          if (isWebview() && window.MFWAPP) {
            window.MFWAPP.login.showLogin({
              onSuccess: function () {
                // do something after logged in
              },
              successCallback:
                'https://m.mafengwo.cn/activity_reserve_note/index.html',
            });
          } else {
            window.location.href = 'https://passport.mafengwo.cn/login.html';
          }
          return;
        }
        if (res && res.data && res.data.data && res.data.data.code === 0) {
          return res.data.data.data;
        }
        alert(res.data.data.msg);
        return;
      })
      .catch(err => {
        throw err;
      });
  },
  get(url, data) {
    return instance
      .get(url, {
        params: data ? data : '',
      })
      .then(res => {
        if (res && res.data && res.data.data && res.data.data.code === 5) {
          if (isWebview() && window.MFWAPP) {
            window.MFWAPP.login.showLogin({
              onSuccess: function () {
                // do something after logged in
              },
              successCallback:
                'https://m.mafengwo.cn/activity_reserve_note/index.html',
            });
          } else {
            window.location.href = 'https://passport.mafengwo.cn/login.html';
          }
          return;
        }
        if (res && res.data && res.data.data && res.data.data.code === 0) {
          return res.data.data.data;
        }
        alert(res && res.data && res.data.data && res.data.data.msg);
        return;
      })
      .catch(err => {
        throw err;
      });
  },
};

export default axios_;
