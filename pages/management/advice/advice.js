// pages/management/advise/advise.js
import api from '../../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let data = {
      session_key: wx.getStorageSync('session_key'),
      limit: 15,
      page: 1
    }
    api.getAddviceLists(data).then(res => {
      console.log(res.data.data.list)
      res.data.data.list.length == 0 && wx.showToast({ title: '暂无信息', icon: 'none', duration: 1500 })
      that.setData({
        list: res.data.data.list
      })
    })
  },
  addPage: function () {
    wx.navigateTo({
      url: '../addAdvice/addAdvice',
    })
  },
  goDetail: function (e) {
    console.log(e)
    let id = this.data.list[e.currentTarget.dataset.index].id;
    wx.navigateTo({
      url: '../addAdvice/addAdvice?id=' + id,
    })
  }
})