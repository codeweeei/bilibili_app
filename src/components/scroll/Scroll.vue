<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)
export default {
  name:"Scroll",
  data() {
    return {
      scroll:null
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: 3,
      pullUpLoad: true,
      scrollY: true,
      click: true
    })
  },
}
</script>

<style lang="less" scoped>
  .wrapper{
    height: 100%;
    overflow: hidden;
  }
</style>