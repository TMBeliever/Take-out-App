// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import Vuerouter from 'vue-router'
import './comment/stylus/index.styl'
Vue.config.productionTip = false
Vue.use(Vuerouter)
Vue.use(VueResource)
import goods from './components/goods/goods.vue'
 import ratings from './components/ratings/ratings.vue'
 import seller from './components/seller/seller.vue'
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]

const router = new Vuerouter({routes})
new Vue({
  template: '<App/>',
  components: {App},
  router
}).$mount('#app')
