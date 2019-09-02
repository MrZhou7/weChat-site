// pages/site/check/check.js
import common from '../../../utils/common.js'
var api = require('../../../utils/request.js').default;
import apiList from '../../../config/dev.js'
var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList:[
      { id: 1, name: "主通道" ,files: '', pic:'' }, // 主通道
      { id: 2, name: "卫生间", files: '', pic: '' },
      { id: 3, name: "重点商户", files: '', pic: ''}
    ],
    log: [
      { explain: '', files: '', pic:'' }
    ],
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
      const check = options.id == 3 ? list.is_morning_tour : list.is_afternoon_tour;
      if (Object.keys(list).length != 0 && check == 1) {
        api.siteDetail({
          session_key: wx.getStorageSync('session_key'),
          type: options.id == 3 ? "morning_tour" : "afternoon_tour",
          date: App.globalData.date
        }).then(res => {
          const reqData = res.data.data;
          var logList = reqData.question;
          for (var i = 0; i < logList.length;i++) {
            if (logList[i].pic == '') {
              logList[i].pic = logList[i].pic,
              logList[i].explain = logList[i].problem
              logList[i].files = ''
            } else {
              logList[i].files = apiList.base + logList[i].pic,
              logList[i].pic = logList[i].pic,
              logList[i].explain = logList[i].problem
            }
          }
          this.setData({
            fileList:[
              { id: 1, name: "主通道", files: apiList.base + reqData.channel_pic, pic: reqData.channel_pic },
              { id: 2, name: "卫生间", files: apiList.base + reqData.toilet_pic, pic: reqData.toilet_pic },
              { id: 3, name: "重点商户", files: apiList.base + reqData.focus_pic, pic: reqData.focus_pic }
            ],
            log:logList,
            id: reqData.id,
            isSubmit: false
          })
        })
      }
    })
  },
  //上传照片
  chooseImage: function (e) {
    var num = parseInt(e.currentTarget.dataset.id) - 1;
    var selected = "fileList["+ num +"].files";
    var choosePic = "fileList[" + num + "].pic";
    common.chooseImageByArrey(this, selected, choosePic)
  },
  chooseLogImage: function (e) {
    var num = parseInt(e.currentTarget.dataset.index);
    var selected = "log[" + num + "].files";
    var choosePic = "log[" + num + "].pic";
    common.chooseImageByArrey(this, selected, choosePic)
  },
  bindText :function(e) {
    console.log(e)
    const index = e.currentTarget.dataset.index
    var selected = "log[" + index + "].explain";
    this.setData({
      [selected]: e.detail.value//重新赋值
    })
  },
  add: function(e){ // 新增
    var _this = this;
    var logList = _this.data.log;　　//定义一个要使用的变量名
    if (logList.length == 1 && logList[0].explain == '' && logList[0].files == ''){
      common.alertMsg("请先完善问题模块再新增！")
    } else if (logList.length >= 8) {
        wx.showToast({
          title: '最多添加8个',
        })
      } else {
      var obj = {
        explain: "",
        files: '' ,
        pic:''
        }
      logList.push(obj)　　　　//追加一个内容为空的，（先占个地~）
      this.setData({
        log: logList // 重新给赋值
      })
    }
  },
  del: function (e) { // 删除
    var _this = this;
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '',
      content: '是否真的要删除',
      confirmColor: '#3491f0',
      success: function (res) {
      if (res.confirm) {
        var delLog = _this.data.log;
        delLog.splice(index, 1);　
        _this.setData({
          log: delLog//重新赋值
          })
        }
      }
    })
  },
  submit: function (e) {
    var that = this;
    if (that.data.fileList[0].files == '') {
      common.alertMsg('请拍照上传主通道照片')
      return false
    } else if (that.data.fileList[1].files == ''){
      common.alertMsg('请拍照上传卫生间照片')
      return false
    } else if (that.data.fileList[2].files == '') {
      common.alertMsg('请拍照上传重点商户照片')
      return false
    } else{
      if (that.data.isSubmit) {
        api.addSite({
          type: that.data.num == '3' ? "morning_tour" : "afternoon_tour",
          session_key: wx.getStorageSync('session_key'),
          channel_pic: that.data.fileList[0].pic,
          toilet_pic: that.data.fileList[1].pic,
          focus_pic: that.data.fileList[2].pic,
          pic: JSON.stringify(that.data.log)
        }).then(res => {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1500
          })
          that.data.num == '3' ? common.itemBack(3) : common.itemBack(4)
        })
      } else {
        api.amendSite({
          type: that.data.num == '3' ? "morning_tour" : "afternoon_tour",
          session_key: wx.getStorageSync('session_key'),
          channel_pic: that.data.fileList[0].pic,
          toilet_pic: that.data.fileList[1].pic,
          focus_pic: that.data.fileList[2].pic,
          pic: JSON.stringify(that.data.log),
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
    const index = JSON.parse(e.currentTarget.id) - 1;
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.fileList[index].files // 需要预览的图片http链接列表
    })
  },
  previewLogImage: function (e) {
    const index = JSON.parse(e.currentTarget.id);
    console.log(index)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.log[index].files // 需要预览的图片http链接列表
    })
  }
})