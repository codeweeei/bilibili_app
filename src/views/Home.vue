<template>
<div class="home" v-if="category">
  <user-navbar />
  <div class="tab_setting" v-show="!setishow" @click="$router.push('/editcategory')">
    <van-icon name="setting-o" />
  </div>
  <div class="tab_parent">
    <div class="tab_fixed" v-show="setishow"  @click="$router.push('/editcategory')">
      <van-icon name="setting-o" />
    </div>
    <van-tabs 
      v-model="active" 
      swipeable 
      sticky
    >
      <van-tab v-for="(item,index) in category" :key="index" :title="item.title" class="tab">
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <div class="detail_parent">
            <cover 
              class="detail_item_home" 
              :detailItem="categoryitem" 
              v-for="(categoryitem,categoryindex) in item.list"
              :key="categoryindex" 
            />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
  <to-top :isShow="showheight"/>
</div>
</template>

<script>
import UserNavbar from '@/components/common/UserNavbar'
import Cover from '@/views/Cover'
import ToTop from '@/components/common/ToTop.vue'
export default {
  name:"Home",
  components:{
    UserNavbar,
    Cover,
    ToTop
  },
  data() {
    return {
      active:0,
      category:[],
      setishow: true,
      showheight: false
    }
  },
  methods: {
    //获取导航栏信息
    async selectCategory(){
      //判断下本地是否已经保存了导航栏的数据，有则不需要再向服务器获取导航栏数据
      if(localStorage.getItem('selectedCategory')){
        return
      }
      const res=await this.$http.get('/category')
      //将改造后的res.data传给category
      this.category=this.completeCategory(res.data)
      //渲染导航页面内容
      this.selectArticle()
    },
    async selectArticle(){
      const categoryitem=this.categoryItem()
      const res=await this.$http.get('/detail/'+categoryitem._id,{
        params:{
          page:categoryitem.page,
          pagesize:categoryitem.pagesize
        }
      });
      //ES6的结构赋值用法...
      categoryitem.list.push(...res.data)
      // console.log(categoryitem.list);
      categoryitem.loading=false;
      //滚动到最后停止刷新加载
      if(res.data.length<categoryitem.pagesize){
        categoryitem.finished=true;
      }
    },
    //改造categories
    completeCategory(data){
      const category1=data.map((item,index)=>{
        //给数组里面每个对象新增加一个空的list空数组用来存放对应的导航条目的数据，还需要做到导航目页面向下滑动时，进行实时刷新，故需要页面当前的页数和一页对应的数据条数；
        // 可以对category数组新增page页数和pagesize页里对应的数据数；
        item.list=[];
        item.page=0;
        item.pagesize=10;
        item.finished=false;
        item.loading=false;
        return item;
      })
      // console.log(category1)
      // this.category=category1;
      return category1
    },
    categoryItem(){
      const categoryitem=this.category[this.active]
      // console.log(categoryItem)
      //将点击的categoryItem返回，然后再在发送获取导航目内容请求时接收即可获得点击的categoryItem的_id
      return categoryitem
    },
    onLoad(){
      const categoryitem=this.categoryItem()
      setTimeout(()=>{
        categoryitem.page+=1
        this.selectArticle()
      },1000)
    },
    //处理滚动
    handleScroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      //滚动吸附
      if(scrollTop>45){
        this.setishow=false
        //滚动显示回到顶部按钮
        if(scrollTop>100){
          // console.log("---")
          this.showheight=true
        }
        else{
          this.showheight=false
        }
      }
      else{
        this.setishow=true
      }
      
    }
  },
  watch: {
    //监听category下标的改变（点击新的导航目），触发调用categoryItem()方法获得点击的categoryItem
    active(){
      const categoryitem = this.categoryItem();
      this.selectArticle()
    }
  },
  activated() {
    if(localStorage.getItem('selectedCategory')){
      //将本地里的数据转化为数组
      let newCat=JSON.parse(localStorage.getItem('selectedCategory'))
      this.category=this.completeCategory(newCat)
      this.selectArticle()
    }
  },
  created() {
    this.selectCategory()
  },
  mounted() {
    window.addEventListener('scroll',this.handleScroll, true)
  },
  //销毁监听滚动
  destroyed() {
    // 离开该页面需要移除这个监听的事件，不然会报错  必须带第三个参数true，否则销毁不成功
    window.removeEventListener('scroll', this.handleScroll, true)
  },
}
</script>

<style lang="less">
  .home{
    position: relative;
    .tab_setting{
      position: fixed;
      top:0;
      right: 10px;
      width: 5.333vw;
      height: 11.733vw;
      color: #ff9db5;
      font-size: 5.867vw;
      line-height: 13.867vw;
      text-align: center;
      z-index: 999;
      background-color: #fff; 
    }
    .tab_parent{
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      .tab_fixed{
        position: absolute;
        right: 10px;
        width: 5.333vw;
        height: 11.733vw;
        color: #ff9db5;
        font-size: 5.867vw;
        line-height: 13.867vw;
        text-align: center;
        z-index: 999;
        background-color: #fff; 
      }
      .detail_parent{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .detail_item_home{
          width: 45%;
          margin-top: 1.333vw;
        }
      }
    }
  }
  
  
  
  
</style>