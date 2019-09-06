// pages/log/log.js
import WxValidate from '../../utils/WxValidate.js'
import api from '../../utils/request.js'
import common from '../../utils/common.js'
var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coustmer_name: '',
    reasons: '',
    money: '',
    status: 1,
    important: '',
    lightspot: '',
    morrow: '',
    work: 1,
    isShow: true,
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
    api.getRecordDetail({
      session_key: wx.getStorageSync('session_key'),
      date: App.globalData.date
    }).then(res => {
      const reqData = res.data.data;
      console.log(reqData)
      if (Object.keys(reqData).length != 0) {
        this.setData({
          coustmer_name: reqData.coustmer_name,
          reasons: reqData.reasons,
          money: reqData.money,
          status: reqData.status,
          important: reqData.important,
          lightspot: reqData.lightspot,
          morrow: reqData.morrow,
          work: reqData.work,
          isShow: false
        })
      }
    })
  },
  //提交
  formSubmit: function (e){
    var that = this;
    const params = e.detail.value
    if (!that.WxValidate.checkForm(params)) {
      const error = that.WxValidate.errorList[0]
      that.showModal(error)
      return false
    } else{
      let data = {
        coustmer_name: params.coustmer_name,
        reasons: params.reasons,
        money: params.money,
        status: this.data.status,
        important: params.important,
        lightspot: params.lightspot,
        morrow: params.morrow,
        work: this.data.work,
        session_key: wx.getStorageSync('session_key')
      }
      wx.showLoading()
      api.addRecord(data).then(res => {
        wx.navigateBack({
          detail: 1
        })
      })
    }
  },
  //验证函数
  initValidate() {
    const rules = {
      coustmer_name: {
        required: true
      },
      money: {
        number: true
      }
    }
    const messages = {
      coustmer_name: {
        required: '请填写商户名称'
      },
      money: {
        number: '请输入有效的数字'
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
  },
 
  // //是否缴纳
  switch1Change: function (e) {
    this.setData({
      status: this.isNumber(e.detail.value)
    })
  },
  // //是否上班
  switch2Change: function (e) {
    this.setData({
      work: this.isNumber(e.detail.value)
    })
  },

  isNumber(data){
    if (data) {
      return 1
    } else {
      return 0
    }
  },
  isTrue(data){
    if (data == 0) {
      return false
    } else if (data == 1){
      return true
    }
  }
})