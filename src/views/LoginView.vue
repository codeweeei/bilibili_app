<template>
  <div class="container">
    <login-top middleTop="登录bilibili">
      <div slot="right" @click="right">切换到注册</div>
    </login-top>
    <login-text
    label="账号" 
    placeholder="请输入账号"
    @imputChange="res => model.username = res"
    />
    <login-text
    label="密码" 
    type="password"
    placeholder="请输入密码"
    @imputChange="res => model.password = res"
    />
    <login-btn btnname="登录" @loginSubmit="Ajaxinsert"></login-btn>
  </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop'
import LoginText from '@/components/common/LoginText'
import LoginBtn from '@/components/common/LoginBtn'
export default {
  name:'LoginView',
  data() {
    return {
      model:{}
    }
  },
  methods: {
    async Ajaxinsert(){
      let rulg = /^.{6,16}$/
      if(rulg.test(this.model.username)&&rulg.test(this.model.password)){
        const res=await this.$http.post('/login',this.model)
        // console.log(res)
        this.$msg.fail(res.data.msg)
        if(res.data.code==301||res.data.code==302){
          //判断当密码错误或则用户名不存在时，返回，不进行后面的路由跳转
          return
        }
        localStorage.setItem('id',res.data.id)
        localStorage.setItem('token',res.data.token)
        setTimeout(()=>{
          this.$router.push('/user')
        },1000)
      }else{
        this.$msg.fail("格式不正确，请重新输入")
      }
      
    },
    right(){
      this.$router.push('/register')
    }
  },
  components:{
    LoginTop,
    LoginText,
    LoginBtn
  }
}
</script>

<style>
  
</style>