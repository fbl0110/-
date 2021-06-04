// pages/search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        option: [
            { text: '价格排序', value: 0 },
            { text: '新款商品', value: 1 },
            { text: '销量排序', value: 2 },
        ],
        selectValue: 0,
        searchValue: '',
        order: 0,
        page: 1,
        pagesize: 8,
        goodsList: [],
        isGetMoreGoods: true
    },

    // 搜索商品
    searchGoods(e) {
        console.log(e.detail);
        let searchValue = e.detail;
        let order = this.data.order;
        let page = this.data.page;
        let pagesize = this.data.pagesize;

        this.setData({
            searchValue,
        });
        searchValue && this.feachGoodsList(searchValue, order, page, pagesize)
    },


    // 获取商品
    feachGoodsList(searchValue, order, page, pagesize) {
        // console.log(searchValue, order, page, pagesize)
        wx.request({
            url: `https://rxcoffee.suchcow.top/search?value=${searchValue}&order=${order}&page=${page}&pagesize=${pagesize}`,
            success: ({ data: { errcode, data: goodsLists } }) => {
                console.log(goodsLists);
                if (errcode == 10001) {
                    if (!goodsLists.length) {
                        this.setData({
                            isGetMoreGoods: false
                        })
                    } else {
                        this.setData({
                            goodsList: this.data.goodsList.concat(goodsLists)
                        })
                    }

                }

            },
        })
    },

    // 切换 菜单
    orderByGoods(e) {
        // console.log(e)
        let order = e.detail;
        this.setData({
            order,
            page: 1,
            pagesize: 8,
            isGetMoreGoods: true
        })
        let searchValue = this.data.searchValue;
        let page = this.data.page;
        let pagesize = this.data.pagesize;
        this.feachGoodsList(searchValue, order, page, pagesize)
    },
    // 加载更多
    onReachBottom: function() {
        console.log(this.data.isGetMoreGoods)
        if (!this.data.isGetMoreGoods) {
            wx.showToast({
                title: '呦! 一会不见,这么拉了',
                icon: 'none',
                duration: 1000,
                mask: false,
            });
            return;
        }
        let page = this.data.page;
        page++;
        this.setData({
            page,
        })
        let searchValue = this.data.searchValue;
        let order = this.data.order;
        let pagesize = this.data.pagesize;
        // console.log(page, searchValue, order, pagesize)
        this.feachGoodsList(searchValue, order, page, pagesize);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(111)
                console.log(res)
                    // this.setData({
                    //     userInfo: res.userInfo,
                    //     hasUserInfo: true
                    // })
            }
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})