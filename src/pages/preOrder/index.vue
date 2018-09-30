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
        {id: '1', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338328&di=ae3adf8bee6fbdef4d578690cb7b5ec7&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F17%2F13%2F83658PICb4r_1024.jpg'},
        {id: '2', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338327&di=d5a936ca7dee54b9dd7382fa685b39e3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F44%2F77%2F38f58PICUNG_1024.jpg'},
        {id: '3', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338325&di=0206950cedda9935053ebed8a89f6914&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a39258eddb07a8012049ef53b617.jpg%401280w_1l_2o_100sh.jpg'},
        {id: '4', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338325&di=ba2f03b7c68c01d4904371ecd3c4814d&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F12%2F60%2F26%2F74bOOOPICb4_1024.jpg'}
      ],
      roomsInfo: [
        {id: '1', name: '卧室1', images: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338325&di=fcf0d2435889f303f320161514d95952&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F34%2F62%2F39S58PIC9jV_1024.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338325&di=ba2f03b7c68c01d4904371ecd3c4814d&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F12%2F60%2F26%2F74bOOOPICb4_1024.jpg'], state: '预定'},
        {id: '2', name: '卧室2', images: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338325&di=fcf0d2435889f303f320161514d95952&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F34%2F62%2F39S58PIC9jV_1024.jpg'], state: '预定'},
        {id: '3', name: '卧室3', images: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338325&di=fcf0d2435889f303f320161514d95952&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F34%2F62%2F39S58PIC9jV_1024.jpg'], state: '已预定'}
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
        this.scrollHeight = windowHeight - head - 60
        console.log(head)
        console.log(windowHeight)
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
    margin-top:20rpx;
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
