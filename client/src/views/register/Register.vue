<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
    />
    <div>
      <input
        v-model="data.username"
        class="wrapper__input"
        type="text"
        placeholder="请输入手机号"
      />
    </div>
    <div>
      <input
        v-model="data.password"
        class="wrapper__input"
        type="password"
        placeholder="请输入密码"
      />
    </div>
    <div>
      <input
        v-model="data.password2"
        class="wrapper__input"
        type="password"
        placeholder="确认密码"
      />
    </div>
    <div>
      <button class="wrapper__button" @click="handleRegister">注册</button>
    </div>
    <div class="wrapper__links" @click="handleToLogin">已有账号去登陆</div>
  </div>
  <Toast v-if="show" :message="message" />
</template>
<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { showToastEffect } from "../../components/Toast.vue";
const userRegisterEffect = (showToast) => {
  // const router = useRouter();
  const data = reactive({ username: "", password: "", password2: "" });
  const handleRegister = async () => {
    // 向数据库中添加数据
    try {
      if (data.username.trim() === "" || data.password.trim() === "") {
        showToast("用户名或密码不能为空");
      } else {
        const result = await post("/api/user/register", {
          username: data.username,
          password: data.password,
        });
        if (result?.errno === 0 && data.password === data.password2) {
          // router.push({ name: "Login" });
          showToast("注册成功");
        } else {
          showToast("注册失败");
        }
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  return { data, handleRegister };
};
const handleToLoginEffect = () => {
  const router = useRouter();
  const handleToLogin = () => {
    router.push({ name: "Login" });
  };
  return { handleToLogin };
};
export default {
  name: "Login",
  components: { Toast },
  setup() {
    const { show, message, showToast } = showToastEffect();
    const { data, handleRegister } = userRegisterEffect(showToast);
    const { handleToLogin } = handleToLoginEffect();

    return { data, handleRegister, handleToLogin, show, message };
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.4rem 0.4rem;
  &__img {
    width: 0.66rem;
    height: 0.66rem;
    margin-bottom: 0.4rem;
  }
  &__input {
    box-sizing: border-box;
    width: 2.95rem;
    height: 0.48rem;
    margin-bottom: 0.16rem;
    padding-left: 0.16rem;
    font-size: 0.16rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
  }
  &__button {
    width: 2.95rem;
    height: 0.48rem;
    margin: 0.16rem 0;
    font-size: 0.16rem;
    background: #0091ff;
    border: none;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: #ffffff;
  }
  &__links {
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>