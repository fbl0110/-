// pages/home/index.js
const {getLunbo}=require('../../api/home.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lunboImage:[]
  },
  onChange(){

  },
  now_box(){
    wx.switchTab({
      url: '/pages/menu/index',
    })
  },
  goods(){
    wx.navigateTo({

      url: '/packC/pages/details/index',

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getlunbo()
  },
 async _getlunbo(){
   let {message}=await getLunbo()
   console.log(message)
   this.setData({
    lunboImage:message
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