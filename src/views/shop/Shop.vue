<template>
  <div class="shop__header">
    <span @click="handleBack" class="iconfont shop__back">&#xe697;</span>
    <input class="shop__input" type="text" placeholder="请输入商品名称搜索" />
    <span class="iconfont shop__search">&#xe65c;</span>
    <!-- 防止出现裂图  v-show="data.item.imgUrl"-->
    <div class="shop__msg">
      <ShopMessage :item="item" v-show="item.imgUrl" />
    </div>
  </div>
  <Content :shopName="item.name" />
  <Cart />
</template>
<script>
import { reactive, toRefs } from "vue";
import { get } from "../../utils/request";
import { useRouter, useRoute } from "vue-router";
import ShopMessage from "../../components/ShopMessage.vue";
import Content from "./Content.vue";
import Cart from "./Cart.vue";
const getDataEffect = () => {
  const route = useRoute();
  console.log(route.params.id);
  const data = reactive({ item: {} });
  const getData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data[route.params.id - 1];
    }
  };
  const { item } = toRefs(data);
  return { item, getData };
};
const handleBackEffect = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return { handleBack };
};
export default {
  name: "Shop",
  components: { ShopMessage, Content, Cart },
  setup() {
    const { item, getData } = getDataEffect();
    const { handleBack } = handleBackEffect();
    getData();
    return { item, handleBack };
  },
};
</script>
<style lang="scss" scoped>
.shop__header {
  margin: 0.16rem 0.18rem;
  .shop__back {
    position: relative;
    top: 0.2em;
    font-size: 0.28rem;
    color: #b6b6b6;
  }
  .shop__input {
    position: relative;
    box-sizing: border-box;
    width: 2.5rem;
    height: 0.32rem;
    margin-left: 0.1rem;
    padding-left: 0.44rem;
    background: #f5f5f5;
    border: none;
    border-radius: 0.16rem;
    font-size: 0.14rem;
    color: #333333;
  }
  .shop__search {
    position: absolute;
    top: 0.27rem;
    left: 0.74rem;
    font-size: 0.18rem;
    color: #b6b6b6;
  }
  .shop__msg {
    width: 100%;
    height: 0.74rem;
    margin: 0.16rem 0;
  }
}
</style>