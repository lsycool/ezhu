<template>
  <view class="container">
    <view class="head" style="display:flex; height:150rpx; margin-top:30rpx;">
      <view class="info" style="flex:3; padding-left:40rpx;">
        <button class="loginButton" open-type="getUserInfo" @getuserinfo="getSetting">{{userInfo.nickName!=undefine? userInfo.nickName:'点击登录/注册'}}</button>
      </view>
      <view class="avatar" style="flex:1; text-align:center;">
        <image style="vertical-align:middle;width:100rpx;height:100rpx;border-radius:35rpx;" :src="userInfo.avatarUrl!=undefine? userInfo.avatarUrl:defaultAvatar"/>
      </view>
    </view>
    <view style="height:30rpx; background:#EFEFEF"></view>
    <view class="list-item">
      <view class="list-check">
        <wxc-list
              class="item"
              icon="share"
              height="40"
              @click="onMyPublish"
              title="我的发布">
        </wxc-list>
        <wxc-list
          class="item"
          icon="purse"
          height="40"
          @click="onMyOrder"
          title="我的预定">
        </wxc-list>
        <wxc-list
          class="item"
          icon="cart"
          height="40"
          @click="onMyFavorite"
          title="我的收藏">
        </wxc-list>
        <wxc-list
          class="item"
          icon="address"
          height="40"
          @click="onMyInfo"
          title="我的信息">
        </wxc-list>
        <wxc-list
          class="item"
          icon="feedback"
          height="40"
          @click="onFeedBack"
          title="反馈问题">
        </wxc-list>     
        <wxc-list
          class="item"
          icon="group"
          height="40"
          @click="onAboutUs"
          title="关于我们">
        </wxc-list>       
      </view>
    </view>
    <van-tabbar :active="active" @change="onTabbarChange" class="tabBar">
      <van-tabbar-item icon="wap-home">主菜单</van-tabbar-item>
      <van-tabbar-item icon="cart" >我要发布</van-tabbar-item>
      <van-tabbar-item icon="contact">个人中心</van-tabbar-item>
    </van-tabbar>
  </view>
</template>

<script>
import globalStore from '@/stores/global-store'

export default {
  data () {
    return {
      userInfo: {},
      active: 2,
      defaultAvatar: '../../static/images/user.png'
    }
  },
  onShow () {
    var that = this
    wx.hideTabBar({
      animation: false
    })
    
    if (that.userInfonickName != '' && that.userInfonickName != undefined){
      return
    }
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              globalStore.commit('setUserInfo', res.userInfo)
              that.userInfo = res.userInfo
            }
          })
        }
      }
    })
  },
  methods: {
    onMyPublish() {
      wx.navigateTo({
        url: '../myPublished/main'
      })
    },
    onMyOrder() {
      wx.navigateTo({
        url: '../myBooked/main'
      })
    },
    onMyFavorite() {
      wx.navigateTo({
        url: '../myFavorite/main'
      })
    },
    onMyInfo() {
    },
    onFeedBack() {
    },
    onAboutUs() {
    },
    onTabbarChange(e) {
      let index = e.mp.detail;
      if (this.active == index) {
        return;
      }
      if (index == 0) {
        wx.redirectTo({
          url: '../tenant/main'
        })
      } else if(index == 1) {
        wx.navigateTo({
          url: '../landlord/main'
        })
      } else if (index == 2) {    
        wx.reLaunch({
          url: '../personalCenter/main'
        }) 
      }
      // console.log(e);
    },
    getSetting () {
      var that = this
      if (that.userInfonickName != '' && that.userInfonickName != undefined){
        return
      }
      that.goLogin(that)
    },
    goLogin (that) {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              globalStore.commit('setUserInfo', res.userInfo)
              that.userInfo = res.userInfo
            }
          })
        },
        error: () => {
          console.log('login failed.')
        }
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
.list-image {
  width: 102rpx;
  height: 102rpx;
  margin-left: 30rpx;
}
.list-check {
  align-items: center
}
.item {
    flex: 1;
}
.loginButton {
  background:white;
  border:0;
  padding:0;
  margin:0;
  text-align:left;
  font-size:46rpx; 
  font-weight:bold
}
.loginButton::after{ border: none; }
</style>
