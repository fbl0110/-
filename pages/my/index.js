// pages/my/index.js
const {getShopList}=require('../../api/my.js');
const {getuserInfo,getToken}=require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      jgglist:[
         {
           img:"../../assets/gw_img/1.png",
           text:'我的订单'
         },
         {
          img:"../../assets/gw_img/2.png",
          text:'咖啡钱包'
        },
        {
          img:"../../assets/gw_img/3.png",
          text:'优惠卷'
        },
        {
          img:"../../assets/gw_img/4.png",
          text:'礼品卡'
        },
        {
          img:"../../assets/gw_img/5.png",
          text:'账户余额'
        },
        {
          img:"../../assets/gw_img/6.png",
          text:'发票管理'
        },
        {
          img:"../../assets/gw_img/7.png",
          text:'兑换优惠'
        },
        {
          img:"../../assets/gw_img/8.png",
          text:'帮助反馈'
        },
      ],
      tabs:[
        {title:"潮品下午茶"},
        {title:"生活家具"},
        {title:"数码电器"},
        {title:"潮玩饰品"}
      ],
      fbl:true,
      goodslist:[],//个人中心商品列表
      page:1,
      limit:40,
      s_id:9,
      userlist:{},
      uname:'登录/注册',
      img:'../../assets/gw_img/logon.png'
  },
  onChange(e){
    let index=e.detail.index;
    let numbverIndex=[9,10,11,12]
    this._getShopList(numbverIndex[index])
  },
  /**
   * 生命周期函数--监听页面加载
 
   */
  onLoad: function (options) {
    this.jl();
    this._getShopList();

    
  },
//  跳转登录页面
  t_logon(){
    let token=getToken();
    if(!token){
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return
  }else if(token) {
    wx.navigateTo({
      url:'/pages/upmy/index'
    })
  }
  else {
    wx.switchTab({
      url:'/pages/my/index'
    })
  }    
  },


  //个人中心
  async _getShopList(index){
    if(index){
      index=index
    }else{
      index=9
    }
    let {data}=await getShopList(index,this.data.page,this.data.limit)
    console.log(data)
    this.setData({
      goodslist:data
    })
  },
  jgg(index){
    let token=getToken();
    if(!token){
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return
  }else{
    let mylist= index.currentTarget.id
    console.log(index.currentTarget.id);
    switch(mylist){
        case '0':
        wx.switchTab({
          url: '/pages/order/index',
        })
        break;
        case '1':
          wx.switchTab({
            url: '/pages/order/index',
          })
          break; case '2':
          wx.switchTab({
            url: '/pages/order/index',
          })
          break; case '3':
          wx.switchTab({
            url: '/pages/order/index',
          })
          break; case '4':
          wx.switchTab({
            url: '/pages/order/index',
          })
          break;
          case '5':
            wx.switchTab({
              url: '/pages/order/index',
            })
            break;
            case '6':
              wx.switchTab({
                url: '/pages/order/index',
              })
              break;
              case '7':
                wx.switchTab({
                  url: '/pages/order/index',
                })
                break;
        default:
        console.log("您的输入有误");
        break;
        }
      }
  },

  //展开收起
  jl(){
  
    this.setData({
      fbl:!this.data.fbl,
     
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
    let token = getToken();
    let userInfo = getuserInfo();
    console.log(userInfo)
    if(token){
      this.setData({
        uname: userInfo.nickName,
        img:userInfo.avatarUrl
      })
    }else{
      this.setData({
        uname:'登录/注册',
        img:'../../assets/gw_img/logon.png'
      })
    }

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