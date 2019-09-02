// pages/management/addAdvise/addAdvise.js
import api from '../../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advice:'',
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.id) {
      wx.showLoading()
      api.getAddviceDetail({ session_key: wx.getStorageSync('session_key'), id: options.id }).then(res =>{
        that.setData({
          advice: res.data.data.advice,
          isShow: false
        })
      })
    } else {
      that.setData({
        isShow: true
      })
    }
  },
  adviceInput: function (e) {
    this.setData({
      advice: e.detail.value
    })
  },
  submit:function(){
    if(this.data.advice == '') {
      wx.showToast({ title: '请填写意见及建议', icon: 'none', duration: 1500 })
    } else{
      wx.showLoading()
      api.addAddvice({ session_key: wx.getStorageSync('session_key'), advice: this.data.advice }).then(res => {
        wx.navigateBack({
          delta: 1
        })
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})