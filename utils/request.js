import apiList from '../config/dev.js'   //  引入apiList.js文件

const apiRequest = (url, method, data, header) => {     //接收所需要的参数，如果不够还可以自己自定义参数
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data ? data : null,
      method: method,
      header: header ? header : { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.code == 0) {
          wx.hideLoading()
          //接口调用成功
          resolve(res);    //根据业务需要resolve接口返回的json的数据
        } else if (res.data.code == 9999) {
          wx.showModal({ 
            content: res.data.msg,
            showCancel: false, })
          wx.redirectTo({
            url: '/pages/login/login',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500 })
        }
       
      },
      fail: function (res) {
        // fail调用接口失败
        console.log("当前报错信息 :" + res.data.msg)
        reject(res);
      }
    })
  });
  return promise;  //注意，这里返回的是promise对象
}
//登录
let login = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.login, 'post', data))
  })
}
//获取用户Oa信息
let getOaData = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getOa, 'post', data))
  })
}
//获取用户所在区域
let getArea = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getArea, 'post', data))
  })
}
//获取session
let getCode = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getCode, 'post', data))
  })
}
//获取门店
let getMall = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getMall, 'post', data))
  })
}
//获取微信步数
let getStep = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.step, 'post', data))
  })
}
//绑定（修改）门店信息
let bindMall = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.bindMall, 'post', data))
  })
}
//我在现场表单提交
let addSite = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.addInterview, 'post', data))
  })
}
//我在现场表单修改
let amendSite = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.updateInterview, 'post', data))
  })
}
//获取我在现场页面详情
let siteDetail = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.siteDetail, 'post', data))
  })
}

//进来获取用户信息
let getInfo = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.info, 'post', data))
  })
}
//获取我在现场的完成信息
let getCenterInfo = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.CenterInfo, 'post', data))
  })
}

//获取处理工单列表
let getOrderList = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getOrderList, 'post', data))
  })
}

//获取处理工单详情
let getOrderDetail = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getOrderDetail, 'post', data))
  })
}

//寻求帮助提交
let addHelp = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.addHelp, 'post', data))
  })
}

//工单类型处理修改
let updateHelp = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.updateHelp, 'post', data))
  })
}

//获取排名信息
let ranking = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.ranking, 'post', data))
  })
}

//添加事项记录
let addRecord = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.add, 'post', data))
  })
}

//获取事项记录详情
let getRecordDetail = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getInfo, 'post', data))
  })
}

//获取市调对标列表
let getMarketLists = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getMarketLists, 'post', data))
  })
}

//添加市调对标
let addMarket = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.addMarket, 'post', data))
  })
}
//查看市调对标详情
let getMarketDetail = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getMarketDetail, 'post', data))
  })
}
//获取建议列表
let getAddviceLists = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getAddviceLists, 'post', data))
  })
}
//新增建议
let addAddvice = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.addAddvice, 'post', data))
  })
}
//获取建议详情
let getAddviceDetail = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getAddviceDetail, 'post', data))
  })
}

//获取公告列表
let getNoticeList = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getNoticeList, 'post', data))
  })
}
//获取文章详情
let getArticleInfo = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getArticleInfo, 'post', data))
  })
}
//获取制度列表
let getRuleList = (data) => {
  return new Promise((resolve, reject) => {
    resolve(apiRequest(apiList.getRuleList, 'post', data))
  })
}


//最后需要将具体调用的函数暴露出，给具体业务调用

export default {
  login: login,
  getOaData: getOaData,
  getArea: getArea,
  getCode: getCode,
  getStep: getStep,
  getMall: getMall,
  bindMall: bindMall,
  addSite: addSite,
  getInfo: getInfo,
  getCenterInfo:getCenterInfo,
  siteDetail: siteDetail,
  amendSite: amendSite,
  getOrderList: getOrderList,
  getOrderDetail: getOrderDetail,
  addHelp: addHelp,
  updateHelp: updateHelp,
  ranking:ranking,
  addRecord: addRecord,
  getRecordDetail: getRecordDetail,
  getMarketLists:getMarketLists,
  addMarket: addMarket,
  getMarketDetail: getMarketDetail,
  getAddviceLists: getAddviceLists,
  getAddviceDetail: getAddviceDetail,
  addAddvice: addAddvice,
  getNoticeList: getNoticeList,
  getArticleInfo: getArticleInfo,
  getRuleList: getRuleList
}