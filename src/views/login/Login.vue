<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
    />
    <div>
      <input
        v-model="username"
        class="wrapper__input"
        type="text"
        placeholder="请输入手机号"
      />
    </div>
    <div>
      <input
        v-model="password"
        class="wrapper__input"
        type="password"
        placeholder="请输入密码"
      />
    </div>
    <div>
      <button class="wrapper__button" @click="handleLogin">登陆</button>
    </div>
    <div class="wrapper__links">
      <span class="wrapper__link" @click="handleToRegister">立即注册</span
      >|<span>忘记密码</span>
    </div>
  </div>
  <Toast v-if="show" :message="message" />
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { showToastEffect } from "../../components/Toast.vue";
// 安装 npm install axios --save
// import axios from "axios";
// JSON格式
// axios.defaults.headers.post["Content-Type"] = "application/json";
const userLoginEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "" });
  // const handleLogin = () => {
  //   axios
  //     .post(
  //       "https://www.fastmock.site/mock/6ea127f33b62df019f485609dca125f1/jd/api/user/login",
  //       {
  //         username: data.username,
  //         password: data.password,
  //       }
  //     )
  //     .then(() => {
  //       // alert("登录成功");
  //       localStorage.isLogin2 = true;
  //       router.push({ name: "Home" });
  //     })
  //     .catch(() => {
  //       alert("登录失败");
  //     });
  // };

  const handleLogin = async () => {
    try {
      const result = await post("/api/user/login", {
        username: data.username,
        password: data.password,
      });
      console.log(result);
      if (result?.errno === 0) {
        localStorage.isLogin2 = true;
        router.push({ name: "Home" });
      } else {
        showToast("登录失败");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { username, password } = toRefs(data);
  return { username, password, handleLogin };
};
const handleToRegisterEffect = () => {
  const router = useRouter();
  const handleToRegister = () => {
    router.push({ name: "Register" });
  };
  return { handleToRegister };
};
export default {
  name: "Login",
  components: { Toast },
  setup() {
    const { show, message, showToast } = showToastEffect();
    const { username, password, handleLogin } = userLoginEffect(showToast);
    const { handleToRegister } = handleToRegisterEffect();

    return { username, password, show, message, handleLogin, handleToRegister };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/variables.scss";
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
    background: $button-color;
    border: none;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: #ffffff;
  }
  &__links {
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
    span {
      margin: 0 0.13rem;
    }
  }
}
</style>