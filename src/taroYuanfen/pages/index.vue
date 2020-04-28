<template>
  <section class="container">
    <!--顶部tips信息-->
    <index-tips />
    <!--内容贴图-->
    <div class="banner">
      <div class="wave" />
      <img
        src="../assets/images/boat.png"
        class="boat"
        @load="offsetTop = $refs['submit-btn'].offsetTop"
      >
      <img
        src="../assets/images/leaf.png"
        class="leaf"
      >
      <div
        ref="submit-btn"
        class="submit-btn"
        @click="fixedBtnClick"
      />
    </div>
    <!--客服 + 订单-->
    <yz-protocol v-model="protocol" />
    <div class="order-btn-container">
      <div @click="service=true">
        <svg
          t="1574846264538"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1890"
          width="48"
          height="48"
        ><path
          d="M464.3 783.4c0 26.4 21.4 47.9 47.9 47.9 26.4 0 47.9-21.4 47.9-47.9 0-26.4-21.4-47.9-47.9-47.9s-47.9 21.5-47.9 47.9z"
          p-id="1891"
          fill="#FDD278"
        /><path
          d="M512.1 958.5c-246.3 0-446.6-200.3-446.6-446.6S265.8 65.2 512.1 65.2s446.6 200.3 446.6 446.6-200.3 446.7-446.6 446.7z m0-829.2c-210.9 0-382.5 171.6-382.5 382.5s171.6 382.5 382.5 382.5 382.5-171.6 382.5-382.5c0.1-210.9-171.6-382.5-382.5-382.5z"
          p-id="1892"
          fill="#FDD278"
        /><path
          d="M512.1 673.1c-17.6 0-31.9-14.3-31.9-31.9v-53.9c0-52.2 39.9-92.1 75.1-127.3 25.8-25.8 52.5-52.5 52.5-73.8 0-53.2-42.9-96.4-95.7-96.4-53.7 0-95.7 41.4-95.7 94.3 0 17.6-14.3 31.9-31.9 31.9-17.6 0-31.9-14.3-31.9-31.9 0-87.2 71.6-158.1 159.5-158.1 88 0 159.5 71.9 159.5 160.2 0 47.8-36.2 83.9-71.2 118.9-27.8 27.7-56.4 56.3-56.4 82.1v53.9c0 17.7-14.3 32-31.9 32z"
          p-id="1893"
          fill="#FDD278"
        /></svg>
        <span>联系客服</span>
      </div>
      <div
        class="history-text"
        @click="redirect(indexUrl.result_url)"
      >
        <svg
          t="1574846764073"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6210"
          width="48"
          height="48"
        ><path
          d="M667.639 97.034H252.622c-57.274 0-103.754 46.438-103.754 103.711v622.51c0 57.273 46.48 103.711 103.754 103.711h518.77c57.259 0 103.74-46.438 103.74-103.711V304.499L667.638 97.034z m155.623 726.221c0 28.616-23.256 51.885-51.87 51.885h-518.77c-28.658 0-51.87-23.27-51.87-51.885v-622.51c0-28.658 23.212-51.87 51.87-51.87h336.434c-0.435 62.14 0.755 155.624 0.755 155.624 0 57.316 46.452 77.812 103.754 77.812h129.697v440.944zM693.566 330.441c-28.657 0-51.87-23.226-51.87-51.885V148.875L823.264 330.44H693.566z"
          fill="#FDD278"
          p-id="6211"
          data-spm-anchor-id="a313x.7781069.0.i10"
          class="selected"
        /><path
          d="M667.643 537.951H356.366c-14.292 0-25.913 11.577-25.913 25.913s11.62 25.957 25.913 25.957h311.277c14.293 0 25.898-11.62 25.898-25.957s-11.605-25.913-25.898-25.913zM667.643 667.634H356.366c-14.292 0-25.913 11.576-25.913 25.913s11.62 25.957 25.913 25.957h311.277c14.293 0 25.898-11.62 25.898-25.957s-11.605-25.913-25.898-25.913z"
          fill="#FDD278"
          p-id="6212"
          data-spm-anchor-id="a313x.7781069.0.i11"
          class="selected"
        /></svg>
        <span>历史订单</span>
      </div>
    </div>
    <img v-lazy="require('../assets/images/index1.png')">
    <img v-lazy="require('../assets/images/index2.png')">
    <img v-lazy="require('../assets/images/index3.png')">
    <img v-lazy="require('../assets/images/index4.png')">
    <div class="comment-footer-box">
      <ol class="comment-number-main">
        <li class="comment-number1">
          <span>已测算人数:</span>
          <span>{{ face_number }}</span>
        </li>
        <li class="comment-number2">
          <span>好评率:</span>
          <span>99.88%</span>
        </li>
      </ol>

      <scroll-comment
        :list="commentList"
        @change="face_number++"
      >
        <template v-slot="data">
          <div class="comment-footer-item">
            <div>{{ data.row.name }}</div>
            <div>{{ data.row.content }}</div>
          </div>
        </template>
      </scroll-comment>
    </div>

    <!--网站底部footer-->
    <yz-footer
      padding-bottom="1.8rem"
      bg-color="#161C77"
      font-color="#FFFFFF"
      @service="service=true"
    />
    <!-- 底部悬浮按钮 -->
    <transition name="fade">
      <div
        v-show="fixedBtn"
        class="footer-fixed-btn"
      >
        <div
          ref="submit2"
          class="submit-btn"
          @click="fixedBtnClick"
        />
      </div>
    </transition>

    <!--客服组件-->
    <service-dialog
      :visible.sync="service"
      :order-search="indexUrl.result_url"
      :bg-image="require('../assets/images/kefu-bgimg.png')"
    />
  </section>
</template>

<script>
  import {getIndexUrl} from '../../common/api'
  import {redirect,setRouterHijack} from '../../common/common'
  import serviceDialog from '../../common/components/service-dialog'
  import yzFooter from '../../common/components/yz-footer'
  import indexTips from "../../common/components/index-tips"
  import scrollComment from "../../common/components/scroll-comment"
  import commentList from "../assets/evaluate.json"
  import yzProtocol from "../components/yz-protocol"

  export default {
    name: 'Index',
    components: {
      serviceDialog,
      yzFooter,
      indexTips,
      scrollComment,
      yzProtocol
    },
    data() {
      return {
        face_number:3928349,
        protocol:true,
        buymsgVisible: true,
        service: false,
        flxedbtn: false,
        scrollheight: 0,
        offsetTop:600,
        price: '28.8',
        indexUrl: {},
        commentList:commentList,
        fixedBtn:false
      }
    },
    computed: {
      path_id() {
        if (this.$route.query.path_id) {
          return this.$route.query.path_id
        } else {
          return localStorage.getItem('path_id')
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.getIndexUrl()
        this.recordUv(1)
        window.addEventListener('scroll', this.handleScroll);
      })
    },
    destroyed(){
      window.addEventListener('scroll', this.handleScroll);
      setRouterHijack()
    },
    methods: {
      getIndexUrl() {
        getIndexUrl({type: 1, path_id: this.path_id}).then(res => {
          if (res.code == 200){
            this.indexUrl = res.data
            let callbackUrl = this.$route.query.callbackUrl;
            if(callbackUrl || res.data.back_url){
              setRouterHijack(1,callbackUrl?window.atob(callbackUrl):res.data.back_url)
            }
            localStorage.setItem('price', res.data.price)
          }
        })
      },
      redirect(url) {
        redirect(url)
      },
      fixedBtnClick() {
        if(this.protocol){
          this.$router.push({name:'drawCard'})
        }else {
          alert("请阅读并同意《易知用户隐私协议》！")
        }
      },
      handleScroll(e) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // let scrollHeight = document.body.scrollHeight;
        if (scrollTop < this.offsetTop) this.fixedBtn = false
        else this.fixedBtn = true
      },
    },
  }
</script>

<style scoped>
  .container {
    min-height: 100vh;
    background:#231d7c;
    overflow: hidden;
    margin: 0 auto;
  }
  .submit-btn {
    width: 6.5rem;
    height:1.05rem;
    margin: 0 auto;
    background: url("../assets/images/index-btn.png") no-repeat center center / contain;
    animation: submitbtn linear 1000ms infinite alternate;
  }
  @keyframes submitbtn {
    from {
      transform: scale(1)
    }
    to {
      transform: scale(0.92)
    }
  }
  .comment-footer-box{
    width:6.9rem;
    height:10.8rem;
    background:url("../assets/images/comment-bg.png") no-repeat left top / contain;
    border-radius:.2rem;
    margin:.2rem auto;
    padding:3.5rem .4rem .6rem;
    position: relative;
  }
  .comment-number-main{
    display: flex;
    align-items: center;
    position: absolute;
    left: .4rem;
    top: 1.05rem;
    width:6.1rem;
  }
  .comment-number-main li{
    background-color:#4D85E1;
    flex: 1 1 50%;
    padding: .1rem .15rem;
    border-radius: .1rem;
    white-space: nowrap;
  }
  .comment-number-main li:first-of-type{
    margin-right: .3rem;
  }
  .comment-number-main span:nth-of-type(1){
    color: #fff;
    font-size: .3rem;
  }
  .comment-number-main span:nth-of-type(2){
    color: #FFE050;
    font-size: .3rem;
  }

  .comment-footer-item{
    border-bottom: 1px solid #CAC1A4;
    color:rgba(56,56,56,1);
  }
  .comment-footer-item div:first-of-type{
    font-size:.3rem;
    font-weight:bolder;
    padding: 0.2rem 0 0.1rem;
  }
  .comment-footer-item div:last-of-type{
    font-size:.28rem;
    font-weight:300;
    padding-bottom: 0.2rem;
  }
  .footer-fixed-btn{
    width:100%;
    height:1.3rem;
    background-color: rgba(0,0,0,0.25);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding-top: 0.15rem;
  }
  .order-btn-container{
    font-size: .32rem;
    color:#FDD278;
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem .3rem;
  }
  .order-btn-container>div{
    display: flex;
    align-items: center;
    text-decoration: underline;
  }
  .order-btn-container svg.icon{
    width: .42rem;
    height: .42rem;
    margin-right: .1rem;
  }
  .banner{
    background: url("../assets/images/index-banner.jpg") no-repeat center top / contain;
    width: 100%;
    height: 10.5rem;
    position: relative;
    overflow: hidden;
  }
  .banner:after{
    display: block;
    content: "";
    width: 100%;
    height:1rem;
    position: absolute;
    bottom:-1px;
    left: 0;
    z-index:3;
    background:linear-gradient(0deg,#231d7c 0%,transparent 100%);
  }
  .banner .submit-btn{
    position: absolute;
    left:0.5rem;
    bottom: 0;
    z-index: 4;
  }
  .wave{
    width: 7.5rem;
    height:.76rem;
    background-image: url("../assets/images/wave.png");
    background-repeat:no-repeat;
    background-size:200% 100%;
    background-position: left center;
    animation:wave 10s linear infinite;
    position: absolute;
    bottom:0.8rem;
    left: 0;
    transform: scale(1.5);
    z-index: 2;
  }
  @keyframes wave {
    from{
      background-position: left center;
    }
    to {
      background-position: right center;
    }
  }
  .leaf{
    width: 7.5rem;
    position: absolute;
    bottom:-1rem;
    left: 0;
    z-index:2;
  }
  .boat{
    width:5.63rem;
    position: absolute;
    bottom:0.8rem;
    left:47%;
    transform: translateX(-50%);
    z-index:1;
  }
</style>
