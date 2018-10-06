<template>
  <div class="container">
    <view class="head" style="display: block; padding-bottom:5px; margin-bottom:10px;">
      <view class="userInfo" style="text-align:right;">
          <text class="userName" style="font-size:30rpx;line-height:30rpx;margin-right:5px;">{{userInfo.nickName}}</text>
          <image class="avatar" style="  vertical-align:middle;width:70rpx;height:70rpx;margin-right:20rpx; border-radius:35rpx;" :src="userInfo.avatarUrl"/>
      </view>
    </view>
    <view style="text-align:center; margin-top:200px; font-weight:bold;">
      <text>
        {{bookResult}}'!'
      </text>
      <view style="font-size:14px; margin-top: 10px">
        <text>
          '还差1人，即可联系房东看房。'
        </text>
        <button open-type="share" style="margin-left: 20rpx; font-weight:bold; color:#336699; display:inline; background-color:white;"> 
          '去分享'
        </button>
      </view>
    </view>
    <tabBarSelect :selectNavIndex='0' :navList='navList'></tabBarSelect>
  </div>
</template>

<script>
import globalStore from '@/stores/global-store'
import tabBarSelect from '@/components/tabbar'

export default {
  data () {
    return {
      bookResult: '预定成功',
      userInfo: {},
      navList: globalStore.state.tabBarList.navList3
    }
  },

  components: {
    tabBarSelect
  },

  methods: {

  },

  onShareAppMessage: function () {
    return {
      title: '诚信租',
      desc: '中国最好的拼租平台',
      path: '/pages/index/main'
    }
  },

  mounted () {
    this.userInfo = globalStore.state.userInfo
  }
}
</script>

<style scoped>

</style>
