<template>
  <view class="container">
    <view class="title1">
      <text class="name">{{title1}}</text>
    </view>
    <view class="combox1">
      <button  @getuserinfo="goLogin" class="rentHouse" @click="rentHouse" type="primary">{{buttonTitle1}}</button>
    </view> 
  </view>
</template>

<script>

export default {
  data () {
    return {
      title1: '请选择您要租住的小区'
    }
  },

  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    rentHouse () {
      wx.navigateTo({
        url: '../ucenter/address'
      })
    }
  }
}
</script>

<style scoped>
.container{
    background: #f4f4f4;
    height: auto;
    overflow: hidden;
    width: 100%;
}
</style>
