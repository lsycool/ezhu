<template>
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
    <view class="panel">
      <view class="panel-hd" style="margin-bottom: 20px">张江高科-光大山湖城 主卧</view>
      <view style="margin-left:-12px;">
        <van-cell-group>
          <van-field :value="detail.prise" readonly use-icon-slot label="价格">
            <wxc-price slot="icon" decimal="none"/>
          </van-field>
          <van-field :value="detail.duwei" readonly use-icon-slot label="独卫">
            <wux-icon addon="icon-weishengjian" slot="icon" color="#999999" size="20"/>
          </van-field>
          <van-field :value="detail.yangtai" readonly use-icon-slot label="阳台">
            <wux-icon addon="icon-yangtai" slot="icon" color="#999999" size="20"/>
          </van-field>
          <van-field :value="detail.chaonan" readonly use-icon-slot label="朝南">
            <wux-icon addon="icon-taiyang" slot="icon" color="#999999" size="20"/>
          </van-field>
          <van-field :value="detail.zhuwo" readonly use-icon-slot label="主卧">
            <wux-icon addon="icon-icond" slot="icon" color="#999999" size="20"/>
          </van-field>
        </van-cell-group>
      </view>
    </view>
    <van-dialog
      title='是否立即预定？'
      async-close
      :show="popupShow"
      show-cancel-button
      show-confirm-button
      @cancel="onCancel"
      @confirm="onConfirm"
    >
    </van-dialog>
    <van-goods-action>
      <van-goods-action-icon icon="wap-home" text="主菜单" @click="onHomePage"/>
      <van-goods-action-icon icon="cart" text="我的预定" info="5" @click="onBooked"/>
      <van-goods-action-button size="mini" text="收藏" type="warning" @click="onFavorite"/>
      <van-goods-action-button size="mini" text="立即预定" @click="onBooking"/>
    </van-goods-action>
  </div>
</template>

<script>
import util from '@/utils/index'
import globalStore from '@/stores/global-store'

export default {
  data () {
    return {
      popupShow: false,
      movies: [
        {id: '1', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338328&di=ae3adf8bee6fbdef4d578690cb7b5ec7&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F17%2F13%2F83658PICb4r_1024.jpg'},
        {id: '2', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338327&di=d5a936ca7dee54b9dd7382fa685b39e3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F44%2F77%2F38f58PICUNG_1024.jpg'},
        {id: '3', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338325&di=0206950cedda9935053ebed8a89f6914&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a39258eddb07a8012049ef53b617.jpg%401280w_1l_2o_100sh.jpg'},
        {id: '4', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338325&di=ba2f03b7c68c01d4904371ecd3c4814d&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F12%2F60%2F26%2F74bOOOPICb4_1024.jpg'}
      ],
      detail:{prise:'1100', duwei:'有', yangtai:'有', chaonan:'是', zhuwo:'是'} 
    }
  },

  methods: {
    previewImage (e) {
      var current = e.target.dataset.src
      console.log(e)
      wx.previewImage({
        current: current,
        urls: [current]
      })
    },
    onBooked() {
      wx.redirectTo({
        url: '../myBooked/main'
      })
    },
    onHomePage() {
      wx.redirectTo({
        url: '../tenant/main'
      })
    },
    onBooking() {
      this.popupShow = true
    },
    onConfirm() {
      this.popupShow = false
      wx.redirectTo({
          url: '../resultSuccess/main?title=' + '预定成功' + '&content=' + '请到我的预定页面查看预定详情' + '&url=../myBooked/main' 
      })
    },
    onCancel () {
      this.popupShow = false
    }
  },

  mounted () {
  },

  onLoad: function (options) {
    
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
