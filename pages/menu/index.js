// pages/menu/index.js
const { FecthMemuGoodsList, FecthGoodsSortTitle } = require('../../api/memu.js')

Page({
    /**
     * 页面的初始数据
     */
    data: {
        autoHeight: '1000rpx',
        isSelect: false,
        anchorArray: [],
        titleAnchorArray: [],
        toView: '',
        list: [],
        dataList: {},
        toTitle: 0
    },

    // 跳转到搜索页面
    toSearch() {
        wx.navigateTo({
            url: `/pages/search/index`
        })
    },

    // 滚动时触发
    handelScroll(e) {
        // console.log(e);
        let scrollTop = e.detail.scrollTop; // 被卷去的高度
        let scrollArr = this.data.anchorArray;
        for (let i = 0; i < scrollArr.length; i++) {
            let list = this.data.list;
            if (scrollTop >= scrollArr[i] && scrollTop < scrollArr[i + 1]) {
                // console.log(scrollTop, i);
                list = list.map(item => {
                    item.isSelect = false;
                    return item;
                })
                list[i + 1].isSelect = true;
                this.setData({
                    toTitle: i + 1,
                    list
                })

            } else if (scrollTop < scrollArr[0]) {
                list = list.map(item => {
                    item.isSelect = false;
                    return item;
                })
                list[0].isSelect = true;
                this.setData({
                    toTitle: 0,
                    list
                })

            }

        }
    },
    // 点击 分类 实现锚点定位
    selectItem(e) {
        // console.log(e.currentTarget.dataset.value);
        let { index } = e.currentTarget.dataset;
        // console.log(index);

        let list = this.data.list;
        list.map(item => {
            item.isSelect = false;
            return item;
        })
        list[index].isSelect = true;
        this.setData({
            toView: index,
            list
        })
    },

    //  获取右边 滚动高度
    rightItemScroll() {
        let query = wx.createSelectorQuery().in(this);
        let heightArr = [];
        let h = 0;
        // 获取 所有 sort 节点最底部距离view-scroll顶部的高度,并存储到一个数组中
        setTimeout(() => {
            query.selectAll('.goods_list').boundingClientRect((react) => {
                react.forEach((res) => {
                    // console.log(res.height);
                    h += res.height;
                    heightArr.push(h);
                })
                this.setData({
                    anchorArray: heightArr
                });
            }).exec();
        }, 0)
    },

    //  获取左边导航栏 滚动高度
    leftItemScroll() {
        let query = wx.createSelectorQuery().in(this);
        let heightArr = [];
        let h = 0;
        // 获取 所有 sort 节点最底部距离view-scroll顶部的高度,并存储到一个数组中
        setTimeout(() => {
            query.selectAll('.tabTilte').boundingClientRect((react) => {
                react.forEach((res) => {
                    // console.log(res.height);
                    h += res.height;
                    heightArr.push(h);
                })
                this.setData({
                    titleAnchorArray: heightArr
                });
            }).exec();
        }, 0)
    },

    // 获取商品分类名
    async loadSortTitle(dataListArr) {
        // console.log(data)
        let list = dataListArr.map(item => {
            let memuTitle = {};
            memuTitle.value = Object.keys(item)[0];
            memuTitle.isSelect = false;
            return memuTitle;
        })
        list[0].isSelect = true;
        console.log(list)
        this.setData({
            list
        })
    },



    // 获取 菜单页面商品列表
    async loadMemuGoodsList() {
        let { data } = await FecthMemuGoodsList();
        // console.log(data);
        let dataListObj = {};
        data.forEach(item => {
            if (!dataListObj[item.s_name]) {
                dataListObj[item.s_name] = []
            }
            dataListObj[item.s_name].push(item);
        })
        let dataListArr = [];
        for (var k in dataListObj) {
            let obj = {};
            if (!obj[k]) {
                obj[k] = []
            }
            obj[k] = dataListObj[k];
            dataListArr.push(obj);
        }
        // console.log(dataListArr);
        this.setData({
            dataList: dataListArr
        })
        this.loadSortTitle(dataListArr);

    },

    toGoodsDetail(e) {
        // console.log(e.currentTarget.dataset);
        let { id } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/details/index?id=${id}`
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.loadMemuGoodsList();

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.leftItemScroll();
        this.rightItemScroll();
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