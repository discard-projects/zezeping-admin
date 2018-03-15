import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: (resolve) => { require(['@/views/Home/Index'], resolve) } },
    { path: '/login', name: 'Login', component: (resolve) => { require(['@/views/Login'], resolve) } },
    { path: '/stores', name: 'Store', component: (resolve) => { require(['@/views/Store/Index'], resolve) } },
    { path: '/regions', name: 'Region', component: (resolve) => { require(['@/views/Region/Index'], resolve) } },
    { path: '/categories', name: 'Category', component: (resolve) => { require(['@/views/Category/Index'], resolve) } },
    { path: '/banners', name: 'Banner', component: (resolve) => { require(['@/views/Banner/Index'], resolve) } },
    { path: '/moments', name: 'Moment', component: (resolve) => { require(['@/views/Moment/Index'], resolve) } }
  ]
})

// When handling the refresh, vuex is cleared but the admin is already logged in
if (window.localStorage.authInfo) {
  store.dispatch('setAuthInfo', JSON.parse(window.localStorage.authInfo))
}
if (window.localStorage.userInfo) {
  store.dispatch('setUserInfo', JSON.parse(window.localStorage.userInfo))
}

// Log in the middle, the page needs to log in, without the login situation directly jump login
router.beforeEach((to, from, next) => {
  if (to.query && to.query['account_confirmation_success']) {
    store.dispatch('setAuthInfo', to.query)
  }
  if (to.matched.some(record => record.meta.auth)) {
    if (store.state.user.userInfo) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    if (to.name === 'Login' && store.state.user.userInfo) {
      next(false)
    } else {
      next()
    }
  }
})

export default router
