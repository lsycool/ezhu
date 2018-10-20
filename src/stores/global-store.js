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
