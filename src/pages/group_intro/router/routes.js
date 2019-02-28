export default [{
  // 因为需求做到现在已经不可能按模版写了。。。缩小为未知饭局项目专用的

  path: '/',
  component: () => import('@/pages/group_intro/pages/Home'),
},
{
  path: '/:id',
  component: () => import('@/pages/group_intro/pages/Home'),
},
];