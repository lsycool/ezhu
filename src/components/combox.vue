<template>
  <view class='select_box' :style='styleObject'>
    <view class='select' :style='select' @click.stop='selectTap'>
        <text class='select_text' :style='{"font-size": (fontSize + "px")}'>{{zooms[index].name}}</text>
        <image class="select_img " :class='{select_img_rotate:show}' :style="imageStyle" src='../../static/images/down.png'></image>         
    </view>
    <view class='option_box' :style='{height: optionBoxHeight + "rpx"}'>
        <text class='option' :style='{border:(index==zooms.length-1?  0 : "1px solid #efefef"), "font-size": (fontSize + "px")}' v-for='(item, index) of zooms' :key='item.id' :data-index='index' @click.stop='optionTap'>
          {{item.name}}
        </text>
    </view>
  </view>
</template>

<script>
export default {
  data: function () {
    return {
      index: 0,
      show: false
    }
  },
  props: {
    zooms: {
      type: Array,
      default () {
        return {}
      }
    },
    select: {
      type: Array,
      default () {
        return {}
      }
    },
    styleObject: {
      type: String,
      default () {
        return 'height: ' + 250 + 'px'
      }
    },
    fontSize: {
      type: String,
      default () {
        return ''
      }
    },
    imageStyle: {
      type: String,
      default () {
        return ''
      }
    }
  },
  mounted () {
    // console.log('combox.vue')
  },
  computed: {
    optionBoxHeight: function () {
      return this.show ? (this.zooms.length > 5 ? 500 : this.zooms.length * 85) : 0
    },
    selectBoxHeight: function () {
      let height = 0
      var query = wx.createSelectorQuery()
      query.select('.select').boundingClientRect(function (rect) {
        height += rect.height // 节点的高度
      }).exec()
      height += (this.optionBoxHeight + 100)
      return height
    }
  },
  methods: {
    hidePopBox () {
      this.show = false
    },
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
  margin: 30rpx 30rpx;
  position: relative;
  vertical-align:middle;
  display:inline-block;
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
  width:100%;
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
  z-index:999;
}
.option{
  display: flex;
  height: 40px;
  line-height: 0;
  font-size: 30rpx;
  border-bottom: 1px solid #efefef;
  padding:0 10px;
  align-items:center;
}
</style>
