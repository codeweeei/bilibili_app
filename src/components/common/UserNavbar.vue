<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/')">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div>
      <p>
        <img src="@/assets/sousuo.svg" alt="">
        请输入内容
      </p>
    </div>
    <div>
      <div class="navbar_img" >
        <img :src="model.user_img" alt  v-if="model.user_img" @click="$router.push('/edit')">
        <img src="@/assets/default_img.jpg" alt  v-else @click="$router.push('/login')">
      </div>
      <p>下载App</p>
    </div>
  </div>
</template>

<script>
export default {
  name:"UserNavbar",
  data() {
    return {
      model:{}
    }
  },
  methods: {
    async navbarinit(){
      const res= await this.$http.get('/user/'+localStorage.getItem('id'))
      // console.log(res)
      this.model=res.data[0]
    },
  },
  created() {
    if(localStorage.getItem("token")){
      this.navbarinit()
    }
  },
}
</script>

<style lang="less">
  .navbar{
    height: 12vw;
    background: white;
    display: flex;
    .logo{
    width: 30.667vw;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    }
  }
  
  .navbar .logo img{
    width: 80%;
  }
  .navbar div:nth-child(2){
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
  }
  .navbar div:nth-child(2) p{
    padding: 0;
    margin: 0;
    height: 6.667vw;
    background-color: #f4f4f4;
    padding: 0 2.133vw;
    margin-right: 2.133vw;
    border-radius: 2.667vw;
    width: 90%;
    color: #aaa;
    font-size: 3.467vw;
    align-items: center;
    display: flex;
    /* line-height: 6.667vw; */
    
  }
  .navbar div:nth-child(2) p img{
    width: 5.333vw;
    height: 5.333vw;
    margin-right: 0.8vw;
    
  }
  .navbar div:nth-child(3){
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .navbar div:nth-child(3) .navbar_img img{
    height: 6.4vw;
    width: 6.4vw;
    display: flex;
    margin-right: 0.8vw;
    border-radius: 50%;
  }
  .navbar div:nth-child(3) p{
    background: #fb7299;
    color: white;
    padding: 1.333vw 2.667vw;
    font-size: 3.467vw;
    margin: 0 2.133vw;
    border-radius: 0.8vw;
  }
</style>