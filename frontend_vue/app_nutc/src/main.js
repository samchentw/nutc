import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
// import shared from './shared';
import HelloWorld from './components/HelloWorld.vue'

import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './components/Dashboard.vue';
import User from './components/User.vue';
import Login from './components/Login.vue';
import Shop from './components/Shop.vue';
import Setting from './components/Setting.vue';
import Product from './components/Product.vue';
import Info from './components/Info.vue';
import Contact from './components/Contact.vue';
import Activity from './components/Activity.vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.config.productionTip = false
var key = "nutc"
const router = new VueRouter({
  routes: [
    { 
      path: '/system', 
      component: AdminLayout,
      beforeEnter: guard, 
      children:[
        { path: 'dashboard', component: Dashboard },
        { path: 'user', component: User },
        { path: 'shop', component: Shop },
        { path: 'product', component: Product },
        { path: 'setting', component: Setting },

        { path: 'activity', component: Activity },
        

        { path: 'info', component: Info },
        { path: 'contact', component: Contact },
        
        { path: 'test', component: HelloWorld },
      ]
    },
    { path: '/', component: Login },
   
    
    // { path: '*', component: home },
    // { path: '/a', component: ahome }
  ]
})
Vue.use(VueRouter)
// vue.use(axios,vueaxios)
new Vue({router,
  render: h => h(App),
}).$mount('#app')


function guard(to, from, next){
  if(getToken()) {
    // console.log(getToken())
      next(); 
  } else{
      next('/'); // go to '/login';
  }
}
function getToken() {
  return window.localStorage.getItem(key);
}

