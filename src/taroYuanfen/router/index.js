
import Vue from 'vue'
import Router from 'vue-router'
import index from "../pages/index"
import drawCard from "../pages/drawCard";
import recover from "../pages/recover";
import result from "../pages/result";
import protocol from '../../common/views/protocol'

Vue.use(Router)
const router = new Router({
  mode:'history',
  base:'/H5/taroYuanfen/',
  routes: [
    {
      path:'/',
      name:'index',
      component:index
    },
    {
      path:'/drawCard',
      name:'drawCard',
      component:drawCard
    },
    {
      path:'/recover',
      name:'recover',
      component:recover
    },
    {
      path:'/result/:id',
      name:'result',
      component:result
    },
    {
      path: '/protocol',
      name: 'protocol',
      component: protocol
    }
  ]
})
export default router
