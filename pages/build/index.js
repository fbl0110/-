// pages/build/index.js
const { areaList } = require('../../utils/area')
const { addAddress } = require('../../api/user')
const { getToken } = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    areaList,
    nowAddress: '',
    checked: false,
    addressInfo: {},
    radio: '1',
    address: {}
  },
  onChange(e) {
    this.setData({ checked: !this.data.checked });
    let a_isDefault = e.detail
    let addressInfo = this.data.addressInfo
    addressInfo.a_isDefault = a_isDefault ? 1 : 0;

    this.setData({
      addressInfo
    })
    console.log(this.data.addressInfo)
  },
  onChange1(event) {
    this.setData({
      radio: event.detail,
    });
    let a_sex = event.detail
    // console.log(a_sex)
    let addressInfo = this.data.addressInfo
    addressInfo.a_sex = (a_sex == 1) ? 1 : 0;
    this.setData({
      addressInfo
    })
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  add(e) {
    console.log(e)
    this.onClose()
    let address = e.detail.values;
    let addressInfo = this.data.addressInfo
    let dad = address.map((item, index) => {
      (index == 0) && (addressInfo.a_province = item.name);
      (index == 1) && (addressInfo.a_city = item.name);
      (index == 2) && (addressInfo.a_area = item.name);
      return item.name;
    }).join('-')
    let a_areaCode = address.map(item => {
      return item.code;
    }).join('-')
    addressInfo.a_areaCode = a_areaCode
    this.setData({
      nowAddress: dad,
      addressInfo
    })
  },
  addAddress() {
    let addressInfo = this.data.addressInfo;
    wx.setStorageSync('addressInfo', addressInfo)
    let token = getToken()

    if (!addressInfo['a_sex']) {
      addressInfo.a_sex = 1
    }
    if (!addressInfo['a_isDefault']) {
      addressInfo.a_isDefault = 0
    }
    let arr = ['a_name', 'a_tel', 'a_province', 'a_city', 'a_area', 'a_addressDetail', 'a_areaCode']
    let ishas = true;
    arr.forEach(item => {

      if (!addressInfo[item]) {
        // console.log(item)
        ishas = false;
        // console.log(ishas)
      }
    })

    if (!ishas) {
      wx.showToast({
        title: '请完善',
      })
      return;
    }

    // let token=wx.getStorageSync('token')
    // console.log(addressInfo)
    this._addAddress(token, addressInfo)
    // // this._addAddress()
  },
  // 姓名
  nameValue(e) {
    // console.log(e)
    let a_name = e.detail
    let addressInfo = this.data.addressInfo
    addressInfo.a_name = a_name
    this.setData({
      addressInfo
    })
    console.log(this.data.addressInfo)
  },
  telValue(e) {
    // console.log(e)
    let a_tel = e.detail
    let addressInfo = this.data.addressInfo
    addressInfo.a_tel = a_tel
    this.setData({
      addressInfo
    })
  },
  fullValue(e) {
    // console.log(e)
    let a_addressDetail = e.detail
    let addressInfo = this.data.addressInfo
    addressInfo.a_addressDetail = a_addressDetail
    this.setData({
      addressInfo
    })
  },
  one(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  async _addAddress(token, addressInfo) {
    let data = await addAddress(token, addressInfo)
    console.log(data)
    this.setData({
      address: data
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