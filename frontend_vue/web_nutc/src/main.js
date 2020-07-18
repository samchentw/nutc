import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
// import Vuex from 'vuex'

import HelloWorld from './components/HelloWorld.vue';
import Test from './components/Test.vue';
import Login from './components/Login.vue';
import User from './components/User.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import Aboutus from './components/Aboutus.vue';
import Product from './components/Product.vue';
import Contact from './components/Contact.vue';
import Home from './components/Home.vue';
import Activity from './components/Activity.vue';
import Shop from './components/Shop.vue';
import ShopDetail from './components/ShopDetail.vue';
import ActivityDetail from './components/ActivityDetail.vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
var key = "nutc"
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/test', component: Test },
    {
      path: '/',
      component: Home,
    },
    {
      path: '/product',
      component: Product,
    },
    {
      path: '/shop/:typeId',
      component: Shop,
    },
    {
      path: '/ShopDetail/:id',
      component: ShopDetail
    },
    {
      path: '/activity',
      component: Activity,
    },
    {
      path: '/activityDetail/:id',
      component: ActivityDetail,
    },
    {
      path: '/contact',
      component: Contact,
    },
    {
      path: '/aboutus',
      component: Aboutus
    },
    {
      path: '/user',
      beforeEnter: guard,
      component: User,
    },
    {
      path: '/shoppingCart',
      beforeEnter: guard,
      component: ShoppingCart
    }


  ]
})


Vue.use(VueRouter)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


function guard(to, from, next) {
  if (getToken()) {
    //  console.log(getToken())
    next();
  } else {
    next('/'); // go to '/login';
  }
}
function getToken() {
  return window.localStorage.getItem(key);
}