<template>
  <view class="container">
    <wux-cascader :visible="cascaderVisible" title="所在地区" :options="cascaderOptions" @close="onCascaderClose" @change="onCascaderChange" />
    <picker v-if="zoomVisible" @change="reChoose" @cancel="zoomVisible" :value="zoomIndex" :range="zooms" range-key="name" style="width:150rpx; display:inline-block;">
      <text>选择小区</text>
    </picker>
    <view class="list-item">
      <wxc-list
        class="item"
        icon="address"
        icon-color="#69A0DD"
        title="请选择所在区域"
        :desc="city"
        dot="true"
        @click="onCascaderOpen">
      </wxc-list>
      <wxc-list
        class="item"
        icon="address"
        icon-color="#69A0DD"
        title="请选择小区"
        :desc="city"
        dot="true"
        @click="optionTap">
      </wxc-list>
      <!-- <comboxList :zooms="zooms" @getSelectIndex="optionTap"></comboxList> -->
    </view>
  </view>
</template>

<script>
import globalStore from '@/stores/global-store'
import comboxList from '@/components/combox'
import data from './data'

export default {
  data () {
    return {
      cascaderVisible: false,
      city: '',
      zoomIndex: 0,
      zoomName: '',
      zoomVisible: false,
      cascaderOptions: data,
      zooms: [{id: 0, name: '天申综合小区'}, {id: 1, name: '天申综合小区1'}, {id: 2, name: '天申综合小区2'}] // 从后台获取小区列表
    }
  },
  mounted () {
    // this.cascaderOptions = data
  },
  onShow () {
    wx.hideTabBar({
      animation: false
    })
  },
  components: {
    comboxList
  },
  methods: {
    optionTap (index) {
      // console.log('index:' + index)
      // globalStore.commit('setCurrentZoom', this.zooms[index].id)
      // globalStore.commit('setZooms', this.zooms)
      wx.switchTab({
        url: '/pages/tenant/main'
      })
    },
    onCascaderOpen () {
      this.cascaderVisible = true
    },
    onCascaderClose () {
      this.cascaderVisible = false
    },
    onCascaderChange (e) {
      this.city = e.mp.detail.options.map((n) => n.label).join('/')
      console.log(e)
    },
    reChoose (e) {
      let index = e.mp.detail.value
      this.zoomIndex = index
      console.log(index)
      // this.zoomName = this.zooms[index].name
    },
    zoomVisible () {
      this.zoomVisible = !this.zoomVisible
    }
  }
}
</script>

<style scoped>
.container{
    height: auto;
    overflow: hidden;
    width: 100%;
    margin-top:50rpx;
}
.list-item {
  background: #fff;
  margin-bottom: 30rpx;
}
.item {
  flex: 1;
}
</style>
