<template>
  <div class="container">
    <view class="section">
      <input :data-city="city" :value="keywords" :data-longitude="longitude" :data-latitude="latitude" @touchstart="bindInput" placeholder="搜索"/>
    </view>
    <view class="map_container">
      <map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="14" show-location="true" :markers="markers"></map>
    </view>
    <view class="map_text">
      <view style="flex:2">
        <text class="h1">{{textData.name}}</text>
        <text>{{textData.desc}}</text>
      </view>
      <view style="flex:1; text-align:center; margin:auto;">
        <wxc-button btnStyle="height:100rpx; line-height:100rpx" size="normal" type="beauty" value="确认" @click="onConfirm"></wxc-button>
      </view>
    </view>
  </div>
</template>

<script>
var amapFile = require('@/libs/amap-wx.js');

export default {
  data () {
    return {
      markers: [{id:'001', title:'北京市', width:'', height:'', latitude:'39.909729', longitude:'116.398419', iconPath:'../../static/images/marker.png'}],
      latitude: '39.909729',
      longitude: '116.398419',
      textData: {name: '', desc: ''},
      city: '北京市',
      keywords: ''
    }
  },

  onLoad (e) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key: 'e9c77e7646c0c1bfd59361dae6d10ac6'});
    var params = {
      // iconPath: '../../static/images/marker.png',
      success: function(data) {
        that.markers[0].id = data[0].id
        that.markers[0].title = data[0].name
        that.markers[0].longitude = data[0].longitude
        that.markers[0].latitude = data[0].latitude
        that.markers[0].iconPath = data[0].iconPath
        that.markers[0].width = 16
        that.markers[0].height = 23
        that.showMarkerInfo(data[0]);
        // console.log(that.markers)
      },
      fail: function(info) {
        // wx.showModal({title:info.errMsg})
      }
    }
    if(e) {
      that.keywords = e.keywords
      params.location = e.location
    }
    // console.log(params)
    myAmapFun.getRegeo(params)
  },

  components: {
  },

  computed: {
  },

  methods: {
    bindInput (e){
      var that = this;
      var url = '../inputtips/main';
      if(e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city){
        var dataset = e.target.dataset;
        url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude + '&city=' + dataset.city;
      }
      console.log(e)
      wx.redirectTo({
        url: url
      })
    },
    showMarkerInfo (data) {
      var that = this;
      that.latitude = data.latitude
      that.longitude = data.longitude
      that.textData.name = data.name
      that.textData.desc = data.desc
      // console.log(data)
    },
    onConfirm () {
      let keywords = this.keywords
      if (!keywords) {
        keywords = this.textData.name
      }
      wx.redirectTo({
        url: '../landlord/main?latitude=' + this.latitude + '&longitude=' + this.longitude + '&keywords=' + keywords
      })
    }
  }
}
</script>

<style scoped>
.section{
  height: 30px;
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
.map_container{
  position: absolute;
  top: 42px;
  bottom: 80px;
  left: 0;
  right: 0;
}
.map{
  width: 100%;
  height: 100%;
}
.map_text{
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  height: 80px;
  background: #fff;
  padding: 0 15px;
}
text{
  margin: 5px 0;
  display: block;
  font-size:12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.h1{
  margin: 15px 0;
  font-size:15px;
}
</style>
