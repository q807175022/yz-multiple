/* 时间格式化方法
 * time 时间,为null则取当前时间
 * fmt  时间格式
 * */
export function dateFormat(time, fmt) {
  fmt = fmt ? fmt : 'yyyy-MM-dd hh:mm:ss'
  let date = time ? new Date(time) : new Date();
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

/* 引入指舞SDK
*
* */
export function importSDK_zw() {
  let zw = document.createElement("script")
  let date = new Date()
  let datestr = `${date.getFullYear().toString().substr(2, 2)}${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}`
  zw.src = `https://ssl-divine.cdn.h55u.com/platform/js/zwSdk.js?v=${datestr}`
  document.getElementsByTagName("head")[0].appendChild(zw)
}

/*
 * 获取视口window宽高
 * */
export function getWindowOffset() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    }
  } else {
    if (document.compatMode === "BackCompat") {
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight
      }
    } else {
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
      }
    }
  }
}

/* 设置cookie */
export function setCookie(key, val, time) {
  /*  */
  var date = new Date(); //获取当前时间
  var expiresDays = time;  //将date设置为n天以后的时间
  date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
  document.cookie = key + "=" + val + ";expires=" + date.toGMTString();  //设置cookie

}

/* 获取cookie */
export function getCookie(key) {
  /*获取cookie参数*/
  var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
  var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
  var tips;  //声明变量tips
  for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
    var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
    if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
      tips = arr[1];   //将cookie的值赋给变量tips
      break;   //终止for循环遍历
    }
  }
  return tips;
}

/* 删除cookie */
export function detCookie(key) {
  var date = new Date(); //获取当前时间
  date.setTime(date.getTime() - 10000); //将date设置为过去的时间
  document.cookie = key + "=v; expires =" + date.toGMTString();//设置cookie
}

/* 动态设置html的fontsize
 * 限制微信环境的文字缩放，防止页面样式混乱
 * */
export function setHtmlFontsize() {
  /*let rootResize = function () {
    let baseFontSize = 100;
    let baseWidth = 750;
    let minWidth = 320;
    let clientWidth = document.documentElement.clientWidth || window.innerWidth;
    let innerWidth = Math.max(Math.min(clientWidth, baseWidth), minWidth);
    let rem = clientWidth / (baseWidth / baseFontSize);
    if (innerWidth == 750 || innerWidth == 320) {
      rem = innerWidth / (baseWidth / baseFontSize)
    }
    document.querySelector('html').style.fontSize = rem + 'px';
  };
  rootResize();
  window.onresize = function () {
    rootResize()
  };*/
  (function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
      handleFontSize();
    } else {
      document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    }

    function handleFontSize() {
      // 设置网页字体为默认大小
      WeixinJSBridge.invoke('setFontSizeCallback', {'fontSize': 0});
      // 重写设置网页字体大小的事件
      WeixinJSBridge.on('menu:setfont', function () {
        WeixinJSBridge.invoke('setFontSizeCallback', {'fontSize': 0});
      });
    }
  })();
}

/*获取随机数
*  lowerValue  下线数字
*  upperValue  上限数字
*  结果包含上限数字和下线数字
* */
export function randomNumber(lowerValue, upperValue) {
  return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}

/*页面(div)平滑滚动至底部*/
export function scrollBottom(elem) {
  return new Promise(function (resolv, reject) {
    let scrollHeight = elem.scrollHeight;
    //所需滚动距离
    let height = scrollHeight - getWindowOffset().h;
    let sheight = height - elem.scrollTop
    let scrollFn = (timestamp, elapsed) => {
      if (elem.scrollTop < height) {
        if (elapsed) {
          let n = sheight / (Math.ceil(Math.floor(1000 / elapsed) * 0.5))
          elem.scrollTop += n
        }
        window.requestAnimationFrame(
          _timestamp => {
            scrollFn(_timestamp, _timestamp - timestamp)
          }
        )
      }
    }
    window.requestAnimationFrame(timestamp => scrollFn(timestamp, 0));
  })
}

export function redirect(url) {
  let el = document.createElement("a");
  document.body.appendChild(el);
  el.href = url;
  el.click();
  document.body.removeChild(el);
}

/*获取元素是否处于页面的相对位置*/
export function GetElementRect(element) {
  var rect = element.getBoundingClientRect() // 距离视窗的距离
  var top = document.documentElement.clientTop ? document.documentElement.clientTop : 0 // html元素对象的上边框的宽度
  var left = document.documentElement.clientLeft ? document.documentElement.clientLeft : 0
  return {
    top: rect.top - top,
    bottom: rect.bottom - top,
    left: rect.left - left,
    right: rect.right - left
  }
}

export function recordUv(type) {
  if (!type) {
    return false
  }
  const baseURL = process.env.NODE_ENV == 'development' ? 'https://dev.ya73r.cn' : window.location.origin;
  const createRequest = function (data) {//创建image请求，以统计UV
    let str = "";
    for (let prop in data) {
      str += prop + "=" + data[prop] + "&"
    }
    let url = baseURL + "/api/statistics?" + str.substr(0, str.length - 1);
    let incimage = new Image();
    incimage.src = url
  };
  let openid = localStorage.getItem('openid');
  openid = openid && openid != 'undefined' ? openid : 0;
  let path_id = localStorage.getItem('path_id');
  path_id = path_id && path_id != 'undefined' ? path_id : 0;

  switch (type) {
    case 1:
      //链接首页UV
      createRequest({
        spr_id: path_id, openid: openid, type: 'spread_index_uv'
      })
      break;
    case 2:
      //首页返回退出UV
      createRequest({
        spr_id: path_id, openid: openid, type: 'index_backUrl_click'
      })
      break;
    case 3:
      //付费亲算UV
      createRequest({
        spr_id: path_id, openid: openid, type: 'ooo_click_uv'
      })
      break;
    case 4:
      //点击立即测算UV
      createRequest({
        spr_id: path_id, openid: openid, type: 'click_forecast_uv'
      })
      break;
    case 5:
      //提交输入信息UV
      createRequest({
        spr_id: path_id, openid: openid, type: 'input_data_uv'
      })
      break;
    case 6:
      //唤起订单弹窗UV
      createRequest({
        spr_id: path_id, openid: openid, type: 'order_popup_uv'
      })
      break;
    case 7:
      //正常支付UV
      createRequest({
        spr_id: path_id, openid: openid, type: 'normal_pay_uv'
      })
      break;
    case 8:
      //结果页UV
      createRequest({
        spr_id: path_id, openid: openid, type: 'result_uv'
      })
      break;
    case 9:
      //结果页二次支付UV
      createRequest({
        spr_id: path_id, openid: openid, type: 'result_twice_pay_uv'
      })
      break;
    case 10:
      //挽回页UV
      createRequest({
        spr_id: path_id, openid: openid, type: 'recover_uv'
      })
      break;
    case 11:
      //挽回页支付UV
      createRequest({
        spr_id: path_id, openid: openid, type: 'recover_pay_uv'
      })
      break;
    case 12:
      //领取报告UV
      createRequest({
        spr_id: path_id, openid: openid, type: 'get_report_uv'
      })
      break;
  }

}
/* 生成随即字符串 */
export function randomString(len) {
  len = len || 32;
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}


/* 节流函数 */
export function throttle(fn, interval) {
  // last为上一次触发回调的时间
  let last = 0

  // 将throttle处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last >= interval) {
      // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
      last = now;
      fn.apply(context, args);
    }
  }
}

/* 劫持用户返回
*  type    1：安装劫持  2：卸载劫持
*  link     跳转地址
* */
function goBack() {
  let zwUid = localStorage.getItem("zwUid")
  if (zwUid) {
    window.zwDivine.divineList()
  }else {
    window.location.href = window.back_link
  }
}
export function setRouterHijack(type,link) {
  if (window.location.search.search(/(&|\?)notjump/) !=-1) {
    return false
  }
  if(type==1){
    window.back_link = link
    window.history.pushState(null, null, document.URL);
    window.addEventListener('popstate',goBack, false);
  }else {
    window.removeEventListener('popstate',goBack,false);
  }
}

/*
* json序列化为query形式
* */

export function jsonToQuery(obj) {
  return Object.keys(obj).map(function (key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
  }).join("&")
}
