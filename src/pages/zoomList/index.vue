<template>
  <div class="i-index-demo">
    <i-index height="100%" @change="onChange">
        <i-index-item v-for='(item, index) of storeCity' :key='index' :data-index='index' :name='item.key'>
            <view class="i-index-demo-item" v-for='(item1, index1) of item.list' :key='index1' :data-name='item1.name' @click="onSelectZoom">
                {{item1.name}}
            </view>
        </i-index-item>
    </i-index>
  </div>
</template>

<script>
import hz2py from '@/utils/hz2py'

export default {
  data : {
    cities : [{"name":"北京", "pinyin":"Beijing", "zip":"010"}, {"name":"重庆", "pinyin":"Chongqing", "zip":"023"}],
    storeCity: []
  },

  mounted () {
      let storeCity = new Array(26);
      const words = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
      words.forEach((item,index)=>{
          storeCity[index] = {
              key : item,
              list : []
          }
      })
      this.cities.forEach((item)=>{
          let firstName = item.pinyin.substring(0,1)
          let index = words.indexOf( firstName )
          storeCity[index].list.push({
              name : item.name,
              key : firstName
          })
      })
      this.storeCity = storeCity
  },

  methods: {
    onChange (event) {
      let a = hz2py.chineseToPinYin("中国")
      console.log(event.mp.detail,'click right menu callback data ' + a)
    },
    onSelectZoom (e) {
      let a = hz2py.chineseToPinYin(e.target.dataset.name)
      console.log(e,'click item ' + a)
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
.i-index-demo{
    width:100%;
    height:100%;
}
.i-index-demo-item{
    padding:10px;
    border-bottom:#ddd solid 1rpx;
    font-size:14px;
}
</style>
