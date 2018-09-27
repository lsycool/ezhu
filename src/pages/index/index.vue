<template>
  <view class="container">
  </view>
</template>

<script>

export default {
  onShow () {
    wx.hideTabBar({
      animation: false
    })
  },
  methods: {
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
