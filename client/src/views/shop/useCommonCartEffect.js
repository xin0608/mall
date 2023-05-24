import { useStore } from "vuex";
export const useCommonCartEffect = () => {
    const store = useStore();
    const { cartList } = store.state;
    const changeCartItemInfo = (shopId, productId, productInfo, num, shopName) => {
        // console.log(shopId, productId, productInfo);
        store.commit("changeCartItemInfo", { shopId, productId, productInfo, num, shopName });
    };
    return { cartList, changeCartItemInfo };
};