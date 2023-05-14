<template>
  <div class="docker">
    <div
      v-for="item in dockerList"
      :key="item.icon"
      :class="{
        dcoker__item: true,
        'docker__item--active': dockerTab === item.to.name,
      }"
    >
      <router-link :to="item.to" class="dcoker__item">
        <!-- 防止字体标签被转义使用v-html -->
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__item__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Docker",
  props: ["dockerTab"],
  setup() {
    const dockerList = [
      { icon: "&#xe6b8;", text: "首页", to: { name: "Home" } },
      { icon: "&#xe638;", text: "购物车", to: { name: "CartList" } },
      { icon: "&#xe63e;", text: "订单", to: { name: "OrderList" } },
      { icon: "&#xe660;", text: "我的", to: { name: "My" } },
    ];
    return { dockerList };
  },
};
</script>

<style lang="scss" scoped>
// scoped 限制css只作用于当前，不作用与外部

@import "../style/variables.scss";
.docker {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.49rem;
  background: #ffffff;
  box-shadow: 0 -0.01rem 0.01rem 0 #f1f1f1;
  a {
    color: $content-fontcolor;
    text-decoration: none;
  }
  &__item {
    .iconfont {
      font-size: 0.16rem;
    }

    &__title {
      font-size: 0.1rem;
      // font-size: 20px;
      // transform: scale(0.5, 0.5);
      // transform-origin: center top;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  .dcoker__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>