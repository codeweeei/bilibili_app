<template>
  <div class="logintop">
    <div></div>
    <div>{{middleTop}}</div>
    <div><slot name=right></slot></div>
  </div>
</template>

<script>
export default {
  name:'LoginTop',
  props:["middleTop"]
}
</script>

<style lang="less">
  .logintop{
    display: flex;
    height: 10.667vw;
    background: #fff;
    justify-content: center;
    align-items: center;
  }
  .logintop div{
    flex: 1;
    font-size:4.444vw; 
    text-align: center;
  }
  .logintop div div{
    font-size: 3.467vw;
  }
</style>