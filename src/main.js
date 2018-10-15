import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Loader from './loader'
import eruda from 'eruda'

Vue.config.productionTip = false; // 关闭生产模式下的提示
if(/eruda=true/.test(window.location)) eruda.init()

const loader = new Loader(Vue)
loader.init()

const vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
