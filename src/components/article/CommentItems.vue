<template>
  <div class="comment_child">
    <div class="comment_item" v-for="(item,index) in commentChild" :key="index">
        <div class="comment_userimg">
          <img :src="item.userinfo.user_img" alt="" v-if="item.userinfo.user_img">
          <img src="@/assets/default_img.jpg" alt="" v-else>
          <p>
            <span>{{item.userinfo.name}}</span>
            <span>{{item.comment_date}}</span>
          </p>
        </div>
        <div class="comment_content" v-if="item.comment_content">
          <div class="contentdetail">
            <div v-if="!ismorecomment">{{item.comment_content}}
              <span class="answer" @click="multianswer1(item.comment_id)">回复</span>
            </div>
            <div v-else>回复 <span style="color:#5090cc">{{item.parent_user_info.name}}</span>:{{item.comment_content}}
              <span class="answer" @click="multianswer1(item.comment_id)">回复</span>
            </div>
          </div>
        </div>
        <!--此时利用组件的递归来设置多级评论的样式，即在组件里引用本身组件，每次将item.child传过去-->
        <comment-items :commentChild="item.child" :ismorecomment="true" @multianswer2="multianswer2"></comment-items>
    </div>
  </div>
</template>

<script>
export default {
  name:"CommentItems",
  //此时为二级评论组件向后代多级组件传入ismorecomment为true，即代表之后的为多级评论渲染回复xxx
  props:["commentChild","ismorecomment"],
  methods: {
    multianswer1(id){
      this.$emit("multianswer2",id)
      this.$emit("multianswer",id)
    },
    multianswer2(id){
      this.multianswer1(id)
      this.$emit("multianswer",id)
    }
  },
}
</script>

<style lang="less">
  .comment_child{
    .comment_item{
        display: flex;
        flex-direction: column;
        .comment_userimg{
          display: flex;
          img{
            margin-right: 2.667vw;
            border-radius: 50%;
          }
          p{
            flex: 1;
            display: flex;
            justify-content: space-between;
            span{
              font-size: 3.467vw;
              color: #aaa;
            }
          }
        }
        .comment_content{
            .contentdetail{
              .answer{
                right: 2.667vw;
              }
              margin: 0;
          }
        }
      }
  }
      
</style>