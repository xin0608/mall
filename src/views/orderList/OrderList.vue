<template>
  <div class="title">我的订单</div>
  <div class="orderList">
    <div class="orderList__item" v-for="(item, index) in list" :key="index">
      <div class="orderList__item__title">{{ item.shopName }}</div>
      <div class="orderList__item__status">
        {{ item.isCanceled ? "已取消" : "已下单" }}
      </div>
      <div>
        <template
          v-for="(innerItem, innerIndex) in item.products"
          :key="innerIndex"
        >
          <img
            v-if="innerIndex <= 3"
            class="orderList__item__img"
            :src="innerItem.product.img"
            alt=""
          />
          <span v-if="innerIndex > 3">...</span>
        </template>
        <div class="orderList__item__info">
          <div class="orderList__item__price">¥{{ item.totalPrice }}</div>
          <div class="orderList__item__count">共{{ item.totalCount }}件</div>
        </div>
      </div>
    </div>
  </div>
  <Docker :dockerTab="dockerTab" />
</template>
<script>
import { reactive, toRefs } from "vue";
import { get } from "../../utils/request";
import Docker from "../../components/Docker.vue";
export default {
  name: "OrderList",
  components: { Docker },
  setup() {
    const dockerTab = "OrderList";
    const data = reactive({ list: [] });
    const getOrderList = async () => {
      const result = await get("/api/order");

      if (result?.errno === 0 && result?.data?.length) {
        const orderList = result.data;
        orderList.forEach((orderItem) => {
          const products = orderItem.products;
          let totalCount = 0;
          let totalPrice = 0;
          products.forEach((productItem) => {
            totalCount += productItem.orderSales;
            totalPrice += productItem.product.price * productItem.orderSales;
          });
          orderItem.totalCount = totalCount;
          orderItem.totalPrice = totalPrice.toFixed(2);
        });

        data.list = result.data;
        // console.log(data.list);
      }
      // console.log(result.data);
    };
    getOrderList();
    const { list } = toRefs(data);
    // console.log(list);
    // console.log(list[0].shopName);
    return { dockerTab, list };
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-top: 0.11rem;
  text-align: center;
  font-size: 0.16rem;
  color: #333333;
}
.orderList {
  overflow-y: scroll;
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0.49rem;
  padding: 0.16rem 0.18rem;
  background-color: #f1f1f1;
  &__item {
    position: relative;
    padding: 0.16rem;
    margin-bottom: 0.16rem;
    border-radius: 0.04rem;
    background-color: #fff;
    &__title {
      font-size: 0.16rem;
      color: #333333;
      font-weight: bold;
    }
    &__status {
      position: absolute;
      right: 0.16rem;
      top: 0.16rem;
      font-size: 0.14rem;
      color: #999999;
    }
    &__img {
      width: 0.4rem;
      height: 0.4rem;
      margin: 0.16rem 0.12rem 0 0;
    }
    &__info {
      position: absolute;
      bottom: 0.16rem;
      right: 0.16rem;
      text-align: right;
    }
    &__price {
      margin-bottom: 0.04rem;
      font-size: 0.14rem;
      color: #e93b3b;
    }
    &__count {
      font-size: 0.12rem;
      color: #333333;
    }
  }
}
</style>