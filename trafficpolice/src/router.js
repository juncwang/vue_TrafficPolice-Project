import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '*',
      redirect: '/'
    },{
      path: '/detailsts/:num/:status',
      name: 'detailsts',
      props: true,
      component: () => import('./views/DetailsTs')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = store.state.isLogin
  console.log(isLogin)
  if(to.path == '/index' || to.path == '/'){
    next()
  }else{
    isLogin? next() : next('/index')
  }
})

export default router