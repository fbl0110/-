// pages/shopcar/index.js
const { featchGoodsList, deleteOneGood, deleteGoods } = require('../../api/shopCart.js');
const { getToken } = require('../../utils/util');
const { updateOrder } = require('../../api/order.js');
const { getOpenid } = require('../../api/user.js');
const { getTrendGoodsList } = require('../../api/home.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        Allchecked: true,
        totalPrice: 0,
        shopCartGoods: [],
        active: 1,
        page: 1,
        limit: 6,
        RecommendGoods: [],
    },

    // 选中商品
    onChange(e) {
        let { detail, target: { dataset: { index: goodsIndex } } } = e;
        console.log(detail, goodsIndex)
        let shopCartGoods = this.data.shopCartGoods;
        shopCartGoods = shopCartGoods.map((item, index) => {
            index == goodsIndex && (item.isSelect = detail);
            return item;
        })
        this.setData({
            shopCartGoods
        });
        // 判断是否全部选中
        this.isAllSelect(shopCartGoods)
    },

    // 判断是否全部选中
    isAllSelect(shopCartGoods) {
        // console.log(shopCartGoods)
        let flag = true;
        shopCartGoods && shopCartGoods.forEach(item => {
            if (!item.isSelect) {
                flag = false;
            }
        });
        this.setData({
                Allchecked: flag
            })
            // 计算总价格
        this.countTotalPrice(shopCartGoods)
    },

    // 点击全选按钮
    onChangeAll({ detail }) {
        console.log(detail)
        let shopCartGoods = this.data.shopCartGoods;
        shopCartGoods.map(item => {
            item.isSelect = detail;
            return item;
        })
        this.setData({
            Allchecked: detail,
            shopCartGoods
        });
        // 计算总价格
        this.countTotalPrice(shopCartGoods)
    },

    // 修改数量
    updateNum(e) {
        // console.log(e)
        let { detail, target: { dataset: { index: goodsIndex, id } } } = e;
        let token = getToken();
        // console.log(detail, goodsIndex); // detail: 数量 index: 商品索引

        let shopCartGoods = this.data.shopCartGoods;
        shopCartGoods = shopCartGoods.map((item, index) => {
            if (goodsIndex == index) {
                item.sh_number = Number(detail);
                wx.request({
                    url: "https://rxcoffee.suchcow.top/updateGoodsNum",
                    method: 'post',
                    data: {
                        token,
                        sh_number: detail,
                        g_id: id
                    }
                })
            }
            return item;
        });
        this.setData({
            shopCartGoods
        });
        // 更新总价格
        this.countTotalPrice(shopCartGoods)
    },

    // 计算总价
    countTotalPrice(data) {
        let totalPrice = 0;
        data && data.forEach(item => {
            if (item.isSelect) {
                totalPrice += (item.sh_number * item.g_x_price)
            }
        })
        this.setData({
            totalPrice
        });
        // console.log(totalPrice)
    },

    // 获取购物车商品
    async getgoodsList(token) {
        let { data } = await featchGoodsList(token);
        if (data.length) {
            data = data.map(item => {
                item.sh_number = Number(item.sh_number);
                item.g_x_price = Number(item.g_x_price);
                item.isSelect = (item.isSelect == 1 ? true : false);
                return item
            });
        }
        // console.log(data);
        this.setData({
            shopCartGoods: data
        })

        // 判断是否全部选中
        this.isAllSelect(data);

    },

    // 删除购物车商品
    async delectGoods({ target: { dataset: { id: g_id } } }) {
        let token = getToken();
        // console.log(token, e)
        let { errcode, message } = await deleteOneGood(token, g_id);
        if (errcode == 10001) {
            wx.showToast({
                title: message,
                icon: 'none',
                duration: 1500,
                success: (result) => {
                    setTimeout(() => {
                        this.getgoodsList(token);
                    }, 1000)

                },
            });
        }

    },

    // 提交订单 点击购买后,删除要购买的商品,生成订单
    async onClickButton() {
        let token = getToken();
        let { errcode, openid } = await getOpenid(token);
        let goodsIds = [];
        if (errcode == 10001) {
            let goods = this.data.shopCartGoods;
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
                            this.getgoodsList();

                            wx.switchTab({
                                url: '/pages/order/index'
                            })
                        },
                        fail(err) {
                            console.log('支付失败', err);
                            this.getgoodsList();
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
    // 获取 推荐商品的商品列表
    async getrRecommendGoods() {
        let page = this.data.page;
        let limit = this.data.limit;
        let active = this.data.active;
        let { data } = await getTrendGoodsList(active, page, limit);
        data = data.filter((item, index) => {
                if (index < 6) {
                    return item;
                }
            })
            // console.log(data);
        this.setData({
            RecommendGoods: data
        })

    },

    // 点击换一批
    changePage() {
        let page = this.data.page;
        page++;
        if (page > 8) {
            page = 1
        }
        console.log(page)
        this.setData({
            page
        })

        this.getrRecommendGoods()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let token = getToken();
        if (!token) {
            wx.navigateTo({
                url: '/pages/login/index',
            });
        }
        this.getgoodsList(token);

        if (!this.data.shopCartGoods.length) {
            this.getrRecommendGoods()
        }
    },
    //  跳转到菜单页面
    drink() {
        wx.switchTab({
            url: '/pages/menu/index',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let token = getToken();
        if (!token) {
            wx.navigateTo({
                url: '/pages/login/index',
            });
        }
        this.getgoodsList(token)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})