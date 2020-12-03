import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase";
import "firebase/auth";
import './firebase'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
  // options here
})

Vue.config.productionTip = false;

Vue.filter('routeFilter', function (v) {
  return v.toLowerCase().split(" ").join("-");
})

firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});