/*
 * @description mongoose 连接数据库
 * @author xin
 */

const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017' //本地默认的mongodb服务地址
const dbName = 'testdb' //数据库名称

// 配置
mongoose.set('useCreateIndex', true) //使用创建索引
mongoose.set('useFindAndModify', false)

// 开始连接
mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 连接对象
const db = mongoose.connection

db.on('error', err => {
    console.error('mongoose connect error', err)
})

// 测试是否连接成功
// db.once('open', () => {
//     console.log('mongoose 连接成功')
// })

module.exports = mongoose