// pages/orderList/orderList.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
import api from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["紧急事项", "待处理", "待验收","已完成"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    num: -1,
    helpList:[]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.getCurrage(this.data.num)
  },
  onShow:function(){
    this.getCurrage(this.data.num)
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      num: JSON.parse(e.currentTarget.id) - 1
    });
    this.getCurrage(this.data.num)
  },
  
  //跳转详情
  goDetail:function(e){
    console.log(e)
    let id = this.data.helpList[e.currentTarget.dataset.index].id;
    let status = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './orderDetail/orderDetail?id=' + id + "&num=" + status,
    })
  },

  //获取当前页信息
  getCurrage: function (index) {
    this.setData({ helpList: [] })
    wx.showLoading({ title: '加载中…' })
    api.getOrderList({ status: index, session_key: wx.getStorageSync('session_key')}).then(res => {
      this.setData({ helpList: res.data.data })
    })
  }
})