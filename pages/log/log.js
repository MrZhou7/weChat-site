// pages/log/log.js
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
    isShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getRecordDetail({
      session_key: wx.getStorageSync('session_key')
    }).then(res => {
      const reqData = res.data.data;
      console.log(reqData)
      if (Object.keys(reqData).length != 0) {
        this.setData({
          coustmer_name: reqData.coustmer_name,
          reasons: reqData.reasons,
          money: reqData.money,
          status: this.isTrue(reqData.status),
          important: reqData.important,
          lightspot: reqData.lightspot,
          morrow: reqData.morrow,
          work: this.isTrue(reqData.reasons),
          isShow: false
        })
      }
    })
  },
  //提交
  submitInput:function(){
    console.log(this.data)
    if (this.data.coustmer_name == '') {
      common.alertMsg('请填写商户名称')
      return
    }
    let data = {
      coustmer_name: this.data.coustmer_name,
      reasons: this.data.reasons,
      money: this.data.money,
      status: this.data.status,
      important: this.data.important,
      lightspot: this.data.lightspot,
      morrow: this.data.morrow,
      work: this.data.work,
      session_key: wx.getStorageSync('session_key')
    }
    api.addRecord(data).then(res =>{
      wx.navigateBack({
        detail: 1
      })
    })
  },

  // 商户名称
  coustmerInput:function(e) {
    this.setData({
      coustmer_name: e.detail.value
    })
  },
  // 罚款事由
  reasonsInput: function (e) {
    this.setData({
      reasons: e.detail.value
    })
  },
  // 罚款金额
  moneyInput: function (e) {
    this.setData({
      money: e.detail.value
    })
  },
  // 重要事件
  importantInput: function (e) {
    this.setData({
      important: e.detail.value
    })
  },
  //是否缴纳
  switch1Change: function (e) {
    this.setData({
      status: isNumber(e.detail.value)
    })
  },
  //是否上班
  switch2Change: function (e) {
    this.setData({
      work: isNumber(e.detail.value)
    })
  },
  // 服务亮点
  lightspotInput: function (e) {
    this.setData({
      lightspot: e.detail.value
    })
  },
  // 宣讲内容记录
  morrowInput: function (e) {
    this.setData({
      morrow: e.detail.value
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