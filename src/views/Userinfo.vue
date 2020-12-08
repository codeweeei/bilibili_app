<template>
  <div class="userinfo">
    <user-navbar />
    <img src="@/assets/bannerTop_new.png" alt="">
    <user-detail :userinfo="model"/>
    <user-article></user-article>
  </div>
</template>

<script>
import UserNavbar from '@/components/common/UserNavbar'
import UserDetail from '@/components/content/UserDetail'
import UserArticle from '@/components/content/UserArticle'
export default {
  name:'Userinfo',
  components:{
    UserNavbar,
    UserDetail,
    UserArticle
  },
  data() {
    return {
      model:{}
    }
  },
  methods: {
    async userinfoData(){
      const res = await this.$http.get('/user/'+localStorage.getItem('id'))
      // ,{
      //    headers:{
      //      'Authorization':'Bearer '+ localStorage.getItem('token')
      //   }
      //   })
      this.model=res.data[0]
      // console.log(this.model)
    }
  },
  created() {
    if(localStorage.getItem("token")){
      this.userinfoData()
    }
  },
}
</script>

<style scoped>
  .userinfo{
    margin: 0;
    padding: 0;
  }
  .userinfo img{
    height: 26.667vw;
    width: 100%;
    border-radius: 50%;
  }
</style>