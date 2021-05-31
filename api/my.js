const request=require('./request')

// 首页商品列表
module.exports.getShopList=function(s_id,page,limit){
  return request({
    url:`https://rxcoffee.suchcow.top/goodsList?s_id=${s_id}&page=${page}&limit=${limit}`
  })
}