var api = require('../../utils/request.js').default;

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["全国", "区域", "门店"],
    tabsMall: ["全国", "区域"],
    isShow: false,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    type1: '',
    type2: '',
    country: [],
    area: [],
    mall: []
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.setData({ type1: options.type1 })
    let data = {
      session_key: wx.getStorageSync('session_key'),
      type1: this.data.type1,
      type2: 'person'
    }
    this.getRanking(data);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  typeChange: function (e) {
    if (e.detail.value) {
      this.setData({ isShow: e.detail.value, type2: 'mall', country: [], area: [], mall: [] });
    } else {
      this.setData({ isShow: e.detail.value, type2: 'person', country: [], area: [], mall: []  });
    }
    let data = {
      session_key: wx.getStorageSync('session_key'),
      type1: this.data.type1,
      type2: this.data.type2
    }
    this.getRanking(data)
  },

  //获取排名信息
  getRanking:function(data){
    api.ranking(data).then(res => {
      this.setData({
        country: res.data.data.country,
        area: res.data.data.area,
        mall: res.data.data.mall
      })
    })
  }
})