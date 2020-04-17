import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import  ahome from './components/a.vue';
import home from './components/home.vue';
import contact from './components/contact.vue'
import portfolio from './components/portfolio.vue';
import about from './components/about.vue';
// import vueaxios from vue-axios
// import axios from axios

Vue.config.productionTip = false
const router = new VueRouter({
  routes: [
    
    { path: '/contact', component: contact },
    { path: '/portfolio', component: portfolio },
    { path: '/about', component: about },
    { path: '*', component: home },
    { path: '/a', component: ahome }
  ]
})
Vue.use(VueRouter)
// vue.use(axios,vueaxios)
new Vue({router,
  render: h => h(App),
}).$mount('#app')
