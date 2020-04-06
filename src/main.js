// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import r from '@/server'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"

// var socket = io.connect("http://localhost:8080")
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:8080',
// }))
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:8080'), //options object is Optional
  vuex: {
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
