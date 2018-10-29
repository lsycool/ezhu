import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: '', // 租客还是房东
    userInfo: {},
    zooms: [], // 所有的小区列表
    currentZoom: 0, // 当前选择的小区的id
    showPopBox: false,
    rentType: 0, // 整租还是合租
    tabBarList: {
      navList: [
        {
          pagePath: '/pages/tenant/main',
          iconPath: '/static/images/ic_menu_home_nor.png',
          selectedIconPath: '/static/images/ic_menu_home_pressed.png',
          text: '主菜单'
        },
        {
          pagePath: '/pages/myBooked/main',
          iconPath: '/static/images/ic_menu_book_nor.png',
          selectedIconPath: '/static/images/ic_menu_book_pressed.png',
          text: '我的预定'
        },
        {
          pagePath: '/pages/landlord/main',
          iconPath: '/static/images/ic_menu_publish_nor.png',
          selectedIconPath: '/static/images/ic_menu_publish_pressed.png',
          text: '我要发布房源'
        }
      ],
      navList2: [{
        pagePath: '/pages/landlord/main',
        iconPath: '/static/images/ic_menu_home_nor.png',
        selectedIconPath: '/static/images/ic_menu_home_pressed.png',
        text: '主菜单'
      },
      {
        pagePath: '/pages/myPublished/main',
        iconPath: '/static/images/ic_menu_book_nor.png',
        selectedIconPath: '/static/images/ic_menu_book_pressed.png',
        text: '我发布的房源'
      },
      {
        pagePath: '/pages/zoomChoose/main',
        iconPath: '/static/images/ic_menu_publish_nor.png',
        selectedIconPath: '/static/images/ic_menu_publish_pressed.png',
        text: '我要租房'
      }],
      navList3: [{
        pagePath: '/pages/landlord/main',
        iconPath: '/static/images/ic_menu_home_nor.png',
        selectedIconPath: '/static/images/ic_menu_home_pressed.png',
        text: '主菜单'
      },
      {
        pagePath: '/pages/myBooked/main',
        iconPath: '/static/images/ic_menu_book_nor.png',
        selectedIconPath: '/static/images/ic_menu_book_pressed.png',
        text: '我的预定'
      }]
    },
    color: {
      pingpaise: '#FF0077', // 品牌主色
      kongjianse: '#FF5777', // 控件色
      zhubiaose: '#333333', // 商品名、一级标题
      cibiaose: '#666666', // tab栏文字色
      antishise: '#999999', // 暗提示色，用于补充性文案
      fengexianse: '#ECECEC', // 分割线色，用于补充性文案
      biejinse: '#EFEFEF', // 背景色，用于补充性文案
      tishidise: '#FFE8EE' // 提示底色，用于补充性文案
    },
    fontSize: {
      priseBig: '36rpx',
      prise: '32rpx',
      title: '28rpx',
      subtitle: '24rpx', // 副标题，形容性文案，正文
      supplement: '22rpx', // 销售量，关注人数，参与人数等补充
      tagContent: '20rpx' // 标签中文字
    }
  },
  mutations: {
    setRole: (state, role) => {
      state.role = role
    },
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    },
    setZooms: (state, zooms) => {
      state.zooms = zooms
    },
    setCurrentZoom: (state, zoom) => {
      state.currentZoom = zoom
    },
    setShowPopBox: (state, isShow) => {
      state.showPopBox = isShow
    },
    setRentType: (state, rentType) => {
      state.rentType = rentType
    }
  }
})
