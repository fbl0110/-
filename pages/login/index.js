const { getLogin } = require('../../api/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // getUserProfile
  login() {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        var userInfo = res.userInfo
        wx.login({
          success: async (res) => {
            let code = res.code;
            wx.setStorageSync('userInfo', userInfo);
            if (code) {
              let { token } = await getLogin(code, userInfo)
              if (token) {
                wx.setStorageSync('token', token)
                wx.showToast({
                  title: '登录成功',
                })
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1,
                  })
                  // var currentPage = getCurrentPages();
                  // // console.log(currentPage)
                  // var prevPage = currentPage[currentPage.length - 2]; //上一个页面
                }, 1000)

              } else {
                wx.showToast({
                  title: '登录失败',
                })
              }
            }
          },
          fail(err) {
            console.log(err)
          }
        })

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