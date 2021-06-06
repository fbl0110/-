// pages/order/index.js
const {getToken}=require('../../utils/util')
const {getOreder}=require('../../api/order')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL:'https://i.postimg.cc/GhxFkRC3/image.jpg',
    orderStatus:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let token=getToken()
    console.log(token)
    if(!token){
        wx.redirectTo({
          url: '/pages/login/index',
        })
    }else if(token){
      wx.switchTab({
        url:'/pages/order/index'
      })
    }

    // try {
    //   var value = wx.getStorageSync('token')
    //   if (value) {
    //     // Do something with return value
    //     console.log(value)
    //   }
    // } catch (e) {
    //   console.log(e)
    //   // Do something when catch error
    // }

    // this._getOreder(token)
  },

  // async _getOreder(token){
  //   let data=await getOreder(token)
  //   console.log(data)
  // },
  Onchange(e){
    let index=e.detail.index//每个的下标
    // console.log(index)
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