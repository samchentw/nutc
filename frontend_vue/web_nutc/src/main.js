import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import HelloWorld from './components/HelloWorld.vue';
import Test from './components/Test.vue';
import Login from './components/Login.vue';
import User from './components/User.vue';


Vue.config.productionTip = false
var key = "nutc"
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/test', component: Test },
    { 
      path: '/', 
      component: HelloWorld,
    },
    { 
      path: '/user', 
      beforeEnter: guard, 
      component: User,
    }
   
   
  ]
})
Vue.use(VueRouter)
// vue.use(axios,vueaxios)
new Vue({router,
  render: h => h(App),
}).$mount('#app')


function guard(to, from, next){
  if(getToken()) {
     console.log(getToken())
      next(); 
  } else{
      next('/'); // go to '/login';
  }
}
function getToken() {
  return window.localStorage.getItem(key);
}