
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
// 获取进度页面的数据
export function getProgressData (params){
  return $http.get('/api/v1/BaziFortuneTelling/getBaZi',{params:params})
}

/*获取支付链接*/
export function postPayUrl (params) {
  return $http.post('/api/v1/NewName/DoPay',params)
}

/*
* 获取结果页数据
* user_id    结果id
* */
export function getResultData (params){
  return $http.get('/api/v1/NewName/Result',{params:params})
}
