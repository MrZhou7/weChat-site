//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [{
      text: '我在现场',
      id: '1',
      icon: 'icon-wozaixianchang',
      color: '#42b5cd',
      content: '晨会 / 迎宾 / 晨巡 / 午巡'
    },
    {
      text: '寻求帮助',
      id: '2',
      icon: 'icon-xunqiubangzhu',
      color: '#b1ce1b',
      content: '问题说明'
    },
    {
      text: '处理工单',
      id: '3',
      icon: 'icon-chuligongdan',
      color: '#8a6d3b',
      content: '紧急事项 / 待处理 / 待验收 / 已完成'
    }, {
      text: '火眼金睛',
      id: '4',
      icon: 'icon-icon',
      color: '#f9644d',
      content: '现场问题数量排名'
    }, {
      text: '劳苦功高',
      id: '5',
      icon: 'icon-paiming',
      color: '#1479b2',
      content: '解决问题数量排名'
    }, {
      text: '查看公告',
      id: '6',
      icon: 'icon-gonggao1',
      color: '#395bac',
      content: '工作事项 / 管理制度'
    }, {
      text: '事项记录',
      id: '7',
      icon: 'icon-lianluojilu',
      color: '#9c6aec',
      content: '商户罚单 / 今日事件 / 服务亮点'
    }, {
      text: '管理提升',
      id: '8',
      icon: 'icon-guanli',
      color: '#3ebebf',
      content: '市调对标 / 意见建议'
    }, {
      text: '工作统计',
      id: '9',
      icon: 'icon-gongzuotongji1',
      color: '#b0db81',
      content: '提报问题数量 / 解决问题数量'
    }
    // , {
    //   text: '高管行程',
    //   id: '9',
    //   icon: 'icon-usertie',
    //   color: '#58cc7b'
    // }, {
    //   text: '设置',
    //   id: '10',
    //   icon: 'icon-icon_setting',
    //   color: '#e44275'
    // }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  getInto: function(e) {
    console.log(e)
    let num = e.currentTarget.dataset.id;
    switch(num) {
      case '1':
        wx.navigateTo({
          url: '../site/site',
        });
        break;
    }
  }
})
