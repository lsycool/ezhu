<template>
  <div class="container">
    <scroll-view scroll-y="true" :style="{height: scrollHeight + 'px'}">
      <view style="text-align:center; font-weight: bold; margin-bottom:15px;">房屋信息</view>
      <form @submit="formSubmit" @reset="formReset">
        <view style="margin-bottom:10px;">
          <view style="margin-left:5px;">房屋公共设施</view>
          <checkbox-group @change="facilities" style="font-size:14px;">
            <checkbox value="0" style="margin-left:2px;"/>洗衣机
            <checkbox value="0" style="margin-left:2px;"/>冰箱
            <checkbox value="0" style="margin-left:2px;"/>空调
            <checkbox value="0" style="margin-left:2px;"/>热水器
            <checkbox value="0" style="margin-left:2px;"/>天然气
          </checkbox-group>
        </view>
        <view style="margin-bottom:10px;">
          <view style="margin-bottom:10px; margin-left:5px;">房间图片</view>
          <view style="width:95%; height:140px; border:1px solid gray; margin:0 auto;">
            <view>
              <view v-for='(item, index) of pictureList' v-if="index != 8" :key='index' :data-index='index' style="width:23%; margin: 2px 3px; font-size:10px; display: inline-block;">
                <image mode='aspectFill' style="width: 60px; height: 60px; display:block; margin:0 auto;" :src="item" :data-src="item" @click="previewImage"/>
                <view v-if="item != '../../static/images/plus2.png'" style="width: 60px;" class="delete" @click='deleteImage' :data-index="index">
                  <image mode='aspectFill' style="display:block; margin:0 auto;" src="../../static/images/delete.png" />
                </view>
              </view>
            </view>
          </view>
          <view style="font-size:12px; margin-left:5px;">最多上传8张图片，仅支持JPG、PNG格式，图片大于350*350</view>
        </view>
        <view style="margin-bottom:10px; margin-left:5px; margin-right:5px;">
          <view>房屋简介</view>
          <view>
            <textarea name="introduce" fixed=false style="border:1px solid gray; font-size:14px; line-height:14px; padding:0 10px; height:80px;" placeholder="请输入房屋简介，限制在50字以内"></textarea>
          </view>
        </view>
        <view v-if="rentType == 0" style="margin-bottom:10px; margin-left:5px; width:300px;">
          <text style="margin-right:5px; vertical-align:middle;">期望租金</text><input placeholder='￥' style="border:1px solid gray; padding:0 10px; display:inline-block; vertical-align:middle; width:100px;"></input>
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
      rentType: globalStore.state.rentType,
      navList: globalStore.state.tabBarList.navList2,
      scrollHeight: 300,
      pictureList: ['../../static/images/plus2.png']
    }
  },
  // onShow () {
  //   this.$forceUpdate()
  // },
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
    previewImage (e) {
      console.log('1rentType:' + globalStore.state.rentType)
      let current = e.target.dataset.src
      console.log(current)
      if (current !== '../../static/images/plus2.png') {
        wx.previewImage({
          current: current,
          urls: [current]
        })
      } else {
        this.chooseImage()
      }
    },
    chooseImage () {
      let that = this
      if (that.pictureList.length < 9) {
        wx.chooseImage({
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            let tempFilePaths = res.tempFilePaths
            for (let p in tempFilePaths) {
              if (that.pictureList.length < 9) {
                that.pictureList.unshift(tempFilePaths[p])
              }
            }
          }
        })
      } else {
        wx.showToast({
          title: '最多只能上传8张图片',
          icon: 'none',
          duration: 10000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }
    },
    deleteImage (e) {
      var index = e.currentTarget.dataset.index
      this.pictureList.splice(index, 1)
    }
  },

  mounted () {
    this.scrollHeight = wx.getSystemInfoSync().windowHeight - 60
    this.rentType = globalStore.state.rentType
    // console.log('mounted:' + this.rentType)
  }
}
</script>

<style scoped>
.button {
  width:80px;
  height:30px;
  font-size:12px;
  color:white;
  background-color:rgb(0, 102, 255);
  border-radius:10px;
}
/*删除按钮*/
.delete {
  margin-top:-18px;
  margin-left: auto;
  margin-right: auto;
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
