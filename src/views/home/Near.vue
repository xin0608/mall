<template>
  <div class="near">
    <h1 class="near__title">附近店铺</h1>
    <router-link
      v-for="item in nearList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <ShopMessage :item="item" :showBorder="true" />
    </router-link>
  </div>
</template>
<script>
import { ref } from "vue";
import { get } from "../../utils/request";
import ShopMessage from "../../components/ShopMessage.vue";
const getNearListEffect = () => {
  const nearList = ref([]);
  const getNearList = async () => {
    const result = await get("/api/shop/hot-list");
    console.log(result);
    if (result?.errno === 0 && result?.data?.length) {
      nearList.value = result.data;
    }
  };
  return { nearList, getNearList };
};
export default {
  name: "Near",
  components: { ShopMessage },
  setup() {
    const { nearList, getNearList } = getNearListEffect();
    getNearList();
    return { nearList };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/variables.scss";
.near {
  margin: 0.16rem 0.18rem;
  &__title {
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  a {
    text-decoration: none;
  }
}
</style>