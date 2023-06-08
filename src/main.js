import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import axios from 'axios'
import store from '../store/index'
Vue.config.productionTip = false
import 'buefy/dist/buefy.css'

Vue.use( Buefy , {
  defaultIconPack: 'fa'
})
Vue.config.productionTip = false
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
Vue.prototype.$http = axios