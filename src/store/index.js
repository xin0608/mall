import { createStore } from 'vuex'
// 持久化存储
const setLocalCartList = (state) => {
  const { cartList } = state;
  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
}
const getLocalCartList = () => {
  if (localStorage.cartList) {
    return JSON.parse(localStorage.cartList);
  }
  return {};
}

export default createStore({
  state: {
    cartList: getLocalCartList()
    // cartList: {
    //   // 第一层是商铺id
    //   // 第二层是商品内容以及购物数量
    //   // shopId: {
    //   //   shopName: '沃尔玛',
    //   //   productList: {
    //   //     productId: {
    //   //       _id: '1',
    //   //       name: '番茄 250g/份',
    //   //       imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //   //       sales: 10,
    //   //       price: 33.6,
    //   //       oldPrice: 39.6,
    //   //       count: 2
    //   //     }
    //   //   }
    //   // }
    // }
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo, num, shopName } = payload;
      // state里面的数据是响应式的，不需要解构
      // 第一次添加没有数据需要先创建数据结构,
      // 再add count,最后将数据返回state
      let shopInfo = state.cartList[shopId] || { shopName: '', productList: {} };
      shopInfo.shopName = shopName;
      let product = shopInfo.productList[productId];
      if (!product) { product = productInfo; product.count = 0; }

      product.count += num;
      product.check = true;
      if (product.count <= 0) { product.count = 0; product.check = false; }

      if (product.count > 99) { product.count = 99; }
      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);

    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      const product = state.cartList[shopId].productList[productId];
      product.check = !product.check;
      setLocalCartList(state);
    },
    // 清空购物车
    cleanCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId] = { shopName: '', productList: {} };
      setLocalCartList(state);
    },
    // 支付订单后清空被支付的商品信息
    cleanInOrderProducts(state, payload) {
      const { shopId, products } = payload;
      for (let i in products) {
        const _id = products[i].id;
        state.cartList[shopId].productList[_id].count = 0;
      }
      setLocalCartList(state);
    },
    cartProductsAllChecked(state, payload) {
      const { shopId } = payload;
      const products = state.cartList[shopId].productList;
      if (products) {
        for (let i in products) {
          const product = products[i];
          product.check = true;
        }
      }
      setLocalCartList(state);
    }
  },
  actions: {
  },
  modules: {
  }
})
