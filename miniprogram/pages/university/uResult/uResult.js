// miniprogram/pages/university/uResult/uResult.js
/**
 * 评估结果页面
 * 按照最终得分，从数据库中选出对应的大学
 * 显示对应学校的校徽
 */
const app = getApp()

//校徽链接前缀
const badgePrefix = "cloud://databasetest-kr3vs.6461-databasetest-kr3vs/universityBadge/"

Page({
  data: {
    major: 0,
    yourPoints: 0,
    computeIndex: 0,
    universityName: "",
    liberalUniversity: [
      { point: 95, name: "東京大学/慶應義塾大学" },
      { point: 90, name: "京都大学/早稲田大学" },
      { point: 85, name: "国際教養大学/国際基督教大学" },
      { point: 80, name: "東京外国語大学/上智大学" },
      { point: 75, name: "一橋大学/青山学院大学" },
      { point: 70, name: "大阪大学/同志社大学" },
      { point: 65, name: "神戸大学/法政大学" },
      { point: 60, name: "筑波大学/立教大学" },
      { point: 55, name: "横浜国立大学/関西学院大学" },
      { point: 50, name: "京都府立大学/中央大学" },
      { point: 45, name: "神戸市外国語大学/明治大学" },
      { point: 40, name: "千葉大学/立命館大学" },
      { point: 35, name: "名古屋大学/関西大学" },
      { point: 30, name: "九州大学/学習院大学" },
      { point: 25, name: "首都大学東京/國學院大學" },
      { point: 20, name: "東北大学/関西外国語大学" },
      { point: 15, name: "広島大学/東洋大学" },
      { point: 10, name: "北海道大学/日本大学" },
      { point: 5, name: "金沢大学/愛知大学" },
      { point: 0, name: "熊本大学/近畿大学" },
    ],
    scienceUniversity: [
      { point: 95, name: "京都大学/慶應義塾大学" },
      { point: 90, name: "東京大学/早稲田大学" },
      { point: 85, name: "大阪大学/早稲田大学" },
      { point: 80, name: "東京工業大学/上智大学" },
      { point: 75, name: "北海道大学/東京理科大学" },
      { point: 70, name: "筑波大学/明治大学" },
      { point: 65, name: "名古屋大学/同志社大学" },
      { point: 60, name: "横浜国立大学/同志社大学" },
      { point: 55, name: "神戸大学/芝浦工業大学" },
      { point: 50, name: "首都大学東京/青山学院大学" },
      { point: 45, name: "千葉大学/同志社大学" },
      { point: 40, name: "東北大学/関西大学" },
      { point: 35, name: "電気通信大学/日本大学" },
      { point: 30, name: "広島大学/立命館大学" },
      { point: 25, name: "九州大学/立命館大学" },
      { point: 20, name: "大阪府立大学/近畿大学" },
      { point: 15, name: "大阪市立大学/近畿大学" },
      { point: 10, name: "東京海洋大学/東京農業大学" },
      { point: 5, name: "岩手大学/愛知工業大学" },
      { point: 0, name: "岡山大学/大阪工業大学" },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })

    this.setData({
      major: wx.getStorageSync("major"),
      yourPoints: wx.getStorageSync("yourPoints"),
    })

    this.data.computeIndex = parseInt(20 - this.data.yourPoints / 5)

    if (this.data.computeIndex < 0) this.data.computeIndex = 0
    if (this.data.computeIndex > 20) this.data.computeIndex = 19

    if (this.data.major == 1) {
      this.setData({
        universityName: this.data.liberalUniversity[this.data.computeIndex].name
      })
    }
    else {
      this.setData({
        universityName: this.data.scienceUniversity[this.data.computeIndex].name
      })
    }
  },

  onShareAppMessage: function(res) {
    return {
      title: "测一测你能上哪所日本大学",
      imageUrl: ''
    }
  },
})