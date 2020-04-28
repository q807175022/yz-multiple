// main.js 可配置版
import Vue from "vue";
import Main from "./index.vue";
let ToastConstructor = Vue.extend(Main);
let instance;
let zIndex=1;
const Toast = function(options = {}) { // 就改了这里，加了个 options 参数
  instance = new ToastConstructor({
    data: options // 这里的 data 会传到 main.vue 组件中的 data 中，当然也可以写在 props 里
  });
  instance.$mount().$el.style.zIndex = 1000+(++zIndex)
  document.body.appendChild(instance.$mount().$el);
};
export default Toast;
