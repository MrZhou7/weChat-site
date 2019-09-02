// pages/notice/noticeDetail/noticeDetail.js
const WxParse = require('../../../wxParse/wxParse.js');
import api from '../../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let data = {
      session_key: wx.getStorageSync('session_key'),
      id: options.id
    }
    api.getArticleInfo(data).then(res => {
      console.log(res)
      let ceshi = res.data.data.content;
      WxParse.wxParse('article', 'html', ceshi, that, 5);
    })
  },
  
})