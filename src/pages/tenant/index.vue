<template>
  <div class="container">
    <view class="head" style="display: block;">
      <wux-cascader :visible="cascaderVisible" title="所在地区" :options="cascaderOptions" @close="onCascaderClose" @change="onCascaderChange" />
      <view style="margin:0 10px; border:1rpx solid #ececec; border-radius:15px;">
        <wxc-list
          class="item" icon="address" mode="none" icon-color="#69A0DD" :title="city!=''? city:'请选择所在区域'" dot="true"  @click="onCascaderOpen">
        </wxc-list>
      </view>
    </view>
    <view style="margin-top:5px;">
      <wux-filterbar :items="headNavList" @change="onFilterbarChange" @open="onFilterbarOpen" @close="onFilterbarClose" />
    </view>
    <view class="houseDetail">
      <scroll-view scroll-y="true" :style="{height: scrollHeight + 'px', 'padding-top': '10px;', overflow: auto}">
        <view v-for='(item, index) of houseList' :key='item.id' :data-index='index' class='dataItem' style="margin:20px 10px; padding-bottom:20px; border-bottom:2px solid #d1d3d4;">
          <view style="font-size:10px; display: flex;">
            <image  mode='aspectFill' style="height: 90px; margin-right: 10px; flex: 1;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538332338328&di=ae3adf8bee6fbdef4d578690cb7b5ec7&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F17%2F13%2F83658PICb4r_1024.jpg" data-src="http://outofmemory.cn/j/tutorial/bootstrap/wp-content/uploads/2014/07/carousalpluginsimple_demo.jpg" @click="previewImage"/>
            <view style="flex:3;" @click="preOrder" :data-key='item.id'>
              <view class="profile">
                <wxc-elip line="2">{{item.abstract}}</wxc-elip>
              </view>
              <view>
                <wxc-label class="label" type="fill" type-color="#747bb1" text-color="#ff5577">xxx楼</wxc-label>
                <wxc-label class="label" type="fill">180平</wxc-label>
                <wxc-label class="label" type="fill" type-color="gray"  >电梯房</wxc-label>
              </view>
              <view>
                <text class="prise weui-media-box__info__meta">{{item.prise + '元/月'}}</text>
                <text v-if="searchParam.rentType == '0'" class="amount">{{headNavList[0].label}}</text>
                <text v-if="searchParam.rentType == '1'" class="amount">{{item.amount}}人/{{headNavList[0].label}}</text>
                <text v-if="searchParam.rentType == '2'" class="amount">{{headNavList[0].label}}</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <van-tabbar :active="active" @change="onTabbarChange" class="tabBar">
      <van-tabbar-item icon="wap-home">返回主菜单</van-tabbar-item>
      <van-tabbar-item icon="cart" info="5">我的预定</van-tabbar-item>
      <van-tabbar-item icon="arrow-left">返回上一级</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import globalStore from '@/stores/global-store'
import util from '@/utils/index'
import data from './data'

export default {
  data () {
    return {
      city: '',
      active: 0,
      headNavList: [
        {
          type: 'radio',
          label: '整租',
          value: 'rentType',
          children: [{
                  label: '整租',
                  value: '0'
              },
              {
                  label: '合租',
                  value: '1'
              },
              {
                  label: '懒人',
                  value: '2'
              }
          ],
          groups: ['001']
        },
        {
          type: 'radio',
          label: '价格',
          value: 'rentPrise',
          children: [{
                  label: '不限',
                  value: '1'
              },
              {
                  label: '500-1000',
                  value: '2'
              },
              {
                  label: '1000-1500',
                  value: '3'
              },
              {
                  label: '1500-3000',
                  value: '3'
              },
              {
                  label: '3000以上',
                  value: '4'
              }
          ],
          groups: ['002']
        },
        {
          type: 'sort',
          label: '排序',
          value: 'sort',
          groups: ['005'],
        },
        {
          type: 'filter',
          label: '筛选',
          value: 'filter',
          children: [{
              type: 'radio',
              label: '朝向',
              value: 'face',
              children: [{
                      label: '东',
                      value: 'east',
                  },
                  {
                      label: '南',
                      value: 'south',
                  },
                  {
                      label: '西',
                      value: 'west',
                  },
                  {
                      label: '北',
                      value: 'north',
                  },
              ],
          },
          {
              type: 'checkbox',
              label: '房源亮点',
              value: 'edge',
              children: [{
                      label: '地铁旁',
                      value: 'subway',
                  },
                  {
                      label: '精装修',
                      value: 'decoration',
                  },
                  {
                      label: '免中介费',
                      value: 'freeZJF',
                  },
                  {
                      label: '免押金',
                      value: 'freeYJ',
                  },
                  {
                      label: '随时看房',
                      value: 'freeKF',
                  },
              ],
          },        
          {
            type: 'radio',
            label: '户型',
            value: 'houseType',
            children: [{
                    label: '一室一厅',
                    value: '1'
                },
                {
                    label: '两室一厅',
                    value: '2'
                },
                {
                    label: '三室一厅',
                    value: '3'
                },
                {
                    label: '三室两厅',
                    value: '4'
                },
                {
                    label: '其他',
                    value: '5'
                }
              ]
          },
          {
            type: 'slide',
            label: '价格区间',
            value: 'priseRange',
            children: [{
                    value: [2000, 5000],
                    displayMin: 0,
                    displayMax: 20000
                }
              ]
          }],
          groups: ['004']
        }
      ],
      houseList: [{id: 0, prise: 1000, abstract: 'good house', amount: '10'},
        {id: 1, prise: 1001, abstract: 'good house good house good house good house good house good house  good house good house', amount: '10'},
        {id: 2, prise: 1002, abstract: '这是一个大大大大哒哒哒哒哒哒哒对方水电费水电费水电费哒哒哒的好房子', amount: '10'},
        {id: 3, prise: 1003, abstract: 'good house', amount: '10'},
        {id: 4, prise: 1004, abstract: 'good house', amount: '10'},
        {id: 5, prise: 1005, abstract: 'good house', amount: '10'},
        {id: 6, prise: 1006, abstract: 'good house', amount: '10'},
        {id: 7, prise: 1007, abstract: 'good house', amount: '10'},
        {id: 8, prise: 1008, abstract: 'good house', amount: '10'},
        {id: 9, prise: 1009, abstract: 'good house', amount: '10'},
        {id: 10, prise: 1010, abstract: 'good house', amount: '10'},
        {id: 11, prise: 1011, abstract: 'good house', amount: '10'},
        {id: 12, prise: 1012, abstract: 'good house', amount: '10'},
        {id: 13, prise: 1013, abstract: 'good house', amount: '10'},
        {id: 14, prise: 1014, abstract: 'good house', amount: '10'}],
      scrollHeight: 0,
      cascaderOptions: data,
      cascaderVisible: false,
      searchParam: {},
      rentName: ''
    }
  },
  computed: {
  },
  onShow () {
    wx.hideTabBar({
      animation: false
    })
  },
  mounted () {
    this.getScollHeight()
    this.searchParam.rentType = '0'
    // console.log(this.$root.$mp)
    // console.log(this.$root.$mp.query)
    // console.log(this.$root.$mp.appOptions)
  },
  methods: {
    getScollHeight () {
      util.getWindowRect('.houseDetail').then((res) => {
        return res.top
      }).then((head) => {
        var windowHeight = wx.getSystemInfoSync().windowHeight
        return windowHeight - head
      }).then((head) => {
        util.getWindowRect('.tabBar').then((res) => {
          this.scrollHeight = head - res.height
        })
      })
    },
    preOrder (e) {
      wx.navigateTo({
        url: '../preOrder/main?id=' + e.currentTarget.dataset.key + '&rentType=' + this.searchParam.rentType
      })
    },
    previewImage (e) {
      var current = e.target.dataset.src
      wx.previewImage({
        current: current,
        urls: [current]
      })
    },
    onCascaderOpen () {
      this.cascaderVisible = true
    },
    onCascaderClose () {
      this.cascaderVisible = false
    },
    onCascaderChange (e) {
      this.city = e.mp.detail.options.map((n) => n.label).join('/')
    },
    onTabbarChange(e) {
      let index = e.mp.detail;
      if (this.active == index) {
        return;
      }
      if (index == 0) {
        wx.switchTab({
          url: '../tenant/main'
        })
      } else if(index == 1) {
        wx.switchTab({
          url: '../myBooked/main'
        })
      } else if (index == 2) {
        wx.switchTab({
          url: '../myBooked/main'
        })        
      }
      // console.log(e);
    },
    onFilterbarChange(e) {
      // console.log(e.mp.detail)
      const { checkedItems, items } = e.mp.detail
      checkedItems.forEach((n) => {
        if (n.checked) {
            if (n.value === 'rentType') {
                const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                this.searchParam.rentType = selected
            } else if (n.value === 'rentPrise') {
                this.searchParam.rentPrise =  n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
            } else if (n.value === 'sort') {
                this.searchParam.sortType = n.sort
            } else if (n.value === 'filter') {
                n.children.filter((n) => n.selected).forEach((n) => {
                    if (n.value === 'face') {
                        const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                        this.searchParam.face = selected
                    } else if (n.value === 'edge') {
                        const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                        this.searchParam.edge = selected
                    } else if (n.value === 'houseType') {
                        const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                        this.searchParam.houseType = selected
                    } else if (n.value === 'priseRange') {
                        const selected = n.children.map((n) => n.value).join(' ')
                        this.searchParam.priseRange = selected
                    }
                })
            }
        }
      })
    },
    onFilterbarOpen(e) {
      // console.log(e)
    },
    onFilterbarClose(e) {
      if ('0' == this.searchParam.rentType) {
        this.headNavList[0].label = '整租'
      } else if ('1' == this.searchParam.rentType) {
        this.headNavList[0].label = '合租'
      } else if ('2' == this.searchParam.rentType) {
        this.headNavList[0].label = '懒人'
      }
      // console.log(this.searchParam)
      // console.log(this.headNavList[0].label)
    }
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
.clicked {
  color:#336699
}
.userName {
  font-size:30rpx;
  line-height:30rpx;
  margin-right:5px;
}
.avatar {
  vertical-align:middle;
  width:70rpx; 
  height:70rpx; 
  margin-right:20rpx; 
  border-radius:35rpx;
}
.combox {
  width:150rpx;
  height:80rpx;
  margin:0 20rpx;
  display:inline-block;
  vertical-align:middle;
}
.infoTitle {
  font-size:15px;
}
.prise {
  display:inline-block;
  color:#D32F2F;
  font-weight: bold;
  margin-top: 5px;
  margin-right: 10px;
  font-size: 14px;
}
.profile {
  /* font-family: 'SourceHanSansCN Heavy'; */
  font-weight: bold;
  color: #455A64;
  font-size: 15px;
  height:40px;
  margin-bottom: 4px;
}
.amount {
  display: inline-block;
  font-size: 13px;
  color: gray
}
.confirm {
  width:30px;
  height:10px;
  font-size:6px;
  line-height:10px;
  padding:0;
  display: inline-block;
  color:white;
  background-color:red;
  border-radius:10px;
}
.item {
  flex: 1;
}
.label {
    margin-right: 20rpx;
  }
.houseDetail ::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
