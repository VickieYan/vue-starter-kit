import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

let routes = [
  { path: '/', component: () => import('@/pages/reserve_note/pages/Home') },
  { path: '/index', component: () => import('@/pages/reserve_note/pages/Home') },
];

let router = new Router({
  routes,
  mode: 'history',
  base:
    process.env === 'development'
      ? 'reserve_note'
      : '/mc/activity/reserve_note/',
});
export default router;
