// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      jgglist:[
         {
           img:"../../assets/gw_img/1.png",
           text:'我的订单'
         },
         {
          img:"../../assets/gw_img/2.png",
          text:'咖啡钱包'
        },
        {
          img:"../../assets/gw_img/3.png",
          text:'优惠卷'
        },
        {
          img:"../../assets/gw_img/4.png",
          text:'礼品卡'
        },
        {
          img:"../../assets/gw_img/5.png",
          text:'账户余额'
        },
        {
          img:"../../assets/gw_img/6.png",
          text:'发票管理'
        },
        {
          img:"../../assets/gw_img/7.png",
          text:'兑换优惠'
        },
        {
          img:"../../assets/gw_img/8.png",
          text:'帮助反馈'
        },
      ],
      tabs:[
        {title:"潮品下午茶"},
        {title:"生活家具"},
        {title:"数码电器"},
        {title:"潮玩饰品"}
      ],
      ellipsis_3:".ellipsis_3",
      fbl:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
//  跳转登录页面
  t_logon(){
      wx.navigateTo({
        url: '/pages/login/index',
      })
  },

  //展开收起
  jl(){
    if (this.data.fbl==true) {
    this.setData({
      fbl:false,
      ellipsis_3:''
    })
    return
    }
    this.setData({
      fbl:true,
      ellipsis_3:".ellipsis_3"
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