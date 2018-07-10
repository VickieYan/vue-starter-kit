import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false; // 关闭生产模式下的提示

const vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})