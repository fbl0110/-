const request = require('./request');

// 获取购物车商品
module.exports.featchGoodsList = function(token) {
    return request({
        url: `https://rxcoffee.suchcow.top/getCartGoods`,
        method: 'post',
        data: {
            token
        }
    })
}

// 删除单个商品
module.exports.deleteOneGood = function(token, g_id) {
    return request({
        url: `https://rxcoffee.suchcow.top/deleteOneCartGoods`,
        method: 'post',
        data: {
            token,
            g_id
        }
    })
}

// 删除多个商品
module.exports.deleteGoods = function(token, goods) {
    return request({
        url: `https://rxcoffee.suchcow.top/deleteManyCartGoods`,
        method: 'post',
        data: {
            token,
            goods
        }
    })
}