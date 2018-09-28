<script>
import globalStore from '@/stores/global-store'

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
  },
  onLaunch () {
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
                console.log(res.userInfo)
                console.log('用户已经授权过')
                // 用户已经授权过，并且有角色则跳转对应页面
                if (role === 'landlord') {
                  wx.redirectTo({
                    url: '/pages/landlord/index'
                  })
                } else if (role === 'tenant') {
                  wx.redirectTo({
                    url: '/pages/tenant/index'
                  })
                } else {
                  wx.navigateTo({
                    url: '/pages/roleChoose/index'
                  })
                }
              }
            })
          } else {
            console.log('用户还未授权过')
            // 跳转到授权页面
            wx.navigateTo({
              url: '/pages/authority/index'
            })
          }
        }
      })
    }
  }
}
</script>