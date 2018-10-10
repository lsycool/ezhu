<template>
  <div class="container">
    <view class="item" v-for='(item, index) of images' :key='index' :data-index='index'>
      <image :style='{width: imageWidth + "px", height: imageWidthpx + "px"}' :src="item" @click="previewImage" mode="aspectFill" />
      <view class="delete" @click='deleteImage' :data-index="index">
        <image :style='{left: (imageWidth / 2 - 10)} + "px"' src="../../static/images/delete.png" />
      </view>
    </view>
    <image :style='{width: imageWidth + "px", height: imageWidth + "px"}' src="../../static/images/plus.png" class="button-upload" bindtap="chooseImage" />
  </div>
</template>

<script>

export default {
  data () {
    return {
      images: [],
      imageWidth: (wx.getSystemInfoSync().windowHeight) / 4 - 10
    }
  },

  components: {
  },

  methods: {
    previewImage () {
      wx.previewImage({
        urls: this.images
      })
    },

    chooseImage () {
      var that = this
      wx.chooseImage({
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
          that.images.concat(tempFilePaths)
        }
      })
    },

    deleteImage (e) {
      var index = e.currentTarget.dataset.index
      var images = this.images
      images.splice(index, 1)
      this.images = images
    }
  }
}
</script>

<style scoped>

</style>
