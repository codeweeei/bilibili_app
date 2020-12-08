<template>
  <div class="container">
    <login-top middleTop="注册bilibili">
      <div slot="right" @click="tologin" >切换到登录</div>
    </login-top>
    <login-text 
    label="姓名" 
    placeholder="请输入姓名"
    rule="^.{6,10}$" 
    @imputChange="res => model.name = res"
    />
    <login-text
    label="账号" 
    placeholder="请输入账号"
    rule="^.{6,10}$"
    @imputChange="res => model.username = res"
    />
    <login-text
    label="密码" 
    type="password"
    placeholder="请输入密码"
    rule="^.{6,10}$"
    @imputChange="res => model.password = res"
    />
    <login-btn btnname="注册" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop'
import LoginText from '@/components/common/LoginText'
import LoginBtn from '@/components/common/LoginBtn'
export default {
  name:'RegisterView',
  data() {
    return {
      model:{
      name:"",
      username:"",
      password:"",
      }
    }
  },
  methods: {
    async registerSubmit(){
      let rulg=/^.{6,10}$/
      if(rulg.test(this.model.name)&&rulg.test(this.model.username)&&rulg.test(this.model.password)){
        const res=await this.$http.post('/register',this.model)
        // console.log(res)
        this.$msg.fail(res.data.msg)
        localStorage.setItem("id",res.data.id)
        localStorage.setItem("token",res.data.objtoken)
        if(res.data.msg=="注册成功"){
          setTimeout(()=>{
            this.$router.push('/user')
          },1000)
        }
      }else{
        this.$msg.fail("格式不正确，请重新输入")
      }
    },
    tologin(){
      this.$router.push('/login')
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