// miniprogram/pages/user/userInfo/userInfo.js
const app = getApp()

Page({
  data: {
    temp: {},
    goalName: 'XXX',
    goalMajor: 'YYY',
    goalEvaluation: '',
    logged: false,
    hasGoal: false,
    hasTested: false,
    majorAd: true,
    jaAd: true,
    enAd: true,
  },

  onLoad: function () {
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

    //获得用户信息
    this.setData({
      goalName: app.globalData.userGoal.name,
      goalMajor: app.globalData.userGoal.major,
      goalEvaluation: app.globalData.userGoal.evaluation,
      hasTested: app.globalData.hasTested
    })

    if (this.data.goalName != null) this.setData({
      hasGoal: true
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
      })
    }
    app.initProfile(this.data.userInfo)
  },

  onShow: function() {
    //获得用户信息
    this.setData({
      goalName: app.globalData.userGoal.name,
      goalMajor: app.globalData.userGoal.major,
      goalEvaluation: app.globalData.userGoal.evaluation,
      hasTested: app.globalData.hasTested
    })

    if (this.data.goalName != null) this.setData({
      hasGoal: true
    })
  },

  goEdit: function(e) {
    wx.navigateTo({
      url: '../userEdit/userEdit',
    })
  },

  refresh: function(e) {
    this.onLoad()
  },

  showInfo: function() {
    
  },

  goUniversityRecommand: function() {
    wx.switchTab({
      url: '../../university/uIndex/uIndex',
    })
  },


})