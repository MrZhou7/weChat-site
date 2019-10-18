// pages/order/order.js
// pages/help/help.js
import common from '../../../utils/common.js'   //  引入common.js文件
import api from '../../../utils/request.js'
var baseUrl = "https://report.ouyada.com/livemanage/public/"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    floor: '',
    // help_area: "",
    problem:'',
    problem_pic: [],
    voice: '',
    files: [],
    pic: '',
    improvement: '',
    emergency: true,
    id: null,
    status: '1',
    status_admin: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    api.getOrderDetail({ session_key: wx.getStorageSync('session_key'), id: options.id }).then(res =>{
      let detail = res.data.data;
      console.log(detail)
      this.setData({
        floor: detail.floor,
        // help_area: detail.help_area,
        problem: detail.problem,
        voice: detail.voice,
        problem_pic: [baseUrl + detail.problem_pic],
        pic: detail.solve_pic,
        files: [baseUrl + detail.solve_pic],
        id: options.id,
        improvement: detail.improvement,
        status: options.num,
        status_admin: detail.status_admin
      })
    })
  },

  //上传照片
  chooseImage: function (e) {
    common.chooseImage(this, this.data.files, this.data.pic)
  },

  //是否紧急
  switchChange: function (e) {
    this.setData({
      emergency: e.detail.value
    })
  },

  //绑定楼层
  floorInput: function (e) {
    this.setData({
      floor: e.detail.value
    })
  },

  //绑定区域
  // areaInput: function (e) {
  //   this.setData({
  //     help_area: e.detail.value
  //   })
  // },

  //绑定问题说明
  problemInput: function (e) {
    this.setData({
      problem: e.detail.value
    })
  },

  //改进内容
  improvementInput: function (e) {
    this.setData({
      improvement: e.detail.value
    })
  },

  //语音说明
  voiceInput: function (e) {
    this.setData({
      voice: e.detail.value
    })
  },

  //提交
  submitInput: function () {
    let data = {
      id: this.data.id,
      session_key: wx.getStorageSync('session_key'),
      status : 1,
      solve_pic: this.data.pic
    }
    api.updateHelp(data).then(res =>{
      wx.navigateBack({     //返回上一页面
        delta: 1,
      })
    })
  },
  //待验收
  impriveInput: function () {
    if (this.data.improvement == '' || this.data.improvement == null){
      common.alertMsg("改进内容不能为空")
    } else{
      let data = {
        id: this.data.id,
        session_key: wx.getStorageSync('session_key'),
        status: 3,
        improvement: this.data.improvement
      }
      api.updateHelp(data).then(res => {
        wx.navigateBack({     //返回上一页面
          delta: 1,
        })
      })
    }
  },
  //通过
  passInput: function () {
    let data = {
      id: this.data.id,
      session_key: wx.getStorageSync('session_key'),
      status: 2
    }
    api.updateHelp(data).then(res => {
      wx.navigateBack({     //返回上一页面
        delta: 1,
      })
    })
  },
  //查看照片大图
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.problem_pic // 需要预览的图片http链接列表
    })
  },
  previewImageTwo: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
})