import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import router from './router/Routes';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Toasted from 'vue-toasted';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/main.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Toasted, {duration: 10000});
Vue.config.productionTip = false

Vue.prototype.$showNotification = function(type , message){
  this.$toasted[type](message, {
    action: {
      text: 'Close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    }
  });
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});

