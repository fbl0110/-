const {getuserInfo,getToken}=require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userlist:{},
      gender:['女', '男']
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Userdetails();
  },
//用户详情
Userdetails(){
    let userlist=getuserInfo();
    console.log(userlist);
     this.setData({
      userlist:userlist
     }) 
     console.log(this.data.userlist);
},
//退出登录
delete(){
  let token=getToken();
  let  userInfo=  getuserInfo();
  wx.removeStorageSync('userInfo',userInfo)
  wx.removeStorageSync('token',token)
  wx.switchTab({
    url: '/pages/home/index',
  })
  return
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