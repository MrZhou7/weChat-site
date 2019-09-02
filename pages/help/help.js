// pages/help/help.js
import common from '../../utils/common.js'   //  引入common.js文件
import api from '../../utils/request.js'
const plugin = requirePlugin("WechatSI")
const manager = plugin.getRecordRecognitionManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    floor: '',
    help_area: "",
    problem:'',
    problem_pic:'',
    voice:'',
    files:'',
    pic:'',
    translateText:'',
    emergency: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initRecord()
  }, 
  initRecord: function () {
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = (res) => {
      let text = res.result
      this.setData({
        voice: text,
      })
    }
    // 识别结束事件
    manager.onStop = (res) => {
      let text = res.result
      if (text == '') {
        wx.showToast({
          title: "暂无语音信息",
          icon: 'none',
          duration: 1500
        })
        // 用户没有说话，可以做一下提示处理...
        return
      }
      this.setData({
        voice: text,
      })
      // 得到完整识别内容就可以去翻译了
      // this.translateTextAction()
    }
  },

  // translateTextAction: function () {
  //   let lfrom = 'zh_CN'
  //   let lto = 'en_US'
  //   plugin.translate({
  //     lfrom: lfrom,
  //     lto: lto,
  //     content: this.data.voice,
  //     tts: true, // 需要合成语音
  //     success: (resTrans) => {
  //       // 翻译可以得到 翻译文本，翻译文本的合成语音，合成语音的过期时间
  //       let text = resTrans.result
  //       this.setData({
  //         translateText: text,
  //       })
  //       // 得到合成语音让它自动播放出来
  //       wx.playBackgroundAudio({
  //         dataUrl: resTrans.filename,
  //         title: '',
  //       })
  //     },
  //   })
  //  },

  streamRecord: function () {
    manager.start({
      lang: 'zh_CN',
    })
  },
  endStreamRecord: function () {
    manager.stop()
  },

  //上传照片
  chooseImage: function (e) {
    common.chooseImage(this, this.data.pic, this.data.problem_pic)
  },

  //是否紧急
  switchChange: function (e) {
    this.setData({
      emergency: e.detail.value
    })
  },

  //查看照片大图
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  //绑定楼层
  floorInput: function(e) {
    this.setData({
      floor: e.detail.value
    })
  },

  //绑定区域
  areaInput: function (e) {
    this.setData({
      help_area: e.detail.value
    })
  },
  //绑定声音说明
  voiceInput: function (e) {
    this.setData({
      voice: e.detail.value
    })
  },

  //绑定问题说明
  problemInput: function (e) {
    this.setData({
      problem: e.detail.value
    })
  },

  //提交
  submitInput:function(){
    console.log(this.data)
    if (this.data.floor == '') {
      common.alertMsg('请填写楼层')
    } else if (this.data.voice == "" && this.data.problem == '' ){
      common.alertMsg('请填写问题情况')
    } else{
      wx.showLoading()
      let data = {
        session_key: wx.getStorageSync('session_key'),
        floor: this.data.floor,
        help_area: this.data.help_area,
        problem: this.data.problem,
        problem_pic: this.data.pic,
        voice: this.data.voice,
        emergency: this.data.emergency ? 1 : 0
      }
      api.addHelp(data).then(res => {
        wx.navigateBack({
          delta: 1
        })
      })
    }
  }
  
})