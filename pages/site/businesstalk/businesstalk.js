// pages/site/businesstalk/businesstalk.js
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
    isSubmit: true,
    id: null,
    isBtn: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (App.globalData.date != '') {
      this.setData({
        isBtn: common.isToday(App.globalData.date)
      })
    }
    this.initValidate();
    let _this = this;
    let centerInfo = {
      session_key: wx.getStorageSync('session_key'),
      date: App.globalData.date
    }
    api.getCenterInfo(centerInfo).then(res => {
      let list = res.data.data;
      if (Object.keys(list).length != 0 && list.is_interview) {
        api.siteDetail({
          session_key: wx.getStorageSync('session_key'),
          type: "interview",
          date: App.globalData.date
        }).then(res => {
          const reqData = res.data.data;
          this.setData({
            customer_name: reqData.customer_name, // 商户名称
            people: reqData.people, // 被访谈人
            position: reqData.position, // 被访谈人职位
            advice: reqData.advice, // 商户意见及建议
            business_advice: reqData.business_advice, //商户经营建议
            isSubmit: false,
            id: reqData.id
          })
        })
      }
    })
  },
  formSubmit(e) { // 提交
    var that = this;
    const params = e.detail.value
    //校验表单
    if (!that.WxValidate.checkForm(params)) {
      const error = that.WxValidate.errorList[0]
      that.showModal(error)
      return false
    } else {
      if (that.data.isSubmit){
        api.addSite({
          type: 'interview',
          session_key: wx.getStorageSync('session_key'),
          customer_name: params.customer_name,
          people: params.people,
          position: params.position,
          advice: params.advice,
          business_advice: params.business_advice,
        }).then(res => {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1500
          })
          common.itemBack(5)
        })
      }else {
        api.amendSite({
          type: 'interview',
          session_key: wx.getStorageSync('session_key'),
          customer_name: params.customer_name,
          people: params.people,
          position: params.position,
          advice: params.advice,
          business_advice: params.business_advice,
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

  //验证函数
  initValidate() {
    const rules = {
      customer_name: {
        required: true
      },
      people: {
        required: true
      },
      position: {
        required: true
      },
      advice: {
        required: true
      },
      business_advice: {
        required: true
      }
    }
    const messages = {
      customer_name: {
        required: '请填写商户名称'
      },
      people: {
        required: '请填写被访谈人'
      },
      position: {
        required: '请填写被访谈人职位'
      },
      advice: {
        required: '请填写商户意见及建议'
      },
      business_advice: {
        required: '请填写商户经营建议'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  }
})