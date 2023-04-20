<template>
  <!-- 顶部 -->
  <div class="wrapper">
    <StaticPart />
    <Near />
  </div>
  <!-- 底部 -->
  <!-- BEM命名：block__element(子元素)--Modifier(状态) -->
  <Docker :dockerTab="dockerTab" />
</template>
<script>
import StaticPart from "./StaticPart.vue";
import Near from "./Near.vue";
import Docker from "../../components/Docker.vue";
export default {
  name: "Home",
  components: {
    StaticPart,
    Near,
    Docker,
  },
  setup() {
    const dockerTab = "Home";
    return { dockerTab };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  padding-bottom: 0.59rem;
}
</style>
