const request=require('./request')

// 获取订单状态
module.exports.getOreder=function(token){
  return request({
    url:'https://rxcoffee.suchcow.top/order',
    method:'post',
    data:{
      token
    }
  })
}