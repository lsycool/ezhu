<script>
import globalStore from '@/stores/global-store'
import wx from '@/utils/wx'

export default {
  mpType: 'app',

  create () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')
  },
  mounted () {
    // 一进来看看用户是否授权过
    this.getSetting()
    this.initialData()
  },
  onShow () {
    wx.hideTabBar({
      animation: false
    })
  },
  methods: {
    getSetting () {
      let role = globalStore.state.role
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                globalStore.commit('setUserInfo', res.userInfo)
                // console.log(res.userInfo)
                console.log('用户已经授权过')
                // 用户已经授权过，并且有角色则跳转对应页面
                if (role === 'landlord') {
                  wx.redirectTo({
                    url: '/pages/landlord/main'
                  })
                } else if (role === 'tenant') {
                  wx.redirectTo({
                    url: '/pages/tenant/main'
                  })
                } else {
                  wx.reLaunch({
                    url: '/pages/roleChoose/main'
                  })
                }
              }
            })
          } else {
            console.log('用户还未授权过')
            // 跳转到授权页面
            wx.navigateTo({
              url: '/pages/authority/main'
            })
          }
        }
      })
    },
    initialData () {
      let zooms = [{id: 0, name: '天申综合小区'}, {id: 1, name: '天申综合小区1'}, {id: 2, name: '天申综合小区2'}]
      globalStore.commit('setZooms', zooms)
      // console.log(zooms)
    }
  }
}
</script>