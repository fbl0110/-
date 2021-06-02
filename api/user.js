const request=require('./request')


module.exports.getLogin=function(code){
  return request({
    url:`https://rxcoffee.suchcow.top/login`,
    method:'post',
    data:{
      code
    }
  })
}