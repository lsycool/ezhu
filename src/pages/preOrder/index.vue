<template>
  <div class="container" @click="clickHandle('test click', $event)">
  
  <tabBarSelect :selectNavIndex='1' :navList='tabBarSelect'></tabBarSelect>
  </div>
</template>

<script>
import tabBarSelect from '@/components/tabbar'
import globalStore from '@/stores/global-store'

export default {
  data () {
    return {
      tabBarSelect: globalStore.state.tabBarList.navList
    }
  },

  components: {
    tabBarSelect
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
