<template>
  <div class="container">
    <view class="map_container">
      <map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="14" show-location="true" :markers="markers"></map>
    </view>
    <view style="overflow: hidden; white-space: nowrap;" class="bottomButton">
      <scroll-view scroll-x style="width: auto; overflow:hidden; text-align:center;">
        <view v-for="(item, index) in poiList" :key="item.icon" :data-index='index' hover-class="hover" :data-title="item.title"  @click="onPoi" style="display:inline-block; padding:0 15px;">
          <wux-icon :addon="item.icon" size="25" color="#F5F5F5" :title="item.title"/>
        </view>
      </scroll-view>
    </view>
  </div>
</template>

<script>
var amapFile = require('@/libs/amap-wx.js');
var myAmapFun = new amapFile.AMapWX({key: 'e9c77e7646c0c1bfd59361dae6d10ac6'});

export default {
  data () {
    return {
      markers: [{id:'001', title:'北京市', width:'16', height:'23', latitude:'39.909729', longitude:'116.398419'}],
      latitude: '39.909729',
      longitude: '116.398419',
      textData: {name: '', desc: ''},
      city: '北京市',
      keywords: '',
      poiList: [
        {icon:'icon-xuexiao_xuesheng', title:'学校'},
        {icon:'icon-yiyuan', title:'医院'},
        {icon:'icon-yiliaohangyedeICON-', title:'公交'},
        {icon:'icon-ditie', title:'地铁'},
        {icon:'icon-qiandai', title:'银行'},
        {icon:'icon-yule', title:'娱乐'},
        {icon:'icon-gouwu', title:'购物'},
        {icon:'icon-jianshen', title:'健身'},
        {icon:'icon-meishi', title:'美食'}
      ]
    }
  },

  onLoad (e) {
  },

  components: {
  },

  computed: {
  },

  methods: {
    onPoi (e) {
      var that = this
      console.log(e)
      var params = {
        location: that.longitude + ',' + that.latitude,
        city: that.city,
        citylimit: true,
        querykeywords: e.currentTarget.dataset.title,
          success: function(data) {
            let markers = []
            for (let i = 0; i < data.markers.length; i++) {
                let dis = (data.markers[i].latitude-that.latitude)*(data.markers[i].latitude-that.latitude) + (data.markers[i].longitude-that.longitude)*(data.markers[i].longitude-that.longitude)
                // console.log(dis)
                if (dis < 0.0001) {
                  markers.unshift(data.markers[i])
                }
            }
            // that.markers[0].id = data[0].id
            // that.markers[0].title = data[0].name
            // that.markers[0].longitude = data[0].longitude
            // that.markers[0].latitude = data[0].latitude
            // that.markers[0].iconPath = data[0].iconPath
            // that.markers[0].width = 16
            // that.markers[0].height = 23
            that.markers = markers
            // console.log(markers)
        },
        fail: function(info) {
        }
      }
      myAmapFun.getPoiAround(params)
    }
  }
}
</script>

<style scoped>
.map_container {
  position: absolute;
  top: 0px;
  bottom: 60px;
  left: 0;
  right: 0;
}
.map {
  width: 100%;
  height: 100%;
}
.bottomButton {
  position:absolute;
  bottom:0;
  background-color:#666666;
  padding:10px 0;
  width: 100%;
  height:40px;
}
.hover {
  background-color: #999999;
  opacity:0.4;
}
</style>
