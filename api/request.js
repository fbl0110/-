module.exports=(options)=>{
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      ...options,
      success:function(res){
        resolve(res.data)
      },
      fail:reject,
      complete(){
        wx.hideLoading()
      }
    })
  })
} 