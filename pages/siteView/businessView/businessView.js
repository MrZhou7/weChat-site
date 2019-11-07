// pages/siteView/businessView/businessView.js
import WxValidate from '../../../utils/WxValidate.js'
import common from '../../../utils/common.js'
var api = require('../../../utils/request.js').default;
var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_name: '', // 商户名称
    people: '', // 被访谈人
    position: '', // 被访谈人职位
    advice: '', // 商户意见及建议
    business_advice: '', //商户经营建议
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let centerInfo = {
      session_key: wx.getStorageSync('session_key'),
      date: App.globalData.dataView,
      type: "interview",
      user_id: App.globalData.userId
    }
    api.getviewDetail(centerInfo).then(res => {
      const reqData = res.data.data;
      this.setData({
        customer_name: reqData.customer_name, // 商户名称
        people: reqData.people, // 被访谈人
        position: reqData.position, // 被访谈人职位
        advice: reqData.advice, // 商户意见及建议
        business_advice: reqData.business_advice, //商户经营建议
        id: reqData.id
      })
    })
  }
})