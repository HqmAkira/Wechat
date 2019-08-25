//app.js
App({
  globalData: {
    userGoal: {},
    userGrade: {},
    userInfo: {},
    userUg: {},
    launch: {},
    id: null,
    openid: '',
    exist: false,
    hasGoal: false,
    hasTested: false,
  },

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    //数据读取信息
    this.globalData.launch = wx.getLaunchOptionsSync()
    wx.showLoading({
      title: '正在读取数据',
    })
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        this.globalData.openid = res.result.openid
        wx.hideLoading()
      },
    })
    
  },

  //用户点击授权时，读取用户信息并记录入数据库
  initProfile: function(obj) {
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: this.globalData.openid
    }).get({
      success: function(res) {
        if(res.data.length == 0){
          db.collection('user').add({
            data: {
              info: {
                gender: obj.gender,
                nickName: obj.nickName,
                userName: null,
                userCountry: obj.country,
                userProvince: obj.province,
                userCity: obj.city,
              },
              goal: {},
              grade: {},
              ug: {}
            }
          })
        }
        this.globalData.exist = true
      },
    })
  },

  //获取用户的信息id，用于更新数据库
  getUserId: function(openId) {
    var that = this
    if (that.globalData.id == null){
      const db = wx.cloud.database()
      db.collection('user').where({
        _openid: openId,
      }).get({
        success: function (res) {
          that.globalData.id = res.data[0]._id
        }
      })
    }
    return that.globalData.id
  },

  setUser: function() {
    var that = this
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: this.globalData.openid
    }).get({
      success: function (res) {
        if (res.data.length > 0) {
          that.globalData.userGoal = res.data[0].goal
          that.globalData.userGrade = res.data[0].grade
          that.globalData.userInfo = res.data[0].info
          that.globalData.userUg = res.data[0].ug
          that.globalData.hasTested = res.data[0].hasTested
        }
      }
    })
  },
})
