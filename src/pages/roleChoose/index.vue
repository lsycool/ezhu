<template>
  <view class="container">
    <view class="title1" style="font-size:40rpx; font-weight:bold; margin-left:50rpx;">
      <text class="name">{{title1}}</text>
    </view>
    <view class="button1" style="flex-direction:row; display: flex; margin-top:60rpx;">
      <button  class="rentHouse" @click="rentHouse" type="primary">{{buttonTitle1}}</button>
      <button  class="publishHouse" @click="publishHouse" type="primary">{{buttonTitle2}}</button>
    </view>
    <view>
      <view>
        <text>生成我的邀请二维码</text>
      </view>
      <view>
        <text>
          备注：被邀请的人如果发生信用问题，如发布虚假房源，您可能受到影响
        </text>
      </view>
      <wux-upload list-type="picture-card" :show-upload-list="true" url="">
          <image :src="imageUrl"/>
          <text>Upload</text>
      </wux-upload>
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
      wx.switchTab({
        url: '../zoomChoose/main'
      })
    },
    publishHouse () {
      wx.switchTab({
        url: '../landlord/main'
      })
    },
    onChange (e) {
      console.log('onChange', e)
      const { file } = e.detail
      if (file.status === 'uploading') {
        this.setData({
          progress: 0
        })
        wx.showLoading()
      } else if (file.status === 'done') {
        this.setData({
          imageUrl: file.url
        })
      }
    },
    onSuccess (e) {
      console.log('onSuccess', e)
    },
    onFail (e) {
      console.log('onFail', e)
    },
    onComplete (e) {
      console.log('onComplete', e)
      wx.hideLoading()
    },
    onProgress (e) {
      console.log('onProgress', e)
      this.setData({
        progress: e.detail.file.progress
      })
    },
    onPreview (e) {
      console.log('onPreview', e)
      const { file, fileList } = e.detail
      wx.previewImage({
        current: file.url,
        urls: fileList.map((n) => n.url)
      })
    },
    onRemove (e) {
      const { file, fileList } = e.detail
      wx.showModal({
        content: '确定删除？',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              fileList: fileList.filter((n) => n.uid !== file.uid)
            })
          }
        }
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
    color: #EFEFEF
}
.rentHouse, .publishHouse{
    height: 300rpx;
    width: 300rpx;
    line-height: 300rpx;
}
</style>
