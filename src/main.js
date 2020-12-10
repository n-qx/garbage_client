import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "@/views/Home";
import router from './router/index'
import App from './App'
import VueResource from 'vue-resource'

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
