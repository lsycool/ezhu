<template>
  <div class="container">
    <view style="text-align:center; font-weight:bold; margin-top:100px;">您还未发布房源信息</view>
    <view style="text-align:center; margin-top:50px;" @click="publish">
      <image src="/static/images/plus.png" style="width:50px; height:50px;" mode="aspectFill" @click="previewImage"/>
      <view style="font-size:14px;">发布房源</view>
    </view>
    <tabBarSelect :selectNavIndex='0' :navList='navList'></tabBarSelect>
  </div>
</template>

<script>
import tabBarSelect from '@/components/tabbar'
import globalStore from '@/stores/global-store'

export default {
  data () {
    return {
      navList: globalStore.state.tabBarList.navList2
    }
  },
  onShow () {
    wx.hideTabBar({
      animation: false
    })
  },
  components: {
    tabBarSelect
  },

  methods: {
    publish () {
      wx.navigateTo({
        url: '../landlordInfo/main'
      })
    }
  },

  created () {

  }
}
</script>

<style scoped>

</style>
