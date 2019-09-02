'use strict';
var baseUrl = "https://report.ouyada.com/livemanage/public/index.php/"
const config = {
  "base":"https://report.ouyada.com/livemanage/public/",
  "getCode": baseUrl + "Wechat/jscode2session",
  "login": baseUrl + "User/bindOA",
  "getOa": baseUrl + "User/getUserArea",
  "getArea": baseUrl + "User/getAllAreaList",
  "getMall": baseUrl + "User/getMallListByAreaId",
  "bindMall": baseUrl + "User/bindMall", // 绑定（修改）门店信息
  "addInterview": baseUrl + "Interview/addInterview", // 我在现场的新增所有接口
  "updateInterview": baseUrl + "Interview/updateInterview", // 我在现场的修改所有接口
  "addPic": baseUrl + "User/uploadImage",
  "step": baseUrl + "Wechat/decryptData", // 微信步数
  "info": baseUrl + "User/getUserInfo", // 获取用户登录信息
  "CenterInfo": baseUrl + "Center/getCenterInfo", // 获取我在现场的完成情况
  "siteDetail": baseUrl + "Interview/getDetail", // 获取我在现场的详情
  "getOrderList": baseUrl + "AskHelp/getHelpList", // 获取工单列表
  "getOrderDetail": baseUrl + "AskHelp/getHelpDetail", // 获取工单列表详情
  "addHelp": baseUrl + "AskHelp/addHelp", // 寻求帮助提交
  "updateHelp": baseUrl + "AskHelp/updateHelp",
  "ranking": baseUrl + "AskHelp/ranking", // 获取排名信息
  "add": baseUrl + "MatterRecord/add", // 添加事项记录
  "getInfo": baseUrl + "MatterRecord/getInfo", // 獲取事项记录详情
  "getMarketLists": baseUrl + "Market/getPageLists", // 获取市调对标列表
  "addMarket": baseUrl + "Market/add", // 添加市调对标
  "getMarketDetail": baseUrl + "Market/getDetail", // 查看市调对标详情
  "getAddviceLists": baseUrl + "Advice/getPageLists", // 获取建议列表获取建议详情
  "getAddviceDetail": baseUrl + "Advice/getDetail", // 获取建议详情
  "addAddvice": baseUrl + "Advice/add", // 新增建议
  "getNoticeList": baseUrl + "Article/getNoticeList", // 获取公告列表
  "getRuleList": baseUrl + "Article/getRuleList", // 获取制度列表
  "getArticleInfo": baseUrl + "Article/getInfo", // 获取文章详情
}; 

module.exports = config;