// pages/siteView/morningView/morningView.js
var api = require('../../../utils/request.js').default;
import apiList from '../../../config/dev.js'
var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    beNum: '', // 应到人数
    actualNum: '', // 实到人数
    leaveBusiness: '', // 请假商户名
    absent: '', // 无故缺席商户名
    frock: '', // 工装不整商户名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let Info = {
      session_key: wx.getStorageSync('session_key'),
      date: App.globalData.dataView,
      type: 'morning_meeting',
      user_id: App.globalData.userId
    }
    wx.showLoading()
    api.getviewDetail(Info).then(res => {
      const reqData = res.data.data;
      console.log(reqData)
      this.setData({
        files: [apiList.base + reqData.pic],
        beNum: reqData.should_num, // 应到人数
        actualNum: reqData.arrived_num, // 实到人数
        leaveBusiness: reqData.ask_customer, // 请假商户名
        absent: reqData.absent_customer, // 无故缺席商户名
        frock: reqData.nospec_customer, // 工装不整商户名
      })
    })
  },

  //查看照片大图
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  busInput: function (e) {
    this.setData({
      leaveBusiness: e.detail.value
    })
  },
  absentInput: function (e) {
    this.setData({
      absent: e.detail.value
    })
  },
  frockInput: function (e) {
    this.setData({
      frock: e.detail.value
    })
  }
})