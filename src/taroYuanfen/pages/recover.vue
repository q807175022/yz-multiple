<template>
  <section class="container">
    <div class="banner" />
    <!--用户信息-->
    <div class="result-box">
      <h2 class="box-title">
        你的信息
      </h2>
      <div class="result-content">
        <p class="p1">
          <span>亲爱的</span><span>测试者:</span>
        </p>
        <p class="p2">
          塔罗牌灵已为你的问题作出详细的解答,揭开塔罗牌后你将知晓你们之间的缘分,未来的感情状况,是否合适,能走多久。立即解牌,你将不再为感情所困惑！<span
            style="color:#D01B13;"
          >你们之间的缘分,未来的感情状况，是否合适，能走多久</span>
        </p>
        <!--订单信息-->
        <div class="order-box">
          <h4 class="order-title">
            咨询项目：塔罗占卜
          </h4>
          <div class="order-subtitle">
            <span>解密内容：</span>你们之间的缘分，未来的感情状况，是否合适，能走多久
          </div>
          <div class="order-info">
            <div class="price-msg">
              <del>原价：￥188.80</del>
              <span>限时优惠倒计时</span>
            </div>
            <div class="price-box">
              <div class="price-tag-box">
                <span class="price-tag">结缘价</span>
                <span class="price-number">￥{{ price }}</span>
              </div>
              <div class="font-red">
                <span>00:{{ time.m|formatTime }}:{{ time.s|formatTime }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="order-tips">
          <span class="fl">已有<i>423529</i>人测算</span>
          <span class="fr">好评率：<i>98.9%</i></span>
        </div>
        <button
          class="pay-btn"
          @click="env?pay(env):(orderVisible = true)"
        >
          立即支付
        </button>
      </div>
    </div>
    <yz-protocol v-model="protocol" />
    <div class="history-link">
      <a :href="result_url">点击查看历史订单</a>
    </div>

    <div class="comment-box">
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
          <div class="comment-item">
            <div>{{ data.row.name }}</div>
            <div>{{ data.row.content }}</div>
          </div>
        </template>
      </scroll-comment>
    </div>

    <!--站外支付__支付确认-->
    <cashier-desk
      id="cashier"
      ref="cashier"
      :visible.sync="orderVisible"
      :price="price"
      title="你和她的缘分有多深—TA最爱的人是你吗？"
      @success="pay"
    />
    <yz-loading :visible="loading" />
  </section>
</template>

<script>
  import { Dialog } from 'vant'
  import yzProtocol from '../components/yz-protocol'
  import { redirect } from '../../common/common'
  import { getIndexUrl } from '../../common/api'
  import { postPayUrl } from '../assets/http'
  import scrollComment from "../../common/components/scroll-comment"
  import commentList from "../assets/evaluate.json"
  import yzLoading from "../components/loading"
  import cashierDesk from "../../common/components/cashierDesk"
  export default {
    name: 'Recover',
    components: { yzProtocol,scrollComment,yzLoading,cashierDesk},
    filters: {
      formatTime(num) {
        return num < 10 ? '0' + num : num
      }
    },
    data() {
      return {
        loading:false,
        time: {
          m: 0, s: 0
        },
        orderVisible:false,
        face_number:3928349,
        protocol: true,
        result_url: '',
        commentList:commentList
      }
    },
    computed:{
      price(){
        return this.$route.query.price ||localStorage.getItem('price')
      },
      env() {
        return this.$refs['cashier'].env
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.countDown()
        this.getIndexUrl()
        this.recordUv(10)
      })
    },
    methods: {
      getIndexUrl() {
        let path_id = this.$route.query.path_id ||localStorage.getItem('path_id');
        getIndexUrl({ type: 1, path_id: path_id  }).then(res => {
          if (res.code == 200) {
            this.result_url = res.data.result_url
          }
        })
      },
      countDown(num = 900) {
        let m = parseInt(num / 60), s = num % 60;
        this.time.m = m;
        this.time.s = s;
        --num;
        if (num > 0) {
          setTimeout(() => {
            this.countDown(num)
          }, 1000)
        }
      },
      redirect(url) {
        redirect(url)
      },
      pay(type) {
        console.log(type)
        if (!this.protocol) {
          Dialog.alert({ message: '请阅读并同意《易知用户隐私协议》!' })
          return false
        }
        let zwUid = localStorage.getItem("zwUid");
        let params = {
          callback: encodeURIComponent(`${window.location.origin}${this.$router.options.base}result`),
        }
        if (zwUid) {
          params.channel = 'zhiwu'
          params.zwGameId = localStorage.getItem("zwGameId")
        }
        if (this.$route.query.user_id) {
          params.user_id = this.$route.query.user_id
        }else {
          Dialog.alert({ message: '订单错误，请重新开始测算！' })
          return false
        }
        if(type === 2){
          params.is_alipay = 1
          return postPayUrl(params,type)
        }
        this.loading = true
        postPayUrl(params).then(res => {
          if (res.code == 200) {
            this.recordUv(11)
            if (zwUid) {
              zwDivine.payIndex(res.data)
            } else {
              window.location.href = res.data.url
            }
          } else {
            Dialog.alert({
              message: res.msg || '请求错误:' + res.code
            })
            this.loading = false
          }
        }).catch(e => {
          Dialog.alert({
            message: '服务器异常,请稍候重试'
          })
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    min-height: 100vh;
    background:#171C78;
    overflow: hidden;
    padding-bottom: 1rem;
  }
  #cashier >>> h4{
    font-size: .28rem;
  }
  .banner{
    height:5.2rem;
    background: url("../assets/images/result-banner.jpg") no-repeat;
    background-size: cover;
    position: relative;
  }
  .banner:after{
    content: "";
    display: block;
    width: 100%;
    height: .6rem;
    background:linear-gradient(0deg,#231d7c 0%,transparent 100%);
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .result-box {
    position: relative;
    width: 6.9rem;
    background:#EEF4FF;
    border-radius: 0.2rem;
    margin: -.8rem auto 0;
    padding:1rem .4rem .5rem;
  }
  .box-title {
    width: 100%;
    height: 0.82rem;
    text-align: center;
    line-height: 0.6rem;
    position: absolute;
    top:0;
    left:0;
    font-size: .36rem;
    font-weight: 500;
    color: #FFFFFF;
    background: url("../assets/images/result-title-bg.png") no-repeat center center / contain;
  }
  .result-box .p1 {
    font-weight: bolder;
    font-size: 0.36rem;
    color: #D32C29;
  }

  .result-box .p2 {
    font-size:0.32rem;
    font-weight:400;
    color:rgba(14,11,61,1);
    line-height:.48rem;
    letter-spacing: 0.03rem;
    margin: 0.1rem 0 0.2rem;
    text-align: justify;
  }

  .order-box {
    width: 5.9rem;
    border-radius: 0.1rem;
    margin: 0 auto;
    border: 1px solid #D01B13;
  }

  .order-title {
    padding: 0.15rem 0;
    text-align: center;
    font-size: 0.32rem;
    font-weight: 300;
    color: rgb(255, 255, 255);
    background: #D01B13;
    border-radius: 0.1rem;
  }

  .order-subtitle {
    margin: 0 0.2rem;
    font-size: 0.28rem;
    font-weight: 300;
    padding: 0.1rem 0;
    border-bottom: 1px solid rgba(56, 56, 56, 1);
  }

  .order-subtitle>span {
    font-weight: 400;
  }
  .order-tips {
    width: 5.9rem;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.2rem 0;
  }

  .order-tips i {
    color: #D93232;
  }

  .fl {
    float: left
  }

  .fr {
    float: right
  }

  .pay-btn {
    background-color: #4CCD6B;
    border-radius: 0.1rem;
    font-size: 0.4rem;
    padding: 0.2rem;
    width: 5.9rem;
    margin: 0 auto;
    display: block;
    color: #fff;
    font-weight: 500;
    letter-spacing: 0.1rem;
    margin-bottom: 0.2rem;
  }
  .comment-box{
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
  .comment-item{
    border-bottom: 1px solid #D4B090;
    color:rgba(56,56,56,1);
  }
  .comment-item div:first-of-type{
    font-size:.3rem;
    font-weight:bolder;
    padding: 0.2rem 0 0.1rem;
  }
  .comment-item div:last-of-type{
    font-size:.28rem;
    font-weight:300;
    padding-bottom: 0.2rem;
  }
  .history-link{
    text-align: center;
    margin-bottom: .3rem;
  }
  .history-link a{
    font-size:.28rem;
    font-weight:400;
    text-decoration:underline;
    color: rgb(253, 210, 120);
  }
  .price-msg{
    padding:.2rem .2rem .1rem;
    display: flex;
    justify-content: space-between;
    font-size:.28rem;
  }
  .price-msg del{
    color: #383838;
  }
  .font-red{
    color:#D93232;
  }
  .price-box{
    display: flex;
    padding:0 .2rem .2rem;
    justify-content: space-between;
    align-items: center;
    font-size:.36rem;
    border-bottom: 1px solid rgba(191, 191, 191, 0.3);
  }
  .price-tag-box{
    display: flex;
    align-items: center;
  }
  .price-tag{
    background-color: #F94B4A;
    font-size: 0.28rem;
    padding: 0.05rem 0.2rem;
    color: #fff;
    border-radius: 0.1rem;
  }
  .price-number{
    font-size: .42rem;
    font-weight: bolder;
  }
</style>
