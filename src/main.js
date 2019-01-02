import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'

let router = new VueRouter({
  mode: 'history',
  routes: []
});

Vue.use(VueRouter);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
