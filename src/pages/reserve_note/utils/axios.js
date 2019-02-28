import axios from 'axios';
import qs from 'qs';
import { Host } from '@/pages/reserve_note/utils/domain';
var option = {
  baseURL: `https://${Host}/path`,
  withCredentials: true,
};
var instance = axios.create(option);

var axios_ = {
  post(url, data) {
    return instance
      .post(url, qs.stringify(data))
      .then(res => {
        return res.data;
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
        return res.data;
      })
      .catch(err => {
        throw err;
      });
  },
};

export default axios_;
