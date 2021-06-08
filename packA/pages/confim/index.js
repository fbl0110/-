const { getAddress, getOpenid } = require('../../../api/user')
const { getToken } = require('../../../utils/util.js')
const { updateOrder } = require('../../../api/order.js');



// const { featchGoodsList, deleteOneGood, deleteGoods } = require('../../api/shopCart.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    disabled:false,
    addressDefault:{}
  },
  onChange() {
    this.setData({ checked: !this.data.checked });
  },
  disabled(){
      this.setData({
        disabled:false
      })
  },
  address() {
    wx.navigateTo({
      url: '/pages/address/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let token = wx.getStorageSync('token')
    // let userAddressed = wx.getStorageSync('list')
    // this.setData({
    //   list: userAddressed
    // })
    const eventChannel = this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('version', ({ version }) => {
      this.setData({
        version
      });
    })
    this._getAddress(token)

  },
  // 获取地址
  async _getAddress(token) {
    // let token=getStorageSync('token')
    let {data} = await getAddress(token)
    data.some(item=>{
      if(item.a_isDefault ==1){
       this.setData({
        addressDefault:item
       })
       wx.setStorageSync('addressDefault', item)
      }else{
        this.setData({
          addressDefault:data[0]
         })
         wx.setStorageSync('addressDefault', data[0])
      }
    })
    // let dataOne=data? data.a_isDefault==1 :data[0]
    // console.log(data)

    // console.log(data)
    // let {g_name,g_x_price}=data
    // let goods
  },
  // 1.获取用户的信息 已获取 从本地存储拿
  // 2.拿到code去后台请求openid 成功的回调里的openid 放到全局了
  // 3.从接口 解析xml里的数据 请求支付接口
  // 提交订单 点击购买后,删除要购买的商品,生成订单
  async puy() {
    let token = getToken();
    let { errcode, openid } = await getOpenid(token);
    let addressDefault=wx.getStorageSync('addressDefault')
    addressDefault = addressDefault ? JSON.stringify(addressDefault) : ''
   console.log(addressDefault)
    let goods = [];
    let goodsInfo = wx.getStorageSync('goodsInfo');
    goodsInfo.sh_number = 1;
    console.log(goodsInfo)
    let o_z_price = goodsInfo.sh_number * goodsInfo.g_x_price;
    goods.push(goodsInfo);
    wx.request({
      url: 'https://rxcoffee.suchcow.top/wxpay',
      method: "POST",
      data: {
        openid,
        goods,
        o_z_price,
        addressDefault
      },
      success(res) {
        let { nonce_str, timeStamp, prepay_id, paySign, mypackage, sign_type } = res.data.result.xml;
        let { o_orderid } = res;
        wx.requestPayment({
          nonceStr: nonce_str,
          package: mypackage,
          signType: sign_type,
          paySign: paySign,
          timeStamp: timeStamp,
          async success(res) {
            console.log('支付成功', res);
            // 支付成功后修改订单状态为已付款,再跳转到订单页面
            await updateOrder(openid, o_orderid);
            wx.switchTab({
              url: '/pages/order/index'
            })
          },
          fail(err) {
            console.log('支付失败', err);
            wx.switchTab({
              url: '/pages/order/index'
            })
          }
        })
      },
      fail(err) {
        console.log('err')
      }
    })
  },



  onChange() {
    checkedColor: 'blue'
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // let userAddressed = wx.getStorageSync('list')
    // this.setData({
    //   list: userAddressed
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let addressDefault = wx.getStorageSync('addressDefault')
    this.setData({
      addressDefault
    })

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


})