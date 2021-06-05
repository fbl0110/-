// pages/address/index.js
const { getAddress,writeAddress } = require('../../api/user')
const {getToken}=require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    userAddressed:[],
    echoAddress:{},//地址的回显
    a_id:''
  },
  goWriteAddress() {
    wx.navigateTo({
      url: '/pages/build/index',
    })
  },
  write(){
    // let token=getToken()
    // let token=wx.getStorageSync('token')
    // console.log(token)
    // let a_id=wx.getStorageSync('list').a_id
    // this._writeAddress(a_id)
    let a_id=wx.getStorageSync('a_id')
    wx.navigateTo({
      url: '/pages/build/index?a_id='+a_id
    })
  },
  addAddressGo(){
    wx.navigateTo({
      url: '/pages/build/index',
      success:function(){
        wx.removeStorageSync('list')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.a_id)
    let token=wx.getStorageSync('token')
    console.log(token)
    let userAddressed=wx.getStorageSync('userAddressed')
    // let a_id=wx.getStorageSync('list').a_id
    let a_id=wx.getStorageSync('key')
    this.setData({
      userAddressed
    })
    if(token==''){
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return;
    }
    this._getAddress(token)
    // this._writeAddress(a_id)
  },
  // 获取地址
  async _getAddress(token){
    let {data}=await getAddress(token)
    // let a_id=data.a_id
    let aadd=data.map(item=>{
      return item.a_id
    }).join(',')
    // console.log(aadd)
    this.setData({
      a_id:aadd
    })
    wx.setStorageSync('a_id',aadd )
    // let b_id=wx.setStorageSync('a_id',data.a_id)
    // this.setData({
    //   a_id
    // })
    // console.log(a_id)
    this.setData({
        addressList:data
    })
  },

  default(e){
    let {item}=e.currentTarget.dataset
    // console.log(item)
    let list=wx.setStorageSync('list', item)
    // console.log(list)
    wx.navigateBack({
      delta: 1,
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