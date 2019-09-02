// pages/site/morning/morning.js
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
    pic:"",
    beNum: '', // 应到人数
    actualNum: '', // 实到人数
    leaveBusiness: '', // 请假商户名
    absent: '', // 无故缺席商户名
    frock: '', // 工装不整商户名
    isSubmit: true,
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
    let _this = this;
    let centerInfo = {
      session_key: wx.getStorageSync('session_key'),
      date: App.globalData.date
    }
    api.getCenterInfo(centerInfo).then(res => {
      let list = res.data.data;
      if (Object.keys(list).length != 0 && list.is_morning_meeting == 1) {
        api.siteDetail({
          session_key: wx.getStorageSync('session_key'),
          type: 'morning_meeting',
          date: App.globalData.date
        }).then(res => {
          const reqData =  res.data.data;
          console.log(reqData)
          this.setData({
            files: apiList.base + reqData.pic,
            pic: reqData.pic,
            beNum: reqData.should_num, // 应到人数
            actualNum: reqData.arrived_num, // 实到人数
            leaveBusiness: reqData.ask_customer, // 请假商户名
            absent: reqData.absent_customer, // 无故缺席商户名
            frock: reqData.nospec_customer, // 工装不整商户名
            isSubmit: false,
            id: reqData.id
          })
        })
      }
    })
  },
  chooseImage: function () { // 拍照上传
    common.chooseImage(this, this.data.files, this.data.pic)
  },
 
  formSubmit: function (e) { // 提交
    var that = this;
    const params = e.detail.value
    //校验表单
    if (that.data.files == '') {
      common.alertMsg('请拍照上传')
      return false
    } else if (!that.WxValidate.checkForm(params)) {
      const error = that.WxValidate.errorList[0]
      that.showModal(error)
      return false
    } else {
      console.log(that.data)
      if (that.data.isSubmit){
        api.addSite({
          type: 'morning_meeting',
          session_key: wx.getStorageSync('session_key'),
          pic: that.data.pic,
          should_num: params.beNum,
          arrived_num: params.actualNum,
          ask_customer: that.data.leaveBusiness,
          absent_customer: that.data.absent,
          nospec_customer: that.data.frock
        }).then(res => {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1500
          })
          common.itemBack(1)
        })
      } else {
        console.log(that.data)
        wx.showLoading()
        api.amendSite({
          type: 'morning_meeting',
          session_key: wx.getStorageSync('session_key'),
          pic: that.data.pic,
          should_num: params.beNum,
          arrived_num: params.actualNum,
          ask_customer: that.data.leaveBusiness,
          absent_customer: that.data.absent,
          nospec_customer: that.data.frock,
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
      beNum: {
        required: true,
        digits: true
      },
      actualNum: {
        required: true,
        digits: true
      }
    }
    const messages = {
      beNum: {
        required: '请填写应到人数',
        digits: '请输入正确的人数'
      },
      actualNum: {
        required: '请填写实到人数',
        digits: '请输入正确的人数'
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
  //查看照片大图
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  busInput: function (e) {
    this.setData({
      leaveBusiness: e.detail.value
    })
  },
  absentInput: function (e) {
    this.setData({
      absent: e.detail.value
    })
  },
  frockInput: function (e) {
    this.setData({
      frock: e.detail.value
    })
  }
})