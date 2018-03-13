import Vue from 'vue'
import Router from 'vue-router'

import Payments from '@/components/Payments'
import Login from '@/components/Login'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Payments',
      component: Payments,
      meta: {
          requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('Login')
    else if (!requiresAuth && currentUser) next('Payments')
    else next()
})

export default router