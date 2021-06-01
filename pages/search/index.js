// pages/search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        order: 'desc',
        page: 1,
        pagesize: 10
    },

    // 搜索商品
    searchGoods(e) {
        // console.log(e.detail)
        let value = e.detail;
        let order = this.data.order;
        let page = this.data.page;
        let pagesize = this.data.pagesize;

        this.setData({
            value,
        });

        wx.request({
            url: `https://rxcoffee.suchcow.top/search?value=${value}&order=${order}&page=${page}&pagesize=${pagesize}`
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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