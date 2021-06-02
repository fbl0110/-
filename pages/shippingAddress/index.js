
// import { areaList } from '../../node_modules/@vant/area-data/lib/index'
const {areaList} =require('../../utils/area')
Page({

  /**
   * 
   * 页面的初始数据
   */
  data: {
    areaList,
    show:false,
    checked:false
  },
  confirm(e){
    // console.log(e)
    let value=e.detail.values
    console.log(value)
    this.onClose()
  },
  showPopup(){
    this.setData({show:true})
  },
  onClose(){
    this.setData({show:false})

  },
  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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