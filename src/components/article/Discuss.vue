<template>
  <div class="discuss">
    <div class="discuss_top">
      <p>评论</p>
      <span>{{commentlen}}</span>
    </div>
    <div class="discuss_send">
      <img :src="myself.user_img" alt="" v-if="myself">
      <img src="@/assets/default_img.jpg" alt="" v-else @click="$router.push('/login')">
      <input type="text" placeholder="说点什么吧~" @focus="focusInput" v-model="postcontent" ref="inputfocus">
      <button @click="publish">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  name:'Discuss',
  data() {
    return {
      myself:null,
      postcontent:'',
    }
  },
  props:["commentlen"],
  methods: {
    async myUserinfo(){
      const res = await this.$http.get('/user/'+localStorage.getItem('id'))
      // console.log(res)
      this.myself=res.data[0]
    },
    focusInput(){
      if(!this.myself&&!localStorage.getItem("id")&&!localStorage.getItem("token")){
        this.$msg.fail("请先登录")
        setTimeout(()=>{
          this.$router.push('/login')
        },1000)
      }
    },
    publish(){
      //点击发表按钮向父组件里传入一个事件，并携带inputcontent内容
      this.$emit("postcomment",this.postcontent)
      //发送完之后需要将输入框里的内容清空
      this.postcontent=''
    },
    iptfocus(){
      this.$refs.inputfocus.focus()
    }
  },
  created() {
    if(localStorage.getItem("token")){
      //判断是否有token，即权限问题，有才可以获取信息
      this.myUserinfo()
    }
  },
}
</script>

<style lang="less">
  .discuss{
    width: 100%;
    box-sizing: border-box;
    padding:20px 2.667vw 2.667vw;
    .discuss_top{
      display: flex;
      padding: 2.667vw 2.667vw 2.667vw 0;
      align-items: center;
      p{
        margin-right: 2.667vw;
      }
      span{
        color: #aaa;
      }
    }
    .discuss_send{
      padding: 1.333vw 0;
      display: flex;
      align-items: center;
      img{
        width: 6.667vw;
        height: 6.667vw;
        border-radius: 50%;
        margin-right: 2.667vw;
      }
      input{
        flex: 1;
        background: #f4f4f4;
        font-size: 3.2vw;
        outline: none;
        border: 0;
        border-radius: 3.467vw;
        padding: 1.333vw 1.333vw 1.333vw 5.333vw;
        // margin-right: 10.001px;
        color: #aaa;
      }
      button{
        outline: none;
        border: 0;
        background: #fb7299;
        color: white;
        padding: 0 5.333vw;
        border-radius: 2.133vw;
        margin-left: 4vw;
        font-size: 3.733vw;
      }
    }
  }
</style>