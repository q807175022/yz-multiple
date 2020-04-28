
import axios from 'axios'
import {jsonToQuery} from "../../common/common";
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

//获取牌组
export function getCards (params) {
  return $http.get('/api/v1/fatetarot/Cards',{params:params})
}

//支付
// export function postPayUrl (params) {
//   return $http.post('/api/v1/fatetarot/DoPay',params)
// }
export function postPayUrl(params,type){
  if(type === 2){
    window.location.assign(baseURL+'/api/v1/fatetarot/DoPay?'+jsonToQuery(params))
  } else{
    return $http.post('/api/v1/fatetarot/DoPay',params)
  }

}

export function getResultData(params) {
  return $http.get('/api/v1/fatetarot/Result',{params:params})
}
