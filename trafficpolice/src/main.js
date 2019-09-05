import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 axios.js 
import axios from './axios'

// axios.defaults.baseURL = process.env.VUE_APP_BASEURL
axios.defaults.timeout = 5000

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
