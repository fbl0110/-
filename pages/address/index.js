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
  },
  // writeAddress() {
  //   wx.navigateTo({
  //     url: '/pages/build/index',
  //   })
  // },
  write(){
    // let token=getToken()
    let token=wx.getStorageSync('token')
    // console.log(token)
    let a_id=wx.getStorageSync('list').a_id
    this._writeAddress(a_id)
    wx.navigateTo({
      url: '/pages/build/index',
    })
  },
  addAddressGo(){
    wx.navigateTo({
      url: '/pages/build/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(echoAddress)
    // let token=getToken()
    let token=wx.getStorageSync('token')
    console.log(token)
    let userAddressed=wx.getStorageSync('userAddressed')
    let a_id=wx.getStorageSync('list').a_id
    // console.log(a_id)
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
    this._writeAddress(a_id)
  },
  // 添加地址
  async _getAddress(token){
    let {data}=await getAddress(token)
    this.setData({
        addressList:data
    })
  },
  // 编辑回显地址
  async _writeAddress(a_id){
    let data =await  writeAddress(a_id)
    let message=data[0]
    // console.log(message)
    wx.setStorageSync('info', message)
    // this.setData({
    //     echoAddress:data
    // })
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