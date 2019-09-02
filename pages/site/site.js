//获取应用实例 
const App = getApp();
import api from '../../utils/request.js'

const app = getApp();
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
    }
    ],
    stepNum: wx.getStorageSync("runNum"),
    // bgColor: '#6aaeed'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(App.globalData)
    var that = this;
    this.getRunNum(this);
    let centerInfo = {
      session_key: wx.getStorageSync('session_key'),
      date: App.globalData.date
    }
    api.getCenterInfo(centerInfo).then(res => {
      let colorNumData = res.data.data;
      console.log(colorNumData)
      let morning = "list[0].isShow";
      let welcome = "list[1].isShow";
      let morning_tour = "list[2].isShow";
      let afternoon_tour = "list[3].isShow";
      let interview = "list[4].isShow";
      let send = "list[5].isShow";
      if (Object.keys(colorNumData).length == 0) {
        this.setData({
          [morning]: true,
          [welcome]: true,
          [morning_tour]: true,
          [afternoon_tour]: true,
          [interview]: true,
          [send]: true,
        })
      } else {
        this.setData({
          [morning]: this.colorBg(colorNumData.is_morning_meeting),
          [welcome]: this.colorBg(colorNumData.is_welcome),
          [morning_tour]: this.colorBg(colorNumData.is_morning_tour),
          [afternoon_tour]: this.colorBg(colorNumData.is_afternoon_tour),
          [interview]: this.colorBg(colorNumData.is_interview),
          [send]: this.colorBg(colorNumData.is_send),
        })
      }
    })
  },

  getInto: function (e) {
    var that = this;
    let name = e.currentTarget.dataset.text;
    let num = e.currentTarget.dataset.id;
    switch (num) {
      case '1':
        wx.navigateTo({ url: '../site/morning/morning?id=' + num + '&name=' + name });
        break;
      case '2':
        wx.navigateTo({ url: '../site/meeting/meeting?id=' + num + '&name=' + name });
        break;
      case '3':
        wx.navigateTo({ url: '../site/check/check?id=' + num + '&name=' + name });
        break;
      case '4':
        wx.navigateTo({ url: '../site/check/check?id=' + num + '&name=' + name });
        break;
      case '5':
        wx.navigateTo({ url: '../site/businesstalk/businesstalk?id=' + num + '&name=' + name });
        break;
      case '6':
        wx.navigateTo({ url: '../site/meeting/meeting?id=' + num + '&name=' + name });
        break;
    }
  },
   colorBg: function(num) { // 改变未完成显示
    if (num == 0) {
      return true;
    } else {
      return false;
    }
  },
  getRunNum: function (_this){ // 获取微信步数
    wx.login({  //登录
      success: function (res) {
        let params = { js_code: res.code }
        api.getCode(params).then(list => { // 将获取code传参获取openid和session_key并储存
          wx.setStorageSync('session_key', list.data.session_key)
          wx.getWeRunData({
            success: function (res) {
              api.getStep({
                session_key: wx.getStorageSync('session_key'),
                encryptedData: res.encryptedData,
                iv: res.iv
              }).then(res => {
                const list = JSON.parse(res.data.data);
                const num = list.stepInfoList.length - 1;
                wx.setStorageSync("runNum", list.stepInfoList[num].step)
                _this.setData({
                  stepNum: wx.getStorageSync("runNum")
                })
              })
            },
            fail: function (res) {
              wx.showModal({
                title: '提示',
                content: '未开通微信运动，请关注“微信运动”公众号后重试',
                showCancel: false,
                confirmText: '知道了'
              })
            }
          });
        })
      }
    })
  },
  //页面返回时改变参数
  changeData: function (index) {
    let morning = "list[0].isShow";
    let welcome = "list[1].isShow";
    let morning_tour = "list[2].isShow";
    let afternoon_tour = "list[3].isShow";
    let interview = "list[4].isShow";
    let send = "list[5].isShow";
    switch (index){
      case 1:
        this.setData({ [morning]: false });
        break;
      case 2:
        this.setData({ [welcome]: false });
        break;
      case 3:
        this.setData({ [morning_tour]: false });
        break;
      case 4:
        this.setData({ [afternoon_tour]: false });
        break;
      case 5:
        this.setData({ [interview]: false });
        break;
      case 6:
        this.setData({ [send]: false });
        break;
    }
  },
  // getLocalTime:function (nS) { // 转换时间戳
  //   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  // }
})