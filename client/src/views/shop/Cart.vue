<template>
  <div class="mask" v-show="showCart" @click="handleshowCart"></div>
  <div class="product" v-show="showCart">
    <div class="product__header">
      <span
        class="iconfont product__header__check"
        :class="{ 'product__header__check--active': allChecked }"
        @click="
          () => {
            cartProductsAllChecked(shopId);
          }
        "
        >&#xe618;</span
      >全选
      <span
        class="product__header__clean"
        @click="
          () => {
            cleanCartProducts(shopId);
          }
        "
        >清空购物车</span
      >
    </div>
    <div v-for="item in cartProductList" :key="item._id">
      <div class="product__item" v-if="item.count !== 0">
        <span
          class="iconfont product__item__check"
          :class="{ 'product__item__check--active': item.check }"
          @click="
            () => {
              changeCartItemChecked(shopId, item._id);
            }
          "
          >&#xe618;</span
        >
        <img class="product__item__img" :src="item.imgUrl" alt="" />
        <div class="product__item__text">
          <div class="product__item__title">{{ item.name }}</div>
          <div class="product__item__price">
            <span class="product__item__yen">￥</span>
            {{ item.price }}
            <span class="product__item__usedprice">￥{{ item.oldPrice }}</span>
            <div class="product__item__operation">
              <span
                class="iconfont product__item__reduce"
                @click="
                  () => {
                    changeCartItemInfo(shopId, item._id, item, -1);
                  }
                "
                >&#xe75e;</span
              >
              <span class="product__item__count">
                {{ item.count }}
              </span>
              <span
                class="iconfont product__item__add"
                @click="
                  () => {
                    changeCartItemInfo(shopId, item._id, item, 1);
                  }
                "
                >&#xe777;</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cart">
    <span class="iconfont cart__icon" @click="handleshowCart">&#xecad;</span>
    <div class="cart__tag">{{ totalCount }}</div>
    <span class="cart__info"
      >总计：
      <span class="cart__info__total"
        >&yen;
        <span>{{ totalPrice }}</span>
      </span>
    </span>

    <button class="cart__btn" v-show="totalPrice > 0">
      <router-link :to="{ path: `/OrderConfirmation/${shopId}` }">
        去结算</router-link
      >
    </button>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "./useCommonCartEffect";
const useCartEffect = (shopId) => {
  const store = useStore();
  const { cartList } = store.state;

  const totalCount = computed(() => {
    const productList = cartList[shopId]?.productList || [];
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        count += product.count;
      }
    }
    return count;
  });
  const totalPrice = computed(() => {
    const productList = cartList[shopId]?.productList || [];
    let price = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.check) {
          price += product.count * product.price;
        }
      }
    }
    //  保留两位小数
    return price.toFixed(2);
  });
  const allChecked = computed(() => {
    const productList = cartList[shopId]?.productList || [];
    let allChecked = true;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.count > 0 && !product.check) {
          allChecked = false;
        }
      }
    }
    //  保留两位小数
    return allChecked;
  });

  const cartProductList = computed(() => {
    const productList = cartList[shopId]?.productList || [];
    console.log(productList);
    return productList;
  });
  const { changeCartItemInfo } = useCommonCartEffect();
  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", { shopId, productId });
  };
  const cleanCartProducts = (shopId) => {
    store.commit("cleanCartProducts", { shopId });
  };
  const cartProductsAllChecked = (shopId) => {
    store.commit("cartProductsAllChecked", { shopId });
  };
  return {
    cartList,
    totalCount,
    totalPrice,
    allChecked,
    cartProductList,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    cartProductsAllChecked,
  };
};
// 代码优化 0922
export default {
  name: "Cart",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const showCart = ref(false);
    const handleshowCart = () => {
      showCart.value = !showCart.value;
    };
    const {
      cartList,
      totalCount,
      totalPrice,
      allChecked,
      cartProductList,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      cartProductsAllChecked,
    } = useCartEffect(shopId);

    return {
      totalCount,
      totalPrice,
      allChecked,
      cartProductList,
      cartList,
      shopId,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      cartProductsAllChecked,
      showCart,
      handleshowCart,
    };
  },
};
</script>
<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.49rem;
  background: rgba(0, 0, 0, 0.5);
}
.cart {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  background: #ffffff;
  box-shadow: 0 -0.01rem 0.01rem 0 #f1f1f1;

  &__icon {
    font-size: 0.28rem;
    color: #0091ff;
    margin: 0 0.32rem 0 0.24rem;
  }
  &__tag {
    position: absolute;
    top: 0.06rem;
    left: 0.44rem;
    min-width: 0.12rem;
    height: 0.12rem;
    text-align: center;
    border-radius: 50%;
    font-size: 0.08rem;
    color: #ffffff;
    background-color: #e93b3b;
  }
  &__info {
    font-size: 0.12rem;
    color: #333333;
    &__total {
      font-size: 0.18rem;
      color: #e93b3b;
    }
  }
  &__btn {
    position: absolute;
    right: 0;
    width: 0.98rem;
    height: 100%;
    border: none;
    background: #4fb0f9;
    font-size: 0.14rem;

    a {
      color: #ffffff;
      text-decoration: none;
    }
  }
}
.product {
  position: absolute;
  bottom: 0.49rem;
  left: 0;
  right: 0;
  background-color: #fff;
  &__header {
    display: flex;
    align-items: center;
    height: 0.52rem;
    font-size: 0.14rem;
    color: #333333;
    border-bottom: 0.01rem solid #f1f1f1;
    &__check {
      font-size: 0.28rem;
      color: #e8dada;
      margin: 0 0.18rem;
      &--active {
        color: #0091ff;
      }
    }
    &__clean {
      position: absolute;
      right: 0.2rem;
    }
  }
  &__item {
    display: flex;
    padding: 0.12rem 0;
    border-bottom: 1px solid #f1f1f1;
    &__check {
      font-size: 0.28rem;
      color: #e8dada;
      margin: 0.04rem 0.18rem 0;
      &--active {
        color: #0091ff;
      }
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
    }
    &__text {
      flex: 1;
      font-size: 0.14rem;
      line-height: 0.2rem;
      margin-left: 0.16rem;
    }
    &__title {
      color: #333333;
    }
    &__sales {
      margin: 0.06rem 0;
      font-size: 0.12rem;
      line-height: 0.16rem;
    }
    &__price {
      display: flex;
      align-items: center;
      position: relative;
      color: #e93b3b;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__usedprice {
      font-size: 0.12rem;
      color: #999999;
      text-decoration: line-through;
      margin-left: 0.06rem;
    }
    &__operation {
      position: absolute;
      right: 0.2rem;
      height: 0.17rem;
    }
    &__reduce {
      // padding-left: 0.15rem;
      font-size: 0.28rem;
      color: #666666;
    }
    &__count {
      position: relative;
      color: #333333;
      top: -0.04rem;
    }
    &__add {
      // position: absolute;
      // right: 0;
      font-size: 0.28rem;
      color: #0091ff;
    }
  }
}
</style>