<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe61f;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe60b;</span>
  </div>
  <div class="search">
    <input
      type="text"
      class="search__text"
      placeholder="山姆会员商店优惠商品"
    />
    <span class="iconfont search__icon">&#xe65c;</span>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt=""
    />
  </div>
  <div>
    <ul class="nav">
      <li v-for="(item, index) in navList" :key="index" class="nav__item">
        <img
          class="nav__item__img"
          :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
          alt=""
        />
        <div class="nav__item__text">{{ item.desc }}</div>
      </li>
    </ul>
  </div>
  <div class="gap"></div>
</template>
<script>
export default {
  name: "StaticPart",
  setup() {
    const navList = [
      { imgName: "超市", desc: "超市便利" },
      { imgName: "菜市场", desc: "菜市场" },
      { imgName: "水果店", desc: "水果店" },
      { imgName: "鲜花", desc: "鲜花绿植" },
      { imgName: "医药健康", desc: "医药健康" },
      { imgName: "家居", desc: "家居时尚" },
      { imgName: "蛋糕", desc: "烘培蛋糕" },
      { imgName: "签到", desc: "签到" },
      { imgName: "大牌免运", desc: "大牌免运" },
      { imgName: "红包", desc: "红包套餐" },
    ];
    return { navList };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";

.position {
  position: relative;
  margin: 0.16rem 0.19rem;
  padding-right: 0.2rem;
  font-size: 0.16rem;
  // 文字颜色
  color: $content-fontcolor;
  // 多行文本省略
  @include ellipse;
  .position__icon {
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    font-size: 0.2rem;
  }
}
.search {
  position: relative;
  &__icon {
    position: absolute;
    left: 0.34rem;
    top: 0.08rem;
    color: #b6b6b6;
  }
  &__text {
    width: 88%;
    height: 0.32rem;
    margin: 0 0.18rem 0.12rem;
    padding-left: 0.44rem;
    font-size: 0.14rem;
    border: none;
    background: #f5f5f5;
    border-radius: 0.16rem;
  }
}

.banner {
  // 防抖动
  height: 0;
  overflow: hidden;
  // 25.4%是计算后得出的图片宽高比
  padding-bottom: 25.4%;
  margin: 0 0.18rem;
  &__img {
    width: 100%;
    border-radius: 0.1rem;
  }
}
.nav {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.18rem 0.16rem;
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style: none;
    width: 20%;
    margin-top: 0.16rem;
    &__img {
      width: 0.4rem;
      height: 0.4rem;
    }
    &__text {
      margin-top: 0.06rem;
    }
  }
}
.gap {
  width: 100%;
  height: 0.1rem;
  background: $background-gray;
}
</style>