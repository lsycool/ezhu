import globalStore from '@/stores/global-store'
import wxFunc from './wxFunc'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

function getZoomNameById (zooms, id) {
  return zooms.find(function (zoom) {
    return zoom.id === id
  }).name
}

/*
 *  将对象转变为class字符串
 */
function classes (obj) {
  let classesStr = ''
  for (let className in obj) {
    if (obj.hasOwnProperty(className) && !!obj[className]) classesStr += className
  }
  return classesStr
}

/*
 * 将对象转变为style字符串，对象属性的camel命名会转换为中划线命名
 */
function styles (obj) {
  let stylesStr = ''
  for (let styleName in obj) {
    if (obj.hasOwnProperty(styleName)) stylesStr += `${styleName.replace(/([A-Z])/g, '-$1').toLowerCase()}:${px2rpx(obj[styleName])};`
  }
  return stylesStr
}

function px2rpx (str) {
  if (/rpx/.test(str)) return str
  else if (/px/.test(str)) {
    let val = str.substring(0, str.indexOf('px'))
    return `${(val - 0) * 2}rpx`
  } else return str
}

// 封装微信接口
function getWindowRect (cls) {
  return new Promise(function (resolve, reject) {
    wx.createSelectorQuery().select(cls).boundingClientRect(function (rect) {
      resolve(rect)
    }).exec()
  })
}

// 第一种状态的底部
function editTabBar () {
  var _curPageArr = wxFunc.getCurrentPages()
  var _curPage = _curPageArr[_curPageArr.length - 1]
  var _pagePath = _curPage.__route__
  if (_pagePath.indexOf('/') !== 0) {
    _pagePath = '/' + _pagePath
  }
  var tabBar = globalStore.state.tabBarList.tabBar
  for (var i = 0; i < tabBar.list.length; i++) {
    tabBar.list[i].active = false
    if (tabBar.list[i].pagePath === _pagePath) {
      tabBar.list[i].active = true // 根据页面地址设置当前页面状态
    }
  }
  _curPage.setData({
    tabBar: tabBar
  })
  console.log(_curPage)
}

// 第二种状态的底部
function editTabBar1 () {
  var _curPageArr = wxFunc.getCurrentPages()
  var _curPage = _curPageArr[_curPageArr.length - 1]
  var _pagePath = _curPage.__route__
  if (_pagePath.indexOf('/') !== 0) {
    _pagePath = '/' + _pagePath
  }
  var tabBar = globalStore.state.tabBarList.tabBar2
  for (var i = 0; i < tabBar.list.length; i++) {
    tabBar.list[i].active = false
    if (tabBar.list[i].pagePath === _pagePath) {
      tabBar.list[i].active = true // 根据页面地址设置当前页面状态
    }
  }
  _curPage.setData({
    tabBar: tabBar
  })
}

export default {
  formatNumber,
  formatTime,
  getZoomNameById,
  classes,
  styles,
  px2rpx,
  getWindowRect,
  editTabBar,
  editTabBar1
}
