// pages/shopcar/index.js
const { featchGoodsList, deleteOneGood, deleteGoods } = require('../../api/shopCart.js');
const { getToken } = require('../../utils/util');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked: true,
        imageURL: 'http://rx.suchcow.top/banner_1.jpg'
    },

    onChange(e) {
        console.log(e)
    },

    // 获取购物车商品
    async getgoodsList(token) {
        let data = featchGoodsList(token);
        console.log(data);
    },

    // 删除购物车商品
    delectGoods(e) {
        let token = getToken();
        deleteOneGood(token, g_id)
    },




    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let token = getToken();
        if (!token) {
            wx.wx.navigateTo({
                url: '/pages/login/index',
            });
        }
        this.getgoodsList(token)
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