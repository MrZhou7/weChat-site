// pages/siteView/checkView/checkView.js
import common from '../../../utils/common.js'
var api = require('../../../utils/request.js').default;
import apiList from '../../../config/dev.js'
var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [
      { id: 1, name: "主通道", files: '', pic: '' }, // 主通道
      { id: 2, name: "卫生间", files: '', pic: '' },
      { id: 3, name: "重点商户", files: '', pic: '' }
    ],
    log: [
      { explain: '', files: [], pic: '' }
    ],
    isSubmit: true,
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    let _this = this;
    let centerInfo = {
      session_key: wx.getStorageSync('session_key'),
      date: App.globalData.dataView,
      type: options.id == 3 ? "morning_tour" : "afternoon_tour",
      user_id: App.globalData.userId
    }
    api.getviewDetail(centerInfo).then(res => {
      const reqData = res.data.data;
      var logList = reqData.question;
      for (var i = 0; i < logList.length; i++) {
        if (logList[i].pic == '') {
          logList[i].pic = logList[i].pic,
            logList[i].explain = logList[i].problem
          logList[i].files = []
        } else {
          logList[i].files = [apiList.base + logList[i].pic],
            logList[i].pic = logList[i].pic,
            logList[i].explain = logList[i].problem
        }
      }
      this.setData({
        fileList: [
          { id: 1, name: "主通道", files: [apiList.base + reqData.channel_pic], pic: reqData.channel_pic },
          { id: 2, name: "卫生间", files: [apiList.base + reqData.toilet_pic], pic: reqData.toilet_pic },
          { id: 3, name: "重点商户", files: [apiList.base + reqData.focus_pic], pic: reqData.focus_pic }
        ],
        log: logList,
        id: reqData.id,
      })
    })
  },
  bindText: function (e) {
    console.log(e)
    const index = e.currentTarget.dataset.index
    var selected = "log[" + index + "].explain";
    this.setData({
      [selected]: e.detail.value//重新赋值
    })
  },

  //查看照片大图
  previewImage: function (e) {
    const index = JSON.parse(e.currentTarget.id) - 1;
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.fileList[index].files // 需要预览的图片http链接列表
    })
  },
  previewLogImage: function (e) {
    const index = JSON.parse(e.currentTarget.id);
    console.log(index)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.log[index].files // 需要预览的图片http链接列表
    })
  }
})