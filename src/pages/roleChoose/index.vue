<template>
  <view class="container">
    <view class="title1" style="font-size:40rpx; font-weight:bold; margin-left:50rpx;">
      <text class="name">{{title1}}</text>
    </view>
    <view class="button1" style="flex-direction:row; display: flex; margin-top:60rpx;">
      <button  class="rentHouse" @click="rentHouse" type="primary">{{buttonTitle1}}</button>
      <button  class="publishHouse" @click="publishHouse" type="primary">{{buttonTitle2}}</button>
    </view> 
  </view>
</template>

<script>
import wxFunc from '@/utils/wxFunc'
export default {
  data () {
    return {
      title1: '您需要平台帮您做什么？',
      buttonTitle1: '我要租房子',
      buttonTitle2: '我要发布房源'
    }
  },
  mounted () {
    console.log(wxFunc.getCurrentPages())
    console.log(getApp())
    console.log(this.globalData)
  },
  methods: {
    rentHouse () {
      wx.navigateTo({
        url: '../zoomChoose/main'
      })
    },
    publishHouse () {
      wx.switchTab({
        url: '../publish/main'
      })
    }
  }
}
</script>

<style scoped>
.container{
    margin-top:100rpx;
    height: auto;
    overflow: hidden;
    width: 100%;
}
.rentHouse, .publishHouse{
    height: 300rpx;
    width: 300rpx;
    line-height: 300rpx;
}
</style>
