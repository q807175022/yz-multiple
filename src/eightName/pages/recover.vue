<template>
  <section class="container">
    <div class="banner">
      <img src="../assets/images/index_1.png">
    </div>
    <!--用户信息-->
    <div class="recover-wrap">
      <div class="result-box">
        <p class="p1">
          亲爱的测试者:
        </p>
        <p class="p2">
          测算后你将可以知晓自身流年趋势,详细知晓自己的<span>财运、姻缘、健康运势</span>，从而趋吉避凶,找准富贵机遇,让来年的运势让收入翻一倍！<span>错过本次机会,将立马恢复原价！</span>
        </p>
        <!--订单信息-->
        <div class="order-box">
          <h4 class="order-title">
            咨询项目：八字姓名详批
          </h4>
          <div class="order-subtitle">
            <span>解密内容:&nbsp;</span>财运事业、姻缘、未来劫数
          </div>
          <div class="order-info">
            <div class="left">
              <div class="order-info-title">
                原价：￥<del>188.80</del>
              </div>
              <div><span class="order-price-tag">结缘价</span><span class="order-price">￥{{ price }}</span></div>
            </div>
            <div class="right">
              <div class="order-info-title">
                限时优惠倒计时
              </div>
              <div class="order-info-time">
                00:{{ time.m|formatTime }}:{{ time.s|formatTime }}
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
          @click="pay"
        >
          立即支付
        </button>
      </div>
    </div>
    <yz-protocol
      v-model="protocol"
      @to-result="redirect(result_url)"
    />
    <!--<img class="comment-image" v-lazy="require('../assets/images/index7.png')">-->
    <!--评论滚动-->
    <div class="comment-box">
      <span class="people">{{ people }}</span>
      <scroll-comment
        :list="commentList"
        @change="people++"
      >
        <template v-slot="data">
          <div class="comment-item">
            <div>{{ data.row.name }}</div>
            <div>{{ data.row.content }}</div>
          </div>
        </template>
      </scroll-comment>
    </div>
  </section>
</template>

<script>
  import { Dialog } from 'vant'
  import yzProtocol from '../components/yz-protocol'
  import { redirect } from '../../common/common'
  import { getIndexUrl } from '../../common/api'
  import { postPayUrl } from '../assets/http'
  import commentList from "../assets/evaluate.json"//评论列表
  import scrollComment from "../../common/components/scroll-comment"//评论滑动

  export default {
    name: 'Recover',
    components: { yzProtocol,scrollComment },
    filters: {
      formatTime(num) {
        return num < 10 ? '0' + num : num
      }
    },
    data() {
      return {
        time: {
          m: 0, s: 0
        },
        protocol: true,
        result_url: '',
        people:685451,
        commentList:commentList
      }
    },
    computed: {
      price(){
        return this.$route.query.price
      }
    },
    mounted() {
      this.countDown()
      this.getIndexUrl()
      this.$nextTick(()=>{
        this.recordUv(10)
      })
    },
    methods: {
      getIndexUrl() {
        getIndexUrl({ type: 1, path_id: this.$route.query.path_id }).then(res => {
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
      pay() {
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
    overflow: hidden;
  }
  .recover-wrap{
    width: 100%;
    padding: .2rem .2rem ;
  }
  .result-box {
    width: 100%;
    padding: 0.55rem .44rem;
    margin: 0 auto;
    background: url("../assets/images/recover-1.png") no-repeat;
    /*url("../assets/images/result03.jpg") center bottom no-repeat,*/
    /*url("../assets/images/result02.jpg")  center top repeat-y;*/
    background-size:100%;
    position: relative;
    z-index: 1;
    color:#383838;
    font-size: 0.32rem;
    border-radius: .12rem;
  }

  .result-box .p1 {
    font-weight: bolder;
    margin: 0.1rem 0 0.2rem;
  }

  .result-box .p2 {
    text-align: justify;
    line-height: .55rem;
    margin: 0rem 0 0.55rem;
  }
  .result-box .p2 span{
    color: #D01B13;
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
    color: #383838;
  }

  .order-info {
    padding: 0 0.2rem;
    display: flex;
    padding-bottom: 0.25rem;
  }

  .order-info .left {
    flex: 1 1 auto;
  }

  .order-info .right {
    text-align: right;
  }

  .order-info-title {
    padding: 0.2rem 0;
  }

  .order-price-tag {
    background-color: #F94B4A;
    display: inline-block;
    vertical-align: middle;
    line-height: 0.28rem;
    font-size: 0.28rem;
    padding: 0.1rem 0.2rem;
    color: #fff;
    border-radius: 0.1rem;
  }

  .order-price {
    font-size: 0.36rem;
    font-weight: bolder;
    vertical-align: middle;
  }

  .order-info-time {
    color: #D93232;
    font-size: 0.32rem;
    font-weight: bolder;
    letter-spacing: 0.03rem;
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
    width: 6.91rem;
    height: 11.51rem;
    padding: 1.7rem 0.5rem 0.6rem;
    overflow: hidden;
    margin:0 auto 0.5rem;
    position: relative;
    background: url("../assets/images/index15.png") no-repeat;
    background-size: 100% 100%;
  }

  .people{
    color: #f7ca4a;
    position: absolute;
    top: 1.05rem;
    left: 2.3rem;
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

</style>
