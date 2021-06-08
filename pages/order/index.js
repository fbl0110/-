const {getToken}=require('../../utils/util')

const { cerateOrder } = require('../../api/order.js');

// const {getOreder}=require('../../api/order')

Page({
  /**
   * 页面的初始数据
   */

  data:{
    order:[],
    

  data: {
    imageURL:'https://i.postimg.cc/GhxFkRC3/image.jpg',
    orderStatus:[]

  },
  /**
   * 生命周期函数  --监听页面加载
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

    this._cerateOrder(token);
  },
     async _cerateOrder(token){
       let  {order}=await cerateOrder(token);
  console.log(order)
      this.setData({
         order
      })
    
     },
  },
  Onchange(e){
    let index=e.detail.index//每个的下标
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