<template>
  <div class="container">
    <scroll-view scroll-y="true" :style="{height: scrollHeight + 'px'}">
      <view style="text-align:center; font-weight: bold; margin-bottom:15px;">房屋信息</view>
      <form @submit="formSubmit" @reset="formReset">
        <view style="margin-bottom:10px;">
          <view style="margin-left:5px;">房屋公共设施</view>
          <checkbox-group bindchange="facilities" style="font-size:14px;">
            <checkbox value="0" style="margin-left:2px;"/>洗衣机
            <checkbox value="0" style="margin-left:2px;"/>冰箱
            <checkbox value="0" style="margin-left:2px;"/>空调
            <checkbox value="0" style="margin-left:2px;"/>热水器
            <checkbox value="0" style="margin-left:2px;"/>天然气
          </checkbox-group>
        </view>
        <view style="margin-bottom:10px;">
          <view style="margin-bottom:10px; margin-left:5px;">房间图片</view>
          <view style="width:95%; height:300px; border:1px solid gray; margin:0 auto;">
            <view v-for='(item, index) of pictureList' :key='item.id' :data-index='index' style="width:30%; height:30%; margin: 0 3px; font-size:10px; display: inline-block;">
              <image style="width: 100%; height:100%; display:block;" :src="item.url" data-src="" @click="previewImage"/>
              <view style="width: 100%;" class="delete" @click='deleteImage' :data-index="index">
                <image mode='aspectFill' style="display:block; margin:0 auto;" src="../../static/images/delete.png" />
              </view>
            </view>
            <view style="width:30%; height:30%; margin: 0 3px; text-align:center; vertical-align:middle; display: inline-block;">
              <view style="width:100%; height:100%;">
                <image src="../../static/images/plus.png" mode='aspectFill' style="width:50%; height:50%;" class="button-upload" @click="chooseImage" />
              </view>
            </view>
          </view>
          <view style="font-size:12px; margin-left:5px;">最多上传8张图片，仅支持JPG、PNG格式，图片大于350*350</view>
        </view>
        <view style="margin-bottom:10px; margin-left:5px; margin-right:5px;">
          <view>房屋简介</view>
          <view>
            <input name="introduce" fixed=false style="border:1px solid gray; font-size:14px; line-height:14px; height:80px;" placeholder="请输入房屋简介，限制在50字以内"></input>
          </view>
        </view>
        <view style="margin-bottom:10px; margin-left:5px; width:100px;">
          <text>期望租金</text><input placeholder='￥' style="border:1px solid gray;"></input>
        </view>
        <view style="text-align:center; margin-top: 20px;">
          <button class="button" formType="submit" style="display:inline-block; width:100px;">下一步</button>
          <button class="button" formType="reset" style="display:inline-block; width:100px; margin-left:20px;background-color:gray;">返回</button>
        </view>
      </form>
    </scroll-view>
    <tabBarSelect :selectNavIndex='0' :navList='navList'></tabBarSelect>
  </div>
</template>

<script>
import globalStore from '@/stores/global-store'
import tabBarSelect from '@/components/tabbar'

export default {
  data () {
    return {
      navList: globalStore.state.tabBarList.navList2,
      scrollHeight: 300,
      pictureList: [{id: '0', url: '../../static/images/house.jpg'},
        {id: '1', url: '../../static/images/house.jpg'},
        {id: '2', url: '../../static/images/house.jpg'},
        {id: '3', url: '../../static/images/house.jpg'},
        {id: '4', url: '../../static/images/house.jpg'},
        {id: '5', url: '../../static/images/house.jpg'},
        {id: '6', url: '../../static/images/house.jpg'},
        {id: '7', url: '../../static/images/house.jpg'}]
    }
  },

  components: {
    tabBarSelect
  },

  methods: {
    formSubmit (e) {
      wx.navigateTo({
        url: '../roomInfo/main'
      })
    },
    formReset () {
      wx.navigateBack({
        delta: 1
      })
    },
    previewImage () {
      wx.previewImage({
        urls: this.images
      })
    },
    chooseImage () {
      var that = this
      wx.chooseImage({
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
          that.images.concat(tempFilePaths)
        }
      })
    },
    deleteImage (e) {
      var index = e.currentTarget.dataset.index
      var images = this.images
      images.splice(index, 1)
      this.images = images
    }
  },

  mounted () {
    console.log(this.scrollHeight)
    this.scrollHeight = wx.getSystemInfoSync().windowHeight - 60
  }
}
</script>

<style scoped>
.button {
  color:white;
  background-color:rgb(0, 102, 255);
  border-radius:10px;
}
/*删除按钮*/
.delete {
  margin-top:-20px;
  height: 20px;
  bottom: 0;
  width: 100%;
  background: #ccc;
  opacity: .6;
  text-align:center;
}
.delete image {
  width: 20px;
  height: 20px;
  opacity: .8;
}

</style>
