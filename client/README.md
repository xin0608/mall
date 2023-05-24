# myMall
效果展示

![mall](https://github.com/xin0608/mall/assets/104176827/08fec620-3cca-45d0-8f75-ead62c9fffe2)

## 项目介绍

本项目是一款前后端分离的移动端商城网页。前端使用vue3框架搭建，使用rem布局结合flex弹性布局，实现页面响应式布局。其中购物车数据存储在Vuex的state,为了实现刷新页面数据不丢失，需要将其存储在本地，即localStorage中，用户登录状态也需要存储在localStorage中。后端使用 Node.js + koa2+ MongoDB 设计。

## 功能介绍
### 已完成功能
1、登录注册
2、展示热门商店列表
3、点击商店进入详情页
4、选择商品加入购物车
5、选择购物车中的商品进行结算
6、展示购物车列表信息
7、展示订单信息（包括取消及已下单）

### 待完成功能
1、搜索商店/商品展示相关信息
2、添加、修改、删除收获地址


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
