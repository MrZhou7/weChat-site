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
        bg:'../../images/1.jpg'
      },
      {
        id: '2',
        text: '寻求帮助',
        bg: '../../images/2.jpg'
      },
      {
        id: '3',
        text: '处理工单',
        bg: '../../images/3.jpg'
      }, {
        id: '4',
        text: '火眼金睛',
        bg: '../../images/4.jpg'
      }
      , {
        id: '5',
        text: '劳苦功高',
        bg: '../../images/5.jpg'
      }
      , {
        id: '6',
        text: '查看公告',
        bg: '../../images/6.jpg'
      }
      , {
        id: '7',
        text: '事项记录',
        bg: '../../images/7.jpg'
      }
      , {
        id: '8',
        text: '管理提升',
        bg: '../../images/8.jpg'
      }
    ],
    center: {
      id: '9',
      text: '个人中心'
    },
    noticeList: ''
  },
  onLoad: function (options) {
    this.getNoticeList()
  },
  getNoticeList: function () { //获取公告列表
    let data = {
      session_key: wx.getStorageSync('session_key'),
      column: 1
    }
    wx.showLoading()
    api.getNoticeList(data).then(res => {
      let articleList = res.data.data;
      console.log(articleList)
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
  getCenter: function(e){ // 跳转个人中心
    let name = e.currentTarget.dataset.text;
    let num = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../center/center?id=' + num + '&name=' + name,
    });
  },
  getInto: function(e) {
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
    }
  }
})
