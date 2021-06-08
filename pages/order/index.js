const {
  getToken
} = require('../../utils/util')
const {
  cerateOrder
} = require('../../api/order.js');
const {
  getOpenid
} = require('../../api/user.js');

Page({
  /**
   * 页面的初始数据
   */

  data: {
    order: [],
    paidOrder: [],
    unPaidOrder: []
  },
  /**
   * 生命周期函数  --监听页面加载
   */
  onLoad: function (options) {

    let token = getToken()
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

    this._cerateOrder(token);
    this.onClickButton()
  },
  //获取订单
  async _cerateOrder(token) {
    let {
      order
    } = await cerateOrder(token);
    console.log(order);
    let paidOrder = this.data.paidOrder;
    let unPaidOrder = this.data.unPaidOrder;
    order.forEach(item => {
      if (item.o_paragraph == 1) {
        paidOrder.push(item);
      } else {
        unPaidOrder.push(item)
      }
    })
    this.setData({
      order,
      paidOrder,
      unPaidOrder
    })
  },
  //
  async onClickButton() {
    let token = getToken();
    let {
        errcode,
        openid
    } = await getOpenid(token);
    let goodsIds = [];
    if (errcode == 10001) {
        let goods = this.data.unPaidOrder;
        goods = goods.filter(item => {
            // 支付时筛选出选中的商品,未选中的商品剔除掉
            if (item.isSelect) {
                goodsIds.push(item.g_id);
                return item;
            }
        });
        // 删除选中的商品
        await deleteGoods(token, goodsIds);

        // console.log(goods);
        let o_z_price = this.data.totalPrice;
        wx.request({
            url: 'https://rxcoffee.suchcow.top/wxpay',
            method: "POST",
            data: {
                openid,
                goods,
                o_z_price
            },
            success: async (res) => {
                let {
                    nonce_str,
                    timeStamp,
                    prepay_id,
                    paySign,
                    mypackage,
                    sign_type
                } = res.data.result.xml;
                let {
                    o_orderid
                } = res.data;
                wx.requestPayment({
                    nonceStr: nonce_str,
                    package: mypackage,
                    signType: sign_type,
                    paySign: paySign,
                    timeStamp: timeStamp,
                    success: async (res) => {
                        console.log('支付成功', res);
                        // 支付成功后修改订单状态为已付款,再跳转到订单页面
                        console.log(openid, o_orderid)
                        await updateOrder(openid, o_orderid);
                        this.getgoodsList(token);

                        wx.switchTab({
                            url: '/pages/order/index'
                        })
                    },
                    fail: async (err) => {
                        console.log('支付失败', err);
                        this.getgoodsList(token);
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