import api from './request.js'
import apiList from '../config/dev.js'   //  引入apiList.js文件

//用户登陆
function userLogin() {
  wx.checkSession({
    success: function () {
      //存在登陆态
    },
    fail: function () {
      //不存在登陆态
      onLogin()
    }
  })
}

function getDate() { // 获取当天日期
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

function isToday(str) { // 判断是否是今天
  var d = new Date(str.replace(/-/g, "/"));
  var todaysDate = new Date();
  if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
    return true;
  } else {
    return false;
  }
}
// 返回上一页调用方法携带参数
function itemBack(index){
  let pages = getCurrentPages();
  let prevPage = pages[pages.length - 2];
  prevPage.changeData(index)
  wx.navigateBack({
    delta: 1,
  })
}

function userCenterInfo(typeData, _this, detail) { // 获取当前页面用户信息
  wx.request({
    url: apiList.siteDetail,
    method: 'POST',
    data: {
      session_key: wx.getStorageSync('session_key'),
      type: typeData
    },
    success: function (res) {
      console.log(res.data.data)
      _this.setData({
        detail: res.data.data
      })
    },
    fail: function (err) {
      wx.showToast({
        title: '网络错误,请稍后重试',
        icon: 'none',
        duration: 1500
      })
    }
  })
} 

function getCompanyname(data){ // 获取的名称循环重新复制
  var areaList = new Array();
  for (var i = 0;i <data.length; i++) {
    areaList.push(data[i].subcompanyname)
  }
  return areaList;
}

function alertMsg(msg){ // 消息提示框
  wx.showModal({
    content: msg,
    showCancel: false,
  })
}

function prompt() { // 消息提示框
  wx.showToast({
    title: '提交成功',
    icon: 'success',
    duration: 2000
  })
}

function chooseImage(_this, files, pic) {  // 拍照显示上传
  wx.chooseImage({
    count: 1,// 默认9
    sizeType: ['compressed'], // 可以指定是原图还是压缩图
    sourceType: ['camera'],// 可以指定来源是相册还是相机
    success: function (res) {
      _this.setData({
        files: res.tempFilePaths
      })
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      //这里是上传操作
      wx.uploadFile({
        url: apiList.addPic, //里面填写你的上传图片服务器API接口的路径 
        filePath: tempFilePaths[0],//要上传文件资源的路径 String类型 
        name: 'image',//按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
        header: {
          "Content-Type": "multipart/form-data"//记得设置
        },
        formData: {
          session_key: wx.getStorageSync('session_key'),
          type:'jpg'
        },
        success: function (res) {
          var data = JSON.parse(res.data) // 打他获取的是一个字符串要转化
          if (data.code == 0) {
            _this.setData({
              pic: data.data
            })
          }
        },
        fail:function(){
          
        }
      })
    }
  })
}

function chooseImagePhoto(_this, files, pic) {  // 拍照显示上传
  wx.chooseImage({
    count: 1,// 默认9
    sizeType: ['compressed'], // 可以指定是原图还是压缩图
    sourceType: ['album'],// 可以指定来源是相册还是相机
    success: function (res) {
      _this.setData({
        stepFiles: res.tempFilePaths
      })
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      //这里是上传操作
      wx.uploadFile({
        url: apiList.addPic, //里面填写你的上传图片服务器API接口的路径 
        filePath: tempFilePaths[0],//要上传文件资源的路径 String类型 
        name: 'image',//按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
        header: {
          "Content-Type": "multipart/form-data"//记得设置
        },
        formData: {
          session_key: wx.getStorageSync('session_key'),
          type: 'jpg'
        },
        success: function (res) {
          var data = JSON.parse(res.data) // 打他获取的是一个字符串要转化
          if (data.code == 0) {
            _this.setData({
              step_num_pic: data.data
            })
          }
        },
        fail: function () {

        }
      })
    }
  })
}

function chooseImageByArrey(_this, files, pic) {  // 拍照显示上传(数组循环)
  wx.chooseImage({
    count: 1,// 默认9
    sizeType: ['compressed'], // 可以指定是原图还是压缩图
    sourceType: ['camera'],// 可以指定来源是相册还是相机
    success: function (res) {
      _this.setData({
        [files]: res.tempFilePaths
      })
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      //这里是上传操作
      wx.uploadFile({
        url: apiList.addPic, //里面填写你的上传图片服务器API接口的路径 
        filePath: tempFilePaths[0],//要上传文件资源的路径 String类型 
        name: 'image',//按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
        header: {
          "Content-Type": "multipart/form-data"//记得设置
        },
        formData: {
          session_key: wx.getStorageSync('session_key'),
          type: 'jpg'
        },
        success: function (res) {
          var data = JSON.parse(res.data) // 打他获取的是一个字符串要转化
          if (data.code == 0) {
            _this.setData({
              [pic]: data.data
            })
            console.log(_this.data)
          }
        }
      })
    }
  })
}

function chooseImageByPhoto(_this, files, pic) {  // 拍照显示上传(数组循环)
  wx.chooseImage({
    count: 1,// 默认9
    sizeType: ['compressed'], // 可以指定是原图还是压缩图
    sourceType: ['camera','album'],// 可以指定来源是相册还是相机
    success: function (res) {
      _this.setData({
        [files]: res.tempFilePaths
      })
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      //这里是上传操作
      wx.uploadFile({
        url: apiList.addPic, //里面填写你的上传图片服务器API接口的路径 
        filePath: tempFilePaths[0],//要上传文件资源的路径 String类型 
        name: 'image',//按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
        header: {
          "Content-Type": "multipart/form-data"//记得设置
        },
        formData: {
          session_key: wx.getStorageSync('session_key'),
          type: 'jpg'
        },
        success: function (res) {
          var data = JSON.parse(res.data) // 打他获取的是一个字符串要转化
          if (data.code == 0) {
            _this.setData({
              [pic]: data.data
            })
            console.log(_this.data)
          }
        }
      })
    }
  })
}

module.exports = {
  getCompanyname: getCompanyname,
  alertMsg: alertMsg,
  chooseImage: chooseImage,
  chooseImageByArrey: chooseImageByArrey,
  chooseImageByPhoto: chooseImageByPhoto,
  userCenterInfo: userCenterInfo,
  itemBack: itemBack,
  isToday: isToday,
  getDate: getDate,
  chooseImagePhoto: chooseImagePhoto
};