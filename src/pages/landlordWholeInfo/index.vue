<template>
  <div class="container">
      <view class="panel" style="margin:0">
        <view class="panel-hd" style="padding-top:0">房屋公共设施</view>
        <view class="wux-filterbar__panel">
          <view class="wux-filterbar__panel-bd">
            <checkbox-group @change="onCheckboxChange">
              <view class="wux-filterbar__groups">
                <block v-for="(item, index) of infrastructure" :key="item.id" :data-index='index'>
                  <view class="wux-filterbar__group">
                    <checkbox class="wux-filterbar__check" :value="item.id"/>
                    <view class="wux-filterbar__btn" :class="item.checked ? 'wux-filterbar__btn--checked' : ''">{{ item.name }}</view>
                  </view>
                </block>
              </view>
            </checkbox-group>
          </view>
        </view>
      </view>
      <view class="panel" v-if="rentType == 0">
        <view class="panel-hd" style="padding-top:0; padding-bottom:5px;">房屋照片</view>
          <!-- <view v-for='(item, index) of picList' :key='index' :data-index='index' class="picList">
            <image style="width: 100%; height: 100%; display:block;" :src="item" :data-src="item" :data-index="index" @click="previewImage"/>
            <view v-if="index != picList.length-1" style="width: 100%;" class="delete" @click='deleteImage' :data-index="index">
              <image mode='aspectFill' style="display:block; margin:0 auto;" src="../../static/images/delete.png" />
            </view>
        </view> -->
        <view style="width:100%; height:300px; margin:0 auto;">
          <view v-for='(item, index) of picList' :key='index' :data-index='index' style="width:30%; margin: 2px 3px; font-size:10px; display: inline-block;">
            <view v-if="index != 9" :style="{'border-color':(item != '../../static/images/plus2.png'? '#f5222d':'#d9d9d9')}" style="width:90px; height:90px; margin:auto; box-sizing:border-box; border-radius:8rpx; border:2rpx solid #d9d9d9;">
              <image mode='aspectFill' style="width: 85px; height: 85px; display:block; margin:auto; box-sizing:border-box; margin-top:1px; border-radius:8rpx;" :src="item" :data-src="item" @click="previewImage"/>
              <view v-if="item != '../../static/images/plus2.png'" style="width: 90px; border-radius:8rpx;" class="delete" @click='deleteImage' :data-index="index">
                <image mode='aspectFill' style="display:block; margin:0 auto;" src="../../static/images/delete.png" />
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="panel" v-if="rentType == 0">
        <view class="panel-hd" style="padding-top:0; padding-bottom:5px;">房屋简介</view>
        <wux-cell-group>
          <wux-cell hover-class="none">
            <wux-textarea hasCount rows="3" cursorSpacing="80" maxlength='50' placeholder="最多50个字符" :focus=false />
          </wux-cell>
        </wux-cell-group>
      </view>
      <div class="wux-filterbar__btns bottomButton">
        <view class="wux-filterbar__btn wux-filterbar__btn" @click="onConfirm">上一步</view>
        <view class="wux-filterbar__btn wux-filterbar__btn--danger" @click="onConfirm">下一步</view>
      </div>
    
  </div>
</template>

<script>
import util from '@/utils/index'

export default {
  data () {
    return {
      infrastructure: [{id: 0, name: '床', checked: 0},
      {id: 1, name: '洗衣机', checked: 0},
      {id: 2, name: '空调哦', checked: 0},
      {id: 3, name: '阳台', checked: 0},
      {id: 4, name: '冰箱', checked: 0},
      {id: 5, name: '卫生间', checked: 0},
      {id: 6, name: '燃气', checked: 0},
      {id: 7, name: '电视机', checked: 0},
      {id: 8, name: '热水器', checked: 0},
      {id: 9, name: '宽带', checked: 0},
      {id: 10, name: '沙发', checked: 0},
      {id: 11, name: '暖气', checked: 0},
      {id: 12, name: '衣柜', checked: 0}
      ],
      picList: ['../../static/images/plus2.png'],
      rentType: 0,
      scrollHeight: 300
    }
  },
  onLoad(options) {
    this.rentType = options.rentType
  },
  methods: {
    onCheckboxChange(e) {
      this.selectType = e.mp.detail.value
      this.infrastructure.map((n) => {n.checked = 0; n})
      for (let i = 0; i < this.infrastructure.length; i++) {
        for (let j = 0; j < this.selectType.length; j++) {
          if (this.infrastructure[i].id == this.selectType[j]) {
            this.infrastructure[i].checked = true;
          }
        }
      }
    },
    getScollHeight () {
      util.getWindowRect('.container').then((res) => {
        return res.top
      }).then((head) => {
        let windowHeight = wx.getSystemInfoSync().windowHeight
        console.log(head)
        console.log(windowHeight)
        return windowHeight - head
      }).then((head) => {
        util.getWindowRect('.bottomButton').then((res) => {
          this.scrollHeight = head - res.height
          console.log(res.height)
        })
      })
    },
    previewImage (e) {
      let current = e.target.dataset.src
      let index = e.target.dataset.index
      if (current !== '../../static/images/plus2.png') {
        wx.previewImage({
          current: current,
          urls: [current]
        })
      } else {
        this.chooseImage(index)
      }
    },
    chooseImage (index) {
      let that = this
      if (this.picList.length < 10) {
        wx.chooseImage({
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            let tempFilePaths = res.tempFilePaths
            for (let p in tempFilePaths) {
              if (that.picList.length < 10) {
                that.picList.unshift(tempFilePaths[p])
              }
            }
            that.$forceUpdate()
          }
        })
      } else {
        wx.showToast({
          title: '最多只能上传9张图片',
          icon: 'none',
          duration: 10000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }
    },
  },

  mounted () {
    this.getScollHeight()
  }
}
</script>

<style scoped>
.container{
    height: 100%;
    overflow: hidden;
    margin:20rpx 40rpx;
}

.panel-hd {
  padding-top:20rpx;
  padding-bottom:4rpx;
  color:#1c2438;
  font-size:35rpx;
  overflow-x:hidden;
  display:-webkit-box;
  display:-webkit-flex;
  display:flex;
  -webkit-box-align:center;
  -webkit-align-items:center;
  align-items:center;
  font-weight:bold;
}
.panel {
  display: block;
}
.picList {
  width: 60px; 
  height: 60px; 
  margin-right: 3px; 
  margin-bottom:5px; 
  font-size:10px; 
  display: inline-block; 
  border: 1px solid gray;
}
.delete {
  margin-top:-20px;
  height: 20px;
  bottom: 0;
  width: 100%;
  opacity: .6;
  text-align:center;
}
.delete image {
  width: 20px;
  height: 20px;
  opacity: .8;
}
.wux-filterbar__panel {
  padding: 0 30rpx;
}
.wux-filterbar__panel:last-child {
  padding-bottom: 40rpx;
}
.wux-filterbar__panel-hd {
  padding-top: 40rpx;
  padding-bottom: 4rpx;
  color: #252525;
  font-size: 30rpx;
  overflow-x: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
          align-items: center;
}
.wux-filterbar__panel-selected {
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
          flex: 1;
  text-align: right;
  font-size: 26rpx;
  line-height: 48rpx;
  color: #f23030;
}
.wux-filterbar__groups {
  overflow: hidden;
  font-size: 26rpx;
  margin: 0 -10rpx;
}
.wux-filterbar__group {
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  position: relative;
  height: 64rpx;
  width: 20%;
  color: #232326;
  margin-top: 20rpx;
  float: left;
  box-sizing: border-box;
  padding-left: 10rpx;
  padding-right: 10rpx;
}
.wux-filterbar__radio,
.wux-filterbar__check,
.wux-filterbar__btn {
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  height: 64rpx;
  display: block;
  text-align: center;
  line-height: 64rpx;
  background-color: #f0f2f5;
  border-radius: 10rpx;
  border: 2rpx solid #f0f2f5;
  box-sizing: border-box;
}
.wux-filterbar__radio,
.wux-filterbar__check {
  position: absolute;
  left: 10rpx;
  top: 0;
  width: 100%;
  width: calc(100% - 20rpx);
  opacity: 0;
}
.wux-filterbar__btn--checked {
  background-color: #2d8cf0;
  color: #fff;
}

.wux-filterbar__btns {
  height: 88rpx;
  display: -webkit-box;
  overflow: hidden;
}
.wux-filterbar__btns .wux-filterbar__btn {
  background-color: #fff;
  color: #252525;
  font-size: 32rpx;
  position: relative;
  display: -webkit-box;
  -webkit-box-flex: 1;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  border: none;
  border-radius: 0;
  height: 88rpx;
  line-height: 88rpx;
}
.wux-filterbar__btns .wux-filterbar__btn:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 2rpx;
  border-top: 2rpx solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
}
.wux-filterbar__btns {
  height: 88rpx;
  display: -webkit-box;
  overflow: hidden;
}
.wux-filterbar__btns .wux-filterbar__btn {
  background-color: #fff;
  color: #252525;
  font-size: 32rpx;
  position: relative;
  display: -webkit-box;
  -webkit-box-flex: 1;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  border: none;
  border-radius: 0;
  height: 88rpx;
  line-height: 88rpx;
}
.wux-filterbar__btns .wux-filterbar__btn:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 2rpx;
  border-top: 2rpx solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
}
.wux-filterbar__btns .wux-filterbar__btn--danger {
  background-color: #f23030;
  color: #fff;
}
.wux-filterbar__btns .wux-filterbar__btn--danger:before {
  display: none;
}
</style>
