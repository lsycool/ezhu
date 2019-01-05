<template>
  <div class="container">
    <view>
      <scroll-view class='scroll' scroll-y="true" :style="{height: scrollHeight + 'px', 'margin-top': '20px', 'margin-left': '20px'}">
        <view v-for='(item, index) of books' :key='index' :data-index='index' style="font-size:10px; margin-bottom:10px;">
          <view v-for='(info, index2) of item.details' :key='index2' :data-index='index2'>
            <view style="display: flex; margin-bottom: 10px;">
              <image :src="info.url" :data-src="info.url" class="slide-image" mode="aspectFill" @click="previewImage"/>
              <view style="margin:0 10px; flex:3;">
                <view style="height: 80%;">
                  <text>{{info.profile}}</text>
                </view>
                <view>
                  <button @click="getContact" :data-id='info.id' style="font-size:8px; display:inline-block; padding:0 5px; margin-right:20px; color:white; background-color:blue;">获取联系方式</button>
                  <button @click="confirm" :data-id='info.id' :data-statue='info.statue' style="font-size:8px; display:inline-block; padding:0 5px;">{{info.statue === '0'? '去评价':'取消预约'}}</button>
                </view>
            </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <van-tabbar :active="active" @change="onTabbarChange" class="tabBar">
      <van-tabbar-item icon="wap-home">返回主菜单</van-tabbar-item>
      <van-tabbar-item icon="cart" info="5">我的预定</van-tabbar-item>
      <van-tabbar-item icon="arrow-left">返回上一级</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import globalStore from '@/stores/global-store'
import tabBarSelect from '@/components/tabbar'
import util from '@/utils/index'

export default {
  data () {
    return {
      zoomName: '',
      userInfo: {},
      scrollHeight: 300,
      hiddenContact: true,
      hiddenCommont: true,
      hiddenCancleOrder: true,
      books: [{
        name: '天申综合小区',
        details: [
          {id: '0', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338327&di=d5a936ca7dee54b9dd7382fa685b39e3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F44%2F77%2F38f58PICUNG_1024.jpg', statue: '0', profile: '三室一厅'},
          {id: '1', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338327&di=d5a936ca7dee54b9dd7382fa685b39e3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F44%2F77%2F38f58PICUNG_1024.jpg', statue: '1', profile: '三室两厅'}
        ]}, {
        name: '娄山综合小区',
        details: [
          {id: '2', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338327&di=d5a936ca7dee54b9dd7382fa685b39e3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F44%2F77%2F38f58PICUNG_1024.jpg', statue: '0', profile: '三室一厅'},
          {id: '3', url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338327&di=d5a936ca7dee54b9dd7382fa685b39e3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F44%2F77%2F38f58PICUNG_1024.jpg', statue: '2', profile: '三室两厅'}
        ]}
      ],
      navList: globalStore.state.tabBarList.navList
    }
  },

  components: {
    tabBarSelect
  },

  computed: {
    loadNumber: function () {
      return '1768899886'
    },
    mateNumber1: function () {
      return '1768899881'
    },
    mateNumber2: function () {
      return '1768899881'
    },
    mateNumber3: function () {
      return '1768899881'
    },
    loadName: function () {
      return '刘先生'
    },
    mateName1: function () {
      return '张先生'
    },
    mateName2: function () {
      return '王先生'
    },
    mateName3: function () {
      return '吴女士'
    }
  },

  methods: {
    modifyContactInfo () {
      wx.navigateTo({
        url: '../contactInfo/main?type=1'
      })
    },
    getScollHeight () {
      util.getWindowRect('.scroll').then((res) => {
        return res.top
      }).then((head) => {
        var windowHeight = wx.getSystemInfoSync().windowHeight
        this.scrollHeight = windowHeight - head - 60
      })
    },
    previewImage (e) {
      var current = e.target.dataset.src
      wx.previewImage({
        current: current,
        urls: [current]
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
    }
  },

  mounted () {
    this.getScollHeight()
    this.zooms = globalStore.state.zooms
    this.zoomName = util.getZoomNameById(globalStore.state.zooms, globalStore.state.currentZoom)
    this.userInfo = globalStore.state.userInfo
  }
}
</script>

<style scoped>
.container{
    height: auto;
    overflow: hidden;
    width: 100%;
    margin-top:20rpx;
    background: #EFEFEF
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
