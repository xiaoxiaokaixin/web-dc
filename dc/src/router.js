import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import login from './views/login.vue'
import kaidian from './views/kaidian.vue'
import place from './views/place.vue'
import shop from './views/shop.vue'
import order from './views/order.vue'
import sjlogin from './views/sjlogin.vue'
import storeadmin from './views/storeadmin.vue'
import sa1 from './components/sa1.vue'
import sa2 from './components/sa2.vue'
import sa3 from './components/sa3.vue'
import sa4 from './components/sa4.vue'
import sa5 from './components/sa5.vue'
import sa6 from './components/sa6.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/kaidian',
      component: kaidian
    },
    {
      path: '/place/:uid',
      component: place
    },
    {
      path:'/shop/:uid/:sid',
      component:shop
    },
    {
      path:'/order/:uid',
      component:order
    },
    {
      path:'/sjlogin',
      component:sjlogin
    },
    {
      path:'/storeadmin/:sid',
      component:storeadmin,
      children:[
        {
          path:'/storeadmin/store/:sid',
          component:sa1
        },
        {
          path:'/storeadmin/products/:sid',
          component:sa2
        },
        {
          path:'/storeadmin/dingdans/:sid',
          component:sa3
        },
        {
          path:'/storeadmin/customer/:sid',
          component:sa4
        },
        {
          path:'/storeadmin/sales/:sid',
          component:sa5
        },
        {
          path:'/storeadmin/help',
          component:sa6
        }
      ],
      // redirect:'/storeadmin/dingdans'
    }
  ]
})
