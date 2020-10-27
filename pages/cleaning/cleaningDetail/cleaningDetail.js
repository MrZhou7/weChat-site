// pages/cleaning/cleaningDetail/cleaningDetail.js
import common from '../../../utils/common.js'
import WxValidate from '../../../utils/WxValidate.js'
import http from '../../../utils/api.js'
import apiList from '../../../config/dev.js'
var App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg: '../../../images/baojie1.png',
    text: '',
    text1: "",
    type: 1,
    addEdit: 3,
    editId: 1,
    isBtn: true,
    files: [],
    pic: "",
    should_num: '', // 应到人数
    arrived_num: '', // 实到人数
    cleanList: [],
    dialog: false,
    title: '',
    cleanDetail: [],
    chooseId: '',
    showList: []
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
    options.id == 1 && this.setData({ text: '晨巡时间段9:00-12:00', text1: "晨巡" })
    options.id == 2 && this.setData({ text: '午巡时间段12:00-18:30', text1: "午巡" })
    options.num == 1 && this.setData({ isBtn: false })
    options.num == 1 || options.num == 2 ? this.edit(options) : this.getList();
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({ should_num: wx.getStorageSync('should_num'), type: options.id, addEdit: options.num })
    this.initValidate();
  },
  chooseImage: function () { // 拍照上传
    common.chooseImage(this, this.data.files, this.data.pic)
  },
  //查看照片大图
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  //选框
  checkboxChange: function (e) {
    let _this = this;
    let idList = e.detail.value;
    let showList = [];
    if (idList.includes('10000')) {
      if (idList[0] == '10000') {
        idList.splice(0, 1)
        for (let n = 0; n < _this.data.cleanDetail.length; n++) {
          _this.data.cleanDetail[n].checked = false;
          for (let i = 0; i < idList.length; i++) {
            if (_this.data.cleanDetail[n].id == idList[i]) {
              _this.data.cleanDetail[n].checked = true;
              showList.push(_this.data.cleanDetail[n])
            }
          }
        }
        this.setData({ cleanDetail: _this.data.cleanDetail, showList: showList })
        return;
      }
      idList = [];
      for (let n = 0; n < this.data.cleanDetail.length; n++) {
        _this.data.cleanDetail[n].checked = false;
      }
      _this.data.cleanDetail[0].checked = !_this.data.cleanDetail[0].checked;
      _this.setData({ cleanDetail: _this.data.cleanDetail, showList: [] })
      return;
    }
    for (let n = 0; n < _this.data.cleanDetail.length; n++) {
      _this.data.cleanDetail[n].checked = false;
      for (let i = 0; i < idList.length; i++) {
        if (_this.data.cleanDetail[n].id == idList[i]) {
          _this.data.cleanDetail[n].checked = true;
          showList.push(_this.data.cleanDetail[n])
        }
      }
    }
    this.setData({ cleanDetail: _this.data.cleanDetail, showList: showList })
  },
  //选分数
  radioChange: function (e) {
    let _this = this;
    let num = e.detail.value;
    let id = e.target.dataset.id;
    let fatherid = e.target.dataset.fatherid;
    let index = 0;
    _this.setData({ showList: _this.data.showList })
    for (let i = 0; i < _this.data.cleanList.length; i++) {
      if (_this.data.cleanList[i].id == fatherid) {
        for (let n = 0; n < _this.data.cleanList[i].showList.length; n++) {
          if (_this.data.cleanList[i].showList[n].id == id) {
            _this.data.cleanList[i].showList[n].num = num;
          }
          index += parseFloat(_this.data.cleanList[i].showList[n].num)
        }
        _this.data.cleanList[i].num = index;
      }
    }
    _this.setData({ cleanList: _this.data.cleanList })
  },
  //打开弹框
  openDialog(e) {
    let _this = this;
    let id = e.currentTarget.dataset.id;
    this.setData({
      dialog: true,
      title: e.currentTarget.dataset.title
    });
    _this.data.cleanList.forEach(function (item, index) {
      if (item.id == id) {
        _this.setData({ cleanDetail: item.child, chooseId: index });
      }
    })
  },
  //关闭弹框
  close: function () {
    this.setData({ dialog: false })
  },
  //扣分确认
  confirmBtn: function () {
    let index = 0;
    if (this.data.showList.length == 0) {
      this.data.cleanList[this.data.chooseId].num = 0
    } else {
      this.data.showList.forEach(element => {
        if (element.type == 1 && element.num == 0) {
          element.num = 1
        } else if (element.type == 2 && element.num == 0) {
          element.num = 0.5
        }
        index += parseFloat(element.num)
      });
      this.data.cleanList[this.data.chooseId].num = index;
    }
    this.data.cleanList[this.data.chooseId].showList = this.data.showList
    this.setData({ dialog: false, cleanList: this.data.cleanList })
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
      if (parseFloat(params.arrived_num) > parseFloat(params.should_num)) {
        common.alertMsg("实到人数不能大于应到人数")
        return false;
      }
      let dataList = [];
      for (let index = 0; index < that.data.cleanList.length; index++) {
        dataList.push({
          name: that.data.cleanList[index].name,
          id: that.data.cleanList[index].id,
          child: !that.data.cleanList[index].showList ? [] : that.data.cleanList[index].showList
        })
      }
      let data = {
        session_key: wx.getStorageSync('session_key'),
        data: JSON.stringify({
          list: dataList
        }),
        pic: that.data.pic,
        should_num: params.should_num,
        arrived_num: params.arrived_num,
        type: that.data.type
      }
      let url = "";
      that.data.addEdit == 3 ? url = "Evaluation/add" : (url = "Evaluation/edit", data.id = that.data.editId);
      http.post(url, data).then(res => {
        wx.setStorageSync('should_num', params.should_num)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1500
        })
        wx.navigateBack({
          detail: 1
        })
      })

    }
  },
  getList() {
    http.post("Evaluation/getCleanItemList", { session_key: wx.getStorageSync('session_key') }).then(res => {
      this.setData({
        cleanList: res.data.data
      })
    })
  },
  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //验证函数
  initValidate() {
    const rules = {
      should_num: {
        required: true,
        digits: true
      },
      arrived_num: {
        required: true,
        digits: true
      }
    }
    const messages = {
      should_num: {
        required: '请填写应到人数',
        digits: '请输入正确的人数'
      },
      arrived_num: {
        required: '请填写实到人数',
        digits: '请输入正确的人数'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  edit: function (options) {
    let _this = this;
    let info = {
      session_key: wx.getStorageSync('session_key'),
      date: App.globalData.date,
      type: options.id
    }
    http.post('Evaluation/getDetailInfo', info).then(res => {
      let list = res.data.data;
      for (let i = 0; i < list.detail.length; i++) {
        for (let n = 0; n < list.detail[i].child.length; n++) {
          if (list.detail[i].child[n].num > 0) {
            list.detail[i].showList.push(list.detail[i].child[n])
          }
        }
      }
      _this.setData({
        files: [apiList.base + list.main.pic],
        should_num: list.main.should_num,
        arrived_num: list.main.arrived_num,
        pic: list.main.pic,
        cleanList: list.detail,
        editId: list.main.id
      })
    })
  }
})