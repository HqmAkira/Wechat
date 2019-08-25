//index.js
/**
 * 小程序首页
 * 存放-头条广告、个人历史记录、各类题库按键
 */
const app = getApp()

Page({
  data: {
    //滚动广告图片
    imgUrls: [
      '../../images/b1.jpg',
      '../../images/b2.jpg',
      '../../images/b3.jpg'
    ],
    //自动播放
    autoplay: false, 
    //跳转间隔
    interval: 3000, 
    //翻页速度
    duration: 800, 
    //当前页面
    currentSwipper: 0, 
    //用户授权信息（授权后自动获取）
    userInfo: {},
    //用户是否授权
    logged: false,
  },

  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                logged: true
              })
            }
          })
        } 
      }
    })
    //因app中设置参数为异步因此提前setUser
    app.setUser()
    app.getUserId(app.globalData.openid)
  },

  /**
   * 获取用户信息
   */
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
      })
    }
    app.initProfile(this.data.userInfo)
  },

  /**
   * 滚动广告
   * 非企业公众号会存在跳转无法显示页面的情况
   */
  onSwiperTap: function(e) {
    wx.setStorageSync("webIndex", this.data.currentSwipper)
    wx.navigateTo({
      url: '../webview/webview',
    })
  },

  /**
   * 滚动广告滚动时，当前页面指示器的刷新
   */
  onSwiperChange: function(e) {
    this.data.currentSwipper = e.detail.current
  },

  /**
   * 历史记录页面迁移
   */
  goHistory: function(e) {
  },

  /**
   * 按键-高数题库
   */
  goMathList: function(e) {
    wx.showToast({
      title: '正在施工',
      icon: 'none'
    })
  },

  /**
   * 按键-日语题库
   */
  goJapaneseList: function(e) {
    wx.showToast({
      title: '正在施工',
      icon: 'none'
    })
  },

  /**
   * 按键-英语题库
   */
  goEnglishList: function(e) {
    wx.showToast({
      title: '正在施工',
      icon: 'none'
    })
  },

  /**
   * 按键-每日一题
   */
  goDailyQues: function(e) {
    wx.showToast({
      title: '正在施工',
      icon: 'none'
    })
  }
})
