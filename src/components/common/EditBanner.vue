<template>
  <div>
    <div class="editbanner" @click="bannerClick">
      <span class="left">{{left}}</span>
      <span><slot name="right"/></span>
    </div>
  </div>
</template>

<script>
export default {
  name:'EditBanner',
  props:['left'],
  data() {
    return {
      model:{}
    }
  },
  methods: {
    bannerClick(){
      this.$emit('bannerClick')
    }
  },
}
</script>

<style lang="less">
  .editbanner{
    display: flex;
    padding: 4vw 2.133vw;
    justify-content: space-between;
    background: white;
    border-bottom: 0.533vw solid #eee;
    font-size: 3.733vw;
    color: #333;
    align-items: center;
  }
  
</style>