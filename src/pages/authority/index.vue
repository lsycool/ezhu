<template>
  <view class="container">
    <view class="title1" style="text-align:center; font-size:40rpx;">
      <text class="name">{{title1}}</text>
    </view>
    <view class="button1" style="padding:0 30rpx;">
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1" class="goLoginBtn" type="primary">{{buttonTitle}}</button>
    </view>
    <view class="title2" style="text-align:center; font-size:40rpx; margin-top:50rpx">
      <text class="name">{{title2}}</text>
    </view>    
  </view>
</template>

<script>
import globalStore from '@/stores/global-store'
export default {
  data () {
    return {
      title1: '诚信租平台不仅能为您够提供房源\n还能帮您找到合适室友',
      title2: '允许获取您的昵称、微信头像和\n微信号等信息',
      buttonTitle: '确认授权'
    }
  },

  methods: {
    goLogin () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              globalStore.commit('setUserInfo', res.userInfo)
              console.log(globalStore.state.userInfo)
              // 跳转选择身份页面
              wx.redirectTo({
                url: '../roleChoose/main'
              })
            }
          })
        },
        error: () => {
          console.log('login failed.')
        }
      })
    },
    getUserInfo1 () {
      console.log('click事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse('button.open-type.getUserInfo')) {
        // 用户版本可用
      } else {
        console.log('请升级微信版本')
      }
    },
    bindGetUserInfo (e) {
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData) {
        // 用户按了允许授权按钮
        console.log('用户按了允许授权按钮')
        this.goLogin()
      } else {
        // 用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    }
  }
}
</script>

<style scoped>
.container{
    height: auto;
    overflow: hidden;
    width: 100%;
    margin-top: 200rpx;
}

.button1{
  margin-top: 200rpx;
}
</style>
