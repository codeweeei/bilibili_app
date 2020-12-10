<template>
  <div class="totop" @click="totopClick" v-show="isShow">
    <img src="@/assets/gotop.png" alt >
  </div>
</template>

<script>
export default {
  name:"ToTop",
  props:{
    isShow:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    //点击返回顶部
    totopClick() {
      let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      //实现滚动效果，定时滚动
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 15);
    }
  },
}
</script>

<style lang="less" scoped>
  .totop{
    position: fixed;
    bottom: 4.8vw;
    right: 4vw;
    z-index: 999;
    img{
      width: 14vw;
      height: 14vw;
    }
  }
</style>