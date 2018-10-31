<template>
  <view class="container">
    <view class="title1" style="width:80%; padding-left:15px;">
      <text class="name">请选择您要租住的小区</text>
    </view>
    <wux-cascader :visible="cascaderVisible" title="所在地区" :options="cascaderOptions" @close="onCascaderClose" @change="onCascaderChange" />
    <view>
      <wux-cell-group title="请选择您要租住的小区">
        <wux-cell thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" :extra="city" is-link title="地址" @click="onCascaderOpen"></wux-cell>
      </wux-cell-group>
      <comboxList :zooms="zooms" @getSelectIndex="optionTap"></comboxList>
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
      city: '请选择您所在省市区',
      // cascaderOptions: [{'label': '北京', 'value': '110000', 'children': [{'label': '北京市', 'value': '110000', 'children': [{'label': '东城区', 'value': '110101'}]}]}],
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
      globalStore.commit('setCurrentZoom', this.zooms[index].id)
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
</style>
