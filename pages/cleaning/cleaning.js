// pages/cleaning/cleaning.js
import common from '../../utils/common.js'
import http from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      text: '保洁晨巡',
      id: '1',
      bg: '../../images/morning.png',
      isShow: false,
      color: '#FFA940',
      status: '未完成',
      num: 3
    }, 
    {
        text: '保洁午巡',
        id: '2',
        bg: '../../images/afternoon.png',
        isShow: false,
        color: '#531DAB',
        status: '未完成',
        num: 3
      }
    ],
    isSubmit: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStatus();
  },
  goPage: function (e) {
    var that = this;
    let name = e.currentTarget.dataset.text;
    let id = e.currentTarget.dataset.id;
    let num = e.currentTarget.dataset.num;
    if(id == 1) {
      if(this.isMorning()) {
        wx.navigateTo({ url: './cleaningDetail/cleaningDetail?id=' + id + '&name=' + name + '&num=' + num });
      } else {
        common.alertMsg('晨巡进入时间为\r\n9:00 - 12:00')
      }
    } else if(id == 2) {
        if(this.isNoom()) {
          wx.navigateTo({ url: './cleaningDetail/cleaningDetail?id=' + id + '&name=' + name + '&num=' + num });
        } else {
          common.alertMsg('午巡进入时间为\r\n12:00 - 18:30')
        }
    }
  },
  //获取状态
  getStatus() {
    let _this = this;
    http.post('Evaluation/getStatus', {session_key: wx.getStorageSync('session_key')}).then(res => {
      let status= res.data.data;
      status.forEach(item => {
        let morningIsShow = "list[0].isShow";
        let morningStatus = "list[0].status";
        let morningNum = "list[0].num";
        let afternoonIsShow = "list[1].isShow";
        let afternoonStatus = "list[1].status";
        let afternoonNum = "list[1].num";
        if(item.type == 1) {
          if(item.status == 1) {
            _this.setData({[morningIsShow]: true, [morningStatus]:'已完成', isSubmit: false, [morningNum]: 1})
          } else if(item.status == 2) {
            _this.setData({[morningIsShow]: true, [morningStatus]:'已完成', [morningNum]: 2})
          } else if(item.status == 3) {
            _this.setData({[morningIsShow]: false, [morningStatus]:'未完成', [morningNum]: 3})
          }
        } else if(item.type == 2) {
          if(item.status == 1) {
            _this.setData({[afternoonIsShow]: true, [afternoonStatus]:'已完成', isSubmit: false, [afternoonNum]: 1})
          } else if(item.status == 2) {
            _this.setData({[afternoonIsShow]: true, [afternoonStatus]:'已完成', [afternoonNum]: 2})
          } else if(item.status == 3) {
            _this.setData({[afternoonIsShow]: false, [afternoonStatus]:'未完成', [afternoonNum]: 3})
          }
        }
      });
    })
  },

  isMorning:function () { // 晨巡时间
    var myDate = new Date()
    var h = myDate.getHours();
    var m = myDate.getMinutes();
    if (h >= 9 && h < 12) {
      return true
    } else {
      return false
    }
  },
  isNoom:function() { // 午巡时间
    var myDate = new Date()
    var h = myDate.getHours();
    var m = myDate.getMinutes();
    if (h >= 12 && h <= 18) {
      return true
    } else if (h >= 18 && m <= 30 && h < 19) {
      return true
    } else {
      return false
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getStatus();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})