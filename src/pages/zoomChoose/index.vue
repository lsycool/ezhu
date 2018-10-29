<template>
  <view class="container">
    <view class="title1" style="width:80%; padding-left:15px;">
      <text class="name">{{title1}}</text>
    </view>
    <comboxList :zooms="zooms" @getSelectIndex="optionTap"></comboxList>
  </view>
</template>

<script>
import globalStore from '@/stores/global-store'
import comboxList from '@/components/combox'

export default {
  data () {
    return {
      title1: '请选择您要租住的小区',
      zooms: [{id: 0, name: '天申综合小区'}, {id: 1, name: '天申综合小区1'}, {id: 2, name: '天申综合小区2'}] // 从后台获取小区列表
    }
  },
  onShow () {
    wx.hideTabBar({
      animation: false
    })
  },
  components: {
    comboxList
  },
  methods: {
    optionTap: function (index) {
      // console.log('index:' + index)
      globalStore.commit('setCurrentZoom', this.zooms[index].id)
      // globalStore.commit('setZooms', this.zooms)
      wx.switchTab({
        url: '/pages/tenant/main'
      })
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
</style>
