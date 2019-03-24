<template>
  <div class="container" :style="{'margin-bottom':bottomHeight}">
    <!-- <scroll-view scroll-y="true" :style="{height: scrollHeight + 'px', overflow: 'auto'}"> -->
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
          <wxc-label style="margin-left: 20rpx;">{{rentName}}</wxc-label>
          <wxc-label v-if="isPinZu" type="fill" style="margin-left: 20rpx;" @click="showPinZu">拼租</wxc-label>
        </view>
        <view style="flex-grow: 1; text-align:right; line-height:50rpx;" class="price-demo" @click="onTogglePopup">费用详情</view>
      </wxc-flex>
      <van-popup :show="popupShow" @close="onTogglePopup" @click-overlay="onTogglePopup" custom-style="width: 80%;padding: 20px;text-align: center;box-sizing: border-box;padding:20px;border-radius:10px;">
        <view style="text-align:left;">
          <view style="color:#ff4422; font-size:15px; margin-bottom:10px;">押二付一</view>
          <view style="font-size:12px;">押金:4000 民水民电</view>
        </view>
      </van-popup>
    </view>
    <view class="panel" style="overflow:hidden; clear:both;">
        <block v-for="(item, index) in labels" :key="index" :data-index='index'>
          <view class="labelGroup" style="width:33%">
            <view class="labelBlock">{{item}}</view>
          </view>
        </block>
    </view>
    <view class="panel">
      <view class="panel-hd">房间配置</view>
      <view>
        <wux-grids :bordered='false' col='5'>
          <block v-for="(item, index) in Infrastructure" :key="item.icon" :data-index='index'>
            <wux-grid v-if="index < 5">
              <wux-icon :addon="item.icon" :title="item.title" :disable="item.isDisable"/>
            </wux-grid>
            <wux-grid v-else-if="showMore">
              <wux-icon :addon="item.icon" :title="item.title" :disable="item.isDisable"/>
            </wux-grid>
          </block>
        </wux-grids>
        <block v-if="Infrastructure.length > 5">
          <view v-if="showMore" style="text-align:center; font-size:24rpx; color:#FF5777; background:#EFEFEF; padding:10rpx 0;" @click='listToggle'>收起</view>
          <view wx:else style="text-align:center; font-size:24rpx; color:#FF5777; background:#EFEFEF; padding:10rpx 0;" @click='listToggle'>查看更多</view>
        </block> 
      </view>
    </view>
    <view class="panel">
      <view class="panel-hd" style="padding-bottom:10px;">简介</view>
      <wxc-elip line="3" style="font-size:30rpx;">这是一个大大的好房子,赶快来抢购啊，先到先得，手慢无</wxc-elip>
    </view>
    <view class="panel according-title" style="padding-top:40rpx;" v-if="'1' == rentType">
      <wux-accordion-group accordion :default-current="['0']">
        <wux-accordion title="选择卧室" titleClass1>
            <wux-grids :bordered='false' col='3'>
              <wux-grid>
                <view @click="openRoomInfo">
                  <view style="padding-right:5px; padding-left:5px;">
                    <image mode='aspectFill' style="height: 90px; width:100px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338328&di=ae3adf8bee6fbdef4d578690cb7b5ec7&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F17%2F13%2F83658PICb4r_1024.jpg" data-src="http://outofmemory.cn/j/tutorial/bootstrap/wp-content/uploads/2014/07/carousalpluginsimple_demo.jpg"/>
                  </view>
                  <view style="display:inline-block;">主卧</view><view style="display:inline-block; margin-left:8rpx; font-size:22rpx" class="price-demo">1000<wxc-price decimal="none" icon="sub"/>/月</view>
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
    <view class="panel" style="">
      <view class="panel-hd">租客要求</view>
      <view style="overflow:hidden;">
        <view class="labelGroup">
          <view class="labelBlock">女性</view>
        </view>
        <view class="labelGroup">
          <view class="labelBlock">不养宠物</view>
        </view>
        <view class="labelGroup">
          <view class="labelBlock">不带小孩</view>
        </view>
        <view class="labelGroup">
          <view class="labelBlock">爱干净</view>
        </view>
      </view>
    </view>
    <view class="panel">
      <view class="panel-hd">周边解读</view>
      <view @click="onPOIAround">
        <image mode='aspectFill' style="height: 200px; width:100%;" :src="mapImage"/>
      </view>
    </view>
    <view style="height: 50px" v-if="systemInfo.platform == 'ios'">
    </view>
    <van-goods-action v-if="'0' == rentType">
      <van-goods-action-icon icon="wap-home" text="主菜单" @click="onHomePage"/>
      <van-goods-action-icon icon="cart" text="我的预定" info="5" @click="onBooked"/>
      <van-goods-action-button size="mini" :text="isFavorite? '已收藏':'收藏'" :type="isFavorite? 'primary':'warning'" @click="onFavorite"/>
      <van-goods-action-button size="mini" text="立即预定" @click="onBooking"/>
    </van-goods-action>
  <!-- </scroll-view> -->
  </div>
</template>

<script>
import util from '@/utils/index'
import globalStore from '@/stores/global-store'
var amapFile = require('@/libs/amap-wx.js');

export default {
  data () {
    return {
      zoomName: '',
      scrollHeight: 300,
      active: -1,
      popupShow: false,
      rentType: '0',
      rentName: '',
      isFavorite: false,
      movies: [
        {id: '1', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338328&di=ae3adf8bee6fbdef4d578690cb7b5ec7&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F17%2F13%2F83658PICb4r_1024.jpg'},
        {id: '2', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338327&di=d5a936ca7dee54b9dd7382fa685b39e3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F44%2F77%2F38f58PICUNG_1024.jpg'},
        {id: '3', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338325&di=0206950cedda9935053ebed8a89f6914&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a39258eddb07a8012049ef53b617.jpg%401280w_1l_2o_100sh.jpg'},
        {id: '4', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338325&di=ba2f03b7c68c01d4904371ecd3c4814d&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F12%2F60%2F26%2F74bOOOPICb4_1024.jpg'}
      ],
      Infrastructure:[
        {icon:'icon-chuang', title:'床'},
        {icon:'icon-xiyiji', title:'洗衣机'},
        {icon:'icon-kongtiao', title:'空调'},
        {icon:'icon-yangtai', title:'阳台'},
        {icon:'icon-bingxiang', title:'冰箱'},
        {icon:'icon-weishengjian', title:'卫生间'},
        {icon:'icon-app_icons-', title:'燃气'},
        {icon:'icon-television', title:'电视'},
        {icon:'icon-reshui', title:'热水器', isDisable:true},
        {icon:'icon-WIFI', title:'宽带'},
        {icon:'icon-shafa', title:'沙发'},
        {icon:'icon-nuanqi-', title:'暖气', isDisable:true},
        {icon:'icon-yigui', title:'衣柜'},
      ],
      isPinZu: false,
      labels: ['5室3厅2卫', '面积150平米', '15楼'],
      showMore: false,
      mapImage: '',
      systemInfo:{},
      latitude: '23.099994',
      longtitude: '113.324520'
    }
  },

  computed: {
    bottomHeight: function () {
      return this.rentType == '0'? '60px':'10px';
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
        this.scrollHeight = windowHeight - head
        if ('0' == this.rentType) {
          this.scrollHeight += (-60)
        }
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
      wx.navigateTo({
        url: '../myBooked/main'
      })
    },
    onHomePage() {
      wx.reLaunch({
        url: '../tenant/main'
      })
    },
    onBooking() {
      wx.showModal({
        title: '',
        content: '是否立即预定？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
                url: '../resultSuccess/main?title=' + '预定成功' + '&content=' + '请到我的预定页面查看预定详情' + '&url=../myBooked/main' 
            })
          } else if (res.cancel) {
          }
        }
      })
    },
    onFavorite () {
      this.isFavorite = !this.isFavorite
      let title = this.isFavorite? '收藏成功':'取消收藏成功'
      wx.showToast({
        title: title,
        icon: 'none'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    },
    onTogglePopup() {
      this.popupShow = !this.popupShow;
    },
    openRoomInfo() {
      wx.navigateTo({
        url: '../roomDetail/main'
      })
    },
    listToggle: function () {
      this.showMore = !this.showMore
    },
    showPinZu (e) {
      wx.showModal({
          title: '拼租说明',
          content: '详情',
          showCancel: false
      })
    },
    onPOIAround (e) {
      wx.navigateTo({
        url: '../poiAround/main'
      })    
    }
  },

  mounted () {
    this.zooms = globalStore.state.zooms
    this.zoomName = util.getZoomNameById(globalStore.state.zooms, globalStore.state.currentZoom)
    this.getScollHeight()
    var that = this

    wx.getSystemInfo({
      success:function(res){
        that.systemInfo = res
      }
    })
  },

  onLoad: function (options) {
    this.popupShow = false;
    this.rentType = options.rentType
    if (0 == this.rentType) {
      this.rentName = '整租'
    } else if (1 == this.rentType) {
      this.rentName = '合租'
      this.isPinZu = options.isPinZu
    } else if (2 == this.rentType) {
      this.rentName = '懒人'
    }
    if (options.latitude && options.longtitude) {
      this.latitude = options.latitude
      this.longtitude = options.longtitude
    }
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key: 'e9c77e7646c0c1bfd59361dae6d10ac6'});
    myAmapFun.getStaticmap({
      zoom: 17,
      location: that.longtitude + ',' + that.latitude,
      markers: "small,0xFF0000,:" + that.longtitude + ',' + that.latitude,
      labels: "光大山湖城" + ",1,0,16,0xFFFFFF,0xFF5777:" + that.longtitude + ',' + that.latitude,
      success: function(data) {
        that.mapImage = data.url
      },
      fail: function(info){
        console.log(info)
      }
    })
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
