// pages/login/login.js
const App = getApp();
import WxValidate from '../../utils/WxValidate.js'
import common from '../../utils/common.js'   //  引入common.js文件
var api = require('../../utils/request.js').default;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPageHide: false, // 整个绑定页
    user: '',
    password: '',
    isHide: true, // 是否切换区域门店
    area: [], // 页面显示的区域
    areaId: '', // 区域ID
    areaIndex: '0',
    areaName: '', // 区域名称
    areaList: [], // 获取的所有区域数据
    mall: [], // 页面显示的门店
    mallId: '', // 门店ID
    mallName: '', // 门店名称
    mallIndex: '0',
    mallList: [] // 获取的该区域的所有门店信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.login({  //登录
      success: function (res) {
        let params = { js_code: res.code }
        api.getCode(params).then(list => { // 将获取code传参获取openid和session_key并储存
          App.globalData.openId = list.data.openid; //全局添加openid
          wx.setStorageSync('session_key', list.data.session_key)
        
          api.getInfo({ session_key: wx.getStorageSync('session_key') }).then(req => { // 获取当前用户登录信息
            console.log(req)
            if (Object.keys(req.data.data).length == 0) { // 绑定工号 姓名
              _this.setData({
                isPageHide: true
              })
            } else if (req.data.data.mall_id == null) { // 绑定区域门店
              _this.setData({
                isPageHide: true,
                user: req.data.data.gh,
                isHide: false, // 显示绑定区域门店
              })
              api.getOaData({ session_key: wx.getStorageSync('session_key'), gh: req.data.data.gh }).then(res => { // 获取用户所在区域
                console.log(res)
                let reqData = res.data.data;
                if (reqData.area_id == 0 && reqData.mall_id == 0) { // 为总部人员，需选择区域、门店
                  _this.getArea(_this);  // 获取区域信息
                } else if (reqData.area_id != 0 && reqData.mall_id != 0){ // 为门店人员，直接赋值区域、门店
                  _this.setData({
                    area: [reqData.area],
                    areaId: reqData.area_id,
                    areaName: reqData.area,
                    mall: [reqData.mall],
                    mallId: reqData.mall_id,
                    mallName: reqData.mall
                  })
                } else { // 为区域人员，规定区域，可选门店
                  _this.setData({
                    area: [reqData.area],
                    areaId: reqData.area_id,
                    areaName: reqData.area
                  })
                  _this.getMallByArea(_this, { // 根据区域id获取门店信息
                    session_key: wx.getStorageSync('session_key'),
                    id: reqData.area_id
                  })
                }
              })
            } else { // 全部绑定完毕
              _this.setData({
                user: req.data.data.gh
              })
              wx.redirectTo({
                url: '../index/index'
              })
            }
          })
        })
      }
    })
  },

  goUserInfo: function(e) { // 绑定Oa账号提交
    var that = this;
    if (that.data.user == '') {
      wx.showModal({ content: '请输入账号', showCancel: false, })
    } else if  (that.data.password == ''){
      wx.showModal({ content: '请输入密码', showCancel: false, })
    } else{
      let params = {
        session_key: wx.getStorageSync('session_key'),
        gh: that.data.user,
        password: that.data.password,
        openid: App.globalData.openId
      };
      api.login(params).then(res =>{
        that.userInfoOa(that) // 获取用户OA的信息
      })
    }
  },
  userInfoOa: function(that) { // 获取用户在OA的信息
    api.getOaData({ session_key: wx.getStorageSync('session_key'), gh: that.data.user }).then(res => { // 获取用户所在区域
      console.log(res)
      that.setData({ isHide: false })
      if(res.data.data.area_id == 0 && res.data.data.mall_id == 0) {
        that.getArea(that)  // 获取区域信息
      } else if (res.data.data.area_id != 0  && res.data.data.mall_id == 0) {
        that.setData({
          area: [res.data.data.area],
          areaName: [res.data.data.area],
          areaId: res.data.data.area_id
        })
        that.getMallByArea(that,{ // 根据区域id获取门店信息
          session_key: wx.getStorageSync('session_key'),
          id: res.data.data.area_id
        })
      } else {
        that.setData({ 
          area: [res.data.data.area],
          areaId: res.data.data.area_id,
          mall: [res.data.data.mall],
          mallId: res.data.data.mall_id,
          areaName: [res.data.data.area],
          mallName: [res.data.data.mall],
        })
      }
    })
  },
  getArea: function (that) { // 获取区域信息
    api.getArea({ session_key: wx.getStorageSync('session_key') }).then(res => {
      console.log(res)
      let areaData = common.getCompanyname(res.data.data)
      that.setData({ 
        area: areaData, 
        areaList: res.data.data, 
        areaId: res.data.data[0].id,
        areaName: res.data.data[0].subcompanyname,
       })
      let data = {
        session_key: wx.getStorageSync('session_key'),
        id: res.data.data[0].id
      }
      this.getMall(data, that)
    })
  },
  bindAreaChange: function (e) { // 选择区域
    this.setData({ 
      areaIndex: e.detail.value,
      areaId: this.data.areaList[e.detail.value].id,
      areaName: this.data.areaList[e.detail.value].subcompanyname,
     })
    let data = {
      session_key: wx.getStorageSync('session_key'),
      id: this.data.areaList[e.detail.value].id
    }
    this.getMall(data, this)
  },
  bindMallChange: function (e) { // 选择门店
    console.log(e)
    this.setData({
      mallIndex: e.detail.value,
      mallId: this.data.mallList[e.detail.value].id,
      mallName: this.data.mallList[e.detail.value].subcompanyname,
    })
  },
  getMallByArea(_this, data) { // 根据区域id获取门店信息
    api.getMall(data).then(res => {
      console.log(res)
      let mallData = common.getCompanyname(res.data.data)
      if (res.data.data.length > 0) {
        _this.setData({
          mall: [mallData],
          mallList: res.data.data,
          mallId: res.data.data[0],
          mallName: res.data.data[0].subcompanyname
        })
      } else {
        _this.setData({
          mall: [],
          mall_id: null,
          mallIndex: 0,
          mallList: [],
          mallName: '',
        })
      }
    })
  },
  getMall: function (data, _this) { // 选择是默认第一个还是根据选择来定区域
    api.getMall(data).then(res => {
      console.log(res)
      let mallData = common.getCompanyname(res.data.data)
      console.log(mallData)
      if (res.data.data.length > 0){
        _this.setData({
          mall: mallData,
          mallList: res.data.data,
          mallId: res.data.data[0].id,
          mallName: res.data.data[0].subcompanyname
        })
      } else {
        _this.setData({
          mall: [],
          mall_id: null,
          mallIndex: 0,
          mallList: [],
          mallName: '',
        })
      }
    })
  },
  goMallInfo: function(e){ // 绑定区域门店
    var that = this;
    if (that.data.areaId == '') {
      wx.showModal({ content: '请选择区域', showCancel: false, })
    } else if (that.data.mallId == '') {
      wx.showModal({ content: '请选择门店', showCancel: false, })
    } else {
      let params = {
        session_key: wx.getStorageSync('session_key'),
        gh: that.data.user,
        area_id: that.data.areaId,
        mall_id: that.data.mallId,
        area: that.data.areaName,
        mall: that.data.mallName
      };
      console.log(params)
      api.bindMall(params).then(res =>{
        wx.redirectTo({
          url: '../index/index'
        })
      })
    }
  },
  
  userInput: function (e) { // 获取账号
    this.setData({
      user: e.detail.value
    })
  }, 
  passInput: function (e) { // 获取密码
    this.setData({
      password: e.detail.value
    })
  }
})