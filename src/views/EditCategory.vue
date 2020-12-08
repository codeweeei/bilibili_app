<template>
  <div class="editcategory">
    <user-navbar></user-navbar>
    <div class="category">
      <h2 class="title">自定义编辑栏目</h2>
      <div class="category_now">
        <van-divider dashed :style="{ color: 'skyblue', borderColor: 'skyblue', fontSize:'5.067vw' }">已选栏目</van-divider>
        <div class="category_selected">
          <p v-for="(item,index) in selectedCategory" :key="index"
            @click="handleCategory(index)"
          >
            {{item.title}}
          </p>
        </div>
      </div>
      <div class="category_none">
        <van-divider dashed :style="{ color: 'pink', borderColor: 'pink', fontSize:'5.067vw' }">删除栏目</van-divider>
        <div class="category_deleted">
          <p v-for="(item,index) in delectedCategory" :key="index"
            @click="addcategory(index)"
          >
            {{item.title}}
          </p>
        </div>
      </div>
    </div>
    <div class="backHome" @click="$router.push('/')">返回首页</div>
  </div>
</template>

<script>
import UserNavbar from '@/components/common/UserNavbar'
export default {
  name:"EditCategory",
  components:{
    UserNavbar
  },
  data() {
    return {
      selectedCategory:[],
      delectedCategory:[]
    }
  },
  methods: {
    async getCategory(){
      const res = await this.$http.get('/category')
      this.selectedCategory=res.data
    },
    handleCategory(index){
      if(this.selectedCategory.length<4){
        this.$msg.fail('最少保留3个栏目~')
        return
      }
      this.delectedCategory.push(this.selectedCategory[index])
      this.selectedCategory.splice(index,1)
      // console.log(this.delectedCategory)
    },
    addcategory(index){
      this.selectedCategory.push(this.delectedCategory[index])
      this.delectedCategory.splice(index,1)
    }
  },
  watch:{
    selectedCategory(){
      localStorage.setItem('selectedCategory',JSON.stringify(this.selectedCategory))
      localStorage.setItem('delectedCategory',JSON.stringify(this.delectedCategory))
    }
  },
  created() {
    if(localStorage.getItem('selectedCategory')&&localStorage.getItem('delectedCategory')){
      this.selectedCategory=JSON.parse(localStorage.getItem('selectedCategory'))
      this.delectedCategory=JSON.parse(localStorage.getItem('delectedCategory'))
      return
    }else{
      this.getCategory()
    }
  },
}
</script>

<style lang="less">
  .editcategory{
    text-align: center;
    .category{
      padding: 0 10px;
      .title{
        color:#ff9db5;
      }
      .category_now{
        margin-bottom: 10px;
        .category_selected{
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          // justify-content: center;
          width: 100%;
          p{
            width: 25%;
            margin: 10px 10px;
            border: 1px solid skyblue;
            color: skyblue;
            font-size: 17px;
          }
        }
      }
      .category_none{
        margin-bottom: 10px;
        .category_deleted{
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          // justify-content: center;
          width: 100%;
          p{
            width: 25%;
            margin: 10px 10px;
            border: 1px solid pink;
            color: pink;
            font-size: 17px;
          }
        }
      }
    }
    .backHome{
      color: white;
      width: 30%;
      background: #ff9db5;
      padding: 5px 0;
      margin: 20px auto;
    }
  }
</style>