<template>
  <view class="container">
    <view class="section">
      <input @input="bindInput" placeholder="搜索" focus="true" />
    </view>
    <view v-for='(item, index) of tips' :key="index" :data-index='index' @touchstart="bindSearch" :data-keywords="item.name" :data-location="item.location" class="text_box">
      {{item.name}}
    </view>
  </view>
</template>

<script>
var amapFile = require('@/libs/amap-wx.js');

export default {
  data () {
    return {
      tips: {},
      lonlat: '',
      city: ''
    }
  },
  onLoad: function(e){
    this.lonlat = e.lonlat;
    this.city = e.city;
  },
  onShow () {
    wx.hideTabBar({
      animation: false
    })
  },
  methods: {
    bindInput: function(e){
      var that = this;
      var keywords = e.mp.detail.value; 
      var myAmapFun = new amapFile.AMapWX({key: 'e9c77e7646c0c1bfd59361dae6d10ac6'});
      myAmapFun.getInputtips({
        keywords: keywords,
        location: that.lonlat,
        city: that.city,
        success: function(data){
          if(data && data.tips){
            that.tips = data.tips
          }
        }
      })
    },
    bindSearch: function(e){
      var keywords = e.mp.target.dataset.keywords
      var location = e.mp.target.dataset.location
      // console.log(keywords + ' ' + location)
      var url = '../searchZoom/main?keywords=' + keywords + '&location=' + location;
      wx.redirectTo({
        url: url
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
}
.section{
  height: 35px;
  width: 100%;
}
.section input{
  width:90%;
  margin:5px auto;
  border:1px solid #c3c3c3;
  height:30px;
  border-radius: 3px;
  padding: 0 5px;
}
.text_box{
  margin: 10px 25px;
  border-bottom:1px solid #c3c3c3;
  padding-bottom:10px
}
</style>
