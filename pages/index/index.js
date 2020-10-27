//index.js
//获取应用实例
const app = getApp()
var api = require('../../utils/request.js').default;

Page({
  data: {
    list:[
      {
        id: '1',
        text: '我在现场',
        color: '#FF2A2A',
        bg:'../../images/xianchang.svg'
      },
      {
        id: '2',
        text: '寻求帮助',
        color: '#FE8509',
        bg: '../../images/bangzhu.svg'
      },
      {
        id: '3',
        text: '处理工单',
        color: '#00B4B6',
        bg: '../../images/gongdan.svg'
      }, {
        id: '4',
        text: '火眼金睛',
        color: '#5FBC1D',
        bg: '../../images/huoyan.svg'
      }
      , {
        id: '5',
        text: '劳苦功高',
        color: '#9A51E5',
        bg: '../../images/laoku.svg'
      }
      , {
        id: '6',
        text: '查看公告',
        color: '#EB5B87',
        bg: '../../images/gonggao.svg'
      }
      , {
        id: '7',
        text: '事项记录',
        color: '#F88C3E',
        bg: '../../images/jilu.svg'
      }
      , {
        id: '8',
        text: '管理提升',
        color: '#08BFE9',
        bg: '../../images/guanli.svg'
      }
      , {
        id: '9',
        text: '个人中心',
        color: '#FF3B3B',
        bg: '../../images/zhongxin.svg'
      }
      , {
        id: '10',
        text: '保洁评定',
        color: '#00E676',
        bg: '../../images/baojie.svg'
      }
    ],
    monitoring: {
      id: '11',
      text: '线上监控'
    },
    noticeList: '',
    isShow: false
  },

  onLoad: function (options) {
    this.getBlank()
    this.getNoticeList()
    this.getShow()
  },
  getShow() { // 获取用户角色权限
    api.getUserRoleByOa({ session_key: wx.getStorageSync('session_key') }).then(res => {
      let articleList = res.data.data;
      articleList.role > 0 && this.setData({ isShow: true }) 
    })
  },

  getNoticeList: function () { //获取公告列表
    let data = {
      session_key: wx.getStorageSync('session_key'),
      column: 1
    }
    wx.showLoading()
    api.getNoticeList(data).then(res => {
      let articleList = res.data.data;
      if (articleList.length == 0) {
        this.setData({
          noticeList: '忙碌和紧张，能带来高昂的工作情绪；只有全神贯注时，工作才能产生高效率。——松下幸之助'
        })
      } else {
        const list = []
        for (var i = 0; i < articleList.length;i++ ){
          list.push(articleList[i].title)
        }
        this.setData({
          noticeList: list.join("; ")
        })
      }
    })
  },
  goDetail:function(){ // 跳转公告
    wx.navigateTo({
      url: '../notice/notice?id=6&name=查看公告'
    });
  },
  goMonitoring: function (e) { // 跳转线上监控
    let name = e.currentTarget.dataset.text;
    let num = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../monitoring/monitoring?id=' + num + '&name=' + name,
    });
  },
  //判断时候移动端
  getBlank: function() {
    let that = this;
    wx.getSystemInfo({
      success: res => {
        console.log('设备信息', res)
        if (!that.isNormalDevice(res)) {
          wx.redirectTo({
            url: '/pages/blank/blank'
          })
        }
      },
      fail(e) {
        console.error(e)
      }
    })
  },
  isNormalDevice: function (deviceInfo) {
    const normalPlatformList = ['ios', 'android', 'devtools'];
    return normalPlatformList.includes(deviceInfo.platform)
  },

  goInto: function(e) {
    var that = this;
    let name = e.currentTarget.dataset.text;
    let num = e.currentTarget.dataset.id;
    switch(num) {
      case '1':
        wx.navigateTo({
          url: '../site/site?id=' + num + '&name=' + name,
        });
        break;
      case '2':
        wx.navigateTo({
          url: '../help/help?id=' + num + '&name=' + name,
        });
        break;
      case '3':
        wx.navigateTo({
          url: '../orderList/orderList?id=' + num + '&name=' + name,
        });
        break;
      case '4':
        wx.navigateTo({
          url: '../ranking/ranking?type1=hyjj' + '&name=提报问题数量排名',
        });
        break;
      case '5':
        wx.navigateTo({
          url: '../ranking/ranking?type1=lkgg' + '&name=解决问题数量排名',
        });
        break;
      case '6':
        wx.navigateTo({
          url: '../notice/notice?id=' + num + '&name=' + name,
        });
        break;
      case '7':
        wx.navigateTo({
          url: '../log/log?id=' + num + '&name=' + name,
        });
        break;
      case '8':
        wx.navigateTo({
          url: '../management/management?id=' + num + '&name=' + name,
        });
        break;
      case '9':
        wx.navigateTo({
          url: '../center/center?id=' + num + '&name=' + name,
        });
        break;
      case '10':
        wx.navigateTo({
          url: '../cleaning/cleaning?id=' + num + '&name=' + name,
        });
        break;
    }
  }
})
