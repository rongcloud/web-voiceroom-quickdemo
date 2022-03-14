import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import RCVoiceRoomLib from "@rongcloud/rcvoiceroomlib-v1";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$RCVoiceRoomLib = RCVoiceRoomLib;

new Vue({
  render: h => h(App),
}).$mount('#app')
