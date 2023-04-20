<template>
  <div class="order__header">
    <div class="header__top">
      <span class="iconfont back" @click="handleBack">&#xe697;</span>
      <span>确认订单</span>
    </div>
    <div class="address">
      <div class="address__title">收货地址</div>
      <div class="address__info">北京理工大学国防科技园2号楼10层</div>
      <div class="address__phone">瑶妹（先生） 18911024266</div>
      <div class="iconfont toRight">&#xe62d;</div>
    </div>
  </div>
  <div class="order__info">
    <div class="product">
      <div class="product__title">
        {{ shopName }}
      </div>
      <div v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0 && item.check">
          <img class="product__item__img" :src="item.imgUrl" alt="" />
          <div class="product__item__text">
            <div class="product__item__title">{{ item.name }}</div>
            <div class="product__item__price">
              <span class="product__item__yen">￥</span>
              {{ item.price }} x {{ item.count }}
              <span class="product__item__totalPrice">
                ￥{{ (item.price * item.count).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="order__bottom">
    <span>实付金额</span>
    <span>￥{{ totalPrice }}</span>
    <button class="order__btn" @click="handleCommitOrder">提交订单</button>
  </div>
  <div class="mask" v-if="showMask">
    <div class="mask__content" v-if="!showSuccess">
      <div class="mask__content__title">确认要离开收银台？</div>
      <div class="mask__content__info">请尽快完成支付，否则将被取消</div>
      <div class="mask__content__btn">
        <button class="btn__cancel" @click="() => handleConfirmOrder(true)">
          取消订单
        </button>
        <button class="btn__confirm" @click="() => handleConfirmOrder(false)">
          确认支付
        </button>
      </div>
    </div>
    <div class="mask__success" v-if="showSuccess">
      <div class="iconfont right">&#xe610;</div>
      支付成功，等待配送
      <div class="iconfont close" @click="handleClose">&#xe8e7;</div>
    </div>
  </div>
  <!-- <div class="mask__success" v-if="showSuccess">成功</div> -->
  <Toast v-if="show" :message="message" />
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { showToastEffect } from "../../components/Toast.vue";
const handleBackEffect = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return { handleBack };
};

export default {
  name: "OrderConfirmation",
  components: { Toast },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const shopId = route.params.id;
    const store = useStore();
    const { cartList } = store.state;
    const shopName = cartList[shopId].shopName;
    const productList = cartList[shopId].productList;
    const { handleBack } = handleBackEffect();
    // const price = 0;
    const totalPrice = computed(() => {
      let price = 0;
      if (productList) {
        for (let i in productList) {
          const product = productList[i];
          if (product.check) {
            price += product.count * product.price;
          }
        }
      }
      return price.toFixed(2);
    });
    let showMask = ref(false);
    let showSuccess = ref(false);
    const handleClose = () => {
      router.push({ name: "OrderList" });
    };
    const handleCommitOrder = () => {
      showMask.value = true;
    };
    const { show, message, showToast } = showToastEffect();
    const handleConfirmOrder = async (isCanceled) => {
      const products = [];
      for (let i in productList) {
        const product = productList[i];
        if (product.check) {
          products.push({ id: product._id, num: product.count });
        }
      }
      try {
        const result = await post("/api/order", {
          addressId: 1,
          shopId,
          shopName,
          isCanceled,
          products,
        });

        if (result?.errno === 0) {
          // 确认提交订单
          if (!isCanceled) {
            showSuccess.value = true;
            store.commit("cleanInOrderProducts", { shopId, products });
          } else {
            router.push({ name: "OrderList" });
          }
        }
      } catch (e) {
        showToast("请求失败");
      }
    };

    return {
      show,
      message,
      shopName,
      productList,
      handleBack,
      totalPrice,
      handleCommitOrder,
      handleConfirmOrder,
      showMask,
      showSuccess,
      handleClose,
    };
  },
};
</script>
<style lang="scss" scoped>
.order__header {
  // 渐变
  position: relative;
  height: 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  .header__top {
    padding: 0.41rem 0.18rem 0.22rem;
    text-align: center;
    font-size: 0.16rem;
    color: #ffffff;
  }
  .back {
    position: absolute;
    font-size: 0.28rem;
    top: 0.35rem;
    left: 0;
  }
  .address {
    position: relative;
    display: flex;
    flex-direction: column;
    position: absolute;
    box-sizing: border-box;
    width: 3.39rem;
    height: 1.11rem;
    margin: 0 0.18rem;
    padding: 0.16rem;
    background: #ffffff;
    border-radius: 0.04rem;
    z-index: 99;
    &__title {
      flex: 1;
      font-weight: bold;
      font-size: 0.16rem;
      color: #333333;
    }
    &__info {
      flex: 1;
      font-size: 0.14rem;
      color: #333333;
    }
    &__phone {
      flex: 1;
      font-size: 0.12rem;
      color: #666666;
    }
    .toRight {
      position: absolute;
      right: 0.16rem;
      top: 0.48rem;
      color: #666666;
    }
  }
}
.order__info {
  position: absolute;
  top: 1.69rem;
  left: 0;
  right: 0;
  bottom: 0.49rem;
  background-color: #f1f1f1;
  overflow-y: scroll;
  padding: 0.5rem 0.18rem 0;
}
.order__bottom {
  display: flex;
  align-items: center;
  height: 0.49rem;
  padding-left: 0.24rem;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 0.14rem;
  color: #333333;
  .order__btn {
    position: absolute;
    right: 0;
    height: 100%;
    width: 0.98rem;
    border: none;
    background: #4fb0f9;

    color: #ffffff;
  }
}
.product {
  padding: 0.16rem;
  background-color: #fff;
  &__title {
    font-weight: bold;
    font-size: 0.16rem;
    color: #333333;
    background-color: #fff;
  }
  &__item {
    display: flex;
    padding: 0.12rem 0;
    border-bottom: 1px solid #f1f1f1;

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

    &__totalPrice {
      position: absolute;
      right: 0;
      color: #333333;
      margin: 0 0.06rem;
    }
  }
}
.mask {
  z-index: 999;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  &__success {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 2.43rem 0.37rem 2.67rem;
    width: 3.01rem;
    height: 1.57rem;
    background: #ffffff;
    border-radius: 0.04rem;
    font-size: 0.18rem;
    color: #333333;
    .right {
      font-size: 0.4rem;
      color: #000000;
    }

    .close {
      position: absolute;
      top: 0.12rem;
      right: 0.12rem;
      color: #666666;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2.43rem 0.37rem 2.67rem;
    width: 3.01rem;
    height: 1.57rem;
    background: #ffffff;
    border-radius: 0.04rem;
    &__title {
      font-weight: bold;
      font-size: 0.18rem;
      color: #333333;
    }
    &__info {
      margin: 0.08rem 0 0.24rem;
      font-size: 0.14rem;
      color: #666666;
    }
    &__btn {
      button {
        width: 0.8rem;
        height: 0.32rem;
        border: 0.01rem solid #4fb0f9;
        border-radius: 0.16rem;
        background-color: #fff;
        font-size: 0.14rem;
        color: #0091ff;
      }
      .btn__confirm {
        margin-left: 0.32rem;
        color: #ffffff;
        background-color: #4fb0f9;
      }
    }
  }
}
</style>