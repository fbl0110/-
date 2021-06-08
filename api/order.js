const request = require('./request');


// 修改订单状态
module.exports.updateOrder = function(openid, o_orderid) {
    return request({
        url: `https://rxcoffee.suchcow.top/updateOrderStates`,
        method: 'post',
        data: {
            openid,
            o_orderid
        }
    })

}
//获取订单
module.exports.cerateOrder=function(token){
    return request({
        url: `https://rxcoffee.suchcow.top/order`,
        method: 'post',
        data: {
            token       
        }
    })
}