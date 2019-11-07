//获取应用实例 
const App = getApp();
import api from '../../utils/request.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      text: '晨会',
      id: '1',
      icon: 'icon-chenhui',
      isShow: false,
      color: '#42b5cd'
    }, {
      text: '迎宾',
      id: '2',
      icon: 'icon-shouye_yingbin',
      isShow: false,
      color: '#b1ce1b'
    }, {
      text: '晨巡',
      id: '3',
      icon: 'icon-zhengzaixunluodingwei-copy',
      isShow: false,
      color: '#8a6d3b'
    }, {
      text: '午巡',
      id: '4',
      icon: 'icon-zhengzaixunluodingwei-copy',
      isShow: false,
      color: '#f9644d'
    }, {
      text: '商户访谈',
      id: '5',
      icon: 'icon-fangtan',
      isShow: false,
      color: '#1479b2'
    }, {
      text: '送宾',
      id: '6',
      icon: 'icon-shouye_yingbin',
      isShow: false,
      color: '#395bac'
    }, {
      text: '事项记录',
      id: '7',
      icon: 'icon-lianluojilu',
      isShow: false,
      color: '#6aaeed'
    }, {
      text: '市调对标',
      id: '8',
      icon: 'icon-wozaixianchang',
      isShow: false,
      color: '#42b5cd'
    }, {
      text: '运营建议',
      id: '9',
      icon: 'icon-xunqiubangzhu',
      isShow: false,
      color: '#e44275'
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  getInto: function (e) {
    var that = this;
    let name = e.currentTarget.dataset.text;
    let num = e.currentTarget.dataset.id;
    switch (num) {
      case '1':
        wx.navigateTo({ url: '../siteView/morningView/morningView?id=' + num + '&name=' + name });
        break;
      case '2':
        wx.navigateTo({ url: '../siteView/meetingView/meetingView?id=' + num + '&name=' + name });
        break;
      case '3':
        wx.navigateTo({ url: '../siteView/checkView/checkView?id=' + num + '&name=' + name });
        break;
      case '4':
        wx.navigateTo({ url: '../siteView/checkView/checkView?id=' + num + '&name=' + name });
        break;
      case '5':
        wx.navigateTo({ url: '../siteView/businessView/businessView?id=' + num + '&name=' + name });
        break;
      case '6':
        wx.navigateTo({ url: '../siteView/meetingView/meetingView?id=' + num + '&name=' + name });
        break;
      case '7':
        wx.navigateTo({ url: '../siteView/logView/logView?id=' + num + '&name=' + name });
        break;
      case '8':
        wx.navigateTo({ url: '../siteView/marketView/marketView?id=' + num + '&name=' + name });
        break;
      case '9':
        wx.navigateTo({ url: '../siteView/adviceView/adviceView?id=' + num + '&name=' + name });
        break;
    }
  }
})