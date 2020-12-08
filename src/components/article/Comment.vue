<template>
  <div class="comment_parent">
    <div v-for="(item,index) in commentList" :key="index">
      <div class="comment_item">
        <div class="comment_userimg">
          <img :src="item.userinfo.user_img" alt="" v-if="item.userinfo.user_img">
          <img src="@/assets/default_img.jpg" alt="" v-else>
        </div>
        <div class="comment_content">
          <p>
            <span>{{item.userinfo.name}}</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div class="contentdetail">
            {{item.comment_content}}<span class="answer" @click="answerclick(item.comment_id)">回复</span>
          </div>
        </div>
      </div>
      <div style="padding-left:8.333vw">
          <comment-items :commentChild="item.child" @multianswer="answerclick"/>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItems from "./CommentItems"
export default {
  name:"Comment",
  components:{
    CommentItems
  },
  data() {
    return {
      commentList:{},
    }
  },
  methods: {
    async selectComment(){
      const res = await this.$http.get('/comment/'+this.$route.params.id)
      // console.log(res.data.length)
      this.commentList=this.changeComment(res.data)
      if(res.data){
        this.$emit('getcomlen',res.data.length)
      }
      // console.log(this.commentList)
    },
    changeComment(data){
      function fn(temp){
        //递归将评论结构处理一下
        const arr1=[]
        // console.log(this.arr)
        for(let i=0;i<data.length;i++){
          if(data[i].parent_id==temp){
            arr1.push(data[i])
            data[i].child=fn(data[i].comment_id)
          }
        }
        return arr1
      }
      return fn(null)
    },
    answerclick(id){
      this.$emit("answerid",id)
    }
  },
  created() {
    this.selectComment()
  },
}
</script>

<style lang="less">
  .comment_parent{
      box-sizing: border-box;
      padding: 2.778vw;
      >div{
        border-bottom: 0.267vw solid #e7e7e7;
        .comment_item{
          margin: 2.667vw 0;
          display: flex;
          .comment_userimg{
            margin-right: 2.667vw;
            img{
              width: 8vw;
              height: 8vw;
              border-radius: 50%;
            }
          }
          .comment_content{
            flex: 1;
            position: relative;
            p{
              display: flex;
              justify-content: space-between;
              span{
                font-size: 3.467vw;
                color: #aaa;
              }
            }
            .contentdetail{
              color: #212121;
              font-size: 3.467vw;
              margin-top: 1.333vw;
              .answer{
                color: #fb7299;
                position: absolute;
                right: 0;
              }
            }
          }
    } 
  }
}
</style>