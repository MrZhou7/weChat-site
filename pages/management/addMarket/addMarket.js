// pages/management/addMarket/addMarket.js
import WxValidate from '../../../utils/WxValidate.js'
import common from '../../../utils/common.js'
import api from '../../../utils/request.js'
var baseUrl = "https://report.ouyada.com/livemanage/public/"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    project_name:'',
    developer:'',
    start: '',
    address: '',
    area: '',
    floor: '',
    level: '',
    parking_num: '',
    constmer_num: '',
    rent: '',
    enlighten:'',
    log: [
      { explain: '', files: '', pic: '' }
    ],
    logTwo: [
      { explain: '', files: '', pic: '' }
    ],
    isShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.initValidate();
    if (options.id) {
      wx.showLoading()
      api.getMarketDetail({ session_key: wx.getStorageSync('session_key'), id: options.id }).then(res => {
        let detail = res.data.data;
        console.log(detail)
        let logList = detail.enviroment;
        let logListTwo = detail.service;
        for (var i = 0; i < logList.length; i++) {
          if (logList[i].pic == '') {
            logList[i].pic = logList[i].pic,
              logList[i].explain = logList[i].explan
            logList[i].files = ''
          } else {
            logList[i].files = baseUrl + logList[i].pic,
              logList[i].pic = logList[i].pic,
              logList[i].explain = logList[i].explan
          }
        }
        for (var i = 0; i < logListTwo.length; i++) {
          if (logListTwo[i].pic == '') {
            logListTwo[i].pic = logListTwo[i].pic,
              logListTwo[i].explain = logListTwo[i].explan
            logListTwo[i].files = ''
          } else {
            logListTwo[i].files = baseUrl + logListTwo[i].pic,
              logListTwo[i].pic = logListTwo[i].pic,
              logListTwo[i].explain = logListTwo[i].explan
          }
        }
        that.setData({
          project_name: detail.project_name,
          developer: detail.developer,
          start: detail.start,
          address: detail.address,
          area: detail.area,
          floor: detail.floor,
          level: detail.level,
          parking_num: detail.parking_num,
          constmer_num: detail.constmer_num,
          rent: detail.rent,
          enlighten: detail.enlighten,
          log: logList,
          logTwo: logListTwo,
          isShow: false
        })
      })
    }
  },
  formSubmit:function(e){ // 提交
    var that = this;
    const params = e.detail.value
    //校验表单
    if (!that.WxValidate.checkForm(params)) {
      const error = that.WxValidate.errorList[0]
      that.showModal(error)
      return false
    } else {
      let data = {
        session_key: wx.getStorageSync('session_key'),
        project_name: that.data.project_name,
        developer: that.data.developer,
        start: that.data.start,
        address: that.data.address,
        area: that.data.area,
        floor: that.data.floor,
        level: that.data.level,
        parking_num: that.data.parking_num,
        constmer_num: that.data.constmer_num,
        rent: that.data.rent,
        enlighten: that.data.enlighten,
        service_pic: JSON.stringify(that.data.log),
        enviroment_pic: JSON.stringify(that.data.logTwo),
      }
      api.addMarket(data).then(res =>{
        wx.navigateBack({
          delta: 2
        })
      })
    }
  },
  chooseLogImage: function (e) {
    var num = parseInt(e.currentTarget.dataset.index);
    var selected = "log[" + num + "].files";
    var choosePic = "log[" + num + "].pic";
    common.chooseImageByArrey(this, selected, choosePic)
  },
  chooseLogImageTwo: function (e) {
    var num = parseInt(e.currentTarget.dataset.index);
    var selected = "logTwo[" + num + "].files";
    var choosePic = "logTwo[" + num + "].pic";
    common.chooseImageByArrey(this, selected, choosePic)
  },
  bindText: function (e) {
    console.log(e)
    const index = e.currentTarget.dataset.index
    var selected = "log[" + index + "].explain";
    this.setData({
      [selected]: e.detail.value//重新赋值
    })
  },
  bindTextTwo: function (e) {
    console.log(e)
    const index = e.currentTarget.dataset.index
    var selected = "logTwo[" + index + "].explain";
    this.setData({
      [selected]: e.detail.value//重新赋值
    })
  },
  //查看大图
  previewLogImage: function (e) {
    const index = JSON.parse(e.currentTarget.id);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: [this.data.log[index].files] // 需要预览的图片http链接列表
    })
  },
  //查看大图
  chooseLogImageTwo: function (e) {
    const index = JSON.parse(e.currentTarget.id);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: [this.data.logTwo[index].files] // 需要预览的图片http链接列表
    })
  },
  add: function (e) { // 新增
    var _this = this;
    var logList = _this.data.log;　　//定义一个要使用的变量名
    if (logList.length == 1 && logList[0].explain == '' && logList[0].files == '') {
      common.alertMsg("请先完善问题模块再新增！")
    } else if (logList.length >= 8) {
      wx.showToast({
        title: '最多添加8个',
      })
    } else {
      var obj = {
        explain: "",
        files: '',
        pic: ''
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
  addTwo: function (e) { // 新增
    var _this = this;
    var logList = _this.data.logTwo;　　//定义一个要使用的变量名
    if (logList.length == 1 && logList[0].explain == '' && logList[0].files == '') {
      common.alertMsg("请先完善问题模块再新增！")
    } else if (logList.length >= 8) {
      wx.showToast({
        title: '最多添加8个',
      })
    } else {
      var obj = {
        explain: "",
        files: '',
        pic: ''
      }
      logList.push(obj)　　　　//追加一个内容为空的，（先占个地~）
      this.setData({
        logTwo: logList // 重新给赋值
      })
    }
  },
  delTwo: function (e) { // 删除
    var _this = this;
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '',
      content: '是否真的要删除',
      confirmColor: '#3491f0',
      success: function (res) {
        if (res.confirm) {
          var delLog = _this.data.logTwo;
          delLog.splice(index, 1);
          _this.setData({
            logTwo: delLog//重新赋值
          })
        }
      }
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      project_name: {
        required: true
      },
      developer: {
        required: true
      }
    }
    const messages = {
      project_name: {
        required: '请填写市调项目名称'
      },
      developer: {
        required: '请填写开发商'
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
  //项目名称
  projectInput:function(e){
    this.setData({
      project_name: e.detail.value
    })
  },
  //开发商
  developerInput: function (e) {
    this.setData({
      developer: e.detail.value
    })
  },
  //开业时间
  startInput: function (e) {
    this.setData({
      start: e.detail.value
    })
  },
  //地址
  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  //经营面积
  areaInput: function (e) {
    this.setData({
      area: e.detail.value
    })
  },
  //商业楼层
  floorInput: function (e) {
    this.setData({
      floor: e.detail.value
    })
  },
  //档次定位
  levelInput: function (e) {
    this.setData({
      level: e.detail.value
    })
  },
  //停车位数量
  parkingInput: function (e) {
    this.setData({
      parking_num: e.detail.value
    })
  },
  //经营商户数量
  constmerInput: function (e) {
    this.setData({
      constmer_num: e.detail.value
    })
  },
  //租金情况及形式
  rentInput: function (e) {
    this.setData({
      rent: e.detail.value
    })
  },
  //启发与借鉴
  enlightenInput: function (e) {
    this.setData({
      enlighten: e.detail.value
    })
  }
})