<template>
  <view class="container">
    <view class="head" style="display:flex; height:150rpx;">
      <view class="info" style="flex:3; padding-left:40rpx; padding-top:20rpx;">{{userInfo.nickName}}</view>
      <view class="avatar" style="flex:1; text-align:center;">
        <image style="vertical-align:middle;width:100rpx;height:100rpx;border-radius:35rpx;" :src="userInfo.avatarUrl"/>
      </view>
    </view>
    <view style="height:30rpx; background:#EFEFEF"></view>
    <view class="list-item">
      <view class="list-check">
        <wxc-list
              class="item"
              icon="share"
              title="我的发布">
        </wxc-list>
        <wxc-list
          class="item"
          icon="purse"
          title="我的预定">
        </wxc-list>
        <wxc-list
          class="item"
          icon="cart"
          title="我的收藏">
        </wxc-list>
        <wxc-list
          class="item"
          icon="address"
          title="我的信息">
        </wxc-list>
        <wxc-list
          class="item"
          icon="feedback"
          title="反馈问题">
        </wxc-list>     
        <wxc-list
          class="item"
          icon="group"
          title="关于我们">
        </wxc-list>       
      </view>
    </view>
    <van-tabbar :active="active" @change="onTabbarChange" class="tabBar">
      <van-tabbar-item icon="wap-home">主菜单</van-tabbar-item>
      <van-tabbar-item icon="cart" info="5">我的预定</van-tabbar-item>
      <van-tabbar-item icon="contact">个人中心</van-tabbar-item>
    </van-tabbar>
  </view>
</template>

<script>
import globalStore from '@/stores/global-store'

export default {
  data () {
    return {
      userInfo: {}
    }
  },
  onShow () {
    wx.hideTabBar({
      animation: false
    })
    this.userInfo = globalStore.state.userInfo
  },
  methods: {
  }
}
</script>

<style scoped>
.container{
    height: auto;
    overflow: hidden;
    width: 100%;
}
.list-image {
  width: 102rpx;
  height: 102rpx;
  margin-left: 30rpx;
}
.list-check {
  align-items: center
}
.item {
    flex: 1;
  }
</style>
