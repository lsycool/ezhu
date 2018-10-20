<template>
  <div class="container">
    <scroll-view scroll-y="true" :style="{height: scrollHeight + 'px'}">
      <view style="text-align:center; font-weight: bold; margin-bottom:15px;">房屋信息</view>
      <form @submit="formSubmit">
        <view style="padding: 3px 10px">
          <view>
            <view style="display:inline-block; font-size:15px;">{{rentType == 0? '卧室数量':'租户数量'}}</view>
            <comboxList :zooms="roomNumList" :fontSize="12" :styleObject="comboxStyle" @getSelectIndex="optionTap"></comboxList>
          </view>
          <view v-for='(item, index) in roomList' :key='item' :data-index='index' style="margin-bottom:10px;">
            <text style="font-size:15px;">{{item.name}}</text>
            <view style="width:95%; margin:5px 0; font-size:10px;">
              <view v-for='(item1, index1) of item.picList' :key='index1' :data-index='index1' style="width: 60px; height: 60px; margin-right: 3px; margin-bottom:5px; font-size:10px; display: inline-block; border: 1px solid gray;">
                <image style="width: 100%; height: 100%; display:block;" :src="item1" :data-src="item1" :data-index="index" @click="previewImage"/>
                <view v-if="index1 != item.picList.length-1" style="width: 100%;" class="delete" @click='deleteImage' :data-index="index">
                  <image mode='aspectFill' style="display:block; margin:0 auto;" src="../../static/images/delete.png" />
                </view>
              </view>
              <checkbox-group @change="facilities">
                <checkbox value="0" style="margin-left:2px;"/>有独卫
                <checkbox value="0" style="margin-left:2px;"/>有阳台
                <checkbox value="0" style="margin-left:2px;"/>房间朝南
                <checkbox value="0" style="margin-left:2px;"/>主卧
              </checkbox-group>
              <view style="margin-top:5px;">
                <view v-if="rentType != 0" style="display:inline-block; margin-right: 10px;"><text style="margin-right: 3px; font-size:15px; vertical-align:middle;">期望租金</text><input placeholder='￥' style="border:1px solid gray; width:100px; vertical-align:middle; display:inline-block;"></input></view>
                <view style="display:inline-block;"><text style="margin-right: 3px; font-size:15px; vertical-align:middle;">房间面积</text><input placeholder='平方米' style="border:1px solid gray; width:100px; vertical-align:middle; display:inline-block;"></input></view>
              </view>
          </view>
          </view>
        </view>
        <view style="text-align:center; margin-top: 20px;">
          <button class="button" formType="submit" style="width:100px;">提交</button>
        </view>
      </form>
    </scroll-view>
    <tabBarSelect :selectNavIndex='0' :navList='navList'></tabBarSelect>
  </div>
</template>

<script>
import comboxList from '@/components/combox'
import globalStore from '@/stores/global-store'
import tabBarSelect from '@/components/tabbar'
import util from '@/utils/index'

export default {
  data () {
    return {
      rentNum: 1,
      scrollHeight: 800,
      rentType: globalStore.state.rentType,
      navList: globalStore.state.tabBarList.navList2,
      comboxStyle: util.styles({width: '60px', height: '40px', margin: '0 20rpx', display: 'inline-block', 'vertical-align': 'middle'}),
      roomNumList: [{id: 0, name: 1}, {id: 1, name: 2}, {id: 2, name: 3}, {id: 2, name: 4}, {id: 2, name: 5}]
    }
  },

  onShow () {
    this.$forceUpdate()
  },

  mounted () {
    this.scrollHeight = wx.getSystemInfoSync().windowHeight - 50
  },

  components: {
    comboxList,
    tabBarSelect
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
            that.$forceUpdate()
          }
        })
      } else {
        wx.showToast({
          title: '最多只能上传3张图片',
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
      this.roomList[index].picList.splice(index, 1)
      this.$forceUpdate()
    },
    optionTap (index) {
      this.rentNum = index + 1
      globalStore.commit('setRentType', index)
      console.log('setRentType' + globalStore.state.rentType)
    },
    formSubmit (e) {
      console.log('roomInfo')
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
  opacity: .6;
  text-align:center;
}
.delete image {
  width: 20px;
  height: 20px;
  opacity: .8;
}
.button {
  color:white;
  background-color:rgb(0, 102, 255);
  border-radius:10px;
}
</style>
