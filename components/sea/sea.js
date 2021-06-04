// components/sea/sea.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Object,
      default: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },


  /**
   * 组件的方法列表
   */
  methods: {
    prouter(e) {
      let id = e.currentTarget.dataset.id
      // console.log(id)
      let token = wx.getStorageSync('token')
      // console.log(token)
      if (token == '') {
        wx.navigateTo({
          url: '/pages/login/index',
        })
      } else {
        wx.navigateTo({
          url: '/pages/details/index?id=' + id,

        })
      }

    },
  }
})
