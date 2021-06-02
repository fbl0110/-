const request = require('./request')

// 菜单所有商品列表
module.exports.FecthMemuGoodsList = function() {
    return request({
        url: 'https://rxcoffee.suchcow.top/memuGoodsList'
    })
}


// 获取商品分类
module.exports.FecthGoodsSortTitle = function() {
    return request({
        url: 'https://rxcoffee.suchcow.top/getGoodsSort'
    })
}