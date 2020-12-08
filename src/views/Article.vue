<template>
  <div>
    <user-navbar />
    <div class="acticle" v-if="model">
      <video :src="model.content" controls="controls"></video>
      <div class="acticle_title">
        <div class="left">
          <span>{{model.category.title}}</span>
          <span>{{model.name}}</span>
        </div>
        <div class="right">
          <img src="@/assets/more.svg" alt @click="foldheight=foldheight==0?20:0" :class="{spread:foldheight}">
        </div>
      </div>
      <div class="acticle_detail">
        <div class="acticle_detail_up">
          <span>up:{{model.userinfo.name}}</span>
          <div @click="subscribeClick" v-if="!issubscribe">关注</div>
          <div @click="subscribeClick" v-else>已关注</div>
        </div>
        <div class="acticle_detail_message">
          <span>253.1万播放</span>
          <span>4.7万弹幕</span>
          <span>{{model.date}}</span>
        </div>
      </div>
      <div class="fold_container" :style="{height: foldheight + 'px'}">
        <p class="fold_desc">
          恭喜你，发现一个宝藏！！
        </p>
      </div>
      <div class="acticle_icon">
        <div @click="collectClick" :class="{'collectActive':iscollectActive}"><span class="icon-star-full"></span>收藏</div>
        <div><span class="icon-box-add"></span>缓存</div>
        <div><span class="icon-redo2"></span>分享</div>
      </div>
      <van-tabs v-model="active" animated>
        <van-tab title="推荐">
          <div class="detail_parent">
            <cover 
              class="detail_item_artcle" 
              v-for="(item,index) in commendData" 
              :key="index" 
              :detailItem=item 
            />
          </div>
        </van-tab>
        <van-tab title="评论">
          <div style="width:100%">
            <discuss :commentlen="commentlenth" @postcomment="postcomment" ref="dissself"></discuss>
          </div>
          <div style="width:100%">
            <comment @getcomlen="res => commentlenth=res" @answerid="answerid" ref="commentupdata"/>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import UserNavbar from '@/components/common/UserNavbar'
import Cover from '@/views/Cover'
import Discuss from '@/components/article/Discuss'
import Comment from '@/components/article/Comment'
export default {
  name:'Article',
  components:{
    UserNavbar,
    Cover,
    Discuss,
    Comment
  },
  data(){
    return{
      model:null,
      //推荐视频
      commendData:[],
      commentlenth:null,
      commentmodel:{
        comment_content:"",
        comment_date:"",
        article_id:null,
        parent_id:null
      },
      //收藏
      iscollectActive:null,
      //关注
      issubscribe:null,
      //折叠
      foldheight:0,
      //标签页
      active:0
    }
  },
  methods: {
    //获取视频信息
    async acticleData(){
      const res = await this.$http.get('/article/'+this.$route.params.id)
      // console.log(res)
      this.model=res.data[0]
      //页面渲染完毕（model）调用判断是否关注
      if(this.model){
        this.subscribeActive()
      }
    },
    //获取推荐视频信息
    async commendlist(){
      const res = await this.$http.get('/commend')
      // console.log(res)
      this.commendData=res.data
    },
    //发表评论
    async postcomment(inputmsg){
      // console.log(inputmsg)
      //将日期设为1-1格式
      this.commentmodel.comment_date=this.$date().format('MM'+'-'+'DD')
      // console.log(this.comment_date)
      this.commentmodel.comment_content=inputmsg
      this.commentmodel.article_id=this.$route.params.id
      const res = await this.$http.post('/comment_post/'+localStorage.getItem('id'),this.commentmodel)
      // console.log(res)
      // console.log(this.commentmodel)
      //发送完评论之后需要刷新页面的评论渲染
      this.$refs.commentupdata.selectComment()
      //发送完需要将parend_id设置回null，防止后面一级评论的parend_id重复；
      this.commentmodel.parent_id=null
      // console.log(this.commentmodel)
      if(res.status == 200){
        //当发送成功时，提示一下消息
          this.$msg.success('评论发表成功~')
      }
    },
    //收藏视频
    async collectClick(){
      if(localStorage.getItem('token')){
        const res =await this.$http.post('/collection/'+localStorage.getItem('id'),
        {//携带文章id
          article_id:this.$route.params.id
        })
        // console.log(res)
        if(res.data.msg=="收藏成功"){
          this.iscollectActive=true
          setTimeout(()=>{
            this.$msg.success("收藏成功~")
          },200)
        }else{
          this.iscollectActive=false
          setTimeout(()=>{
            this.$msg.success("取消收藏成功~")
          },200)
        }
      }
    },
    //判断是否为收藏（init）,页面刷新之后也会显示收藏的样式
    async collectInit(){
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/collection/'+localStorage.getItem('id'),
        {
          params:{
            article_id:this.$route.params.id
          }
        })
        // console.log(res)
        this.iscollectActive=res.data.success
      }
    },
    //关注up
    async subscribeClick(){
      if(localStorage.getItem('token')){
        const res =await this.$http.post('/sub_scription/'+localStorage.getItem('id'),
        {//携带要订阅的up主id
          sub_id:this.model.userid
        })
        // console.log(res)
        if(res.data.msg=="关注成功"){
          this.issubscribe=true
          setTimeout(()=>{
            this.$msg.success("关注成功~")
          },200)
        }else{
          this.issubscribe=false
          setTimeout(()=>{
            this.$msg.success("取消关注成功~")
          },200)
        }
      }
    },
    // 判断是否已经关注
    async subscribeActive(){
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/sub_scription/'+localStorage.getItem('id'),
        {
          params:{
            sub_id:this.model.userid
          }
        })
        // console.log(res)
        this.issubscribe=res.data.success
      }
    },
    //回复评论聚焦到input输入框
    answerid(id){
      this.commentmodel.parent_id=id
      // console.log(id)
      // console.log(this.commentmodel)
      //获取到discuss子组件标签，调用他里面得iptfocus（）方法聚焦输入框
      this.$refs.dissself.iptfocus()
    },
  },
  created() {
    this.acticleData()
    this.commendlist()
    this.collectInit()
  },
  watch: {
    //检测route，当改变路径（导航，文章）时触发
    $route(){
      this.acticleData()
      this.commendlist()
      //检测是否为收藏状态，重新刷新变量
      this.collectInit()
    }
  },
}
</script>

<style lang="less">
  .acticle{
    // width: 100%;
    overflow-x: hidden;
    background: white;
    video{
      width: 100%;
    }
    .detail_parent{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      width: 100%;
      .detail_item_artcle{
        width: 45%;
        margin-top: 1.333vw;
      }
    }
    
    .acticle_title{
      padding: 4vw;
      background: white;
      display: flex;
      .left{
        flex: 1;
        span:nth-child(1){
          height: 5.333vw;
          padding: 0 2.133vw;
          background: #f4f4f4;
          border-radius: 2.667vw;
          color: #fb7299;
          font-size: 3.2vw;
          margin-right: 1.333vw;
        }
      }
      .spread{
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }
    .acticle_detail{
      padding-bottom: 3.2vw;
      background: white;
      display: flex;
      .acticle_detail_up{
        span{
          font-size: 3.467vw;
          padding: 0 8vw 0 5.333vw;
        }
        div{
          width: 13.889vw;
          line-height: 6.111vw;
          text-align: center;
          color: #fff;
          background-color: #ff9db5;
          font-size: 3.333vw;
          margin: auto;
          border-radius: 0.8vw;
        }
      }
      .acticle_detail_message{
        flex: 1;
        padding-left: 5.333vw;
        span{
          color: #999;
          font-size: 3.2vw;
          padding-right: 2.667vw;
        }
      }
    }
    .acticle_icon{
      display: flex;
      padding-bottom: 2.667vw;
      background: white;
      .collectActive{
        color:#fb7299;
      }
      div{
        font-size: 3.2vw;
        color: #999;
        padding: 0 2.667vw;
        display: flex;
        align-items: center;
        span{
          font-size: 5.333vw;
          padding-right: 1.333vw;
        }
      }
    }
    .fold_container{
      -webkit-transition: height .3s;
      transition: height .3s;
      padding: 0 4.267vw;
      overflow: hidden;
      margin-bottom: 10px;
      .fold_desc{
      font-size: 3.467vw;
      color: #999;
      }
    }
  }
</style>