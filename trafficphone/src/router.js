import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/amap',
      children: [
        {
          path: '/amap', name: 'amap', component: () => import('./views/AMap'),
        },
        {
          path: '/listView', name: 'listView', component: () => import('./views/ListView'),
        },
        {
          path: '/navstart', name: 'navstart', component: () => import('./views/NavStart')
        }
      ]
    },
    {
      path: '/final', name: 'final', component: () => import('./views/Final')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
