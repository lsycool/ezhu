<template>
  <div class="container" @click.stop="hidePopBox">
    <view class="head" style="display: block;">
      <view class="zoom" style="display: inline-block; width: 60%;">
        <text class="zoomName" style="padding-left:20rpx;">{{zoomName}}</text>
        <picker @change="reChoose" :value="zoomIndex" :range="zooms" range-key="name" style="width:150rpx; display:inline-block;">
          <text class="reChoose" style="margin-left: 20rpx; font-weight:bold; color:#336699">切换</text>
        </picker>
      </view>
      <view class="userInfo" style="display: inline-block; text-align:right; width:40%">
        <text class="userName">{{userInfo.nickName}}</text>
        <img class="avatar" :src="userInfo.avatarUrl"/>
      </view>
    </view>
    <view class="filter" style="margin-top:20px; margin-left:20rpx">
      <view class="rentType" style="display: flex; flex-direction:row;">
        <text :class="{clicked:rentType == 0}" style="font-weight:bold;" @click="zhenZu">整租</text>
        <text :class="{clicked:rentType == 1}" style="margin-left: 60rpx; font-weight:bold;" @click="heZu">合租</text>
      </view>
      <view class="priseAndType" style="display: inline-block; margin-top:15px; z-index:999;">
        <view class="priseRange" style="vertical-align:middle; display:inline-block;">
          <text class="infoTitle">价格</text>
          <comboxList ref="comb1" :zooms="priseRange" :fontSize="12" :isShow="showPopBox" :imageStyle="imageStyle" :styleObject="comboxStyle" @getSelectIndex="optionTapBottom"></comboxList>
          <text class="infoTitle">到</text>
          <comboxList ref="comb2" :zooms="priseRange" :fontSize="12" :imageStyle="imageStyle" :styleObject="comboxStyle" @getSelectIndex="optionTapTop"></comboxList>
        </view>
        <view class="houseType" style="vertical-align:middle; display:inline-block; margin-left: 20px; visible:hidden;">
          <text class="infoTitle">户型</text>
          <comboxList ref="comb3" :zooms="houseType" :fontSize="12" :imageStyle="imageStyle" :styleObject="houseTypeComboxStyle" @getSelectIndex="optionTapBottom" ></comboxList>
        </view>
      </view>
    </view>
    <view class="houseDetail">
      <scroll-view scroll-y="true" :style="{height: scrollHeight + 'px', padding:'10px'}">
        <view v-for='(item, index) of houseList' :key='item.id' :data-index='index' style="font-size:10px; width:95%; display: flex; margin-bottom:15px;">
            <img style="height: 70px; margin-right: 5px; flex: 1;" src="../../../static/images/slide.png" data-src="http://outofmemory.cn/j/tutorial/bootstrap/wp-content/uploads/2014/07/carousalpluginsimple_demo.jpg" @click="previewImage"/>
            <view style="flex:3;" @click="preOrder">
              <text class="profile">{{item.abstract}}</text>
              <view>
                <text class="prise">{{item.prise + '元/月'}}</text>
                <text v-if="rentType == 1" class="amount">{{item.amount + '人/合租'}}</text>
              </view>
            </view>
        </view>
      </scroll-view>
    </view>
    <tabBarSelect :selectNavIndex='0' :navList='navList'></tabBarSelect>
  </div>
</template>

<script>
import globalStore from '@/stores/global-store'
import util from '@/utils/index'
import comboxList from '@/components/combox'
import tabBarSelect from '@/components/tabbar'

export default {
  data () {
    return {
      zooms: [],
      zoomName: '',
      zoomIndex: 0,
      buttonTitle1: '切换',
      userInfo: {},
      rentType: 1,
      priseBottom: 0,
      priseTop: 10000,
      priseRange: [{id: 0, name: '500￥'}, {id: 1, name: '1000￥'}, {id: 2, name: '3000￥'}, {id: 3, name: '5000￥'}],
      houseType: [{id: 0, name: '一室一厅'}, {id: 0, name: '两室一厅'}, {id: 0, name: '三室一厅'}, {id: 0, name: '三室两厅'}],
      comboxStyle: util.styles({width: '60px', height: '40px', margin: '0 20rpx', display: 'inline-block', 'vertical-align': 'middle'}),
      houseTypeComboxStyle: util.styles({width: '80px', height: '40px', margin: '0 20rpx', display: 'inline-block', 'vertical-align': 'middle'}),
      imageStyle: util.styles({display: 'none'}),
      houseList: [{id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house good house good house good house good house good house', amount: '10'},
        {id: 0, prise: 1000, abstract: '这是一个大大大大哒哒哒哒哒哒哒哒哒哒的好房子', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 0, prise: 1000, abstract: 'good house', amount: '10'}],
      scrollHeight: 0,
      navList: globalStore.state.tabBarList.navList
    }
  },
  components: {
    comboxList,
    tabBarSelect
  },
  computed: {
  },
  onLoad () {
    // util.editTabBar() // 添加tabBar数据
  },
  onShow () {
    wx.hideTabBar({
      animation: false
    })
  },
  mounted () {
    this.zooms = globalStore.state.zooms
    this.zoomName = util.getZoomNameById(this.zooms, globalStore.state.currentZoom)
    this.userInfo = globalStore.state.userInfo
    this.getScollHeight()
    console.log(this.$root.$mp)
    console.log(this.$root.$mp.query)
    console.log(this.$root.$mp.appOptions)
  },
  methods: {
    reChoose (e) {
      let index = e.mp.detail.value
      this.zoomIndex = index
      this.zoomName = this.zooms[index].name
    },
    zhenZu () {
      this.rentType = 0
    },
    heZu () {
      this.rentType = 1
    },
    optionTapBottom (index) {
      this.priseBottom = index
    },
    optionTapTop (index) {
      this.priseTop = index
    },
    hidePopBox () {
      this.$nextTick(() => {
        this.$refs.comb1.hidePopBox()
        this.$refs.comb2.hidePopBox()
        this.$refs.comb3.hidePopBox()
      })
    },
    getScollHeight () {
      util.getWindowRect('.houseDetail').then((res) => {
        return res.top
      }).then((head) => {
        var windowHeight = wx.getSystemInfoSync().windowHeight
        this.scrollHeight = windowHeight - head + 45
      })
    },
    clickIndexNav () {

    },
    preOrder () {
      wx.navigateTo({
        url: '../preOrder/main'
      })
    },
    previewImage (e) {
      var current = e.target.dataset.src
      wx.previewImage({
        current: current,
        urls: [current]
      })
    }
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
.clicked {
  color:#336699
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
.combox {
  width:150rpx;
  height:80rpx;
  margin:0 20rpx;
  display:inline-block;
  vertical-align:middle;
}
.infoTitle {
  font-size:15px;
}
.prise {
  display:inline-block;
  color:brown;
  margin-right: 10px;
  font-size: 14px;
}
.profile {
  display: -webkit-box;
  font-size: 16px;
  height:48px;
  margin-bottom: 5px;
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.amount {
  display: inline-block;
  font-size: 13px;
  color: gray
}
.confirm {
  width:30px;
  height:10px;
  font-size:6px;
  line-height:10px;
  padding:0;
  display: inline-block;
  color:white;
  background-color:red;
  border-radius:10px;
}
</style>
