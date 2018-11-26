<template>
  <div class="container">
    <view class="head" style="display: block;">
      <wux-cascader :visible="cascaderVisible" title="所在地区" :options="cascaderOptions" @close="onCascaderClose" @change="onCascaderChange" />
      <view style="margin:0 10px; border:1rpx solid #ececec; border-radius:15px;">
        <wxc-list
          class="item" icon="address" mode="none" icon-color="#69A0DD" :title="city!=''? city:'请选择所在区域'" dot="true"  @click="onCascaderOpen">
        </wxc-list>
      </view>
    </view>
    <headBar :navList="headNavList" :list1_data="listData1" :list2_data="listData2" :list3_data="listData3" @getSelectIndex="optionTap"></headBar>
    <view class="houseDetail">
      <scroll-view scroll-y="true" :style="{height: scrollHeight + 'px', 'padding-top': '10px;'}">
        <view v-for='(item, index) of houseList' :key='item.id' :data-index='index' class='dataItem' style="margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid #d1d3d4;">
            <view style="font-size:10px; width:95%; display: flex; margin-left:auto; margin-right:auto;">
              <img style="height: 70px; margin-right: 5px; flex: 1;" src="../../../static/images/slide.png" data-src="http://outofmemory.cn/j/tutorial/bootstrap/wp-content/uploads/2014/07/carousalpluginsimple_demo.jpg" @click="previewImage"/>
              <view style="flex:3;" @click="preOrder">
                <text class="profile">{{item.abstract}}</text>
                <view>
                  <text class="prise">{{item.prise + '元/月'}}</text>
                  <text v-if="rentType == 1" class="amount">{{item.amount + '人/合租'}}</text>
                </view>
              </view>
            </view>
        </view>
      </scroll-view>
    </view>
    <van-tabbar :active="active" @change="onChange" class="tabBar">
      <van-tabbar-item icon="shop">标签</van-tabbar-item>
      <van-tabbar-item icon="chat" dot>标签</van-tabbar-item>
      <van-tabbar-item icon="records" info="5">标签</van-tabbar-item>
      <van-tabbar-item icon="gold-coin" info="20">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import globalStore from '@/stores/global-store'
import util from '@/utils/index'
import headBar from '@/components/headbar'
import tabBarSelect from '@/components/tabbar'
import data from './data'

export default {
  data () {
    return {
      zooms: [],
      zoomName: '',
      city: '',
      zoomIndex: 0,
      userInfo: {},
      rentType: 1,
      active: 0,
      headNavList: ['整租', '价格', '户型'],
      listData1: ['整租', '合租', '拼租'],
      listData2: ['不限', '500以下', '500-1000', '1000-1500', '1500-2500', '2500-5000', '5000以上'],
      listData3: ['一室一厅', '两室一厅', '三室一厅', '三室两厅'],
      houseList: [{id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 1, prise: 1000, abstract: 'good house good house good house good house good house good house', amount: '10'},
        {id: 2, prise: 1000, abstract: '这是一个大大大大哒哒哒哒哒哒哒哒哒哒的好房子', amount: '10'},
        {id: 3, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 4, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 5, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 6, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 7, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 8, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 9, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 10, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 11, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 12, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 13, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 14, prise: 1000, abstract: 'good house', amount: '10'}],
      scrollHeight: 0,
      scrollTop: 0,
      navList: globalStore.state.tabBarList.navList,
      cascaderOptions: data,
      cascaderVisible: false
    }
  },
  components: {
    tabBarSelect,
    headBar
  },
  computed: {
  },
  onShow () {
    wx.hideTabBar({
      animation: false
    })
  },
  mounted () {
    this.zooms = globalStore.state.zooms
    this.zoomName = util.getZoomNameById(this.zooms, globalStore.state.currentZoom)
    this.userInfo = globalStore.state.userInfo
    this.getScollHeight()
    console.log(this.$root.$mp)
    // console.log(this.$root.$mp.query)
    // console.log(this.$root.$mp.appOptions)
  },
  methods: {
    reChoose (e) {
      let index = e.mp.detail.value
      this.zoomIndex = index
      this.zoomName = this.zooms[index].name
    },
    zhenZu () {
      this.rentType = 0
    },
    heZu () {
      this.rentType = 1
    },
    getScollHeight () {
      this.scrollHeight = 70 * this.houseList.length
      util.getWindowRect('.houseDetail').then((res) => {
        return res.top
      }).then((head) => {
        var windowHeight = wx.getSystemInfoSync().windowHeight
        return windowHeight - head
      }).then((head) => {
        util.getWindowRect('.tabBar').then((res) => {
          this.scrollHeight = head - res.height
        })
      })
    },
    preOrder () {
      wx.navigateTo({
        url: '../preOrder/main'
      })
    },
    previewImage (e) {
      var current = e.target.dataset.src
      wx.previewImage({
        current: current,
        urls: [current]
      })
    },
    optionTap (index) {
      let i = parseInt(index / 10)
      let j = parseInt(index % 10)
      if (i === 1) {
      } else if (i === 2) {
      } else if (i === 3) {
      }
      console.log(j)
    },
    onCascaderOpen () {
      this.cascaderVisible = true
    },
    onCascaderClose () {
      this.cascaderVisible = false
    },
    onCascaderChange (e) {
      this.city = e.mp.detail.options.map((n) => n.label).join('/')
    },
    onChange(event) {
      console.log(event.detail);
    },
    onPageScroll(event){
      this.scrollTop = event.scrollTop
    }
  }
}
</script>

<style scoped>
.container{
    height: auto;
    overflow: hidden;
    width: 100%;
    margin-top:40rpx;
}
.clicked {
  color:#336699
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
.combox {
  width:150rpx;
  height:80rpx;
  margin:0 20rpx;
  display:inline-block;
  vertical-align:middle;
}
.infoTitle {
  font-size:15px;
}
.prise {
  display:inline-block;
  color:brown;
  margin-right: 10px;
  font-size: 14px;
}
.profile {
  display: -webkit-box;
  font-size: 16px;
  height:48px;
  margin-bottom: 5px;
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.amount {
  display: inline-block;
  font-size: 13px;
  color: gray
}
.confirm {
  width:30px;
  height:10px;
  font-size:6px;
  line-height:10px;
  padding:0;
  display: inline-block;
  color:white;
  background-color:red;
  border-radius:10px;
}
.item {
  flex: 1;
}
</style>
