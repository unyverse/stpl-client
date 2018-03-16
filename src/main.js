import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import { store } from '@/store';
import { socket } from '@/socket';

Vue.config.productionTip = false

new Vue({
  el: '.app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

socket.on('connect', () => {
	console.log(socket.id);
});

console.log('%cwat bistn so fruchtig mein sohn', 'font-size: 3rem; color: #ff4757; font-weight: bold;');