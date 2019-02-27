// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { Pagination, Spin, InputNumber } from 'ant-design-vue'
import store from './store'
import 'ant-design-vue/lib/table/style/css'
import 'ant-design-vue/lib/input-number/style/css'
import '@javascripts/validate.js'
import '@styles/iconfont.css'
import '@styles/btn.scss'
import '@styles/grid.scss'
import '@styles/form.scss'
import '@styles/default.scss'
import '@styles/login.scss'
import '@styles/campaigns.scss'
import '@styles/brands.scss'
import '@styles/defaultAnt.scss'
import '@styles/home.scss'

Vue.use(VueI18n)
Vue.use(Pagination)
Vue.use(Spin)
Vue.use(InputNumber)
Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)

const i18n = new VueI18n({
  // locale: 'zh-CN', // 设置语言
  locale: 'en-US', // 设置语言
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': require('./assets/languages/lib/zh'),   // 中文语言包
    'en-US': require('./assets/languages/lib/en')    // 英文语言包
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.some( m => m.meta.auth)) {
    // 已经登陆
    if (!!store.state.authorization && store.state.authorization != '') {
      // 正常跳转到你设置好的页面
      next()
    } else {
      // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来
      next({
        path: '/login',
        // query: {
        //   Rurl: to.fullPath
        // }
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
