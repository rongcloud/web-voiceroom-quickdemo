import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import RCVoiceRoomLib from "@rongcloud/rcvoiceroomlib-v1";
import * as RongIMLib from "@rongcloud/imlib-next";
import * as RongRTCLib from "@rongcloud/plugin-rtc";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$RCVoiceRoomLib = RCVoiceRoomLib;
Vue.prototype.$RongIMLib = RongIMLib;
Vue.prototype.$RongRTCLib = RongRTCLib;

new Vue({
  render: h => h(App),
}).$mount('#app')
