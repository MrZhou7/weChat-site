// pages/siteView/logView/logView.js
import api from '../../../utils/request.js'
import common from '../../../utils/common.js'
var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coustmer_name: '',
    reasons: '',
    money: '',
    status: 1,
    important: '',
    lightspot: '',
    morrow: '',
    work: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getMatterDetail({
      session_key: wx.getStorageSync('session_key'),
      date: App.globalData.date,
      user_id: App.globalData.userId
    }).then(res => {
      const reqData = res.data.data;
      console.log(reqData)
      if (Object.keys(reqData).length != 0) {
        this.setData({
          coustmer_name: reqData.coustmer_name,
          reasons: reqData.reasons,
          money: reqData.money,
          status: reqData.status,
          important: reqData.important,
          lightspot: reqData.lightspot,
          morrow: reqData.morrow,
          work: reqData.work
        })
      }
    })
  },

  // //是否缴纳
  switch1Change: function (e) {
    this.setData({
      status: this.isNumber(e.detail.value)
    })
  },
  // //是否上班
  switch2Change: function (e) {
    this.setData({
      work: this.isNumber(e.detail.value)
    })
  },

  isNumber(data) {
    if (data) {
      return 1
    } else {
      return 0
    }
  },
  isTrue(data) {
    if (data == 0) {
      return false
    } else if (data == 1) {
      return true
    }
  }
})