// pages/details/index.js
const {getDetail}=require('../../api/home')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:6,
    Detailgoods:{},
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.Detailgoods)
    let {id}=options
    this.setData({
      id:id
    })
    // console.log(id)
    this._getDetail(id);
  },

  async _getDetail(id){
    let {data}=await getDetail(id)
    // console.log(data)
    this.setData({
      Detailgoods:data
    })
  },

  onClickIcon() {
    // console.log('点击图标');
    let id=this.data.id
    wx.switchTab({
      url: '/pages/shopcar/index?id'+id,
    })
  },
  onClickButton() {
    let id=this.data.id
    wx.navigateTo({
      url: '../../packA/pages/confim/index?id'+id,
      success:(res)=>{
        let data={version:this.data.Detailgoods}
        // console.log(data)
        res.eventChannel.emit('version',data)
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