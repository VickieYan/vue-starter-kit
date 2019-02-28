import Vue from 'vue';
import App from './App';
import router from '@/pages/reserve_note/router';
import { DatetimePicker } from 'mint-ui';
import 'mint-ui/lib/style.min.css';

Vue.component(DatetimePicker.name, DatetimePicker);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});