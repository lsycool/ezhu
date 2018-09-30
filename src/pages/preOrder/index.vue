<template>
  <div class="container">
    <view class="head" style="display: block;">
      <view class="zoom" style="display: inline-block; width: 60%;">
        <text class="zoomName" style="padding-left:20rpx;">{{zoomName}}</text>
      </view>
      <view class="userInfo" style="display: inline-block; text-align:right; width:40%">
        <text class="userName">{{userInfo.nickName}}</text>
        <image class="avatar" :src="userInfo.avatarUrl"/>
      </view>
    </view>
    <view style="margin: 20px 50px;">
      <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
        <block v-for="(item, index) in movies" :key="item.id" :data-index='index'>     
          <swiper-item>
            <image :src="item.url" class="slide-image" mode="aspectFill"/>
          </swiper-item>        
        </block>
      </swiper>
    </view>
    <scroll-view class='scroll' scroll-y="true" :style="{height: scrollHeight + 'px', 'margin-top': '20px', 'margin-left': '20px'}">
      <view style='overflow: hidden; width:500rpx; padding:10px 0;' v-for="(item, index) in roomsInfo" :key="item.id" :data-index='index'>
        <text style="font-size:14px; font-weight:bold;">{{item.name}}</text>
        <swiper class="room" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
          <block v-for="(url, index2) in item.images" :key="index2" :data-index='index2'>     
            <swiper-item>
              <image :src="url" class="slide-image" mode="aspectFit"/>
            </swiper-item>        
          </block>
        </swiper>
        <button @click.stop="order" class='confirm' :class="{ordered: item.state === '已预定'}">{{item.state}}</button>
      </view>
    </scroll-view>
    <tabBarSelect :selectNavIndex='-1' :navList='navList'></tabBarSelect>
  </div>
</template>

<script>
import util from '@/utils/index'
import tabBarSelect from '@/components/tabbar'
import globalStore from '@/stores/global-store'

export default {
  data () {
    return {
      zoomName: '',
      userInfo: {},
      scrollHeight: 300,
      navList: globalStore.state.tabBarList.navList,
      movies: [
        {id: '1', url: '../../../static/images/swiper1.jpg'},
        {id: '2', url: '../../../static/images/swiper2.jpg'},
        {id: '3', url: '../../../static/images/swiper1.jpg'},
        {id: '4', url: '../../../static/images/swiper2.jpg'}
      ],
      roomsInfo: [
        {id: '1', name: '卧室1', images: ['../../../static/images/swiper1.jpg', '../../../static/images/swiper2.jpg'], state: '预定'},
        {id: '2', name: '卧室2', images: ['../../../static/images/swiper1.jpg'], state: '预定'},
        {id: '3', name: '卧室3', images: ['../../../static/images/swiper1.jpg'], state: '已预定'}
      ]
    }
  },

  components: {
    tabBarSelect
  },

  methods: {
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    getScollHeight () {
      util.getWindowRect('.scroll').then((res) => {
        return res.top
      }).then((head) => {
        var windowHeight = wx.getSystemInfoSync().windowHeight
        this.scrollHeight = windowHeight - head
      })
    }
  },

  mounted () {
    this.zooms = globalStore.state.zooms
    this.zoomName = util.getZoomNameById(globalStore.state.zooms, globalStore.state.currentZoom)
    this.userInfo = globalStore.state.userInfo
    this.getScollHeight()
  },

  created () {

  }
}
</script>

<style scoped>
.container{
    height: auto;
    overflow: hidden;
    width: 100%;
    margin-top:40rpx;
}
.userName {
  font-size:30rpx;
  line-height:30rpx;
  margin-right:5px;
}
.avatar {
  vertical-align:middle;
  width:70rpx; 
  height:70rpx; 
  margin-right:20rpx; 
  border-radius:35rpx;
}
.swiper {
  height: 300rpx;
  width: 100%;
}
.slide-image {
  height: 100%;
  width: 100%;
}
.room {
  height:150rpx;
  margin-left:30px;
  margin-top:5px;
}

.confirm {
  width:30px;
  height:10px;
  float: right;
  font-size:6px;
  line-height:10px;
  padding:0;
  margin-top:5px;
  color:white;
  background-color:red;
  border-radius:10px;
}
.ordered {
    background-color:gray;
}
</style>
