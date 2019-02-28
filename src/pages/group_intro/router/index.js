import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
Vue.use(Router);

let router = new Router({
  routes,
  mode: 'history',
  base: process.env === 'development' ? 'group_intro' : '/mc/activity/group_intro/',
});

export default router;