//获取应用实例 
const app = getApp();
Page({
  data: {
    list: [{
      text: '晨会',
      id: '1',
      icon: 'icon-chenhui'
    },{
      text: '迎宾',
      id: '2',
      icon: 'icon-shouye_yingbin'
    }, {
      text: '晨巡',
      id: '3',
      icon: 'icon-zhengzaixunluodingwei-copy'
    }, {
      text: '午巡',
      id: '4',
      icon: 'icon-zhengzaixunluodingwei-copy'
    }, {
      text: '商户访谈',
      id: '5',
      icon: 'icon-fangtan',
    }, {
      text: '送宾',
      id: '6',
      icon: 'icon-shouye_yingbin'
    }
    ],
    itemColor: '#6aaeed',
    stepNum: '12000'
  }
})