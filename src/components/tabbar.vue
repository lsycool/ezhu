<template>
  <view class="tabBar-wrap">
    <view class="tabBar-box">
      <view class="tabBar-nav" v-if="navList.length > 0">
        <view class="item" v-for="(item, index) in navList"
            @click="selectNavItem(index, item.pagePath)"
            :key="item.pagePath" :data-index='index'>
          <view class="item-images">
            <image :src="selectNavIndex === index ? item.selectedIconPath : item.iconPath" alt="iconPath"></image>
            <text :class="selectNavIndex === index ? 'item-text item-text-active' : 'item-text' ">
                {{item.text}}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ['selectNavIndex', 'navList'],
  onShow () {
    wx.hideTabBar({
      animation: false
    })
  },
  mounted () {
    // console.log('navList:')
    // console.log(this.navList)
  },
  methods: {
    /**
     * 点击导航栏
     * @param index
     */
    selectNavItem (index, pagePath) {
      console.log(index)
      if (index === this.selectNavIndex) {
        return false
      }
      this.bindViewTap(pagePath)
    },

    /**
     * 路由跳转
     */
    bindNavigateTo (url) {
      wx.navigateTo({
        url
      })
    },

    /**
     * tabBar路由跳转
     */
    bindViewTap (url) {
      // 回到顶部
      wx.switchTab({
        url
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .tabBar-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    padding: 10px 0;
    border-top: 1px solid #eee;
    background-color: #f8f8f8;
  }

  .tabBar-nav {
    width: 100%;
    display: flex;

    .item {
      flex: 1;   //让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容
      text-align: center;
    }
    .item-text {
      color: #666;
      font-size: 10px;
      transition: .24s linear;
    }
    .item-text-active {
      color: #27a79a;
    }

    .item-images {
      margin: 0 auto;
      text-align: center;
      transition: .24s linear;
      display: inline-block;

      & image {
        display: inline-block;
        width: 25px;
        height: 25px;
        margin-bottom:-10px;
      }
    }
  }

  .submit-box-btn {
    position: relative;
    z-index: 999;
    width: 85%;
    height: 90px;
    line-height: 90px;
    border-radius: 10px;
    color: #404040;
    font-size: 36px;
    border: none;
    background-color: #eee;
    text-align: center;
    border: 1px solid #eee;
  }

  .submit-box-btn-active {
    color: #fff;
    border: none;
    border: 1px solid #ff6c00;
    background-color: #ff6c00;
  }

  button {
    border: none;
    outline: none;
  }
</style>