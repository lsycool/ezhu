<template>
  <div class="container">
    <view class="head" style="display: block; border-bottom:2px solid gray; padding-bottom:5px; margin-bottom:10px;">
      <view class="userInfo" style="text-align:right;">
          <text class="userName" style="font-size:30rpx;line-height:30rpx;margin-right:5px;">{{userInfo.nickName}}</text>
          <image class="avatar" style="  vertical-align:middle;width:70rpx;height:70rpx;margin-right:20rpx; border-radius:35rpx;" :src="userInfo.avatarUrl"/>
      </view>
      <view style="text-align:center; margin-top:10px; font-weight:bold;">
        <text>
          发布房源信息
        </text>
      </view>
    </view>
    <form @submit="formSubmit" @reset="formReset">
      <view class="section">
        <input name="zoom" :value='name' style="border-bottom:1px solid gray; border-top:1px solid gray; padding:0 10px; font-size:14px; height:40px; line-height:40px;" placeholder="区域" />
        <input name="area" :value='address' style="border-bottom:1px solid gray; padding:0 10px; font-size:14px; height:40px; line-height:40px;" placeholder="您房源所在小区" />
        <input name="unitNo" :value='address' style="border-bottom:1px solid gray; padding:0 10px; font-size:14px; height:40px; line-height:40px;" placeholder="单元号" />
        <input name="doorNo" :value='address' style="border-bottom:1px solid gray; padding:0 10px; font-size:14px; height:40px; line-height:40px;" placeholder="门牌号" />
        <comboxList :zooms="rentTypeList" :select='selectStyle' :fontSize="14" :styleObject="comboxStyle" @getSelectIndex="optionTap"></comboxList>
      </view>
      <view class="btn-area">
        <button class="button" formType="submit">下一步</button>
        <button class="button" formType="reset" style="background-color:gray;">取消</button>
      </view>
    </form>
    <tabBarSelect :selectNavIndex='0' :navList='navList'></tabBarSelect>
  </div>
</template>

<script>
import util from '@/utils/index'
import globalStore from '@/stores/global-store'
import tabBarSelect from '@/components/tabbar'
import comboxList from '@/components/combox'

export default {
  data () {
    return {
      userInfo: {},
      navList: globalStore.state.tabBarList.navList2,
      rentTypeList: [{id: 0, name: '整租'}, {id: 1, name: '合租'}],
      comboxStyle: util.styles({width: '100%', height: '40px', margin: '0', padding: '0', 'line-height': '40px', display: 'inline-block', 'vertical-align': 'middle', 'border-bottom': '2rpx solid gray'}),
      selectStyle: util.styles({height: '100%', color: 'gray'})
    }
  },

  components: {
    tabBarSelect,
    comboxList
  },

  methods: {
    formSubmit (e) {
      wx.navigateTo({
        url: '../houseInfo/main'
      })
    },
    formReset () {
      wx.navigateBack({
        delta: 1
      })
    },
    optionTap (index) {
      console.log('rentType:' + index)
      // console.log(this.userInfo)
      globalStore.commit('setRentType', index)
      console.log('rentType2:' + globalStore.state.rentType)
    }
  },

  mounted () {
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
}
.btn-area {
  display:flex;
  margin:100px 80px;
}
.button {
  color:white;
  background-color:red;
  border-radius:10px;
}
</style>
