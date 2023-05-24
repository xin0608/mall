<template>
  <div class="shop">
    <!-- src动态取值 -->
    <img class="shop__img" :src="item.imgUrl" alt="" />
    <div
      :class="{
        shop__text: true,
        'shop__text--border ': showBorder ? true : false,
      }"
    >
      <div class="shop__title">{{ item.name }}</div>
      <div class="shop__tags">
        <span class="shop__tag">月售{{ item.sales }}+</span>
        <span class="shop__tag">起送¥{{ item.expressLimit }}</span>
        <span class="shop__tag">基础运费¥{{ item.expressPrice }}</span>
      </div>
      <p class="shop__highlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShopMessage",
  props: ["item", "showBorder"],
};
</script>
<style lang="scss" scoped>
@import "../style/variables.scss";
.shop {
  list-style: none;
  display: flex;

  &__img {
    width: 0.56rem;
    height: 0.56rem;
  }
  &__text {
    flex: 1;
    margin-left: 0.16rem;
    &--border {
      border-bottom: 1px solid #f1f1f1;
    }
  }
  &__title {
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__tags {
    margin: 0.08rem 0;
    font-size: 0.13rem;
    color: $content-fontcolor;
  }
  &__tag {
    margin-right: 0.16rem;
  }
  &__highlight {
    font-size: 0.13rem;
    color: $content-highlightcolor;
  }
}
</style>