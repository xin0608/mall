<template>
  <div class="title">我的全部购物车</div>
  <div class="cartList">
    <div class="cartList__item" v-for="(item, index) in cartList" :key="index">
      <div
        class="cartList__item__shop"
        v-if="cartList[index]?.shopName !== '' && hasProducts[index]"
      >
        <div class="cartList__item__title">
          {{ item.shopName }}
        </div>
        <div class="product">
          <div
            v-for="innerItem in cartList[index].productList"
            :key="innerItem._id"
          >
            <div class="product__item" v-if="innerItem.count > 0">
              <img class="product__item__img" :src="innerItem.imgUrl" alt="" />
              <div class="product__item__text">
                <div class="product__item__title">{{ innerItem.name }}</div>
                <div class="product__item__price">
                  <span class="product__item__yen">￥</span>
                  {{ innerItem.price }} x {{ innerItem.count }}
                  <span class="product__item__totalPrice">
                    ￥{{ (innerItem.price * innerItem.count).toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :dockerTab="dockerTab" />
</template>
<script>
import { useStore } from "vuex";
import Docker from "../../components/Docker.vue";
export default {
  name: "CartList",
  components: { Docker },
  setup() {
    const dockerTab = "CartList";
    const store = useStore();
    const { cartList } = store.state;

    // 查询购物车中是否有该商店的商品，
    let hasProducts = [];
    for (let i in cartList) {
      const productList = cartList[i].productList;
      for (let j in productList) {
        if (productList[j].count > 0) {
          hasProducts[i] = true;
        }
      }
    }
    // console.log(hasProducts);
    return { cartList, dockerTab, hasProducts };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/variables.scss";
.title {
  margin: 0.11rem 1.11rem;
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
}
.cartList {
  overflow-y: scroll;
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0.49rem;
  // padding-bottom: 0.5rem;
  background: $background-gray;
  &__item {
    &__shop {
      margin: 0.16rem 0.18rem;
      padding: 0.16rem;
      background: $background-color;
      border-radius: 0.04rem;
      margin-bottom: 0.16rem;
    }
    &__title {
      font-size: 0.16rem;
      color: $content-fontcolor;
      font-weight: bold;
    }
  }
}
.product {
  background-color: $background-color;

  &__item {
    display: flex;
    padding: 0.12rem 0;
    border-bottom: 1px solid $background-gray;

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
      color: $content-fontcolor;
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
      color: $content-highlightcolor;
    }
    &__yen {
      font-size: 0.12rem;
    }

    &__totalPrice {
      position: absolute;
      right: 0;
      color: $content-fontcolor;
      margin: 0 0.06rem;
    }
  }
}
</style>