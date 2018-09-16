<template>
  <div class="container">
    <view class="head" style="display: block;">
      <view class="zoom" style="display: inline-block; width: 60%;">
        <text class="zoomName" style="padding-left:20rpx;">{{zoomName}}</text>
        <text class="reChoose" style="margin-left: 20rpx; font-weight:bold; color:#336699" @click="reChoose" type="primary">切换</text>
      </view>
      <view class="userInfo" style="display: inline-block; text-align:right; width:40%">
        <text class="userName">{{userInfo.nickName}}</text>
        <img class="avatar" :src="userInfo.avatarUrl"/>
      </view>
    </view>
    <view class="filter" style="margin-top:50rpx; margin-left:20rpx">
      <view class="rentType" style="display: flex; flex-direction:row;">
        <text :class="{clicked:isZhenZu}" style="font-weight:bold;" @click="zhenZu">整租</text>
        <text :class="{clicked:!isZhenZu}" style="margin-left: 60rpx; font-weight:bold;" @click="heZu">合租</text>
      </view>
      <view class="priseAndType" style="display: flex; flex-direction:row; margin-top:50rpx;">
        <view class="priseRange">
          <text>价格</text><combox></combox><text>到</text><combox></combox>
        </view>
        <view class="houseType">
          <text>户型</text><combox></combox>
        </view>
      </view>
    </view>
    <view class="houseDetail">
      <view>
        <img class="avatar" :src="userInfo.avatar"/>
        <view>
          <text class="prise"></text><text class="profile"></text>
          <view><text class="amount"></text><button>去拼团</button></view>
        </view>
      </view>
    </view>
    
  </div>
</template>

<script>
import globalStore from '@/stores/global-store'
import util from '@/utils/index'

export default {
  data () {
    return {
      zooms: [],
      zoomName: '',
      buttonTitle1: '切换',
      userInfo: {},
      isZhenZu: true
    }
  },
  mounted () {
    this.zooms = globalStore.state.zooms
    this.zoomName = util.getZoomNameById(globalStore.state.zooms, globalStore.state.currentZoom)
    this.userInfo = globalStore.state.userInfo
    console.log(this.userInfo)
    wx.showTabBar({
      animation: true
    })
  },
  methods: {
    zhenZu () {
      this.isZhenZu = true
    },
    heZu () {
      this.isZhenZu = false
    }
  }
}
</script>

<style scoped>
.container{
    height: auto;
    overflow: hidden;
    width: 100%;
    margin-top:50rpx;
}
.clicked {
  color:#336699
}
.userName {
  font-size:30rpx;
  line-height:30rpx;
}
.avatar {
  vertical-align:middle;
  width:40rpx; 
  height:40rpx; 
  margin-right:20rpx; 
  border-radius:20rpx;
}
</style>
