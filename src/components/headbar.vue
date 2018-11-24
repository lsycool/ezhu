<template>
<view class="page">
  <view class="nav">
    <view class="nav-son" :class="shownavindex == 1? 'active' : ''" @click="list1" data-nav="1">
      <view class="content">{{navList[0]}}</view>
      <view class="icon"></view>
    </view>
    <view class="nav-son borders" :class="shownavindex == 2? 'active' : ''" @click="list2" data-nav="2">
      <view class="content">{{navList[1]}}</view>
      <view class="icon"></view>
    </view>
    <view class="nav-son" :class="shownavindex == 3? 'active' : ''" @click="list3" data-nav="3">
      <view class="content">{{navList[2]}}</view>
      <view class="icon"></view>
    </view>
  </view>
  <view class="temp temp1" :class="cls1">
    <view v-for="(item, index) in content" :key="index" :data-index='index' @click.stop='optionTap1'>
        {{item}}
    </view>
  </view>
  <view class="temp temp2" :class="cls2">
    <view v-for="(item, index) in content" :key="index" :data-index='index' @click.stop='optionTap2'>
      {{item}}
    </view>
  </view>
  <view class="temp temp3" :class="cls3">
    <view v-for="(item, index) in content" :key="index" :data-index='index' @click.stop='optionTap3'>
      {{item}}
    </view>
  </view>
  <view class="fullbg" :class="isfull ? 'fullopacity':'disappear'" @click="hidebg"></view>
</view>
</template>

<script>
// import wx from '@/utils/wx'
import util from '@/utils/index'

export default {
  props: {
    list1_data: {
      type: Array,
      default () {
        return ['衣服', '裤子', '内衣', '服饰']
      }
    },
    list2_data: {
      type: Array,
      default () {
        return ['默认排序', '离我最近', '价格最低', '价格最高']
      }
    },
    list3_data: {
      type: Array,
      default () {
        return ['默认排序', '离我最近', '价格最低', '价格最高']
      }
    },
    navList: {
      type: Array,
      default () {
        return ['list1', 'list2', 'list3']
      }
    }
  },
  data: function () {
    return {
      content: [],
      list1_open: false,
      list2_open: false,
      list3_open: false,
      list1_show: false,
      list2_show: false,
      list3_show: false,
      isfull: false,
      select1: '',
      select2: '',
      shownavindex: ''
    }
  },
  mounted () {
  },
  computed: {
    cls1 () {
      return util.classes({
        slidown: this.list1_open,
        slidup: !this.list1_open,
        disappear: this.list1_show
      })
    },
    cls2 () {
      return util.classes({
        slidown: this.list2_open,
        slidup: !this.list2_open,
        disappear: this.list2_show
      })
    },
    cls3 () {
      return util.classes({
        slidown: this.list3_open,
        slidup: !this.list3_open,
        disappear: this.list3_show
      })
    }
  },
  methods: {
    hidebg (e) {
      this.list1_open = false
      this.list2_open = false
      this.list3_open = false
      this.list1_show = true
      this.list2_show = true
      this.list3_show = true
      this.isfull = false
      this.shownavindex = 0
    },
    list1 (e) {
      if (this.list1_open) {
        this.list1_open = false
        this.list2_open = false
        this.list3_open = false
        this.list1_show = false
        this.list2_show = true
        this.list3_show = true
        this.isfull = false
        this.shownavindex = 0
      } else {
        this.content = this.list1_data
        this.list1_open = true
        this.list2_open = false
        this.list3_open = false
        this.list1_show = false
        this.list2_show = true
        this.list3_show = true
        this.isfull = true
        this.shownavindex = e.currentTarget.dataset.nav
      }
      console.log(e.target)
    },
    list2 (e) {
      if (this.list2_open) {
        this.list1_open = false
        this.list2_open = false
        this.list3_open = false
        this.list1_show = true
        this.list2_show = false
        this.list3_show = true
        this.isfull = false
        this.shownavindex = 0
      } else {
        this.content = this.list2_data
        this.list1_open = false
        this.list2_open = true
        this.list3_open = false
        this.list1_show = true
        this.list2_show = false
        this.list3_show = true
        this.isfull = true
        this.shownavindex = e.currentTarget.dataset.nav
      }
      console.log(e.target)
    },
    list3 (e) {
      if (this.list3_open) {
        this.list1_open = false
        this.list2_open = false
        this.list3_open = false
        this.list1_show = true
        this.list2_show = true
        this.list3_show = false
        this.isfull = false
        this.shownavindex = 0
      } else {
        this.content = this.list3_data
        this.list1_open = false
        this.list2_open = false
        this.list3_open = true
        this.list1_show = true
        this.list2_show = true
        this.list3_show = false
        this.isfull = true
        this.shownavindex = e.currentTarget.dataset.nav
      }
      console.log(e.target)
    },
    optionTap1 (e) {
      this.hidebg()
      let index = e.currentTarget.dataset.index // 获取点击的下拉列表的下标
      this.$emit('getSelectIndex', 10 + index)
    },
    optionTap2 (e) {
      this.hidebg()
      let index = e.currentTarget.dataset.index
      this.$emit('getSelectIndex', 20 + index)
    },
    optionTap3 (e) {
      this.hidebg()
      let index = e.currentTarget.dataset.index
      this.$emit('getSelectIndex', 30 + index)
    }
  }
}
</script>

<style lang="less" scoped>
.page{
    font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Droid Sans Fallback', 'Microsoft Yahei', sans-serif;
    height: 100%;
    background: #fff;
    overflow: hidden;
    margin-top: 10px;
}
.nav{
    position: relative;
    z-index: 99;
    display: flex;
    border-top: 1px solid #d1d3d4;
    border-bottom: 1px solid #d1d3d4;
    background: #fff;
}
.nav-son{
    display: flex;
    flex: 1;
    text-align: center;
    height: 40px;
    align-items:center;
    justify-content:center;
    font-size: 14px;
}
.borders{
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
}
.content{
    display: inline-block;
}
.icon{
    display: inline-block;
    border: 4px solid transparent;
    border-top: 4px solid #9b9b9b;
    margin-left: 5px;
}
.temp{
    position: absolute;
    z-index: 4;
}
.temp1{
    display: none;
    width: 100%;
    max-height: 550rpx;
    overflow-y: scroll;
    padding: 0 0 0 20rpx;
    line-height:100rpx;
    background: #fff;
}
.temp2{
    display: none;
    width: 100%;
    max-height: 750rpx;
    overflow-y: scroll;
    padding: 0 0 0 20rpx;
    line-height:100rpx;
    background: #fff;
}
.temp3{
    display: none;
    width: 100%;
    max-height: 750rpx;
    overflow-y: scroll;
    padding: 0 0 0 20rpx;
    line-height:100rpx;
    background: #fff;
}
.slidedown{
    transform:  translateY(0%);
}
.temp view{
    border-bottom: 1px solid #d1d3d4;
    font-size: 14px;
    color: #666;
}
.current{
    background: #e0e0e0;
}
.current2{
    background: #fff;
}
.fullbg{
    position: fixed;
    top:0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgb(1, 1, 1);
    transition: all 2s;
    opacity: 0;
}
.fullopacity{
    opacity: .5;
}
.nav-son.active .content{
    color: #61beff;
}
.nav-son.active .icon{
    border-bottom: 4px solid #61beff;
    border-top:0;
}
.slidown{
    display: block;
    transition: height 0.6s;
}
.slidup{
    display: none;
}
.disappear{
    display: none;
}
</style>