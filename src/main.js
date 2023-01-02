import { createApp } from 'vue'
import App from './App.vue'
//import VueRouter from 'vue-router'
/*import HelloWorld from './components/HelloWorld.vue'

createApp.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/helloworld', component: HelloWorld },
  ]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
}) 

createApp.use(router)*/

createApp(App).mount('#app')
