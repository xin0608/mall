// 成功返回的数据模型

class SuccessModel {
    constructor(data) {
        this.errno = 0 //成功返回的标志
        if (data != null) {
            this.data = data
        }

    }
}

module.exports = SuccessModel

// 外部调用：
// new SuccessModel()  //返回{errno:0}
// new SuccessModel({...}) //返回 {errno:0,data:{...}}