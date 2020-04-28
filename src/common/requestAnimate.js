let requestA = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimaitonFrame || function (callback) {
  return window.setTimeout(callback, 1000 / 60);
};

function moAnimate(elm, tm, funarg) {
  if (typeof elm === 'string') {
    elm = document.getElementById(elm);
  }
  tm = tm || 300;
  let startTime = 0;
  if (window.performance && window.performance.now) {
    startTime = window.performance.now();
  } else {
    startTime = Date.now();
  }
  funarg = funarg || function () {
  };
  requestA(function () {//使用requestA同步帧调用动画实现方法。
    moRequest(elm, startTime, tm, funarg);
  });
}

function moRequest(elm, startTime, tm, funarg) {
  let currTime = 0, name = "";
  if (window.performance && window.performance.now) {
    currTime = window.performance.now();
  } else {
    currTime = Date.now();
  }
  if (!startTime) {
    startTime = currTime;
    let id = requestA(function () {
      moRequest(elm, startTime, tm, funarg);
    });
    return;
  }
  let percent = (currTime - startTime) / tm;//通过当前时间与开始时间的差值与所需动画时间对比
  percent = percent > 1 ? 1 : percent;//得到运行的进度值。
  if (percent >= 1) {
    funarg.call(elm, percent);//将进度值传递给回调函数
  } else {
    funarg.call(elm, percent);
    let id = requestA(function () {
      moRequest(elm, startTime, tm, funarg);
    });//递归调用moRequest方法。
  }
}
/* Promiss 封装 */
export function Animator(duration,callback) {
  return new Promise(function (resolve, reject) {
    moAnimate({}, duration, function (per) {
      //do thing...
      callback(per)
      if (per == 1) {//per==1标志这个动画执行完成后的调用。
        resolve()
      }
    })
  })
}


