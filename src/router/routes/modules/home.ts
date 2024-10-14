// 路由示例
const homeDemo = {
  path: '/home',
  name: 'home',
  // route level code-splitting
  // this generates a separate chunk (About.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import('/@/views/Home.vue'),
};

export default homeDemo;
