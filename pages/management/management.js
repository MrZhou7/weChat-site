// pages/management/management.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      text: '市调对标',
      id: '1',
      icon: 'icon-wozaixianchang',
      color: '#42b5cd',
      content: '项目名称 / 启发与借鉴'
    },
    {
      text: '运营建议',
      id: '2',
      icon: 'icon-xunqiubangzhu',
      color: '#e44275',
      content: '意见及建议'
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
        wx.navigateTo({
          url: './market/market?id=' + num + '&name=' + name,
        });
        break;
      case '2':
        wx.navigateTo({
          url: './advice/advice?id=' + num + '&name=' + name,
        });
        break;
    }
  }
})