import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.axios=axios

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

import VueResource from "vue-resource";
Vue.use(VueResource);

Vue.http.options.root="http://127.0.0.1:3000/"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
