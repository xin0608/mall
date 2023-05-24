# 数据模型设计

列举各个数据模型的示例，写明属性

## 用户

```js
{
    _id:'xxx',
    username:'19997980078',
    password:'123abc'
}
```

## 地址

```js
{
    _id:'xxx',
    username:'19997980078',  //就和用户产生关联
    city:'北京',
    department:'xx小区',
    houseNumber:'门牌号',
    name:'张三',
    phone:'16697980058', 
}
```

## 商店

```js
{
    _id:'xxx',
    name:'沃尔玛',
    imgUrl:'商店的图片 url',
    sales:10000, //月售
    expressLimit:0, //起送价格
    expressPrice:5, //快递价格
    slogan:'VIP 尊享满 89 元减 4 元 运费券'
}
```

## 商品

```js
{
    _id:'xxx',
    shopId:'xxxxx', //对应商店的_id
    name:'番茄 250g/份',
    imgUrl:'xxx.png',
    sales:10, //月售
    price:33.6,
    oldPrice:40.6,
    tabs:['all','seckill'] //左侧tab类型
}
```

## 订单

```js
{
    _id:'xxx',
    username:'19997980078',
    shopId:'商店的 id',
    shopName:'沃尔玛',
    isCanceled:false, 
    address:{
        "username": "19997980078",
        "city": "北京市",
        "department": "xx小区",
        "houseNumber": "门牌号1",
        "name": "张三",
        "phone": "16697980058",
    },
    products:[
        {
            product:{
                "tabs": ["all","seckill","fruit"],
                "shopId": "64034f88907a6d1070ffbc1c",
                "name": "葡萄 250g/份",
                "imgUrl": "/images/product/grape.jpg",
                "sales": 100,
                "price": 33.6,
                "oldPrice": 40.6
            }
            orderSales:3 //购买数量
        },
        {
            product:{
                "tabs": ["all","seckill","fruit"],
                "shopId": "64034f88907a6d1070ffbc1c",
                "name": "苹果 250g/份",
                "imgUrl": "/images/product/apple.jpeg",
                "sales": 200,
                "price": 25,
                "oldPrice": 27
            }
            orderSales:5 //购买数量
        }
    ]
}
```