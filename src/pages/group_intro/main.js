import Vue from 'vue';
import App from '@/pages/group_intro/App';
import router from '@/pages/group_intro/router';
import api from '@/pages/group_intro/api';
import utils from '@/pages/group_intro/utils';
import $transfomer from '@/pages/group_intro/modules/transformer.js';
Vue.prototype.$api = api;
Vue.prototype.$openNewPage = utils.openNewPage;
Vue.prototype.$transfomer = $transfomer;
new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app');