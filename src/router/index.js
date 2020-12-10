import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import SortTrash from '../views/SortTrash'

Vue.use(Router)

// const VueRouterPush = Router.prototype.push
// Router.prototype.push = function push (to) {
//     return VueRouterPush.call(this, to).catch(err => err)
// }
//
// const VueRouterReplace = Router.prototype.replace
// Router.prototype.replace = function replace (to) {
//     return VueRouterReplace.call(this, to).catch(err => err)
// }
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/3180421011'
    },
    {
      path: '/3180421011',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
        keepAlive: false
      }
    },
    {
      path: '/3180421011/SortTrash',
      name: 'SortTrash',
      component: SortTrash,
      meta: {
        title: '垃圾分类小游戏',
        keepAlive: true
      }
    }
  ]
})
