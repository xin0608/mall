<template>
  12
  <Docker :dockerTab="dockerTab" />
</template>
<script>
import Docker from "../../components/Docker.vue";
export default {
  name: "My",
  components: { Docker },
  setup() {
    const dockerTab = "My";
    return { dockerTab };
  },
};
</script>
<style lang="scss" scoped>
</style>