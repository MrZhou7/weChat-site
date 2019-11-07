// pages/siteView/meetingView/meetingView.js
import WxValidate from '../../../utils/WxValidate.js'
import common from '../../../utils/common.js'
var api = require('../../../utils/request.js').default;
import apiList from '../../../config/dev.js'
var App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    business: '',
    pic: '',
    stepFiles: [],
    step_num_pic:'',
    num: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      num: options.id
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
    let centerInfo = {
      session_key: wx.getStorageSync('session_key'),
      date: App.globalData.dataView,
      type: options.id == 2 ? "welcome" : "send",
      user_id: App.globalData.userId
    }
    api.getviewDetail(centerInfo).then(res => {
      const reqData = res.data.data;
      console.log(reqData)
      this.setData({
        files: [apiList.base + reqData.pic],
        stepFiles: [apiList.base + reqData.step_num_pic],
        pic: reqData.pic,
        step_num_pic:reqData.step_num_pic,
        business: reqData.violations_customer
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
  previewImageTwo: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.stepFiles // 需要预览的图片http链接列表
    })
  },
  businessInput: function (e) {
    this.setData({
      business: e.detail.value
    })
  }
})