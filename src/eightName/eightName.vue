<template>
  <div id="eightNameContainer">
    <router-view />
    <img
      id="complain-btn"
      src="../common/images/complain.png"
      @click="complain"
    >
  </div>
</template>

<script>
import "../common/reset.css"
import {setHtmlFontsize,importSDK_zw,recordUv} from "../common/common.js"
export default {
  name:'EightName',
  data(){
    return {}
  },
  mounted() {
    console.log(process.env,this.$route);
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
    recordUv(1)
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
      el.href = `${window.location.origin}/Complaint-${path_id}-${entry}-${userId}`; //url 是你得到的连接
      el.click();
      document.body.removeChild(el);
    }
  }
};
</script>

<style>
#eightNameContainer{
    font-size: 0.28rem;
    color: #333333;

    margin: 0 auto;
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
