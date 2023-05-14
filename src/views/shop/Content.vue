<template>
  <div class="content">
    <div class="nav">
      <!--  @click="()=>handleToTab(item.tab)"点击传递参数 -->
      <div
        v-for="item in navList"
        :key="item.tab"
        @click="() => handleToTab(item.tab)"
        :class="{
          nav__item: true,
          'nav__item--active': currentTab === item.tab,
        }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in contentList" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" alt="" />
        <div class="product__item__text">
          <div class="product__item__title">{{ item.name }}</div>
          <div class="product__item__sales">月售{{ item.sales }}件</div>
          <div class="product__item__price">
            <span class="product__item__yen">￥</span>
            {{ item.price }}
            <span class="product__item__usedprice">￥{{ item.oldPrice }}</span>
            <div class="product__item__operation">
              <span
                class="iconfont product__item__reduce"
                @click="
                  () => {
                    changeCartItemInfo(shopId, item._id, item, -1, shopName);
                  }
                "
                >&#xe75e;</span
              >
              <span class="product__item__count">
                {{ cartList?.[shopId]?.productList?.[item._id]?.count || 0 }}
              </span>
              <span
                class="iconfont product__item__add"
                @click="
                  () => {
                    changeCartItemInfo(shopId, item._id, item, 1, shopName);
                  }
                "
                >&#xe777;</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, toRefs, watchEffect } from "vue";
import { get } from "../../utils/request";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "./useCommonCartEffect";
const useTabEffect = () => {
  const navList = [
    {
      name: "全部商品",
      tab: "all",
    },
    {
      name: "秒杀",
      tab: "seckill",
    },
    {
      name: "新鲜水果",
      tab: "fruit",
    },
  ];
  const currentTab = ref(navList[0].tab);
  const handleToTab = (tab) => {
    currentTab.value = tab;
    console.log(tab);
  };
  return { navList, currentTab, handleToTab };
};
const getContentEffect = (currentTab, shopId) => {
  const data = reactive({ contentList: [] });
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value,
    });
    if (result?.errno === 0 && result?.data.length) {
      data.contentList = result.data;
    }
  };
  const { contentList } = toRefs(data);
  watchEffect(() => {
    getContentData();
  });
  return { contentList };
};

export default {
  name: "Content",
  props: ["shopName"],
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { navList, currentTab, handleToTab } = useTabEffect();
    const { contentList } = getContentEffect(currentTab, shopId);
    const { cartList, changeCartItemInfo } = useCommonCartEffect();

    return {
      navList,
      contentList,
      currentTab,
      handleToTab,
      cartList,
      changeCartItemInfo,
      shopId,
    };
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  width: 100%;
  height: 4.58rem;
}
.nav {
  overflow-y: scroll;
  width: 0.76rem;
  background: #f5f5f5;
  border-radius: 0.02rem;
  &__item {
    // 文字垂直居中：行高=盒子高
    height: 0.4rem;
    font-size: 0.14rem;
    color: #333333;
    text-align: center;
    line-height: 0.4rem;
    &--active {
      background: #ffffff;
      border-radius: 0.02rem;
    }
  }
}
.product {
  flex: 1;
  &__item {
    display: flex;
    margin: 0 0.16rem;
    padding: 0.12rem 0;
    border-bottom: 1px solid #f1f1f1;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
    }
    &__text {
      flex: 1;
      font-size: 0.14rem;
      line-height: 0.2rem;
      margin-left: 0.16rem;
    }
    &__title {
      color: #333333;
    }
    &__sales {
      margin: 0.06rem 0;
      font-size: 0.12rem;
      line-height: 0.16rem;
    }
    &__price {
      position: relative;
      display: flex;
      align-items: center;
      position: relative;
      color: #e93b3b;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__usedprice {
      font-size: 0.12rem;
      color: #999999;
      text-decoration: line-through;
      margin-left: 0.06rem;
    }
    &__operation {
      position: absolute;
      right: 0;
      height: 0.17rem;
    }
    &__reduce {
      // padding-left: 0.15rem;
      font-size: 0.28rem;
      color: #666666;
    }
    &__count {
      position: relative;
      color: #333333;
      top: -0.04rem;
    }
    &__add {
      // position: absolute;
      // right: 0;
      font-size: 0.28rem;
      color: #0091ff;
    }
  }
}
</style>