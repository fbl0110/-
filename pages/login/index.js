const {getLogin}=require('../../api/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  login(){
    wx.login({
       success:async(res)=>{
        // console.log(res.code)
        if(res.code){
          let {token}=await getLogin(res.code)
          // console.log(data)
          if(token){
            wx.setStorageSync('token', token)
            wx.showToast({
              title: '登录成功',
            })
            setTimeout(()=>{
              // wx.switchTab({
              //   url: '/pages/order/index',
              // })
              wx.navigateBack({
                delta: 1,
              })
            },1000)
            
          }else{
            wx.showToast({
              title: '登录失败',
            })
          }
        }
      },
      fail(err){
        console.log(err)

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})