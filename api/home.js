const request=require('./request')

// 首页轮播图
module.exports.getLunbo=function(){
  return request({
    url:'https://rxcoffee.suchcow.top/getlunbo'

  })
}
// 首页商品列表
module.exports.getShopList=function(s_id,page,limit){
  return request({
    url:`https://rxcoffee.suchcow.top/goodsList?s_id=${s_id}&page=${page}&limit=${limit}`
  })
}

// 菜单页面商品列表
module.exports.getMenu=function(){
  return request({
    url:'https://rxcoffee.suchcow.top/memuGoodsList'
  })
}

// 商品详情
module.exports.getDetail=function(g_id){
  return request({
    url:`https://rxcoffee.suchcow.top/GoodsDetail?g_id=${g_id}`
  })
}

//瑞辛潮品
module.exports.getTrendGoodsList=function(active,page,limit){
  return request({
    url:`https://rxcoffee.suchcow.top/getTrendGoodsList?active=${active}&page=${page}&activelimit=${limit}`
  })
}
