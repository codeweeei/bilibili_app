<template>
  <div class="editviews" v-if="model">
    <div style="margin-bottom:10px">
      <user-navbar />
    </div>
    <div class="upload">
      <van-uploader :after-read="afterRead" class="upload_img" preview-size='100vw'/>
    <edit-banner left="头像">
      <img :src="model.user_img" alt slot="right" v-if="model.user_img">
      <img src="@/assets/default_img.jpg" alt slot="right" v-else>
    </edit-banner>
    </div>
    <edit-banner left="昵称" @bannerClick="show=true">
      <a href="#" slot="right">{{model.name}}</a>
    </edit-banner>
    <edit-banner left="账号">
      <a href="#" slot="right">{{model.username}}</a>
    </edit-banner>
    <edit-banner left="性别" @bannerClick="gendershow=true">
      <a href="#" slot="right">{{model.gender==1 ? "男":"女"}}</a>
    </edit-banner>
    <edit-banner left="个性签名" @bannerClick="textshow=true">
      <a href="#" slot="right">{{model.user_desc}}</a>
    </edit-banner>
    <van-dialog v-model="show"
      title="昵称" show-cancel-button
      @confirm=confirmClick
      @cancel="content=''">
      <van-field v-model="content"  autofocus/>
    </van-dialog>
    <van-dialog v-model="textshow" 
      title="个性签名" show-cancel-button 
      @confirm=textareaClick
      @cancel="textcontent=''">
      <van-field v-model="content" type="textaera" autofocus/>
    </van-dialog>
    <van-action-sheet v-model="gendershow" 
      :actions="actions" 
      @select="onSelect"
      cancel-text="取消"/>
      <div class="editback" @click="$router.push('/user')">返回个人中心</div>
  </div>
  
</template>

<script>
import axios from 'axios'
import UserNavbar from '@/components/common/UserNavbar'
import EditBanner from '@/components/common/EditBanner'
export default {
  name:'Edit',
  components:{
    UserNavbar,
    EditBanner
  },
  data() {
    return {
      model:{},
      show:false,
      content:"",
      textshow:false,
      gendershow:false,
      actions: [
        { name: '男',val:1},
        { name: '女',val:0},
        ],
    }
  },
  methods: {
    async editdata(){
      const res= await this.$http.get('/user/'+localStorage.getItem('id'))
      // console.log(res)
      this.model=res.data[0]
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      //创建一个上传文件对象，调用append方法
      const formdate = new FormData()
      formdate.append('file',file.file)
      const res = await this.$http.post('/upload',formdate)
      //将图片文件上传到服务器之后，返回图片的路径url
      // console.log(res)
      this.model.user_img=res.data.url
      this.updatamessage()
    },
    async updatamessage(){
      // let qs=require('qs');
      // let instance  = axios.create({
      //     headers: {'content-type': 'application/x-www-form-urlencoded'},
      //     baseURL:'http://112.74.99.5:3000/web/api'
      // });
      const res = await this.$http.post('/update/'+localStorage.getItem('id'),this.model)
      // console.log(res)
      if(res.data.code==200){
        this.$msg.success('修改成功')
      }
      // console.log(instance)
    },
    confirmClick(){
      this.model.name=this.content;
      this.updatamessage();
      this.content="";
    },
    textareaClick(){
      this.model.user_desc=this.content;
      this.updatamessage();
      this.content=""
    },
    onSelect(item){
      // console.log(item);
      this.model.gender=item.val;
      this.updatamessage();
      this.gendershow=false;
    }
  },
  created(){
    this.editdata()
  }
}
</script>

<style scoped>
  .editviews a{
    color: #333;
  }
  .editviews img{
    height: 12.267vw;
    width: 12.267vw;
    border-radius: 50%;
  }
  .upload{
    position: relative;
    overflow: hidden;
  }
  .upload .upload_img{
    position: absolute;
    opacity: 0;
  }
  .editback{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4vw 0;
    margin-top: 5.333vw;
    background: white;
    color: #999;
    font-size: 4vw;
  }
</style> 