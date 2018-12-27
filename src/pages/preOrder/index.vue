<template>
<scroll-view scroll-y="true" :style="{height: scrollHeight + 'px', overflow: auto}">
  <div class="container">
    <view class="panel">
      <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
        <block v-for="(item, index) in movies" :key="item.id" :data-index='index'>     
          <swiper-item>
            <image :src="item.url" :data-src="item.url" class="slide-image" mode="aspectFill" @click="previewImage"/>
          </swiper-item>        
        </block>
      </swiper>
    </view>
    <view class="panel" style="margin-bottom:10px;border-bottom:1px solid #ececec;padding-bottom:10px;">
      <view class="panel-hd">张江高科-光大山湖城</view>
      <wxc-flex>
        <view style="flex-grow: 0;">
          <wxc-price class="price-demo" icon="sub">100.02 元/月</wxc-price>
          <wxc-label style="margin-left: 20rpx;">合租</wxc-label>
        </view>
        <view style="flex-grow: 1; text-align:right; line-height:50rpx;" class="price-demo" @click="onTogglePopup">费用详情</view>
      </wxc-flex>
      <van-popup :show="popupShow" @close="onTogglePopup" @click-overlay="onTogglePopup" custom-style="width: 80%;padding: 20px;text-align: center;box-sizing: border-box;padding:20px;border-radius:10px;">
        <view style="text-align:left;">
          <view style="color:#ff4422; font-size:15px; margin-bottom:10px;">押二付一</view>
          <view style="font-size:12px;">押金:4000 水费:30元 电费:100元</view>
        </view>
      </van-popup>
    </view>
    <view class="panel">
      <view style="display:inline-block; width:100%;">
          <view class="labelGroup">
            <view class="labelBlock">张江高科</view>
          </view>
          <view class="labelGroup">
            <view class="labelBlock">光大山湖城</view>
          </view>
            <view class="labelGroup">
          <view class="labelBlock">5室3厅2卫</view>
          </view>
      </view>
      <view style="display:inline-block; width:100%;">
          <view class="labelGroup">
            <view class="labelBlock">面积150平米</view>
          </view>
          <view class="labelGroup">
            <view class="labelBlock">13楼</view>
          </view>
            <view class="labelGroup">
          <view class="labelBlock">电梯房</view>
          </view>
      </view>
      <view style="display:inline-block; width:100%;">
          <view class="labelGroup">
            <view class="labelBlock">坐北朝南</view>
          </view>
      </view>
    </view>
    <view class="panel">
      <view class="panel-hd">房间配置</view>
      <view>
        <wux-grids :bordered='false' col='5'>
            <wux-grid>
                <wux-icon addon="icon-chuang" title="床"/>
            </wux-grid>
            <wux-grid>
                <wux-icon addon="icon-xiyiji" title="洗衣机"/>
            </wux-grid>
            <wux-grid>
                <wux-icon addon="icon-kongtiao" title="空调"/>
            </wux-grid>
            <wux-grid>
                <wux-icon addon="icon-yangtai" disable title="阳台"/>
            </wux-grid>
            <wux-grid>
               <wux-icon addon="icon-bingxiang" title="冰箱"/>
            </wux-grid>
            <wux-grid>
               <wux-icon addon="icon-weishengjian" title="卫生间"/>
            </wux-grid>
            <wux-grid>
               <wux-icon addon="icon-app_icons-" disable title="燃气"/>
            </wux-grid>
            <wux-grid>
               <wux-icon addon="icon-television" title="电视机"/>
            </wux-grid>
            <wux-grid>
               <wux-icon addon="icon-reshui" disable title="热水器"/>
            </wux-grid>
            <wux-grid>
               <wux-icon addon="icon-WIFI" title="宽带"/>
            </wux-grid>
            <wux-grid>
               <wux-icon addon="icon-shafa" title="沙发"/>
            </wux-grid>      
            <wux-grid>
               <wux-icon addon="icon-nuanqi-" title="暖气"/>
            </wux-grid>   
            <wux-grid>
               <wux-icon addon="icon-yigui" title="衣柜"/>
            </wux-grid>         
        </wux-grids>
      </view>
    </view>
    <view class="panel">
      <view class="panel-hd">简介</view>
      <wxc-elip line="3">这是一个大大的好房子,赶快来抢购啊，先到先得，手慢无</wxc-elip>
    </view>
    <view class="panel according-title" style="padding-top:40rpx;">
      <wux-accordion-group accordion>
        <wux-accordion title="卧室详情" titleClass1>
            <wux-grids :bordered='false' col='3'>
              <wux-grid>
                <view @click="openRoomInfo">
                  <view style="padding-right:5px; padding-left:5px;">
                    <image mode='aspectFill' style="height: 90px; width:100px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338328&di=ae3adf8bee6fbdef4d578690cb7b5ec7&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F17%2F13%2F83658PICb4r_1024.jpg" data-src="http://outofmemory.cn/j/tutorial/bootstrap/wp-content/uploads/2014/07/carousalpluginsimple_demo.jpg"/>
                  </view>
                  <view>主卧</view>
                </view>
              </wux-grid>
              <wux-grid>
                <view style="padding-right:5px; padding-left:5px;">
                  <image mode='aspectFill' style="height: 90px; width:100px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338328&di=ae3adf8bee6fbdef4d578690cb7b5ec7&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F17%2F13%2F83658PICb4r_1024.jpg" data-src="http://outofmemory.cn/j/tutorial/bootstrap/wp-content/uploads/2014/07/carousalpluginsimple_demo.jpg"/>
                </view>
                <view>次卧1</view>
              </wux-grid>
              <wux-grid>
                <view style="padding-right:5px; padding-left:5px;">
                  <image mode='aspectFill' style="height: 90px; width:100px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338328&di=ae3adf8bee6fbdef4d578690cb7b5ec7&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F17%2F13%2F83658PICb4r_1024.jpg" data-src="http://outofmemory.cn/j/tutorial/bootstrap/wp-content/uploads/2014/07/carousalpluginsimple_demo.jpg"/>
                </view>
                <view>次卧2</view>
              </wux-grid>
            </wux-grids>
        </wux-accordion>
      </wux-accordion-group>
    </view>
    <view class="panel">
      <view class="panel-hd">周边解读</view>
      <view>
        <map id="map" longitude="113.324520" latitude="23.099994" scale="14"  :markers="markers" :polyline="polyline" show-location style="width: 100%; height: 200px;"></map>
      </view>
    </view>
    <van-goods-action>
      <van-goods-action-icon icon="wap-home" text="主菜单" @click="onHomePage"/>
      <van-goods-action-icon icon="cart" text="我的预定" info="5" @click="onBooked"/>
      <van-goods-action-button size="mini" text="收藏" type="warning" @click="onBooked"/>
      <van-goods-action-button size="mini" text="立即预定" @click="onBooked"/>
    </van-goods-action>
  </div>
  </scroll-view>
</template>

<script>
import util from '@/utils/index'
import globalStore from '@/stores/global-store'

export default {
  data () {
    return {
      zoomName: '',
      scrollHeight: 300,
      active: -1,
      popupShow: false,
      movies: [
        {id: '1', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338328&di=ae3adf8bee6fbdef4d578690cb7b5ec7&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F17%2F13%2F83658PICb4r_1024.jpg'},
        {id: '2', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338327&di=d5a936ca7dee54b9dd7382fa685b39e3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F44%2F77%2F38f58PICUNG_1024.jpg'},
        {id: '3', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338325&di=0206950cedda9935053ebed8a89f6914&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a39258eddb07a8012049ef53b617.jpg%401280w_1l_2o_100sh.jpg'},
        {id: '4', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338325&di=ba2f03b7c68c01d4904371ecd3c4814d&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F12%2F60%2F26%2F74bOOOPICb4_1024.jpg'}
      ],
      markers: [{
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
      }],
      polyline: [{
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229
        }, {
          longitude: 113.324520,
          latitude: 23.21229
        }],
        color:"#FF0000DD",
        width: 2,
        dottedLine: true
      }],
    }
  },

  methods: {
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    getScollHeight () {
      util.getWindowRect('.container').then((res) => {
        return res.top
      }).then((head) => {
        var windowHeight = wx.getSystemInfoSync().windowHeight
        this.scrollHeight = windowHeight - head - 60
      })
    },
    order () {
      wx.navigateTo({
        url: '../contactInfo/main'
      })
    },
    previewImage (e) {
      var current = e.target.dataset.src
      console.log(e)
      wx.previewImage({
        current: current,
        urls: [current]
      })
    },
    onBooked() {
      wx.switchTab({
        url: '../myBooked/main'
      })
    },
    onHomePage() {
      wx.switchTab({
        url: '../tenant/main'
      })
    },
    onTogglePopup() {
      this.popupShow = !this.popupShow;
    },
    openRoomInfo() {
      wx.navigateTo({
        url: '../roomDetail/main'
      })
    }
  },

  mounted () {
    this.zooms = globalStore.state.zooms
    this.zoomName = util.getZoomNameById(globalStore.state.zooms, globalStore.state.currentZoom)
    this.getScollHeight()
  },

  onLoad: function (options) {
    console.log(options)
  }
}
</script>

<style scoped>
.container{
    height: auto;
    overflow: hidden;
    margin:20rpx 40rpx;
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
.labelBlock {
  width:auto;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-wrap:normal;
  height:45rpx;
  display:block;
  text-align:center;
  line-height:45rpx;
  background-color:#f0f2f5;
  border-radius:10rpx;
  border:2rpx solid #f0f2f5;
  box-sizing:border-box;
}
.labelGroup {
  font-size:15px;
  width:auto;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-wrap:normal;
  position:relative;
  height:45rpx;
  color:#232326;
  margin-top:20rpx;
  float:left;
  box-sizing:border-box;
  padding-left:10rpx;
  padding-right:10rpx;
}
.panel-hd {
  padding-top:40rpx;
  padding-bottom:4rpx;
  color:#1c2438;
  font-size:35rpx;
  overflow-x:hidden;
  display:-webkit-box;
  display:-webkit-flex;
  display:flex;
  -webkit-box-align:center;
  -webkit-align-items:center;
  align-items:center;
  font-weight:bold;
}
.panel {
  display: block;
}
.price-demo {
  font-size: 28rpx;
  font-weight: bold;
  color: #ff4422;
}
::-webkit-scrollbar{
  width: 0;
  height: 0;
  color: transparent;
}
</style>
