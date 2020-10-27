/**
 * api
 */
var config = require('../config/dev.js')
var jsonForm = require('./jsonForm.js')

let request = function(url, method, data, header, errorInfo) {
    return new Promise(function(resolve, reject) {
      wx.request({
        url: url,
        data: data || {},
        method: method,
        header: header || { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          if (res.data.code == 0) {
            wx.hideLoading()
            //接口调用成功
            resolve(res);    //根据业务需要resolve接口返回的json的数据
          } else if (res.data.code == 9999) {
              wx.showModal({ 
                content: res.data.msg,
                showCancel: false
              })
              wx.redirectTo({
                url: '/pages/login/login',
              })
          } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1500
              })
          }
        },
        fail: function (err) {
          // fail调用接口失败
          console.log("当前报错信息 :" + err.data.msg)
          reject(errorInfo || err);
        }
      })
    })
}

let minaApi = {
  get(api_url, _data) {
    var parms = jsonForm(_data);
    return request(
      config.api + api_url + (api_url.indexOf('?') != -1 ? "&" : "?") + parms,
      "GET",
      {}
    );
  },
  post(api_url, data) {
    return request(
      config.api + api_url,
      "POST",
      data
    )
  },
  request: request
}
module.exports = minaApi