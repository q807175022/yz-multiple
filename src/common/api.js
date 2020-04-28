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

/* 获取客服二维码
 *  无参数
* */
export function getKefu (params) {
  const url = '/api/wxkf'
  return  $http.get(url,{params:params})
}

/*获取首页返回，结果页跳转链接
*  path_id   链接ID
*  type      值为1获取价格
* */
export function getIndexUrl (params){
  const url = '/api/getLink'
  return  $http.post(url,params)
}

//获取Cos储存桶信息
export function getCosInfo(params) {
  return $http.get("/api/getQcloudRegion",{params:params})
}
//获取Cos临时签名
export function getCosAuth(params) {
  return $http.get("/api/getQcloudSignature",{params:params})
}
