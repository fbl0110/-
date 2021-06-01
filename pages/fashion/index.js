const {getTrendGoodsList}=require('../../api/home.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodslist:[],//瑞幸潮品商品列表
    page:1,
    limit:10,
    active:0 ,
    price:'',
    price1:'',
   },

  onChange(e){
    console.log(e)
    let index=e.detail.index;
    this.setData({
      active:e.detail.index
    })
    let numbverIndex=[0,1,2,3,4,];
    if(numbverIndex[index]==3){
      this.setData({
        price:true,
        price1:false
      })
    }else{
      this.setData({
        price:false,
        price1:false
      })
    }
    
    this._getTrendGoodsList(numbverIndex[index])
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this._getTrendGoodsList();
  },
  //瑞幸潮品商品列表
  async _getTrendGoodsList(index){
    if(index){
      index=index
    }else{
      index=1
    }
    let {data}=await getTrendGoodsList(index,this.data.page,this.data.limit)
    console.log(data)
    this.setData({
      goodslist:data
    })
  },
  pric(){
   
    this.setData({
      price: !this.data.price,
      active:3
    })
    console.log(this.data.active)
   if(this.data.price){
    this.setData({
      price1: false,
    })
    this._getTrendGoodsList(3)

   }else{
    this.setData({
      price1: true,
    })
    this._getTrendGoodsList(4)

   }
    
   
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