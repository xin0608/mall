<template>
  <div class="toast">{{ message }}</div>
</template>
<script>
import { reactive, toRefs } from "vue";
export default { props: ["message"] };
export const showToastEffect = () => {
  const toastData = reactive({
    show: false,
    message: "",
  });
  const showToast = (msg) => {
    toastData.show = true;
    toastData.message = msg;
    setTimeout(() => {
      toastData.show = false;
      toastData.message = "";
    }, 2000);
  };
  const { show, message } = toRefs(toastData);
  return { show, message, showToast };
};
</script>
<style lang="scss" scoped>
.toast {
  z-index: 9999;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: #fff;
}
</style>