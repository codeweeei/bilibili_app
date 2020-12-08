<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepalive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<script>

// import RegisterView from '@/views/RegisterView'

export default {
  name: 'App',
  // components: {
  //   RegisterView
  // }
}
</script>
  
<style lang="less">
  body{
    margin: 0;
    padding: 0;
    background: #f4f4f4;
    box-sizing: border-box;
    display: block;
  }
  p{
    margin: 0;
  } 

</style>
