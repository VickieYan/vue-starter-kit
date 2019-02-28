import axios from '../axios';

// 获取预约游记列表
export async function getReserveList(params) {
  return await axios.get('/note/activity/appointment/api/list', params);
}

// 添加预约游记
export async function addReserveNote(params) {
  return await axios.post('/note/activity/appointment/api', params);
}

// 取消预约游记
export async function cancelReserveNote(params) {
  return await axios.post('/note/activity/appointment/api/cancel', params);
}

// 获取自己游记信息
export async function getMyNote(params) {
  return await axios.get('/note/activity/appointment/api/my', params);
}

// 获取用户游记信息
export async function getUserNote(params) {
  return await axios.get('/note/activity/appointment/api/user', params);
}

// 获取目的地接口
export async function searchMdd(params) {
  return await axios.get('/note/activity/appointment/api/mddSearch', params);
}

// 获取活动信息
export async function getActivityInfo(params) {
  return await axios.get('/note/activity/appointment/api/status', params);
}
