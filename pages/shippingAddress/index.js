
// // import { areaList } from '../../node_modules/@vant/area-data/lib/index'
// const {areaList} =require('../../utils/area')
// Page({

//   /**
//    * 
//    * 页面的初始数据
//    */
//   data: {
//     areaList,
//     show:false,
//     checked:false,
//     userinfo:{}
//   },
//   confirm(e){
//     // console.log(e)
//     let value=e.detail.values
//     console.log(value)
//     this.onClose()
//   },
//   save(e){
//     console.log(e)
//   },
//   showPopup(){
//     this.setData({show:true})
//   },
//   onClose(){
//     this.setData({show:false})
//   },
//   onChange({ detail }) {
//     this.setData({ checked: detail });
//   },
//   addAddr(){
//     console.log('点击了')
//     wx.chooseLocation({
//       success: function (res) {
//         console.info(res);
//         var userinfo = this.data.userinfo;
//         userinfo.address = res.address;
//         userinfo.realAddress = res.name;
//         this.setData({
//           userinfo: userinfo
//         })
//         this.setData({
//           userinfo
//         })
//       },
//     })
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })



Page({
  data: {
    addrInfo: [],
    userinfo: {},
    checkStatus: true,
    status: "default" //状态分add,modify
  },

  onLoad: function (option) {
    // console.log(this.data.userinfo,this.data.addrInfo)
    var status = option.status;

    console.log(status);

    this.setData({
      status: option.status
    })

    //如果为修改状态可以进行值赋值
    if (status == 'modify') {
      var userinfo = JSON.parse(option.userinfo);
      this.setData({
        userinfo: userinfo,
      })
    }


  },



  // 选择微信自带地址
  addAddr: function () {
    var that = this;
    //选择地址
    wx.chooseLocation({
      success: function (res) {
        console.info(res);
        var userinfo = that.data.userinfo;
        userinfo.address = res.address;
        userinfo.realAddress = res.name;
        that.setData({
          userinfo: userinfo
        })
      },
    })
  },
  //地址是否默认
  onChange({
    detail
  }) {
    //获取用户信息
    var userinfo = this.data.userinfo;
    userinfo.status = detail;

    // 需要手动对用户的checked默认状态进行更新
    this.setData({
      userinfo: userinfo
    });
  },
  //添加地址
  addAddress: function () {
    var currentPage = getCurrentPages();
    var prevPage = currentPage[currentPage.length - 2]; //上一个页面

    var userinfo = this.data.userinfo;

    prevPage.setData({
      status: 'add',
      userinfo: userinfo
    })
    wx.navigateBack({
      delta: 1
    })
    console.log(currentPage);
  },
  //值修改实时赋值
  modifyValue: function (event) {
    var text = event.target.dataset.text; //文本信息
    var value = event.detail; //值
    var userinfo = this.data.userinfo; //获取当前的用户信息

    switch (text) {
      case "username":
        userinfo.username = value;
        break;
      case "phone":
        userinfo.phone = value;
        break;
      case "address":
        userinfo.address = value;
        break;
      case "realAddress":
        userinfo.realAddress = value;
        break;
      default:

    }

    this.setData({
      userinfo: userinfo
    })
  },
  //删除地址
  delAddress: function () {
    var currentPage = getCurrentPages();
    var prevPage = currentPage[currentPage.length - 2]; //上一个页面
    var userinfo = this.data.userinfo; //获取当前的用户信息
    prevPage.setData({
      status: 'delete',
      userinfo: userinfo
    })
    wx.navigateBack({
      delta: 1
    })
    console.log(currentPage);
  },
  //修改地址
  modifyAddress: function (e) {
    var currentPage = getCurrentPages();
    var prevPage = currentPage[currentPage.length - 2]; //上一个页面
    var userinfo = this.data.userinfo; //获取当前的用户信息
    console.log(userinfo)
    wx.setStorageSync('value',JSON.stringify(userinfo))
    // prevPage.setData({
    //   status: 'modify',
    //   userinfo: userinfo
    // })
    wx.navigateBack({
      delta: 1
    })
    // console.log(currentPage);
  }

})