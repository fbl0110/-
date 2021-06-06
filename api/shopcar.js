const request=require('./request')

// 添加购物车
module.exports.addGoods=function(token,goodsInfo){
  // console.log(goodsInfo)
  return request({
    url:'https://rxcoffee.suchcow.top/addToCart',
    method:'post',
    data:{
      token,goodsInfo
    }
  })
}