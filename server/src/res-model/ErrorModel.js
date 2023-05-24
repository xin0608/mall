// 错误返回的数据模型

class ErrorModel {
    constructor(errno = -1, message = 'error') {
        this.errno = errno
        this.message = message
    }
}

module.exports = ErrorModel

// 外部调用
// new ErrorModel(10001,'注册失败') //{errno:10001,message:注册失败}