// pages/monitoring/monitoring.js
const App = getApp();
import api from '../../utils/request.js'
import common from '../../utils/common.js'
import http from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    endTime: '',
    area: [],
    area_id: null,
    areaIndex: 0,
    areaList: [],
    areaName: '',

    mall: [],
    mall_id: null,
    mallIndex: 0,
    mallList: [],
    mallName: '',

    user: [],
    user_id: null,
    userIndex: 0,
    userList: [],
    userName: '',
    gh: '',
    bmsx: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: App.globalData.dataView ? App.globalData.dataView : common.getDate(),
      endTime: common.getDate()
    })
    var that = this;
    api.getInfo({ session_key: wx.getStorageSync('session_key') }).then(res => {
      let dataList = res.data.data;
      that.setData({
        gh: dataList.gh,
        bmsx: dataList.bmsx
      })
      if (dataList.bmsx == 0) {
        api.getArea({ session_key: wx.getStorageSync('session_key') }).then(req => {
          console.log(req)
          let areaData = common.getCompanyname(req.data.data)
          that.setData({
            areaName: req.data.data[0].subcompanyname,
            area_id: req.data.data[0].id,
            area: areaData,
            areaList: req.data.data
          })
        })
      } else if (dataList.bmsx == 1) {
        that.setData({
          area: [dataList.area],
          areaName: dataList.area,
          area_id: dataList.area_id,
        })
        let data = {
          session_key: wx.getStorageSync('session_key'),
          id: dataList.area_id,
        }
        that.getMallMore(data, that)
      } else {
        that.setData({
          area: [dataList.area],
          areaName: dataList.area,
          area_id: dataList.area_id,
          mall: [dataList.mall],
          mall_id: dataList.mall_id,
          mallName: dataList.mall
        })
        let data = {
          session_key: wx.getStorageSync('session_key'),
          id: dataList.mall_id,
        }
        that.getUser(data, that)
      }
    })
  },
  // 时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 选择区域
  bindAreaChange: function (e) {
    if (this.data.bmsx == 0) {
      this.setData({
        areaIndex: e.detail.value,
        area_id: this.data.areaList[e.detail.value].id,
        areaName: this.data.areaList[e.detail.value].subcompanyname
      })
      let data = {
        session_key: wx.getStorageSync('session_key'),
        id: this.data.areaList[e.detail.value].id
      }
      this.getMall(data, this)
    }
  },
  // 选择门店
  bindMallChange: function (e) {
    if (this.data.mallList.length > 0 && this.data.bmsx == 0 || this.data.bmsx == 1) {
      this.setData({
        mallIndex: e.detail.value,
        mall_id: this.data.mallList[e.detail.value].id,
        mallName: this.data.mallList[e.detail.value].subcompanyname,
      })
      let data = {
        session_key: wx.getStorageSync('session_key'),
        id: this.data.mallList[e.detail.value].id
      }
      this.getUser(data, this)
    }
  },
  //选择人员
  userChange:function(e){
    if (this.data.userList.length > 0) {
      this.setData({
        userIndex: e.detail.value,
        user_id: this.data.userList[e.detail.value].id,
        userName: this.data.userList[e.detail.value].name,
      })
    }
  },

  // 获取门店信息
  getMall: function (data, _this) {
    http.post('User/getMallListByType', data).then(res => {
      if (res.data.data.length > 0) {
        let mallData = common.getCompanyname(res.data.data)
        _this.setData({
          mallIndex: 0,
          mall: mallData,
          mallList: res.data.data,
          mall_id: res.data.data[0].id,
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

  // 获取门店信息（筹建店）
  getMallMore: function (data, _this) {
    api.getMallMore(data).then(res => {
      if (res.data.data.length > 0) {
        let mallData = common.getCompanyname(res.data.data)
        _this.setData({
          mallIndex: 0,
          mall: mallData,
          mallList: res.data.data,
          mall_id: res.data.data[0].id,
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

  // 获取人员信息
  getUser: function (data, _this) {
    api.getUser(data).then(res => {
      if (res.data.data.length > 0) {
        let mallData = this.getUserName(res.data.data)
        _this.setData({
          userIndex: 0,
          user: mallData,
          userList: res.data.data,
          user_id: res.data.data[0].id,
          userName: res.data.data[0].name
        })
      } else {
        _this.setData({
          user: [],
          user_id: null,
          userIndex: 0,
          userList: [],
          userName: ''
        })
      }
    })
  },

  getUserName:function (data){ // 获取的名称循环重新复制
    var areaList = new Array();
    for(var i = 0; i<data.length; i++) {
      areaList.push(data[i].name)
    }
    return areaList;
  },

  submit: function () {
    if (this.data.mall_id == null) {
      common.alertMsg('请选择门店')
    } else if (this.data.user_id == null) {
      common.alertMsg('请选择人员')
    } else {
      console.log(this.data)
      App.globalData.userId = this.data.user_id;
      App.globalData.userName = this.data.userName;
      App.globalData.userGh = this.data.gh;
      App.globalData.dataView = this.data.date;
      wx.navigateTo({
        url: '../siteView/siteView'
      });
    }
  }
})