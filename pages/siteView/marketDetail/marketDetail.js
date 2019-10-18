// pages/siteView/marketDetail/marketDetail.js
import common from '../../../utils/common.js'
import api from '../../../utils/request.js'
var baseUrl = "https://report.ouyada.com/livemanage/public/"
var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project_name: '',
    developer: '',
    start: '',
    address: '',
    area: '',
    floor: '',
    level: '',
    parking_num: '',
    constmer_num: '',
    rent: '',
    enlighten: '',
    log: [
      { explain: '', files: [], pic: '' }
    ],
    logTwo: [
      { explain: '', files: [], pic: '' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.showLoading()
    api.getMarketDetails({ session_key: wx.getStorageSync('session_key'), id: options.id, user_id: App.globalData.userId }).then(res => {
      let detail = res.data.data;
      console.log(detail)
      let logList = detail.service;
      let logListTwo = detail.enviroment;
      for (var i = 0; i < logList.length; i++) {
        if (logList[i].pic == '') {
          logList[i].pic = logList[i].pic,
            logList[i].explain = logList[i].explan
          logList[i].files = []
        } else {
          logList[i].files = [baseUrl + logList[i].pic],
            logList[i].pic = logList[i].pic,
            logList[i].explain = logList[i].explan
        }
      }
      for (var i = 0; i < logListTwo.length; i++) {
        if (logListTwo[i].pic == '') {
          logListTwo[i].pic = logListTwo[i].pic,
            logListTwo[i].explain = logListTwo[i].explan
          logListTwo[i].files = []
        } else {
          logListTwo[i].files = [baseUrl + logListTwo[i].pic],
            logListTwo[i].pic = logListTwo[i].pic,
            logListTwo[i].explain = logListTwo[i].explan
        }
      }
      that.setData({
        project_name: detail.project_name,
        developer: detail.developer,
        start: detail.start,
        address: detail.address,
        area: detail.area,
        floor: detail.floor,
        level: detail.level,
        parking_num: detail.parking_num,
        constmer_num: detail.constmer_num,
        rent: detail.rent,
        enlighten: detail.enlighten,
        log: logList,
        logTwo: logListTwo
      })
    })
  },

  chooseLogImage: function (e) { // 服务亮点照片
    const num = parseInt(e.currentTarget.dataset.index);
    const selected = "log[" + num + "].files";
    const choosePic = "log[" + num + "].pic";
    common.chooseImageByPhoto(this, selected, choosePic)
  },
  chooseLogImageTwo: function (e) { // 空间亮点照片
    console.log(e)
    const num = parseInt(e.currentTarget.dataset.index);
    const selected = "logTwo[" + num + "].files";
    const choosePic = "logTwo[" + num + "].pic";
    common.chooseImageByPhoto(this, selected, choosePic)
  },
  bindText: function (e) { // 服务亮点说明
    console.log(e)
    const index = e.currentTarget.dataset.index
    const selected = "log[" + index + "].explain";
    this.setData({
      [selected]: e.detail.value//重新赋值
    })
  },
  bindTextTwo: function (e) { // 空间亮点说明
    console.log(e)
    const index = e.currentTarget.dataset.index
    const selected = "logTwo[" + index + "].explain";
    this.setData({
      [selected]: e.detail.value//重新赋值
    })
  },
  //查看服务大图
  previewImage: function (e) {
    const index = JSON.parse(e.currentTarget.id);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.log[index].files // 需要预览的图片http链接列表
    })
  },
  //查看空间大图
  previewImageTwo: function (e) {
    const index = JSON.parse(e.currentTarget.id);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.logTwo[index].files // 需要预览的图片http链接列表
    })
  }
})