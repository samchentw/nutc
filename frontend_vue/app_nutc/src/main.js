import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
// import shared from './shared';
import HelloWorld from './components/HelloWorld.vue'

import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './components/Dashboard.vue'
import User from './components/User.vue'
import Login from './components/Login.vue'

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

