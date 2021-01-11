import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import UserInfo from '../views/UserInfo'
import SortTrash from '../views/SortTrash'
import GarbageManage from '../views/GarbageManage'
import Analysis from '../views/Analysis'
import PageView from '../Layout/PageView'
import MenuLayout from '../Layout/MenuLayout'
import UserManage from '../views/UserManage'
import Exam from '../views/Exam'
import GarbageAnalysis from '../views/GarbageAnalysis'
import UserAnalysis from '../views/UserAnalysis'
import ExamLog from '../views/ExamLog'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login', // 主路由地址
      component: PageView,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login,
          meta: {
            title: '登录',
            keepAlive: false
          }
        },
        {
          path: '/register',
          name: 'Register',
          component: Register,
          meta: {
            title: '注册',
            keepAlive: false
          }
        },
        {
          path: '/sortTrash',
          name: 'SortTrash',
          component: SortTrash,
          meta: {
            title: '垃圾分类小游戏',
            keepAlive: true
          }
        },
        {
          path: '/menu',
          name: 'Menu',
          redirect: '/menu/userInfo',
          component: MenuLayout,
          meta: { permission: ['menu'] },
          children: [
            {
              path: '/menu/userInfo', // 用户信息
              name: 'UserInfo',
              component: UserInfo,
              meta: {
                keepAlive: true,
                permission: ['menu-userInfo']
              }
            },
            {
              path: '/menu/userManage', // 用户管理
              name: 'UserManage',
              component: UserManage,
              meta: {
                keepAlive: true,
                permission: ['menu-userManage']
              }
            },
            {
              path: '/menu/garbageManage', // 垃圾信息管理
              name: 'GarbageManage',
              component: GarbageManage,
              meta: {
                keepAlive: true,
                permission: ['menu-userManage']
              }
            },
            {
              path: '/menu/analysis', // 信息统计
              name: 'Analysis',
              redirect: '/menu/analysis/garbageAnalysis',
              component: Analysis,
              meta: {
                keepAlive: true,
                permission: ['menu-analysis']
              },
              children: [
                {
                  path: '/menu/analysis/garbageAnalysis', // 题目统计
                  name: 'GarbageAnalysis',
                  component: GarbageAnalysis,
                  meta: {
                    keepAlive: true,
                    permission: ['menu-analysis-garbage']
                  }
                },
                {
                  path: '/menu/analysis/userAnalysis', // 用户统计
                  name: 'UserAnalysis',
                  component: UserAnalysis,
                  meta: {
                    keepAlive: true,
                    permission: ['menu-analysis-user']
                  }
                },
                {
                  path: '/menu/analysis/examLog', // 答题记录
                  name: 'ExamLog',
                  component: ExamLog,
                  meta: {
                    keepAlive: true,
                    permission: ['menu-analysis-exam']
                  }
                }
              ]
            },
            {
              path: 'exam',
              name: 'Exam',
              component: Exam,
              meta: {
                keepAlive: true,
                permission: ['menu-exam']
              }
            }
          ]
        }
      ]
    }
  ]
})
