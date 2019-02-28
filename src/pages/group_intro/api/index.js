import axios from '@/pages/group_intro/modules/axios';

const cache = {
  detail: null,
};

export default {
  getIntro() {
    return new Promise(resolve => {
      resolve({
        id: 479729,
        bg:
          'https://n2-q.mafengwo.net/s12/M00/C1/9A/wKgED1usOhaAUsbUAAfMN9n2Mak378.png?imageView2%2F2%2Fw%2F720%2Fh%2F720%2Fq%2F60',
        name: '未知饭局',
        intro:
          '未知饭局是由马蜂窝官方发起，<br/> 各地认证饭局局长组织的同城社交约饭系列活动',
        groupUrl: 'https://w.mafengwo.cn/group_h5/group_list/479729',
        aricleUrl: 'http://www.mafengwo.cn/g/i/10004382.html',
        titleImg: require('@/pages/group_intro/assets/title.png'),
      });
    });
  },

  getDetail() {
    if (!cache.detail) cache.detail = axios.get('index');
    return cache.detail;
  },

  getComment(page = 1, mddId = 0) {
    return axios.get('comment', {
      page: page,
      mddId,
    });
  },
};
