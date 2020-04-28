import Vue from 'vue'
import App from './taroYuanfen.vue'
import router from './router' 
import {recordUv} from "../common/common"
Vue.prototype.recordUv = recordUv;
require('viewport-units-buggyfill').init();

import { Lazyload } from 'vant';
// import 'vant/lib/index.css';
Vue.use(Lazyload);

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
