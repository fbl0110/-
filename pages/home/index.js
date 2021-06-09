const { getLunbo, getShopList } = require('../../api/home.js')
const { getToken } = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lunboImage: [],//轮播图
    goodslist: [],//首页商品列表
    page: 1,
    limit: 6,
    s_id: '',
    goUp: false,
    changeIng:''
  },
  onChange(e) {
    let index = e.detail.index;
    let numbverIndex = [9, 10, 11, 12]
    this._getShopList(numbverIndex[index])
  },
  now_box() {
    wx.switchTab({
      url: '/pages/menu/index',
    })
  },
  goods() {
    wx.navigateTo({
      url: '/packC/pages/details/index',
    })
  },
  fashion() {
    wx.navigateTo({
      url: '/pages/fashion/index',
    })
  },
  // taurder(){
  //   let token=getToken()
  //   // wx.navigateTo({
  //   //   url: '/pages/details/index',
  //   // })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this._getlunbo();
    this._getShopList()
  },
  //轮播图
  async _getlunbo() {
    let { message } = await getLunbo()
    this.setData({
      lunboImage: message
    })
  },
  //  商品列表
  async _getShopList(index) {
    console.log(index);
    if (index) {
      index = index
    } else{
      index = 9
    }
      
    
    let { data } = await getShopList(index, this.data.page, this.data.limit)
    console.log(data)

    this.setData({
      goodslist: data
    })
  },
  tide() {
    wx.navigateTo({
      url: '/pages/fashion/index',
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
  onPullDownRefresh: function (e) {
    console.log(e);
    this.data.goodslist = {}
    this._getShopList()
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPageScroll(e) {
    if (e.scrollTop > 100) {
      this.setData({
        goUp: true
      })
    } else {
      this.setData({
        goUp: false
      })
    }
  },
  backTo() {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  },

  // 下拉加载更多
  onReachBottom: function (e) {
    // console.log(e)
    if (this.data.limit == 10) {
      setTimeout(() => {
        wx.showToast({
          title: '数据已经加载完毕',
        })
      }, 100)
      return
    }else{
      this.data.limit++
      this._getShopList()
    }

  }
})