// pages/site/meeting/meeting.js
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
    files: '',
    business: '',
    pic:'',
    isSubmit: true,
    num: null,
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({ num: options.id })
    let _this = this;
    let centerInfo = {
      session_key: wx.getStorageSync('session_key'),
      date: App.globalData.date
    }
    api.getCenterInfo(centerInfo).then(res => {
      let list = res.data.data;
      const meet = options.id == 2 ? list.is_welcome : list.is_send;
      console.log(meet)
      if (Object.keys(list).length != 0 && meet == 1) {
        api.siteDetail({
          session_key: wx.getStorageSync('session_key'),
          type: options.id == 2 ? "welcome" : "send",
          date: App.globalData.date
        }).then(res => {
          const reqData = res.data.data;
          console.log(reqData)
          this.setData({
            files: apiList.base + reqData.pic,
            pic: reqData.pic,
            business: reqData.violations_customer,
            id: reqData.id,
            isSubmit: false,
          })
        })
      }
    })
  },

  chooseImage: function () {
    common.chooseImage(this, this.data.files, this.data.pic)
  },
  formSubmit: function (e) {
    let that = this
    if (this.data.files == '') {
      common.alertMsg('请拍照上传')
      return false
    } else {
      if (that.data.isSubmit) {
        api.addSite({
          type: that.data.num == 2 ? "welcome" : "send",
          session_key: wx.getStorageSync('session_key'),
          pic: that.data.pic,
          violations_customer: this.data.business
        }).then(res => {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1500
          })
          that.data.num == 2 ? common.itemBack(2) : common.itemBack(6)
        })
      } else {
        api.amendSite({
          type: that.data.num == 2 ? "welcome" : "send",
          session_key: wx.getStorageSync('session_key'),
          pic: that.data.pic,
          violations_customer: that.data.business,
          id: that.data.id
        }).then(res => {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1500
          })
          wx.navigateBack({
            detail: 1
          })
        })
      }
      
    }
  },
  //查看照片大图
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  businessInput: function (e) {
    this.setData({
      business: e.detail.value
    })
  }
})