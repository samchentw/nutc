import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import HelloWorld from './components/HelloWorld.vue'

Vue.config.productionTip = false
const router = new VueRouter({
  routes: [
    
    { path: '/test', component: HelloWorld },
    // { path: '/portfolio', component: portfolio },
    // { path: '/about', component: about },
    // { path: '*', component: home },
    // { path: '/a', component: ahome }
  ]
})
Vue.use(VueRouter)
// vue.use(axios,vueaxios)
new Vue({router,
  render: h => h(App),
}).$mount('#app')

