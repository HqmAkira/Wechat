// miniprogram/pages/university/uIndex/uIndex.js
/**
 * 大学评估页面，switchbar之一
 * 用户输入完个人信息后，分数的评价在此进行计算
 * 计算完成后传递分数给结果页面uResult
 */
const app = getApp()

//大学评分的权重
const universityP = 0.5

//成绩评分的权重
const gradeP = 0.4
Page({
  data: {
    //文or理
    major: 0,
    majors: [
      { name: 0, value: "理科生", checked: 'true' },
      { name: 1, value: "文科生" }
    ],

    //专业
    departmentLevel: 0,
    scienceDepartments: [
      '---', '农学', '物理学', '建筑学', '化学', '生物学', '计算机科学', '数学', '电气电子', '机械', '其他'
    ],
    liberalDepartments: [
      '---', ''
    ],
    departmentsLiberal: [
      { name: 0, value: "" },
    ],
    departmentIndex: 0,

    //大学
    universities: [
      '---', 'C9院校', '985院校', '211院校', '普通一本', '普通本科', '专科'
    ],
    universityIndex: 0,
    objectUniversities: [
      { id: 0, name: '---' },
      { id: 6, name: 'C9院校' },
      { id: 5, name: '985院校' },
      { id: 4, name: '211院校' },
      { id: 3, name: '普通一本' },
      { id: 2, name: '普通本科' },
      { id: 1, name: '专科' },
    ],
    //大学等级，C9-6,985-5,211-4,一本-3,本科-2,大专-1
    universityLevel: 0,

    //大学平均分
    averageGrade: 60,

    japaneses: [
      { name: 0, value: "N1" },
      { name: 1, value: "N2" },
      { name: 2, value: "木有", checked: 'true' }
    ],

    //日语等级,N1-0,N2-1
    japaneseLevel: 0,
    japaneseInput: false,

    //日语分数,对应japaneseLevel
    japaneseGrade: 0,
    englishs: [
      { name: 0, value: "TOEFL" },
      { name: 1, value: "TOEIC" },
      { name: 2, value: "IELTS" },
      { name: 3, value: "木有", checked: 'true' },
    ],

    //英语等级,TOEFL-0,TOEIC-1,IELTS-2
    englishLevel: 0,
    englishInput: false,

    //英语分数,对应englishLevel
    englishGrade: 0,

    //祝福语
    message: "",

    //得分
    yourPoints: 0,
  },

  onLoad: function () {
    this.setData({
      major: 0,
      departmentLevel: 0,
      departmentIndex: 0,
      universityLevel: 0,
      universityIndex: 0,
      averageGrade: 60,
      japaneseLevel: 2,
      japaneseInput: false,
      japaneseGrade: 0,
      englishLevel: 3,
      englishInput: false,
      englishGrade: 0,
    })
  },

  /**
   * 专业变更时触发
   */
  majorChange: function (e) {
    console.log("专业变更：", e.detail.value)
    this.setData({
      major: e.detail.value,
      departmentIndex: 0,
      departmentLevel: 0
    })
  },

  /**
   * 大学选择变更时触发
   */
  universityChange: function (e) {
    this.setData({
      universityIndex: e.detail.value
    })
    this.data.universityLevel = this.data.objectUniversities[this.data.universityIndex].id
  },

  /**
   * 平均分变更时触发
   */
  averageGradeChange: function (e) {
    this.setData({
      averageGrade: e.detail.value
    })
  },

  /**
   * 日语等级变更时触发
   */
  japaneseChange: function (e) {
    this.setData({
      japaneseLevel: e.detail.value
    })
    if (this.data.japaneseLevel == 2) {
      this.setData({
        japaneseInput: false
      })
    }
    else {
      this.setData({
        japaneseInput: true
      })
    }
  },

  /**
   * 日语分数变更时触发
   */
  japaneseGradeChange: function (e) {
    this.setData({
      japaneseGrade: e.detail.value
    })
  },

  /**
   * 英语等级变更时触发
   */
  englishChange: function (e) {
    this.setData({
      englishLevel: e.detail.value,
    })
    if (this.data.englishLevel == 3) {
      this.setData({
        englishInput: false
      })
    }
    else {
      this.setData({
        englishInput: true
      })
    }
  },

  /**
   * 英语成绩变更时触发
   */
  englishGradeChange: function (e) {
    this.setData({
      englishGrade: e.detail.value
    })
  },

  /**
   * 将本页面的计算结果放入缓存
   * 跳转至结果
   */
  startTest: function (e) {
    this.analyze()
    wx.setStorageSync("japaneseLevel", this.data.japaneseLevel)
    wx.setStorageSync("japaneseGrade", this.data.japaneseGrade)
    wx.setStorageSync("englishLevel", this.data.englishLevel)
    wx.setStorageSync("englishGrade", this.data.englishLevel)
    wx.setStorageSync("yourPoints", this.data.yourPoints)
    wx.setStorageSync("major", this.data.major)
    console.log("points" + this.data.yourPoints)
    wx.navigateTo({
      url: '../uResult/uResult'
    })
  },

  /**
   * 加权计算最终得分
   */
  analyze: function () {
    this.data.yourPoints = this.computeUniversity() * universityP + this.computeGrade() * gradeP
  },

  /**
   * 大学方面得分计算
   * 参数自行调整
   */
  computeUniversity: function () {
    var grade;
    if (this.data.averageGrade < 60) grade = 60
    else if (this.data.averageGrade > 90) grade = 90
    else grade = this.data.averageGrade
    return this.data.universityLevel * 12 + (grade - 30)
  },

  /**
   * 成绩方面得分计算
   * 先计算日语
   * 再计算英语
   */
  computeGrade: function () {
    var japanesePro = 0
    if (this.data.japaneseLevel == 0) {
      japanesePro = 85
    }
    else if (this.japaneseLevel == 1) {
      japanesePro = 70
    }
    var gradePro = 0
    if (this.data.japaneseGrade > 150) {
      gradePro = 150
    }
    else if (this.data.japaneseGrade < 90) gradePro = 90
    else gradePro = this.data.japaneseGrade
    var japanesePoint = japanesePro + (gradePro - 90) / 4

    var englishPro = 0
    if (this.data.englishLevel == 0) {
      if (this.data.englishGrade > 100) englishPro = 100
      else if (this.data.englishGrade < 80) englishPro = 80
      else englishPro = this.data.englishGrade
      return (englishPro - 80) * 5 + japanesePoint
    }
    else if (this.data.englishLevel == 1) {
      if (this.data.englishGrade > 930) englishPro = 930
      else if (this.data.englishGrade < 680) englishPro = 680
      else englishPro = this.data.englishGrade
      return (englishPro - 680) * 0.4 + japanesePoint
    }
    else if (this.data.englishChange == 2) {
      if (this.data.englishGrade > 9) englishPro = 9
      else if (this.data.englishGrade < 6) englishPro = 6
      else englishPro = this.data.englishGrade
      return (englishPro - 6) * 100 / 3 + japanesePoint
    }
    else return (0 + japanesePoint)
  },
})