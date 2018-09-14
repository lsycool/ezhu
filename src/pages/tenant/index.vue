<template>
  <div class="container">
    <view class="head">
      <view class="zoom">
        <text class="zoomName">{{zoomName}}</text>
        <button class="reChoose" @click="reChoose" type="primary">切换</button>
      </view>
      <view class="userInfo">
        <text class="userName">{{userName}}</text>
        <img class="avatar" :src="userInfo.avatar"/>
      </view>
    </view>
    <view class="filter">
      <view class="rentType">
        <button class="reChoose" @click="reChoose" type="primary">整租</button>
        <button class="reChoose" @click="reChoose" type="primary">合租</button>
      </view>
      <view class="priseAndType">
        <view class="priseRange">
          <text>价格</text><combox></combox><text>到</text><combox></combox>
        </view>
        <view class="houseType">
          <text>户型</text><combox></combox>
        </view>
      </view>
    </view>
    <view class="houseDetail">
      <view>
        <img class="avatar" :src="userInfo.avatar"/>
        <view>
          <text class="prise"></text><text class="profile"></text>
          <view><text class="amount"></text><button>去拼团</button></view>
        </view>
      </view>
    </view>
    
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      zoomName: '',
      buttonTitle1: '切换',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
