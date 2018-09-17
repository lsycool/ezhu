<template>
  <view class='select_box' :style='{height: selectBoxHeight + "rpx"}'>
    <view class='select' @click.stop='selectTap'>
        <text class='select_text'>{{zooms[index].name}}</text>
        <image class="select_img " :class='{select_img_rotate:show}' src='../../static/images/down.png'></image>         
    </view>
    <view class='option_box' :style='{height: optionBoxHeight + "rpx"}'>
        <text class='option' :style='{border:(index==zooms.length-1?  0 : "1px solid #efefef")}' v-for='(item, index) of zooms' :key='item.id' :data-index='index' @click.stop='optionTap'>
          {{item.name}}
        </text>
    </view>
  </view>
</template>

<script>
export default {
  data: function () {
    return {
      show: false, // 控制下拉列表的显示隐藏，false隐藏、true显示
      index: 0
    }
  },
  props: {
    zooms: {
      type: Array,
      default () {
        return {}
      }
    }
  },
  computed: {
    optionBoxHeight: function () {
      return this.show ? (this.zooms.length > 5 ? 500 : this.zooms.length * 100) : 0
    },
    selectBoxHeight: function () {
      let height = 0
      var query = wx.createSelectorQuery()
      query.select('.select').boundingClientRect(function (rect) {
        height += rect.height // 节点的高度
      }).exec()
      height += (this.optionBoxHeight + 200)
      return height
    }
  },
  methods: {
    // 点击下拉显示框
    selectTap () {
      this.show = !this.show
    },
    // 点击下拉列表
    optionTap (e) {
      this.index = e.currentTarget.dataset.index // 获取点击的下拉列表的下标
      this.show = !this.show
      this.$emit('getSelectIndex', this.index)
    }
  }
}
</script>

<style>
.select_box{
  background: #fff;
  width: 80%;
  margin: 30rpx auto;
  position: relative;
}
.select{
  box-sizing: border-box;
  width: 100%;
  height: 70rpx;
  border:1px solid #efefef;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
}
.select_text{
  font-size: 30rpx;
  flex: 1;
}
.select_img{
  width: 40rpx;
  height: 40rpx;
  display: block;
  transition:transform 0.3s;
}
.select_img_rotate{
  transform:rotate(180deg); 
}
.option_box{
  position: absolute;
  top: 70rpx;
  width: 100%;
  border:1px solid #efefef;
  box-sizing: border-box;
  height: 0;
  overflow-y: auto;
  border-top: 0;
  background: #fff;
  transition: height 0.3s;
}
.option{
  display: block;
  line-height: 40rpx;
  font-size: 30rpx;
  border-bottom: 1px solid #efefef;
  padding: 10rpx;
}
</style>
