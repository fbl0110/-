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