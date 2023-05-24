import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
    // 异步组件 动态路由 需要时才加载，可以使首页加载速度更快
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "my" */ '../views/my/My')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    beforeEnter(to, from, next) {
      const { isLogin2 } = localStorage;
      isLogin2 ? next({ name: 'Home' }) : next();
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    beforeEnter(to, from, next) {
      const { isLogin2 } = localStorage;
      isLogin2 ? next({ name: 'Home' }) : next();
    }
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由切换前执行
router.beforeEach((to, from, next) => {
  // console.log(to, from);
  const { isLogin2 } = localStorage;
  // 登录后才能访问首页
  (isLogin2 || to.name === 'Login' || to.name === "Register") ? next() : next({ name: 'Login' });
})

export default router
