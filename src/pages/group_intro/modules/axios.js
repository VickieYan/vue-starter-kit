import axios from 'axios';
import qs from 'qs';
import {
  Host
} from './const';

// 请求的公共路径
const commonBasePath = 'grp/activity/unknownDinner/';

const option = {
  baseURL: `https://${Host}/${commonBasePath}`,
  withCredentials: true,
};
const instance = axios.create(option);

instance.interceptors.response.use(
  response => {
    // 接口的统一处理操作
    // handelResponse(response)
    return response.data.data.data;
  },
  error => {
    // 错误http处理
    return Promise.reject(error);
  }
);

const axios_ = {
  formdata(url, data) {
    let formdata = new FormData();
    for (let key in data) {
      formdata.append(key, data[key]);
    }
    return instance.post(url, formdata, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  },
  post(url, data) {
    return instance.post(url, qs.stringify(data));
  },
  get(url, data) {
    return instance.get(url, {
      params: data || '',
    });
  },
};

// 自定义接口统一处理逻辑
// function handelResponse (response) {}

export default axios_;