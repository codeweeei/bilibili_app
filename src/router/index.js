import Vue from 'vue'
import VueRouter from 'vue-router'
import RegisterView from '@/views/RegisterView'
import LoginView from '@/views/LoginView'
import Userinfo from '@/views/Userinfo'
import Edit from '@/views/Edit'
import Home from '@/views/Home'
import Article from '@/views/Article'
import EditCategory from '@/views/EditCategory'

// import { component } from 'vue/types/umd'
// import { component } from 'vue/types/umd'
// const Home =()=>import('@/views/Home')
// const RegisterView =()=>import('@/views/RegisterView')

Vue.use(VueRouter)
//解决重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes=[
  // {
  //   path:'',
  //   redirect:'/register'
  // },
  {
    path:'/',
    component:Home,
    meta:{
      keepalive:true
    }
  },
  {
    path:'/register',
    component:RegisterView
  },
  {
    path:'/login',
    component:LoginView
  },
  {
    path:'/user',
    component:Userinfo,
    meta:{
      istoken:true
    }
  },
  {
    path:'/edit',
    component:Edit,
    meta:{
      istoken:true
    }
  },
  {
    path:'/article/:id',
    component:Article
  },
  {
    path:'/editcategory',
    component:EditCategory
  }
]

const router=new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next) => {
  if(!localStorage.getItem('id')&&!localStorage.getItem('token')&&to.meta.istoken){
    Vue.prototype.$msg("请重新登录")
    router.push('login')
    return
  }else{
    next()
  }
})
export default router