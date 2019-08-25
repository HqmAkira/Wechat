// miniprogram/pages/webview/webview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webIndex: 0
  },

  onLoad: function (options) {
    this.setData({
      webIndex: wx.getStorageSync("webIndex")
    })
    console.log(this.data.webIndex)
  },

  onReady: function () {

  },

  onShow: function () {

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