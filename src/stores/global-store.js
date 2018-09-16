import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: '', // 租客还是房东
    userInfo: {},
    zooms: [], // 所有的小区列表
    currentZoom: 0 // 当前选择的小区的id
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
    }
  }
})
