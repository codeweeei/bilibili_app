<template>
  <div class="btnmagin" @click="loginSubmit">
    <div class="loginbtn">
      {{btnname}}
    </div>
  </div>
</template>

<script>
export default {
  name:"LoginBtn",
  props:["btnname"],
  methods: {
    loginSubmit(){
      this.$emit('loginSubmit')
    }
  },
}

</script>

<style lang="less">
  .btnmagin{
    margin: 6.667vw 2.667vw ;
  }
  .loginbtn{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12vw;
    background: #ff9db5;
    border-radius: 6.667vw;
    color: white;
  }
</style>