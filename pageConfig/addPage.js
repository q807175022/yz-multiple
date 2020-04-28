const fs = require('fs')

const path = require('path')

const pathName = path.resolve(__dirname, 'entry.js')

const pageName = process.argv[2]

const needRouter = process.argv[3]

let entry = require('./entry.js')

entry[pageName] = true

// 生成入口文件
let res = `module.exports = { \n`
Object.keys(entry).forEach(key => {
  res += `\t${key}: './src/${key}/${key}.js',\n`
})
fs.writeFileSync(pathName, res + '}')

// 生成模板文件
fs.writeFileSync(`./tpl/${pageName}.html`,
  `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name=viewport content="maximum-scale=1,minimum-scale=1,user-scalable=0,width=device-width,initial-scale=1">
    <title>${pageName}</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
`)

// 生成入口文件目录
fs.mkdirSync('./src/' + pageName)

// 生成入口vue文件
fs.writeFileSync(`./src/${pageName}/${pageName}.vue`,
  `<template>
  <div id="${pageName}Container">
    ${needRouter === 'y' ? '<router-view />' : ''}
    <img id="complain-btn" src="../common/images/complain.png" @click="complain">
  </div>
</template>

<script>
import "../common/reset.css"
import {setHtmlFontsize,importSDK_zw} from "../common/common.js"
export default {
  name:'${pageName}',
  data(){
    return {}
  },
  mounted() {
    setHtmlFontsize()
    importSDK_zw()
    let {query}=this.$route;
    let openid=localStorage.getItem("openid");
    let path_id=localStorage.getItem("path_id")
    if(query.openid !== '' && query.openid !== undefined && query.openid !== null){
      openid=query.openid
      localStorage.setItem("openid",query.openid)
    }
    if(query.path_id !== '' && query.path_id !== undefined && query.path_id !== null){
      path_id=query.path_id
      localStorage.setItem("path_id",query.path_id)
    }
     if(query.zwUid){
        localStorage.setItem("zwUid",query.zwUid)
      }
     if(query.zwGameId){
      localStorage.setItem("zwGameId",query.zwGameId)
      localStorage.setItem("zwSource",query.zwSource)
      document.getElementById('complain-btn').style.display='none';
     }
  },
 methods:{
    complain(){
      let path_id=localStorage.getItem('path_id');
      let entry=13;
      let userId=0;
      if(this.$route.name=='result'){
        userId = this.$route.params.id;
        entry=23
      }
      let el = document.createElement("a");
      document.body.appendChild(el);
      el.href = \`\$\{window.origin\}/Complaint-\$\{path_id\}-\$\{entry\}-\$\{userId\}\`; //url 是你得到的连接
      el.click();
      document.body.removeChild(el);
    }
  }
};
</script>

<style scoped>
#${pageName}Container{
    font-size: 0.28rem;
    color: #333333;
  }
  #complain-btn{
    position: fixed;
    bottom: 2rem;
    right: 0;
    width:0.47rem;
    height: 1.41rem;
    z-index: 200;
  }
</style>
`)

// 生成入口js文件
fs.writeFileSync(`./src/${pageName}/${pageName}.js`,
  `import Vue from 'vue'
import App from './${pageName}.vue'
${needRouter === 'y' ? 'import router from \'./router\' ' : ''}
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
  el: '#app',
  ${needRouter === 'y' ? 'router,' : ''}
  components: {App},
  template: '<App/>'
})
`)
// 生成router配置文件
const writeRouter = () => {
  fs.writeFileSync(`./src/${pageName}/router/index.js`, `
import Vue from 'vue'
import Router from 'vue-router'
import index from "../pages/index"

Vue.use(Router)
const router = new Router({
  mode:'history',
  base:'/H5/${pageName}/',
  routes: [
  {
      path:'/',
      name:'index',
      component:index
    }
  ]
})
export default router
`)
}

fs.mkdir(`./src/${pageName}/assets`, () => {
  fs.writeFileSync(`./src/${pageName}/assets/http.js`, `
import axios from 'axios'
let baseURL="";//按照环境变量取得业务域名
switch(process.env.NODE_ENV){
  case 'development':
    baseURL='https://dev.ya73r.cn'
    break;
  case 'testing':
    baseURL=window.location.origin
    break;
  default :
    baseURL=window.location.origin
    break;
}
const $http = axios.create({
  baseURL:baseURL,/* https://camp.guohaozhicmo.com , http://192.168.1.90:8082 */
})
/*请求拦截*/
$http.interceptors.request.use(function (config){
  let openid= localStorage.getItem("openid");
  let zwUid=localStorage.getItem("zwUid");
  openid=zwUid?zwUid:openid
  if(config.method=='get'){
    if(typeof config.params == 'object'&&openid&&openid!='undefined'){
      config.params.openid=openid
    }
  }else if (config.method=='post') {
    if(typeof config.data=='object'&&openid&&openid!='undefined'){
      config.data.openid=openid
    }
  }
  return config;
}, function (error){
  return Promise.reject(error);
});
// 响应拦截（配置请求回来的信息）
$http.interceptors.response.use(function (response){
  return response.data;
}, function (error){
  return Promise.reject(error);
});
`)
})

if (needRouter === 'y') {
  // 生成pages和router目录
  fs.mkdirSync(`./src/${pageName}/pages`)
  fs.mkdirSync(`./src/${pageName}/components`)
  fs.mkdir(`./src/${pageName}/router`, (err, data) => {
    if (!err) {
      writeRouter()
    }
  })
}
