import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import 'iview/dist/styles/iview.css'
import './assets/css/index.scss'
import 'v-charts/lib/style.css'
import fullCalendar from 'vue-fullcalendar'
Vue.component('full-calendar', fullCalendar)
Vue.use(iView)
Vue.use(VueAxios, axios)
Vue.use(Qs)

Vue.config.productionTip = false
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
