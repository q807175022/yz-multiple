
import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import recover from '../pages/recover'
import result from '../pages/result'
import protocol from "../../common/views/protocol" //用户协议

Vue.use(Router)
const router = new Router({
  mode:'history',
  // base: process.env.BASE_URL,
  base: "/H5/eightName/",
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/recover',
      name: 'recover',
      component: recover
    },
    {
      path: '/protocol',
      name: 'protocol',
      component: protocol
    },
    {
      path: '/result/:id',
      name: 'result',
      component: result
    },
 /*   {
      path: '*',
      name: '404',
      component: index
    },*/
  ]
})
export default router
