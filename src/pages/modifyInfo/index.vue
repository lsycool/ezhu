<template>
  <view class="container">
    <van-field :value="value" clearable :label='typeNameList[type]' :type="type == 2? 'number':'text'" :placeholder="'请输入' + typeNameList[type]" @change="onChange">
    </van-field>
    <view style="margin-top:30px; padding:0 10px;">
      <van-button size="large" type="danger" @click="onModify">确认</van-button>
    </view>
  </view>
</template>

<script>
import globalStore from '@/stores/global-store'

export default {
  data () {
    return {
      name: '',
      telephone: '',
      type: 0,
      value: '',
      typeNameList: ['姓名', '手机号', '身份证号']
    }
  },

  onLoad (e) {
    this.type = parseInt(e.type)
    this.value = e.value
  },
  onShow () {
    wx.hideTabBar({
      animation: false
    })
    this.name = globalStore.state.userInfo.nickName
  },
  methods: {
    onModify (e) {
      wx.redirectTo({
        url: '../myInfo/main?type=' + this.type + '&value=' + this.value
      })
    },
    onChange (e) {
      this.value = e.mp.detail;
    }
  }
}
</script>

<style scoped>
.container{
    height: auto;
    overflow: hidden;
    width: 100%;
}
</style>
