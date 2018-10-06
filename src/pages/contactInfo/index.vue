<template>
  <div class="container">
    <view class="head" style="display: block; border-bottom:2px solid gray; padding-bottom:5px; margin-bottom:10px;">
      <view class="userInfo" style="text-align:right;">
          <text class="userName" style="font-size:30rpx;line-height:30rpx;margin-right:5px;">{{userInfo.nickName}}</text>
          <image class="avatar" style="  vertical-align:middle;width:70rpx;height:70rpx;margin-right:20rpx; border-radius:35rpx;" :src="userInfo.avatarUrl"/>
      </view>
      <view style="text-align:center; margin-top:10px; font-weight:bold;">
        <text>
          请完善您联系方式
        </text>
      </view>
    </view>
    <form @submit="formSubmit" @reset="formReset">
      <view class="section">
        <input name="name" :value='name' style="border-bottom:1px solid gray; border-top:1px solid gray; padding:0 10px; font-size:14px; height:40px; line-height:40px;" placeholder="怎么称呼您" />
        <input name="address" :value='address' style="border-bottom:1px solid gray; padding:0 10px; font-size:14px; height:40px; line-height:40px;" placeholder="为了能够联系到您，请输入正确的联系方式" />
      </view>
      <view class="btn-area">
        <button class="button" formType="submit">预定</button>
        <button class="button" formType="reset" style="background-color:gray;">取消</button>
      </view>
    </form>
  </div>
</template>

<script>
import globalStore from '@/stores/global-store'
import util from '@/utils/index'

export default {
  data () {
    return {
      userInfo: {},
      name: '',
      address: ''
    }
  },

  components: {
  },

  methods: {
    formSubmit (e) {
      console.log('form发生了submit事件，携带数据为：', e.mp.detail.value)
      wx.navigateTo({
        url: '../bookResult/main'
      })
    },
    formReset () {
      console.log('form发生了reset事件')
    }
  },

  mounted () {
    this.userInfo = globalStore.state.userInfo
    var options = util.getCurrentPageParam()
    if (options.type === '1') {
      this.name = '尼彩彩'
      this.address = '渥酒布踩'
    }
    console.log(options)
  }
}
</script>

<style scoped>
.container{
    height: auto;
    overflow: hidden;
    width: 100%;
    margin-top:20rpx;
}
.btn-area {
  display:flex;
  margin:200px 80px;
}
.button {
  color:white;
  background-color:red;
  border-radius:10px;
}
</style>
