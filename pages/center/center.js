// pages/center/center.js
const App = getApp();
import api from '../../utils/request.js'
import common from '../../utils/common.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    endTime:'',
    area: [],
    area_id: null,
    areaIndex: 0,
    areaList:[],
    areaName:'',
    mall: [],
    mall_id: null,
    mallIndex: 0,
    mallList: [],
    mallName:'',
    gh:'',
    bmsx: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: App.globalData.date,
      endTime: common.getDate()
    })
    var that = this;
    api.getInfo({ session_key: wx.getStorageSync('session_key') }).then(res => {
      let dataList = res.data.data;
      console.log(dataList)
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
        that.getMall(data, that)
      } else {
        that.setData({
          area: [dataList.area],
          areaName: dataList.area,
          area_id: dataList.area_id,
          mall: [dataList.mall],
          mall_id: dataList.mall_id,
          mallName: dataList.mall
        })
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
    console.log(e)
    if (this.data.bmsx == 0){
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
    console.log(e)
    if (this.data.mallList.length > 0 && this.data.bmsx == 0 || this.data.bmsx == 1){
      this.setData({
        mallIndex: e.detail.value,
        mall_id: this.data.mallList[e.detail.value].id,
        mallName: this.data.mallList[e.detail.value].subcompanyname,
      })
    }
  },
  // 获取门店信息
  getMall: function (data, _this) {
    api.getMall(data).then(res => {
      console.log(res)
      if (res.data.data.length > 0){
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
  submit:function() {
    App.globalData.date = this.data.date;
    if (this.data.mall_id == null) {
      common.alertMsg('请选择门店')
    } else {
      let list = {
        session_key: wx.getStorageSync('session_key'),
        gh: this.data.gh,
        area: this.data.areaName,
        area_id: this.data.area_id,
        mall: this.data.mallName,
        mall_id: this.data.mall_id
      }
      console.log(list)
      wx.showLoading()
      api.bindMall(list).then(res => {
        wx.navigateBack({
          detail: 1
        })
      })
    }
  }
})