import Vue from 'vue'
import Router from 'vue-router'
import { Demo1, Demo2 }from '@/components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/demo1',
      name: 'Demo1',
      component: Demo1
    },
    {
      path: '/Demo2',
      name: 'Demo2',
      component: Demo2
    },
  ]
})
