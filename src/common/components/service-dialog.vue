<template>
  <transition name="fade">
    <div
      v-show="serviceShow"
      class="service-mask"
      @click.stop="$emit('update:visible',false)"
    >
      <div
        class="service-dialog"
        @click.stop=""
      >
        <img
          class="service-banner"
          :src="bgImage"
          alt="客服"
        >
        <div class="service-body">
          <template v-if="phone">
            <h5 class="">
              客服联系电话：
            </h5>
            <p style="margin: 0rem 0 0.3rem;font-size: 0.36rem;font-weight: bolder;">
              {{ phone }}
            </p>
          </template>
          <template v-else>
            <img
              :src="we_chat"
              class="kf-qrcode"
            >
            <p style="margin: 0.3rem 0;">
              长按二维码，添加客服微信
            </p>
          </template>

          <h5 class="">
            客服工作时间：
          </h5>
          <p>周一至周五 9:30—18:30</p>
          <div class="btn-box">
            <!--&lt;!&ndash;<button id="official" :title="service.official" @click="copy('official','title')">添加公众号</button>-->
            <button
              v-if="phone"
              id="wx-wechat"
              :title="phone"
              @click="copy('wx-wechat','title')"
            >
              复制电话
            </button>
            <button
              v-if="orderSearch"
              class="search-btn"
              @click="toOrderSearch"
            >
              结果查询
            </button>
            <button
              v-else
              class="close-btn"
              @click="$emit('update:visible',false)"
            >
              我知道了
            </button>
          </div>
        </div>
        <svg
          t="1575610760619"
          class="kefu-close-btn icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2094"
          width="48"
          height="48"
          @click="$emit('update:visible',false)"
        ><path
          d="M679.453315 383.633401c-0.409322-10.153244-4.200672-20.195971-11.954263-27.948539-7.751544-7.749498-17.767666-11.517311-27.947516-11.954263-11.301394-0.436952-22.709211 3.330862-31.335682 11.954263l-96.099708 96.127338-96.100732-96.127338c-8.625448-8.623401-20.034289-12.391215-31.333636-11.954263-10.152221 0.436952-20.195971 4.204765-27.948539 11.954263-7.752568 7.751544-11.544941 17.795295-11.954263 27.948539-0.464581 11.299347 3.327792 22.708188 11.954263 31.333636l96.099708 96.127338-96.099708 96.074126c-8.626471 8.625448-12.418844 20.034289-11.954263 31.333636 0.409322 10.152221 4.201695 20.195971 11.954263 27.948539 7.751544 7.751544 17.795295 11.57257 27.948539 11.95631 11.299347 0.490164 22.708188-3.330862 31.333636-11.95631l96.100732-96.073102 96.099708 96.073102c8.626471 8.625448 20.034289 12.44545 31.335682 11.95631 10.178827-0.38374 20.194948-4.203742 27.947516-11.95631 7.752568-7.751544 11.543917-17.796318 11.954263-27.948539 0.463558-11.299347-3.327792-22.708188-11.954263-31.333636l-96.099708-96.074126 96.099708-96.127338C676.125523 406.341588 679.916872 394.932748 679.453315 383.633401zM512.116145 63.916728c-246.953462 0-447.178669 200.227254-447.178669 447.178669 0 246.953462 200.225207 447.177646 447.178669 447.177646 246.953462 0 447.178669-200.224184 447.178669-447.177646C959.294814 264.143982 759.069607 63.916728 512.116145 63.916728zM512.116145 874.427426c-200.333678 0-363.332029-162.996305-363.332029-363.333052 0-200.333678 162.999374-363.333052 363.332029-363.333052s363.333052 162.999374 363.333052 363.333052C875.449197 711.431122 712.449823 874.427426 512.116145 874.427426z"
          p-id="2095"
          data-spm-anchor-id="a313x.7781069.0.i0"
          class="selected"
          fill="#eeeeee"
        /></svg>
      </div>
    </div>
  </transition>
</template>

<script>
  import {Toast} from "vant"
  import {getKefu} from "../api"
  export default {
    name: "ServiceDialog",
    props:{
      orderSearch:null,
      visible:Boolean,
      bgImage:{
        type:String,
        default:require('../images/service_bg.png')
      },
      official:String,//公众号二维码
      wechat:String,//微信二维码
    },
    data() {
      return {
        serviceShow: this.visible,
        we_chat:this.wechat,
        phone:''
      }
    },
    computed:{
      zwGameId(){
        return localStorage.getItem('zwGameId')||this.$route.query.zwGameId
      }
    },
    watch:{
      visible(val){
        this.serviceShow=val
      },
      // wechat(val){
      //   this.we_chat=val
      // }
    },
    mounted(){
      // let path_id=localStorage.getItem("path_id")
      if(!this.we_chat){
        let params={}
        if(this.zwGameId){
          params.zwGameId=this.zwGameId
        }
        getKefu(params).then(res=>{
          if(res.code==200){
            this.phone=res.data.number;
            this.we_chat=res.data.wx_chat;
          }
        })
      }
    },
    methods: {
      toOrderSearch(){
        if(this.orderSearch){
          window.location.assign(this.orderSearch)
        }
      },
      copy(id, attr) {
        let target = null;

        if (attr) {
          target = document.createElement('div');
          target.id = 'tempTarget';
          target.style.opacity = '0';
          if (id) {
            let curNode = document.querySelector('#' + id);
            target.innerText = curNode[attr];
          } else {
            target.innerText = attr;
          }
          document.body.appendChild(target);
        } else {
          target = document.querySelector('#' + id);
        }

        try {
          let range = document.createRange();
          range.selectNode(target);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
          document.execCommand('copy');
          window.getSelection().removeAllRanges();
          Toast.success("复制成功")
        } catch (e) {
          Toast.fail("复制失败")
        }

        if (attr) {
          // remove temp target
          target.parentElement.removeChild(target);
        }
      }
    }
  }
</script>

<style scoped>
  .service-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index:2000;
  }

  .service-dialog {
    background-color: #fff;
    border-radius: 0.2rem;
    width: 6.3rem;
    margin:15vh auto 0;
    position: relative;
  }

  .service-banner {
    display: block;
    border-radius: .2rem .2rem 0 0;
  }
  .service-body {
    padding: 0.5rem 0.3rem;
    color: #333333;
    text-align: center;
  }

  .service-body h5 {
    font-weight: 400;
    font-size: 0.3rem;
    margin-bottom: 0.1rem;
    white-space: nowrap;
  }

  .service-body p {
    font-weight: 400;
    font-size: 0.3rem;
  }

  .btn-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 0.3rem;
  }

  .btn-box button {
    background-color: #02C900;
    border-radius: 0.15rem;
    flex: 0 0 2.5rem;
    padding: 0.2rem 0;
    color: #fff;
    font-size: 0.32rem;
    line-height: normal;
  }
  .btn-box .close-btn{
    background-color: #fff;
    border: 1px solid #02C900 ;
    color: #333;
  }
  .btn-box .search-btn{
    background-color: #E61919;
    border: 1px solid #E61919;
    color: #fff;
  }
  .kf-qrcode{
    width: 1.8rem;
    height: 1.8rem;
    margin: 0 auto;
  }
  .kefu-close-btn{
    width: 0.68rem;
    height: 0.68rem;
    display: block;
    position: absolute;
    left:2.81rem;
    bottom:-1rem;
  }
</style>
