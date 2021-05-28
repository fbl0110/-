const request=require('./request')

module.exports.getLunbo=function(){
  return request({
    url:'https://rxcoffee.suchcow.top/getlunbo'

  })
}


