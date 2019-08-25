// miniprogram/pages/user/userEdit/userEdit.js
const app = getApp()

Page({
  data: {
    userName: '',
    category: 0,
    categoryArray: ["理科生", "文科生", "艺术生"],
    categoryList: [
      { name: 0, value: "理科生", checked: 'true' },
      { name: 1, value: "文科生" },
      { name: 2, value: "艺术生" },
    ],
    phone: '123',
    qq: '',
    universityName: '',
    major: '',
    goalEvaluation: '',
    goalMajor: '',
    goalName: '',
  },

  onLoad: function (options) {
    for (let i = 0; i < this.data.categoryList.length; i++) {
      if (this.data.categoryList[i].value == app.globalData.userInfo.cate) {
        this.data.category = this.data.categoryList[i].name
        break
      }
    }
    console.log(this.data.category)
    var that = this
    this.setData({
      userName: app.globalData.userInfo.userName,
      phone: app.globalData.userInfo.phone,
      qq: app.globalData.userInfo.qq,
      universityName: app.globalData.userUg.name,
      major: app.globalData.userUg.major,
      goalMajor: app.globalData.userGoal.major,
      goalName: app.globalData.userGoal.name,
      goalEvaluation: app.globalData.userGoal.evaluation,
      category: that.data.category
    })
  },

  nameChange: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },

  phoneChange: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  cateChange: function (e) {
    this.setData({
      category: e.detail.value
    })
  },

  qqChange: function (e) {
    this.setData({
      qq: e.detail.value
    })
  },

  uniChange: function (e) {
    this.setData({
      universityName: e.detail.value
    })
  },

  majorChange: function (e) {
    this.setData({
      major: e.detail.value
    })
  },

  goalNameChange: function (e) {
    this.setData({
      goalName: e.detail.value
    })
  },

  goalMajorChange: function (e) {
    this.setData({
      goalMajor: e.detail.value
    })
  },

  editFinish: function() {
    var that = this
    const db = wx.cloud.database()
    db.collection('user').doc(app.getUserId(app.globalData.openid)).update({
      data: {
        info: {
          userName: this.data.userName,
          qq: this.data.qq,
          cate: this.data.categoryList[this.data.category].value
        },
        ug: {
          name: this.data.universityName,
          major: this.data.major
        },
        goal: {
          evaluation: this.data.goalEvaluation,
          major: this.data.goalMajor,
          name: this.data.goalName
        }
      },
      success: function(res) {
        app.globalData.userInfo.userName = that.data.userName
        app.globalData.userInfo.qq = that.data.qq
        app.globalData.userInfo.phone = that.data.phone
        app.globalData.userInfo.cate = that.data.categoryList[that.data.category].value
        app.globalData.userUg.major = that.data.major
        app.globalData.userGoal.evaluation = that.data.goalEvaluation
        app.globalData.userGoal.major = that.data.goalMajor
        app.globalData.userGoal.name = that.data.goalName
        console.log("Finish")
      }
    })

    wx.switchTab({
      url: '../userInfo/userInfo',
    })
  }
})