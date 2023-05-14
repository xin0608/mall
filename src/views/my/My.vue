<template>
  <div class="content">
    <div class="header">
      <div class="header__top">
        <img src="../../../public/user-img.jpg" alt="" class="user-img" />
        <div class="user-info">
          <div class="username">xin</div>
          <div class="asset">
            <div class="title">
              <div class="text">红包</div>
              <div class="count">218</div>
            </div>
            <div class="title">
              <div class="text">优惠券</div>
              <div class="count">12张</div>
            </div>
            <div class="title">
              <div class="text">鲜豆</div>
              <div class="count">88</div>
            </div>
            <div class="title">
              <div class="text">白条</div>
              <div class="count">1000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="other__info">
      <div class="info__item">
        <span class="iconfont wallet">&#xe7d2;</span>
        <span class="other__info__text">我的钱包</span>
        <span class="iconfont">&#xe62d;</span>
      </div>

      <div class="info__item">
        <span class="iconfont address">&#xe672;</span>
        <span class="other__info__text">我的地址</span>
        <span class="iconfont">&#xe62d;</span>
      </div>
      <div class="info__item">
        <span class="iconfont help">&#xe609;</span>
        <span class="other__info__text">客服与帮助</span>
        <span class="iconfont">&#xe62d;</span>
      </div>
    </div>
  </div>
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
.content {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.49rem;
  overflow-y: scroll;
}
.header {
  position: relative;
  height: 2.5rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  &__top {
    position: absolute;
    top: 1.08rem;
    left: 0.18rem;
    right: 0.18rem;
    height: 2.03rem;
    background-color: #fff;
    border-radius: 0.08rem;
    box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
    .user-img {
      position: absolute;
      top: -0.47rem;
      left: 50%;
      margin-left: -0.47rem;
      width: 0.94rem;
      height: 0.94rem;
      border-radius: 50%;
    }
    .user-info {
      position: absolute;
      top: 0.47rem;
      width: 100%;
      height: 1.44rem;
      .username {
        font-size: 0.24rem;
        font-style: bold;
        text-align: center;
      }
      .asset {
        margin-top: 0.32rem;
        height: 0.76rem;
        border-top: 1px solid #f1f1f1;
        display: flex;
        align-items: center;
        .title {
          flex: 1;
          color: #c1c0c9;
          font-size: 0.12rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .count {
          font-size: 0.2rem;
          color: #262628;
        }
      }
    }
  }
}
.other__info {
  position: relative;
  height: 2.03rem;
  margin: 0.9rem 0.18rem 1.9rem;

  padding: 0.16rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.08rem;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  .info__item {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .iconfont {
    color: #c2c4ca;
    font-size: 0.22rem;
  }
  .other__info__text {
    flex: 1;
    font-size: 0.14rem;
    font-style: bold;
    padding-left: 0.16rem;
  }
  .wallet {
    color: #ed4a47;
  }
  .address {
    color: #32c5ff;
  }
  .help {
    color: rgba(144, 19, 254, 0.92);
  }
}
</style>