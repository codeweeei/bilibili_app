<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:"Scroll",
  data() {
    return {
      scroll:null
    }
  },
  mounted(){
    //bug1：结合vant的tag发现切换后只能滑倒最低的那个tag页面高度（前提是取消回弹）；（待解决）
    //bug2：只有从pc端切换到移动端之后才能进行滑动；（待解决）
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType: 3,
        pullUpLoad: true,
        scrollY: true,
        click: true,
        tap: true,
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        },
        // preventDefault: false
        useTransition:false,
        bounce: false,
      })  
      this.scroll.on('scroll',(position)=>{
        console.log(position)
      })
      this.scroll.refresh()
    })
    },
  methods: {
    //设置滚动的动画为300ms
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    },
  },
}
</script>

<style lang="less" scoped>
  .wrapper{
    height: 100%;
    overflow: hidden;
  }
</style>