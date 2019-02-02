<template>
  <div class="container">
    <view class="panel rentType">
      <view class="panel-hd" style="padding-top:0">租赁类型</view>
      <view class="wux-filterbar__panel">
        <view class="wux-filterbar__panel-bd">
          <radio-group @change="onRadioChange">
            <view class="wux-filterbar__groups">
              <block v-for='(item, index) of rentType' :key="item.id" :data-index='index'>
                  <view class="wux-filterbar__group">
                      <radio class="wux-filterbar__radio" :value="item.id"/>
                      <view class="wux-filterbar__btn" :class="item.checked? 'wux-filterbar__btn--checked' : ''">{{ item.name }}</view>
                  </view>
              </block>
            </view>
          </radio-group>
        </view>
      </view>
    </view>
    <!-- <scroll-view class="rentInfo" scroll-y="true" :style="{height: scrollHeight + 'px', overflow: 'auto', 'margin-bottom':'5px'}"> -->
      <view class="panel rentInfo" :style="{'height':scrollHeight, 'margin-bottom':'10px'}">
        <view class="panel-hd">房源详情</view>
        <view>
          <van-cell title="地理位置" label="您房源所在的小区" size="large" clickable @click="selectLocation"> 
            <van-icon slot="right-icon" name="location" style="margin-left:5px;"></van-icon>
          </van-cell>
          <picker mode="multiSelector" @change="selectHouseType" :value="houseTypeSelect" :range="houseType">
            <van-cell title="房屋户型" label="两室一厅一卫" :value="houseTypeLabel" size="large" clickable >
              <wux-icon addon="icon-icond" color="#999999" size="20"/>
            </van-cell>
          </picker>
          <picker mode="selector" @change="selectSexType" :value="sexSelect" :range="sexType">
            <van-cell title="租客性别" label="男/女/不限" :value="sexTypeLabel" size="large" clickable>
              <wux-icon addon="icon-xingbie1" color="#999999" size="20"/>
            </van-cell>
          </picker>
          <van-cell title="房屋朝向" label="东/南/西/北" size="large" clickable @click="selectFace">
            <wux-icon addon="icon-taiyang" color="#999999" size="20"/>
          </van-cell>
          <van-field :value="rentPrise" clearable type='number' label="租金要求" placeholder="请输入金额" use-button-slot @click-icon="onClickIcon">
            <view slot="button" style="color:#999999">元/月</view>
          </van-field>
          <van-field :value="floor" clearable label="楼  层" type='number' placeholder="请输入楼层" use-icon-slot @click-icon="onClickIcon">
            <wux-icon slot="icon" addon="icon-louceng0" color="#999999" size="20"/>
          </van-field>
          <van-field :value="floor" clearable label="面  积" type='number' placeholder="请输入面积" use-icon-slot @click-icon="onClickIcon">
            <wux-icon slot="icon" addon="icon-fangwumianji" color="#999999" size="20"/>
          </van-field>
        </view>
      </view>
    <!-- </scroll-view> -->
    <div class="wux-filterbar__btns bottomButton">
      <view class="wux-filterbar__btn wux-filterbar__btn--danger" @click="onConfirm">下一步</view>
    </div>
  </div>
</template>

<script>
import util from '@/utils/index'

export default {
  data () {
    return {
      rentType: [{id:0, name:'整租', checked: 1}, {id:1, name:'合租', checked: 0}, {id:2, name:'拼租', checked: 0}, {id:3, name:'懒人租房', checked: 0}],
      houseType: [['', '一室', '二室', '三室', '四室', '五室'], ['', '一厅', '二厅', '三厅', '四厅', '五厅'], ['', '一卫', '二卫', '三卫', '四卫', '五卫']],
      houseTypeSelect: [0, 0, 0],
      sexType: ['', '男', '女', '不限'],
      sexTypeSelect: [0],
      scrollHeight: 300,
      selectType: 0
    }
  },
  onShow () {
    wx.hideTabBar({
      animation: false
    })
  },
  mounted () {
    this.getScollHeight()
  },
  computed: {
    houseTypeLabel: function () {
      let houseType = this.houseType
      let houseTypeSelect = this.houseTypeSelect
      return houseType[0][houseTypeSelect[0]] + houseType[1][houseTypeSelect[1]] + houseType[2][houseTypeSelect[2]];
    },
    sexTypeLabel: function () {
      let sexType = this.sexType
      let sexTypeSelect = this.sexTypeSelect
      return sexType[sexTypeSelect[0]];
    }
  },
  methods: {
    onRadioChange(e) {
      this.selectType = e.mp.detail.value
      for (let i = 0; i < this.rentType.length; i++) {
        if (this.rentType[i].id == this.selectType) {
          this.rentType[i].checked = true;
        } else {
          this.rentType[i].checked = false;
        }
      }
    },
    getScollHeight () {
      util.getWindowRect('.rentInfo').then((res) => {
        return res.top
      }).then((head) => {
        var windowHeight = wx.getSystemInfoSync().windowHeight
        return windowHeight - head
      }).then((head) => {
        util.getWindowRect('.bottomButton').then((res) => {
          this.scrollHeight = head - res.height
        })
      })
    },
    onConfirm () {
      let id = this.rentType.filter((n) => n.checked == 1).map((n) => n.id)
      let url = ''
      if (0 == id) {
        url = '../landlordWholeInfo/main?rentType=' + this.selectType
      } else if (1 == id){
        url = '../houseInfo/main?rentType=' + this.selectType
      }
      wx.navigateTo({
        url: url
      })
    },
    selectLocation () {
      
    },
    selectHouseType (e) {
      this.houseTypeSelect = e.mp.detail.value;
    },
    selectSexType (e) {
      this.sexTypeSelect = e.mp.detail.value;
    }
  }
}
</script>

<style scoped>
page {
  height: 100%;
}

.container {
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

.bottomButton {
  position: fixed;
  bottom: 5rpx;
  margin:20rpx 40rpx;
  width:90%;
  left:0;
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
  width: 33.3333%;
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
.wux-filterbar__btns .wux-filterbar__btn--danger {
  background-color: #f23030;
  color: #fff;
}
.wux-filterbar__btns .wux-filterbar__btn--danger:before {
  display: none;
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
