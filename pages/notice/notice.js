// pages/notice/notice.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
import api from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["重点工作", "规章制度"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    noticeList: [],
    rulsList: [],
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.getNoticeList()
  },
  tabClick: function (e) {
    if (e.currentTarget.id == 0) {
      this.getNoticeList()
    } else {
      this.getRuleList()
    }
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  goDetail: function (e) { // 点击跳转
  console.log(e)
    wx.navigateTo({
      url: './noticeDetail/noticeDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  getNoticeList: function(){ //获取公告列表
    wx.showLoading()
    let data = {
      session_key: wx.getStorageSync('session_key'),
      column: 1
    }
    api.getNoticeList(data).then(res=> {
      this.setData({
        noticeList: res.data.data
      })
    })
  },
  getRuleList: function () { //获取制度列表
    wx.showLoading()
    let data = {
      session_key: wx.getStorageSync('session_key'),
      pid: 2
    }
    api.getRuleList(data).then(res => {
      this.setData({
        rulsList: res.data.data
      })
    })
  },
  getList: function(e){ // 获取点击是否展开
    console.log(e)
    if (e.currentTarget.dataset.list.length > 0) {
        this.setData({
          isShow: !this.data.isShow
        })
    }
    console.log(this.data.isShow)
  }
})