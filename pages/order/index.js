const {
  getToken
} = require('../../utils/util')
const {
  cerateOrder
} = require('../../api/order.js');
const {
  getOpenid
} = require('../../api/user.js');
const {
  updateOrder
} = require('../../api/order.js');
Page({
  /**
   * 页面的初始数据
   */

  data: {
    order: [],
    paidOrder: [],
    unPaidOrder: [],
    activeNames: ['1'],
  },
  /**
   * 生命周期函数  --监听页面加载
   */
  onLoad: function (options) {
 
    let token=getToken()
    this._cerateOrder(token);
    console.log(token)
    if (!token) {
      wx.redirectTo({
        url: '/pages/login/index',
      })
    } else if (token) {
      wx.switchTab({
        url: '/pages/order/index'
      })
    }
  },
  onChange(e) {
   console.log(e) 
  let {isOpenIndex} = e.currentTarget.dataset;
  let paidOrder = this.data.paidOrder;
  paidOrder = paidOrder.map((item,index) =>{
  if( isOpenIndex == index ){
    item.isOpenDetail = !item.isOpenDetail
  }
    return item;
  })
  this.setData({
    paidOrder,
    activeNames: e.detail,
  })

  },

  
  //获取订单
  async _cerateOrder(token) {
    let {
      order
    } = await cerateOrder(token);
    console.log(order);
    let paidOrder =  [];
    let unPaidOrder =  [];
    if(!order.length){
      return
    }
    order.forEach(item=>{
      if(item.o_paragraph==1){
        paidOrder.push(item);
      }else{
        unPaidOrder.push(item);
      }
    })
    paidOrder = paidOrder.map(item =>{
      item.isOpenDetail = 1;
      return item;
    })
    this.setData({
      order,
      paidOrder,
      unPaidOrder
    })
  },

  //
  async onClickButton(e) {
   let {item} = e.currentTarget.dataset;
   let addressDefault=wx.getStorageSync('addressDefault')
   console.log(item);
    let token = getToken();
    let {
        errcode,
        openid
    } = await getOpenid(token);
        wx.request({
            url: 'https://rxcoffee.suchcow.top/wxpay',
            method: "POST",
            data: {
                openid,
                o_orderid:item.o_orderid
            },
            success: async (res) => {
              console.log(res);
                let {
                    nonce_str,
                    timeStamp,
                    prepay_id,
                    paySign,
                    mypackage,
                    sign_type
                } = res.data.result.xml;
                // let { o_orderid } = res.data;
                wx.requestPayment({
                    nonceStr: nonce_str,
                    package: mypackage,
                    signType: sign_type,
                    paySign: paySign,
                    timeStamp: timeStamp,
                    success: async (res) => {
                        console.log('支付成功', res);
                        // 支付成功后修改订单状态为已付款,再跳转到订单页面
                        console.log(openid,item.o_orderid)
                        await updateOrder(openid,item.o_orderid);
                        // this._cerateOrder(token);     
                    },
                    fail: async (err) => {
                        console.log('支付失败', err);
                    }
                })
            },
            fail(err) {
                console.log('err')
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
    let token=getToken()
    this._cerateOrder(token);
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