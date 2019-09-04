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
      { explain: '', files: [], pic: '' }
    ],
    logTwo: [
      { explain: '', files: [], pic: '' }
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
        let logList = detail.service; 
        let logListTwo = detail.enviroment;
        for (var i = 0; i < logList.length; i++) {
          if (logList[i].pic == '') {
            logList[i].pic = logList[i].pic,
            logList[i].explain = logList[i].explan
            logList[i].files = []
          } else {
            logList[i].files = [baseUrl + logList[i].pic],
            logList[i].pic = logList[i].pic,
            logList[i].explain = logList[i].explan
          }
        }
        for (var i = 0; i < logListTwo.length; i++) {
          if (logListTwo[i].pic == '') {
            logListTwo[i].pic = logListTwo[i].pic,
            logListTwo[i].explain = logListTwo[i].explan
            logListTwo[i].files = []
          } else {
            logListTwo[i].files = [baseUrl + logListTwo[i].pic],
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
    console.log(params)
    //校验表单
    if (!that.WxValidate.checkForm(params)) {
      const error = that.WxValidate.errorList[0]
      that.showModal(error)
      return false
    } else {
      let data = {
        session_key: wx.getStorageSync('session_key'),
        project_name: params.project_name,
        developer: params.developer,
        start: params.start,
        address: params.address,
        area: params.area,
        floor: params.floor,
        level: params.level,
        parking_num: params.parking_num,
        constmer_num: params.constmer_num,
        rent: params.rent,
        enlighten: params.enlighten,
        service_pic: JSON.stringify(that.data.log),
        enviroment_pic: JSON.stringify(that.data.logTwo),
      }
      wx.showLoading()
      api.addMarket(data).then(res =>{
        wx.navigateBack({
          delta: 1
        })
      })
    }
  },
  chooseLogImage: function (e) { // 服务亮点照片
    const num = parseInt(e.currentTarget.dataset.index);
    const selected = "log[" + num + "].files";
    const choosePic = "log[" + num + "].pic";
    common.chooseImageByPhoto(this, selected, choosePic)
  },
  chooseLogImageTwo: function (e) { // 空间亮点照片
    console.log(e)
    const num = parseInt(e.currentTarget.dataset.index);
    const selected = "logTwo[" + num + "].files";
    const choosePic = "logTwo[" + num + "].pic";
    common.chooseImageByPhoto(this, selected, choosePic)
  }, 
  bindText: function (e) { // 服务亮点说明
    console.log(e)
    const index = e.currentTarget.dataset.index
    const selected = "log[" + index + "].explain";
    this.setData({
      [selected]: e.detail.value//重新赋值
    })
  },
  bindTextTwo: function (e) { // 空间亮点说明
    console.log(e)
    const index = e.currentTarget.dataset.index
    const selected = "logTwo[" + index + "].explain";
    this.setData({
      [selected]: e.detail.value//重新赋值
    })
  },
  //查看服务大图
  previewImage: function (e) {
    const index = JSON.parse(e.currentTarget.id);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.log[index].files // 需要预览的图片http链接列表
    })
  },
  //查看空间大图
  previewImageTwo: function (e) {
    const index = JSON.parse(e.currentTarget.id);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.logTwo[index].files // 需要预览的图片http链接列表
    })
  },
  add: function (e) { // 新增
    var _this = this;
    const logList = this.data.log;　　//定义一个要使用的变量名
    if (logList.length == 1 && logList[0].explain == "" && logList[0].files == "") {
      common.alertMsg("请先完善顾客服务模块再新增！")
    } else if (logList.length >= 8) {
      wx.showToast({
        title: '最多添加8个',
      })
    } else {
      var obj = {
        explain: "",
        files: [],
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
    const index = e.currentTarget.dataset.index
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
    const logList = this.data.logTwo;　　//定义一个要使用的变量名
    if (logList.length == 1 && logList[0].explain == '' && logList[0].files == "") {
      common.alertMsg("请先完善空间亮点模块再新增！")
    } else if (logList.length >= 8) {
      wx.showToast({
        title: '最多添加8个',
      })
    } else {
      var obj = {
        explain: "",
        files: [],
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
    const index = e.currentTarget.dataset.index
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
      },
      parking_num:{
        number: true
      },
      constmer_num: {
        number: true
      }
    }
    const messages = {
      project_name: {
        required: '请填写市调项目名称'
      },
      developer: {
        required: '请填写开发商'
      },
      parking_num: {
        number: '请输入有效的数字'
      },
      constmer_num: {
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
  }
})