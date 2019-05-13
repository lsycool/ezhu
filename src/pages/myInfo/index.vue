<template>
  <view class="container">
    <van-cell title="姓名"  :value="name" size="large" clickable @click="modifyName" is-link> 
    </van-cell>
    <van-cell title="手机号"  :value="telephone" size="large" clickable @click="modifyTelephone" is-link> 
    </van-cell>
    <van-cell title="身份证号"  :value="idCard" size="large" clickable @click="modifyIdCard" is-link> 
    </van-cell>
  </view>
</template>

<script>
import globalStore from '@/stores/global-store'

export default {
  data () {
    return {
      name: '',
      telephone: '17688986906',
      idCard: '00123456789'
    }
  },

  onLoad (e) {
    if (e.type != null && e.value != null)
    {
      var type = parseInt(e.type)
      if (0 == type) {
        this.name  = e.value
      } else if (1 == type) {
        this.telephone = e.value
      } else if (2 == type) {
        this.idCard = e.value
      }
    } else {
      this.name = globalStore.state.userInfo.nickName
    }
    console.log(e)
  },

  onShow () {
    wx.hideTabBar({
      animation: false
    })
  },
  methods: {
    modifyName () {
      wx.redirectTo({
        url: '../modifyInfo/main?type=0&value=' + this.name
      })
    },
    modifyTelephone () {
      wx.redirectTo({
        url: '../modifyInfo/main?type=1&value=' + this.telephone
      })
    },
    modifyIdCard () {
      wx.redirectTo({
        url: '../modifyInfo/main?type=2&value=' + this.idCard
      })
    }
  }
}
</script>

<style scoped>
.container{
    background: #f4f4f4;
    height: auto;
    overflow: hidden;
    width: 100%;
}
</style>
