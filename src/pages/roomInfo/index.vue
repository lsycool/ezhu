<template>
  <div class="container">
    <scroll-view scroll-y="true" :style="{height: scrollHeight + 'px'}">
      <view style="text-align:center; font-weight: bold; margin-bottom:15px;">房屋信息</view>
      <form @submit="formSubmit" @reset="formReset">
        <view style="padding: 3px 10px">
          <view>
            <view style="display:inline-block; font-size:15px;">{{rentType == 0? '卧室数量':'租户数量'}}</view>
            <comboxList :zooms="roomNumList" :fontSize="12" :styleObject="comboxStyle" @getSelectIndex="optionTap"></comboxList>
          </view>
          <view v-for='(item, index) in roomList' :key='item' :data-index='index'>
            <text style="font-size:15px;">{{item.name}}</text>
            <view style="width:95%; height:60px; margin:5px 0;">
              <view v-for='(item1, index1) of item.picList' :key='index1' :data-index='index1' style="width: 60px; height: 60px; margin-right: 3px; font-size:10px; display: inline-block; border: 1px solid gray;">
                <image style="width: 100%; height: 100%; display:block;" :src="item1" :data-src="item1" :data-index="index" @click="previewImage"/>
                <view v-if="index != item.picList.length-1" style="width: 100%;" class="delete" @click='deleteImage' :data-index="index">
                  <image mode='aspectFill' style="display:block; margin:0 auto;" src="../../static/images/delete.png" />
                </view>
              </view>
          </view>
          </view>
        </view>
      </form>
    </scroll-view>
  </div>
</template>

<script>
import comboxList from '@/components/combox'
import util from '@/utils/index'

export default {
  data () {
    return {
      rentType: 0,
      rentNum: 1,
      images: [],
      scrollHeight: 800,
      comboxStyle: util.styles({width: '60px', height: '40px', margin: '0 20rpx', display: 'inline-block', 'vertical-align': 'middle'}),
      roomNumList: [{id: 0, name: 1}, {id: 1, name: 2}, {id: 2, name: 3}, {id: 2, name: 4}, {id: 2, name: 5}]
      // roomList: [{id: 0, name: '卧室一', picList: ['../../static/images/plus2.png'], duwei: 0, yangtai: 0, chaonan: 0, zhuwo: 0}]
    }
  },

  components: {
    comboxList
  },

  computed: {
    roomList: function () {
      let list = new Array(this.rentNum)
      for (let i = 0; i < list.length; i++) {
        list[i] = {id: i, name: '卧室' + (i + 1), picList: ['../../static/images/plus2.png'], duwei: 0, yangtai: 0, chaonan: 0, zhuwo: 0}
      }
      return list
    }
  },

  methods: {
    previewImage (e) {
      let current = e.target.dataset.src
      let index = e.target.dataset.index
      if (current !== '../../static/images/plus2.png') {
        wx.previewImage({
          current: current,
          urls: [current]
        })
      } else {
        this.chooseImage(index)
      }
    },
    chooseImage (index) {
      let that = this
      console.log(that.roomList[index].picList)
      if (that.roomList[index].picList.length < 4) {
        wx.chooseImage({
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            let tempFilePaths = res.tempFilePaths
            for (let p in tempFilePaths) {
              if (that.roomList[index].picList.length < 4) {
                that.roomList[index].picList.unshift(tempFilePaths[p])
              }
            }
          }
        })
      } else {
        wx.showToast({
          title: '最多只能上传8张图片',
          icon: 'none',
          duration: 10000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }
    },
    deleteImage (e) {
      var index = e.currentTarget.dataset.index
      this.pictureList.splice(index, 1)
    },
    optionTap: function (index) {
      this.rentNum = index + 1
    }
  }
}
</script>

<style scoped>
.delete {
  margin-top:-20px;
  height: 20px;
  bottom: 0;
  width: 100%;
  background: #ccc;
  opacity: .6;
  text-align:center;
}
.delete image {
  width: 20px;
  height: 20px;
  opacity: .8;
}
</style>
