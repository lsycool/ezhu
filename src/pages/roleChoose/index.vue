<template>
  <view class="container">
    <view class="title1" style="font-size:36rpx; color:#333333; font-weight:bold; margin-left:35rpx;">
      <text class="name">{{title1}}</text>
    </view>
    <view class="button1" style="flex-direction:row; display: flex; margin-top:60rpx; text-align:center;">
      <view style="flex:1;"><wxc-button type="beauty" size="large" @click="rentHouse" btnStyle="height: 300rpx; width: 300rpx; line-height: 280rpx;">{{buttonTitle1}}</wxc-button></view>
      <view style="flex:1;"><wxc-button type="beauty" size="large" @click="publishHouse" btnStyle="height: 300rpx; width: 300rpx; line-height: 280rpx;">{{buttonTitle2}}</wxc-button></view>
    </view>
    <wux-white-space size="large" />
    <wux-white-space size="large" />
    <view style="padding:20rpx 10%;">
      <view style="border:1px solid #ECECEC; padding:15rpx 15rpx;">
        <view style="text-align:center;">
          <view style="color:#333333; font-size:32rpx; text-align:center; display:inline-block;">生成我的邀请二维码</view>
          <view style="display:inline-block; margin-left:5rpx;">      
            <wux-popover placement="topRight" title="邀请须知">
              <view slot="content" style="width:200px; font-size:11px;">
                <view>房东：分享给租客，租客可看到房东所有的房子</view>
                <view>租客：分享给朋友助力，每位可帮砍1%，最高10%</view>
              </view>
              <wux-icon type="md-information-circle" size="16" color="#999999" />
            </wux-popover></view>
        </view>
        <wux-white-space size="default" />
        <view style="color:#999999; font-size:28rpx;text-align:center;">被邀请的人如果发生信用问题，如发布虚假房源，您可能受到影响</view>
      </view>
    </view>
  </view>
</template>

<script>
// import wxFunc from '@/utils/wxFunc'
export default {
  data () {
    return {
      title1: '您需要平台帮您做什么？',
      buttonTitle1: '我要租房子',
      buttonTitle2: '我要发布房源',
      fileList: [{uid: 0,
        status: 'uploading',
        url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg'
      }, {
        uid: 1,
        status: 'done',
        url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg'
      }, {
        uid: 2,
        status: 'error',
        url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg'
      }]
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {
    setData (data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    rentHouse () {
      wx.navigateTo({
        url: '/pages/tenant/main'
      })
    },
    publishHouse () {
      wx.navigateTo({
        url: '../landlord/main'
      })
    }
  }
}
</script>

<style scoped>
.container{
    margin-top:50rpx;
    height: auto;
    overflow: hidden;
    width: 100%;
    color: #EFEFEF
}
.rentHouse, .publishHouse{
    height: 300rpx;
    width: 300rpx;
    line-height: 300rpx;
}
</style>
