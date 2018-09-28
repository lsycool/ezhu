module.exports = [
  {
    // 首页
    path: '/pages/index/index',
    name: 'index',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    // 授权
    path: 'pages/authority/index',
    name: 'authority',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    // 选择身份
    path: 'pages/roleChoose/index',
    name: 'roleChoose',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    // 小区选择
    path: 'pages/zoomChoose/index',
    name: 'zoomChoose',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    // 房客下单页
    path: 'pages/preOrder/index',
    name: 'preOrder',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    // 联系方式页面
    path: 'pages/contactInfo/index',
    name: 'contactInfo',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    // 预定结果页面
    path: 'pages/bookResult/index',
    name: 'bookResult',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    // 房源详细信息页面
    path: 'pages/zoomInfo/index',
    name: 'publish',
    config: {}
  },
  {
    // 房屋详细信息页面
    path: 'pages/houseInfo/index',
    name: 'publish',
    config: {}
  },
  {
    // 房间信息页面
    path: 'pages/roomInfo/index',
    name: 'publish',
    config: {}
  },
  // 下面是tabBar
  {
    // 房客浏览页面
    path: 'pages/tenant/index',
    name: 'tenant',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    // 我的预定页面
    path: 'pages/myBooked/index',
    name: 'myBook',
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    // 房东发布房源页面
    path: 'pages/landlord/index',
    name: 'landlord',
    config: {
    }
  },
  {
    // 我发布的房源页面
    path: 'pages/myPublished/index',
    name: 'myPublished',
    config: {
    }
  }
]
