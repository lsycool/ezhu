<template>
  <div class="container">
    <view class="weui-navbar">
        <block v-for='(item, index) of tabs' :key="index" :data-index='index'>
            <view :data-id="index" class="weui-navbar__item" :class="activeIndex == index ? 'weui-bar__item_on' : '' " @click="onTabClick">
                <view class="weui-navbar__title">{{ item }}</view>
            </view>
        </block>
        <view class="weui-navbar__slider" :style="{left: sliderLeft + 'px', transform: 'translateX(' + sliderOffset + 'px)', '-webkit-transform': 'translateX(' + sliderOffset + 'px)'}"></view>
    </view>
    <view>
      <view class="weui-tab__panel">
        <view class="weui-tab__content" :hidden="activeIndex !== 0">
          <view v-for='(item, index) of books' :key='index' :data-index='index'>
            <view style="height:20rpx; background:#EFEFEF"></view>
            <view class="list-item">
              <view class="bookTitle" style="font-weight:bold; color:#455A64; padding-bottom:15rpx; margin: 20rpx 40rpx; font-size:24rpx; display:flex; border-bottom:1rpx solid #ECECEC;">
                <view style="flex:2">
                  <wux-icon size="16" type="md-list-box" color='#666666' />
                  <text style="margin-left:10rpx; font-weight:bold">{{item.name}}</text>
                </view>
                <view style="flex:1; text-align:right; color:#EF0077; font-size:24rpx;">
                  {{item.statue}}
                </view>
              </view>
              <view @click="getDetailInfo" class="bookContent" style="display:flex; padding:36rpx 0; margin: 20rpx 40rpx; font-size:24rpx; border-bottom:1rpx solid #ECECEC;">
                <image mode='aspectFill' style="flex:1; width:90rpx; height: 90rpx; display:block; margin-right: 15rpx;" :src="item.url" />
                <view class="item-text" style="flex:4;margin-top:-5rpx">
                  <wxc-elip line="3">{{item.info}}</wxc-elip>
                </view>
              </view>
              <view class='bookTag' style="text-align:right; padding-bottom:15rpx; margin: 20rpx 40rpx; font-size:24rpx; border-bottom:1rpx solid #ECECEC;">
                <view style="display:inline-block; margin-right:30rpx">
                  <text>门牌号:1416</text>
                </view>
              </view>
              <view class='bookButton' style="margin: 25px 20px 20px 20px; font-size:24rpx; text-align:right">
                <view style="display:inline-block; margin-right: 30rpx;"><wxc-button size="small" type="beauty" value="获取房东信息" @click="getContact"></wxc-button></view>
                <view style="display:inline-block"><wxc-button size="small" type="success" value="去分享"></wxc-button></view>
              </view>
            </view>
            <view style="height:20rpx; background:#EFEFEF"></view>
          </view>
        </view>
        <view class="weui-tab__content" :hidden="activeIndex !== 1">
          <view v-for='(item, index) of books' :key='index' :data-index='index'>
            <view style="height:20rpx; background:#EFEFEF"></view>
            <view class="list-item">
              <view class="bookTitle" style="font-weight:bold; color:#455A64; padding-bottom:15rpx; margin: 20rpx 40rpx; font-size:24rpx; display:flex; border-bottom:1rpx solid #ECECEC;">
                <view style="flex:2">
                  <wux-icon size="16" type="md-list-box" color='#666666' />
                  <text style="margin-left:10rpx">{{item.name}}</text>
                </view>
                <view style="flex:1; text-align:right; color:#EF0077; font-size:24rpx;">
                  {{item.statue}}
                </view>
              </view>
              <view @click="getDetailInfo" class="bookContent" style="display:flex; padding-bottom:15rpx; margin: 20rpx 40rpx; font-size:24rpx; border-bottom:1rpx solid #ECECEC;">
                <image mode='aspectFill' style="flex:1; width:90rpx; height: 90rpx; display:block; margin-right: 15rpx;" :src="item.url" />
                <view class="item-text" style="flex:4;margin-top:-5rpx">
                  <wxc-elip line="3">{{item.info}}</wxc-elip>
                </view>
              </view>
              <view class='bookTag' style="text-align:right; padding-bottom:15rpx; margin: 20rpx 40rpx; font-size:24rpx; border-bottom:1rpx solid #ECECEC;">
                <view style="display:inline-block; margin-right:30rpx">
                  <view v-if="item.isPinZu" style="display:inline-block; margin-right:10rpx; border-bottom:1px solid #ECECEC; color:#ff5777; font-weight:bold;" @click="showPinZu">
                    <wux-icon addon="icon-ziyuan" color="#999999" size="12" style="padding-right:10rpx;"/>拼租
                  </view>
                  <text>门牌号:1416</text>
                </view>
              </view>
              <view class='bookButton' style="margin: 20rpx 40rpx; font-size:24rpx; text-align:right">
                <view style="display:inline-block; margin-right: 30rpx;"><wxc-button size="small" type="beauty" value="获取房东信息" @click="getContact"></wxc-button></view>
                <view style="display:inline-block"><wxc-button size="small" type="success" value="去分享"></wxc-button></view>
              </view>
            </view>
            <view style="height:20rpx; background:#EFEFEF"></view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="!hiddenContact">
      <van-dialog
        title='房东信息'
        :show="!hiddenContact"
        show-cancel-button
        :show-confirm-button=false
        use-slot
        @cancel="close"
      >
        <view style="margin:40rpx 40rpx 40rpx 40rpx;">
          <view style="margin-bottom:20rpx; margin-top:20rpx; border-bottom:1rpx solid #ECECEC; padding-bottom:20rpx">
            <view style="display:inline-block;font-weight:bold;color:#ff5777; margin-right:30rpx">
              <wux-icon color='#ff5777' size="16" type="md-person"/><text style="margin-left:10rpx">房东姓名：</text>
            </view>
            <text>{{loadName}}</text>
          </view>
          <view style="margin-bottom:20rpx; border-bottom:1rpx solid #ECECEC; padding-bottom:20rpx">
            <view style="display:inline-block;font-weight:bold;color:#ff5777; margin-right:30rpx">
              <wux-icon color='#ff5777' size="16" type="md-call"/><text style="margin-left:10rpx">房东电话：</text>
            </view>
            <text>{{loadNumber}}</text>
          </view>
        </view>
      </van-dialog>
    </view>
  </div>
</template>

<script>
import globalStore from '@/stores/global-store'
import util from '@/utils/index'
const sliderWidth = 96

export default {
  data () {
    return {
      tabs: ['整租', '合租'],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      statueMap: {},
      zoomName: '',
      active: 1,
      userInfo: {},
      scrollHeight: 300,
      hiddenContact: true,
      books: [{
        name: '天申综合小区',
        id: '0', 
        isPinZu: true,
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338327&di=d5a936ca7dee54b9dd7382fa685b39e3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F44%2F77%2F38f58PICUNG_1024.jpg', 
        statue: '预定成功，待看房', 
        info: '大大的好房子大大的好房子大大的好房子大大的好房子大大的好房子大大的好房子大大的好房子大大的好房子',
        profile: '三室一厅'
      }, {
        name: '娄山综合小区',
        id: '1',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338327&di=d5a936ca7dee54b9dd7382fa685b39e3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F44%2F77%2F38f58PICUNG_1024.jpg', 
        statue: '交易完成', 
        info: '大大的好房子',
        profile: '三室一厅'
      }, {
        name: '娄山综合小区',
        id: '2',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338327&di=d5a936ca7dee54b9dd7382fa685b39e3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F44%2F77%2F38f58PICUNG_1024.jpg', 
        statue: '交易完成', 
        info: '大大的好房子',
        profile: '三室一厅'
      }],
      navList: globalStore.state.tabBarList.navList
    }
  },

  onShow () {
    this.getSystemInfo()

    wx.hideTabBar({
      animation: false
    })
    this.hiddenContact = true
  },

  computed: {
    loadNumber: function () {
      return '1768899886'
    },
    loadName: function () {
      return '刘先生'
    }
  },

  methods: {
    getSystemInfo() {
      const that = this
      wx.getSystemInfo({
          success(res) {
              that.sliderLeft = (res.windowWidth / that.tabs.length - sliderWidth) / 2
          }
      })
    },
    onTabClick(e) {
      const { offsetLeft, dataset } = e.currentTarget
      const { id } = dataset

      this.sliderOffset = offsetLeft
      this.activeIndex = id
    },
    modifyContactInfo () {
      wx.navigateTo({
        url: '../contactInfo/main?type=1'
      })
    },
    confirm (e) {
      var statue = e.target.dataset.statue
      var id = e.target.dataset.id // 获取订单id
      if (statue === '0') {
        // 评价页面
        this.hiddenCommont = false
        this.hiddenCancleOrder = true
      } else {
        this.hiddenCommont = true
        this.hiddenCancleOrder = false
      }
      console.log(id)
    },
    getContact (e) {
      this.hiddenContact = false
      console.log("123")
    },
    close () {
      this.hiddenContact = true
      this.hiddenCommont = true
      this.hiddenCancleOrder = true
    },
    satisfyLoad (e) {
      console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
    },
    satisfyHouse (e) {
      console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
    },
    score () {
      this.close()
    },
    cancleOrder () {
      this.close()
    },
    getDetailInfo (e) {
      wx.navigateTo({
        url: '../preOrder/main?rentType=1&id=0'
      })
    },
    showPinZu (e) {
      wx.showModal({
          title: '拼租说明',
          content: '详情',
          showCancel: false
      })
    }
  },

  mounted () {
    this.zooms = globalStore.state.zooms
    this.zoomName = util.getZoomNameById(globalStore.state.zooms, globalStore.state.currentZoom)
    this.userInfo = globalStore.state.userInfo
  }
}
</script>

<style scoped>
.container {
    height: 100%;
    overflow: hidden;
}

.weui-navbar {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: fixed;
  z-index: 500;
  top: 0;
  width: 100%;
  background:white;
  border-bottom: 1rpx solid #CCCCCC;
}
.weui-navbar__item {
  position: relative;
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
          flex: 1;
  padding: 13px 0;
  text-align: center;
  font-size: 0;
}
.weui-navbar__item.weui-bar__item_on {
  color: #1AAD19;
}
.weui-navbar__slider {
  position: absolute;
  content: " ";
  left: 0;
  bottom: 0;
  width: 6em;
  height: 3px;
  background-color: #1AAD19;
  -webkit-transition: -webkit-transform .3s;
  transition: -webkit-transform .3s;
  transition: transform .3s;
  transition: transform .3s, -webkit-transform .3s;
}
.weui-navbar__title {
  display: inline-block;
  font-size: 15px;
  max-width: 8em;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.weui-tab__panel {
  box-sizing: border-box;
  height: 100%;
  padding-top: 50px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.weui-tab__content {
	height: 100%;
	padding-bottom: 0;
  margin-bottom: 0px;
}
.list-item {
  width:100%;
  background: #fff;
  margin-bottom: 30rpx;
}
.list-item:last-child {
  margin: 0;
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
.slide-image {
  height:90px;
  flex: 1;
}
</style>
