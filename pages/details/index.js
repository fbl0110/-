// pages/details/index.js
const { getDetail } = require('../../api/home')
const { addGoods } = require('../../api/shopcar')
// const {getDetail}=require('../../api/home')
// const {getToken}=require('../../utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 6,
    Detailgoods: {},
    id: '',
    shopcarGoods: {},
    value: 1,
    show:false
  },
  buyTang(e){
    console.log(e)
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },


  onChange(event) {
    this.setData({
      value:event.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.Detailgoods)
    // console.log(nodes)
    let { id } = options
    this.setData({
      id: id
    })
    this.getGoodsDetail(id);

  },

  // 获取商品信息
  async getGoodsDetail(id) {
    let { data } = await getDetail(id)
    console.log(data)
    if (data) {
      this.setData({
        Detailgoods: data
      })
      let goodsInfo = wx.setStorageSync('goodsInfo', data)
    }
    // let g_details=data.g_details
    // console.log(g_details)

  },

  // 加入购物车
  async _addGoods(token, goodsInfo) {

    let data = await addGoods(token, goodsInfo)
    console.log(data)
    // this.setData({
    //   shopcarGoods:data
    // })
  },
  // 立刻购买
  async _getDetail(id) {
    let goodsInfo = wx.getStorageSync('goodsInfo')
    // console.log(goodsInfo)
    this.setData({
      Detailgoods: goodsInfo
    })
  },

  onClickIcon() {
    let token = wx.getStorageSync('token')
    // 加入购物车
    let goodsInfo = wx.getStorageSync('goodsInfo')
    goodsInfo.sh_img = goodsInfo.img
    goodsInfo.sh_number = this.data.value
    this._addGoods(token, goodsInfo)
    wx.showToast({
      title: '添加成功',
    })
    // console.log('点击图标');
    // let id=this.data.id
    // wx.switchTab({
    //   url: '/pages/shopcar/index?id'+id,
    // })
  },
  onClickButton() {
    let id = this.data.id
    wx.navigateTo({
      url: '../../packA/pages/confim/index?id' + id,
      success: (res) => {
        let data = { version: this.data.Detailgoods }
        // console.log(data)
        res.eventChannel.emit('version', data)
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

  rich(e){
    console.log(e)
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