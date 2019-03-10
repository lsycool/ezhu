
<template>
    <div class="container">
        <wux-result
            :title="options.title"
            :label="options.content"
            :buttons="resultPageButtons"
            extra="Copyright © 2018 ezu"
            fixed
            @bClick="onClick1"
        />
    </div>
</template>

<script>
export default {
  data () {
    return {
      resultPageButtons: [{
          type: 'balanced',
          block: true,
          text: '确定',
        },
        {
          type: 'light',
          block: true,
          text: '返回',
        },
      ],
      options: ''
    }
  },
  methods: {
    onClick1(e) {
      let index  = e.mp.detail

      index === 0 &&  wx.redirectTo({
        url: this.options.url
      })

      index === 1 && wx.navigateBack({
        delta: 0
      })
    }
  },
  onLoad(options) {
    this.options = options
    console.log(options)
  }
}
</script>