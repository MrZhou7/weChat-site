// pages/siteView/marketView/marketView.js
import api from '../../../utils/request.js'
var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    limit: 15,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let data = {
      session_key: wx.getStorageSync('session_key'),
      limit: this.data.limit,
      page: this.data.page,
      user_id: App.globalData.userId
    }
    this.getList(data)
  },
  onShow: function () {
    let data = {
      session_key: wx.getStorageSync('session_key'),
      limit: 15,
      page: 1,
      user_id: App.globalData.userId
    }
    this.getList(data)
  },
  getList: function (data) {
    wx.showLoading()
    api.getMarkets(data).then(res => {
      console.log(res.data.data.list)
      res.data.data.list.length == 0 && wx.showToast({ title: '暂无信息', icon: 'none', duration: 1500 })
      this.data.page++
      this.setData({
        list: res.data.data.list
      })
    })
  },
  goDetail: function (e) {
    console.log(e)
    let id = this.data.list[e.currentTarget.dataset.index].id;
    wx.navigateTo({
      url: '../marketDetail/marketDetail?id=' + id,
    })
  },
  onReachBottom: function () {
    let data = {
      session_key: wx.getStorageSync('session_key'),
      limit: this.data.limit,
      page: this.data.page,
      user_id: App.globalData.userId
    }
    this.getList(data)
  }
})