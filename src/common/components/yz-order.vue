<template>
  <div class="order-wrapper flex flex-column">
    <div
      v-if="showOrder"
      class="order left-round"
      :style="orderStyle"
    >
      订单号：{{ orderNum }}
    </div>
    <div class="flex flex-between">
      <del>原价：￥{{ oldPrice }}</del>
      <span class="red-font">限时优惠倒计时</span>
    </div>
    <div class="flex flex-between">
      <div>
        <span class="jy-box">结缘价</span>
        <span class="price">￥{{ price }}</span>
      </div>
      <div>
        <span class="number">{{ time.hours | format }}</span>
        <span class="divider">:</span>
        <span class="number">{{ time.minutes | format }}</span>
        <span class="divider">:</span>
        <span class="number">{{ time.seconds | format }}</span>
      </div>
    </div>
    <p class="tips">
      报告生成后，只有您自己查看，请放心领取
    </p>
    <div class="btn-group">
      <img
        v-if="env === 3"
        src="../images/wechat.png"
        @click="$emit('pay-success', 1)"
      >
      <img
        v-if="env === 0 || env === 1"
        src="../images/wechat.png"
        @click="$emit('pay-success', 1)"
      >
      <img
        v-if="env === 0 || env === 2"
        src="../images/alipay.png"
        @click="$emit('pay-success', 2)"
      >
    </div>
    <img
      src="../images/tip.png"
      class="tip-b"
    >
    <p class="tishi">
      支付系统已经经过安全联盟认证请放心使用
    </p>
  </div>
</template>

<script>
    export default {
      name: "YzOrder",
      filters:{
        format(num){
          return num < 10 ? `0${num}` : num
        }
      },
      props:{
        showOrder:{
          type:Boolean,
          default:() => true
        },
        orderNum:{
          type:String,
          default:'XMCS1584530202000800060'
        },
        oldPrice:{
          type:[Number,String],
          default:() => '88.80'
        },
        countNum:{
          type:Number,
          default:() => 600
        },
        orderBgColor:{
          type:String
        },
        orderFontColor:{
          type:String
        }
      },
      data(){
        return {
          time:{
            hours: 0,
            minutes:0,
            seconds:0
          }
        }
      },
      computed:{
        price(){
          return localStorage.getItem('price') || '18.80'
        },
        orderStyle(){
          let stylesheets = {}
          if (this.orderBgColor) {
            stylesheets.background = this.orderBgColor
          } else if(this.orderFontColor) {
            stylesheets.color = this.orderFontColor
          }
          return stylesheets
        },
        env() {
          let userAgent = navigator.userAgent.toLowerCase();
          if (this.$route.query.zwUid || localStorage.getItem("zwUid")) {
            return 3;
          } else if (userAgent.match(/Alipay/i) == "alipay") {
            return 2;
          } else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
            return 1;
          } else {
            return 0;
          }
        }
      },
      created(){
        this.countDown()
      },
      methods:{
        countDown(_num = null){
          let num = !_num ? this.countNum : _num
          let h = parseInt(num / 60 / 60 % 24,10),
            m = parseInt(num / 60 % 60,10),
            s =  parseInt(num % 60,10);

          this.time.hours = h
          this.time.minutes = m
          this.time.seconds = s
          --num
          if (num > 0) {
            setTimeout(() => {
              this.countDown(num)
            },1000)
          } else {
            this.$emit('time-up')
          }
        }
      }
    }
</script>

<style scoped>
  span{
    display: inline-block;
    vertical-align: middle;
  }
  .flex {
    display: flex;
  }
  .flex-column{
    flex-direction: column;
    flex-wrap:nowrap;
  }
  .flex-align-center{
    align-items: center;
  }
  .flex-between{
    justify-content: space-between;
  }
  .left-round{
    padding:0 0.12rem;
  }
  .order-wrapper{
    font-size:0.28rem;
    color:#5E5E5E;
    line-height:0.6rem;
  }
  .order{
    width:100%;
    background:#EBD9B3;
    line-height:0.46rem;
    color:#6E6C6A;
  }
  .jy-box{
    width:1.43rem;
    color:#FFFFFF;
    background:#F94B4A;
    border-radius: 0.07rem;
    text-align: center;
    line-height:0.46rem;
  }
  .number{
    text-align: center;
    width:0.52rem;
    color:#FFFFFF;
    font-size:0.34rem;
    background:#D93232;
    border-radius:0.06rem;
    line-height: 0.4rem;
  }
  .divider{
    color:#D93232;
    font-size:0.3387rem
  }
  .price{
    color:#383838;
    font-size:0.42rem;
    font-weight:bolder;
  }
  .tips{
    color:#9A8B8E;
    font-size:0.24rem;
    text-align: center;
  }
  .btn-group{
    margin-top:0.28rem;
    height:2.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .btn-group > img{
    width:6.41rem;
    height:0.87rem;
  }
  /*.btn-group > img:last-child{*/
    /*margin-top: 0.1rem;*/
  /*}*/
  .tip-b{
    margin-top:0.3rem;

  }
  .tishi{
    color:#169925;
    font-size:0.26rem;
    text-align: center;
    border-bottom:1px dotted #D1D1D1;
  }
  .red-font{
    color:#D93232;
  }
</style>
