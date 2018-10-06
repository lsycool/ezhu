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
        pagePath: '/pages/tenant/main',
        iconPath: '/static/images/ic_menu_publish_pressed.png',
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
      }],
      // 第一种底部导航栏显示
      tabBar: {
        'color': '#9E9E9E',
        'selectedColor': '#f00',
        'backgroundColor': '#fff',
        'borderStyle': '#ccc',
        'list': [{
          'pagePath': '/pages/tenant/main',
          'text': '主菜单',
          'iconPath': 'static/images/down.png',
          'selectedIconPath': 'static/images/down.png',
          'clas': 'menu-item',
          'selectedColor': '#4EDF80',
          active: true
        },
        {
          'pagePath': '/pages/contactInfo/main',
          'text': '简历',
          'iconPath': 'static/images/down.png',
          'selectedIconPath': 'static/images/down.png',
          'selectedColor': '#4EDF80',
          'clas': 'menu-item',
          active: false
        },
        {
          'pagePath': 'pages/test/test',
          'text': '我的',
          'iconPath': 'static/images/down.png',
          'selectedIconPath': 'static/images/down.png',
          'selectedColor': '#4EDF80',
          'clas': 'menu-item',
          active: false
        }
        ],
        'position': 'bottom'
      },
      // 第二种底部导航栏显示
      tabBar1: {
        'color': '#9E9E9E',
        'selectedColor': '#f00',
        'backgroundColor': '#fff',
        'borderStyle': '#ccc',
        'list': [{
          'pagePath': '/pages/index/main',
          'text': '首页',
          'iconPath': '/images/my.png',
          'selectedIconPath': '/images/my.png',
          'clas': 'menu-item1',
          'selectedColor': '#4EDF80',
          active: false
        },
        {
          'pagePath': '/pages/logs/logs',
          'text': '消息',
          'iconPath': '/images/my.png',
          'selectedIconPath': '/images/my.png',
          'selectedColor': '#4EDF80',
          'clas': 'menu-item1',
          active: true
        },
        {
          'pagePath': '/pages/cont/index',
          'text': '简历',
          'iconPath': '/images/my.png',
          'selectedIconPath': '/images/my.png',
          'selectedColor': '#4EDF80',
          'clas': 'menu-item1',
          active: false
        },
        {
          'pagePath': '/pages/detail/index',
          'text': '我的',
          'iconPath': '/images/my.png',
          'selectedIconPath': '/images/my.png',
          'selectedColor': '#4EDF80',
          'clas': 'menu-item1',
          active: false
        }
        ],
        'position': 'bottom'
      }
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
    }
  }
})
