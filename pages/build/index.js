// pages/build/index.js
const { areaList } = require('../../utils/area')
const { addAddress,writeAddress,delAddress } = require('../../api/user')
const { getToken } = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    areaList,
    nowAddress: '',//省市区
    checked: false,
    addressInfo: {},//后台需要的参数
    radio: '1',
    address: {},
    // name:'',//收货人
    // number:'',//电话号码
    // radio:'',//性别
    // full,//详细地址
    nowAddress:{},//是否默认
    list:{},
    a_id:'',
    // echoAddress:{}
    showAddress:''
  },
  // 默认地址
  onChange(e) {
    this.setData({ checked: !this.data.checked });
    let a_isDefault = e.detail
    let addressInfo = this.data.addressInfo
    addressInfo.a_isDefault = a_isDefault ? 1 : 0;
    wx.setStorageSync('default', addressInfo.a_isDefault)
    this.setData({
      addressInfo
    })
  },
  checked(){
    let a_isDefault=this.data.addressInfo.a_isDefault;
    // console.log(a_isDefault);
    if(a_isDefault==0){
      this.setData({
        checked:false
      })
    }else if(a_isDefault==1){
      this.setData({
        checked:true
      })
    }

  },
  // 性别
  onChange1(event) {
    this.setData({
      radio: event.detail,
    });
    let a_sex = event.detail
    let addressInfo = this.data.addressInfo
    addressInfo.a_sex = (a_sex == 1) ? 1 : 0;
    this.setData({
      addressInfo
    })
  },
  // 编辑回显地址
  async _writeAddress(token,a_id){
    // let token=wx.getStorageSync('token')
    // console.log(token);
    let {data} =await  writeAddress(token,a_id)
    // let message=data
    // console.log(data)
    // wx.setStorageSync('info', message)
    this.setData({
        list:data
    })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  //省市区
  add(e) {
    this.onClose()
    // console.log(this.data.NowAddress)
    let address = e.detail.values;
    let addressInfo = this.data.addressInfo
    let dad = address.map((item, index) => {
      (index == 0) && (addressInfo.a_province = item.name);
      (index == 1) && (addressInfo.a_city = item.name);
      (index == 2) && (addressInfo.a_area = item.name);
      return item.name;
    }).join('-')
    console.log(dad)
    this.setData({
      showAddress:dad
    })
    let a_areaCode = address.map(item => {
      return item.code;
    }).join('-')
    // console.log(a_areaCode);
    
    addressInfo.a_areaCode = a_areaCode
    // console.log('addressInfo',addressInfo);
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
        ishas = false;
      }
    })

    if (!ishas) {
      wx.showToast({
        title: '请完善',
      })
      return;
    }
    this._addAddress(token, addressInfo)
  },
  // 姓名
  nameValue(e) {
    let a_name = e.detail
    let addressInfo = this.data.addressInfo
    addressInfo.a_name = a_name
    this.setData({
      addressInfo
    })
    console.log(this.data.addressInfo)
  },
  // 电话号码
  telValue(e) {
    let a_tel = e.detail
    let addressInfo = this.data.addressInfo
    addressInfo.a_tel = a_tel
    this.setData({
      addressInfo
    })
  },
  fullValue(e) {
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
  onLoad: function (e) {
    let a_id=e.a_id
    console.log(a_id)
    this.setData({
      a_id
    })
    let token=wx.getStorageSync('token')
    this._writeAddress(token,a_id)//回显地址
    // this._delAddress(token,a_id)//删除地址
  },

  // 添加地址
  async _addAddress(token, addressInfo) {
    if(addressInfo.a_isDefault==1){
      wx.setStorageSync('addressDefault', addressInfo)
    }
    let data = await addAddress(token, addressInfo)
    
    console.log(data)
    this.setData({
      address: data
    })
  },
  // 删除地址
  async _delAddress(token,a_id){
    let data=await delAddress(token,a_id)
  },
  
  delAddress(){
    let token=wx.getStorageSync('token')
    let a_id=this.data.a_id
    this._delAddress(token,a_id)
    wx.showToast({
      title: '删除成功',
    })
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(e);

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
    // this.data.list==''
    // wx.removeStorageSync('list')
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