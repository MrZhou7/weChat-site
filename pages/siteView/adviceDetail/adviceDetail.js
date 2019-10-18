// pages/siteView/adviceDetail/adviceDetail.js
import api from '../../../utils/request.js'
var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advice: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    api.getAdviceDetail({ session_key: wx.getStorageSync('session_key'), id: options.id, user_id: App.globalData.userId }).then(res => {
      that.setData({
        advice: res.data.data.advice
      })
    })
  },
  adviceInput: function (e) {
    this.setData({
      advice: e.detail.value
    })
  }
})