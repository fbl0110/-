const request=require('./request')


module.exports.getLogin=function(code,userInfo){
  console.log(code,userInfo)
  return request({
    url:`https://rxcoffee.suchcow.top/login`,
    method:'post',
    data:{
      code,
      userInfo
    }
  })
}
// 添加地址
module.exports.addAddress=function(token,addressInfo){
    return request({
      url:`https://rxcoffee.suchcow.top/addaddress`,
      method:'post',
      data:{
        token,addressInfo
      }
    })
}

// 获取地址
module.exports.getAddress=function(token){
  return request({
    url:'https://rxcoffee.suchcow.top/getaddress',
    method:'post',
    data:{
      token
    }
  })
}

// 编辑地址
module.exports.writeAddress=function(token,addressInfo){
  return request({
    url:'https://rxcoffee.suchcow.top/updateaddress',
    method:'post',
    data:{
      token,addressInfo
    }
  })
}

// 删除地址
module.exports.writeAddress=function(token,a_id){
  return request({
    url:'https://rxcoffee.suchcow.top/deladdress',
    method:'post',
    data:{
      token,a_id
    }
  })
}