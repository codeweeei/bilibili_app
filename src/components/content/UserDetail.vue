<template>
  <div class="userdetail">
    <div>
      <div class="user_img">
        <img :src="userinfo.user_img" alt v-if="userinfo.user_img">
        <img src="@/assets/default_img.jpg" alt v-else>
      </div>
        <div class="user_edit">
          <div>
            <p>
              <span>0</span>
              <span class="user_text">粉丝</span>
            </p>
            <span>|</span>
            <p>
              <span>54</span>
              <span class="user_text">关注</span>
            </p>
            <span>|</span>
            <p>
              <span>0</span>
              <span class="user_text">获赞</span>
            </p>
          </div>
          <div @click="$router.push('/edit')">
            <div class="user_editbtn">编辑资料</div>
          </div>
      </div>
    </div>
    <div class="userinfomation">
      <h2>{{userinfo.name}}</h2>
      <p v-if="userinfo.user_desc">{{userinfo.user_desc}}</p>
      <p v-else>这个人很神秘，什么都没有写</p>
    </div>
  </div>
</template>

<script>
// import router from '@/router'
import Edit from '@/views/Edit'
export default {
  name:"UserDetail",
  props:["userinfo"],
  components:{
    Edit
  }
}
</script>

<style scoped>
  .userdetail{
    background: white;
  }
  .userdetail div:nth-child(1){
    padding: 0 2.667vw;
  }
  .userdetail>div{
    display: flex;
  }
  .userdetail .user_img img{
    height: 22.667vw;
    width: 22.667vw;
    border-radius: 50%;
    margin-right: 5.333vw;
  }
  .userdetail .user_edit{
    flex: 1;
  }
  .userdetail .user_edit div:nth-child(1){
    display: flex;
    
  }
  .userdetail .user_edit div:nth-child(1)>span{
    color: #aaa;
    line-height: 15.467vw;
  }
  .userdetail .user_edit div:nth-child(1) p{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 3.467vw;
    
  }
  .userdetail .user_edit div:nth-child(1) p .user_text{
    color: #aaa;
  }
  .userdetail .user_edit div:nth-child(2){
    padding: 0.533vw 2.667vw;
  }
  .userdetail .user_edit div:nth-child(2) .user_editbtn{
    border: 0.267vw solid #fb7a9f;
    padding: 0.8vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fb7a9f;
    border-radius: 0.8vw;
  }
  .userdetail div:nth-child(2){
    display: block;
    padding: 0 1.333vw;
    margin: 0;
  }
  .userdetail .userinfomation h2{
    margin: 2.667vw 1.6vw 0.8vw;
    font-weight:400 ;
  }
  .userdetail .userinfomation p{
    padding: 0 0.8vw 2.667vw;
    margin: 2.667vw 0 0.8vw;
    color: #999;
  }
</style>