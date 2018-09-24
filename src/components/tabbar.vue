<template name="tabBar">    
  <view class="tab-bar" :style="tabBarStyle">    
  <block v-for='(item, index) of tabBar.list' :key='item.pagePath' :data-index='index'>    
    <navigator :url='item.pagePath' open-type="redirect" :class="item.clas" :style="{color: item.active? (item.selectedColor? item.selectedColor : tabBar.selectedColor) : ''}">    
      <image :src="item.selectedIconPath" v-if="item.active" class="img"></image>    
      <image :src="item.iconPath" v-if="!item.active" class="img"></image>  
      <text>{{item.text}}</text>    
    </navigator>    
    </block>  
    <view class="clear"></view>    
  </view>    
</template>  

<script>
export default {
  data: function () {
    return {
    }
  },
  props: {
    tabBar: {}
  },
  computed: {
    tabBarStyle: function () {
      return {
        color: this.tabBar.color,
        background: this.tarBar.backgroundColor,
        top: this.tabBar.position === 'top' ? 0 : null,
        bottom: this.tabBar.position === 'top' ? null : 0,
        'border-bottom': this.tabBar.position === 'top' ? 'solid 1px' + this.tabBar.borderStyle : null,
        'border-top': 'solid 1px' + this.tabBar.borderStyle
      }
    }
  }
}
</script>

<style scoped>
.menu-item{  
  width: 32%;  
  float: left;  
  text-align: center;  
  padding-top: 8px;  
}  
.menu-item1{  
  width: 24%;  
  float: left;  
  text-align: center;  
  padding-top: 8px;  
}  
.img{ 
  width: 23px;  
  height: 23px;  
  display: block;  
  margin:auto;  
}  
.clear{  
  clear: both;  
}  
.tab-bar{  
  position: fixed;  
  width: 100%;  
  padding: 0px 2%;  
}  
 
.button{
  margin: 130px;
}
</style>