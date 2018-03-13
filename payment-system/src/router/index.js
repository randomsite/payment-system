import Vue from 'vue'
import Router from 'vue-router'
import Payments from '@/components/Payments'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/payments',
      name: 'Payments',
      component: Payments,
      meta: {
          requiresAuth: true
      }
    },
  ]
})
