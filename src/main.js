import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import Vant from 'vant';
import 'vant/lib/index.css';
import http from '../http'
import { Toast } from 'vant';
import '@/assets/style.css'
import moment from 'moment'
Vue.prototype.$msg=Toast
Vue.prototype.$http=http
Vue.prototype.$date=moment

Vue.use(Vant);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
