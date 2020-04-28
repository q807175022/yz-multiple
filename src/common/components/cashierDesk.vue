<template>
  <div class="order-container">
    <transition name="order-fadein">
      <div
        v-show="maskShow"
        class="mask"
        @touchmove.prevent=""
        @click="$emit('update:visible',false)"
      />
    </transition>
    <transition name="moveup1">
      <div
        v-show="maskShow"
        class="order-box"
      >
        <h4>
          {{ title }}
        </h4>
        <div class="price-line">
          <label class="label">金额</label>
          <span class="price">￥{{ price }}</span>
        </div>
        <div class="price-line">
          <label class="label">原价</label>
          <del class="original">￥188.80</del>
        </div>
        <div
          v-if="showCount"
          class="price-line"
        >
          <label class="label gray">距优惠结束</label>
          <div class="count-down">
            <span>00</span>:<span>{{ time.m|timeFormat }}</span>:<span>{{ time.s|timeFormat }}</span>
          </div>
        </div>
        <div class="pay-btns">
          <button
            v-if="env==3"
            class="wx-btn"
            @click="$emit('success',1)"
          >
            立即支付
          </button>
          <button
            v-if="env==0 || env==2 "
            class="zfb-btn"
            @click="$emit('success',2)"
          >
            <img src="../images/zfb-white.svg">
            支付宝支付
          </button>
          <button
            v-if="env==0 || env==1 "
            class="wx-btn"
            @click="$emit('success',1)"
          >
            <img src="../images/wx-white.svg">
            微信支付
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "CashierDesk",
    filters: {
      timeFormat(v) {
        return v < 10 ? '0' + v : v
      }
    },
    props: {
      visible:{
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      showCount:{
        type: Boolean,
        default: true
      },
      price:{
        type:String,
        default(){
          return localStorage.getItem('price') || this.$route.query.price
        }
      },
    },
    data() {
      return {
        loading: false,
        maskShow: this.visible,
        runtime: false,
        time: {m: 0, s: 0}
      }
    },
    computed: {
      env() {
        //  支付宝2   微信1   其他0
        let userAgent = navigator.userAgent.toLowerCase();
        let zwGameId = localStorage.getItem('zwGameId');
        if(zwGameId){
          return 3
        }else if (userAgent.match(/Alipay/i) == "alipay") {
          return 2
        } else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
          return 1
        } else {
          return 0
        }
      }
    },
    watch: {
      visible(newVal) {
        this.maskShow = newVal
        if (!this.runtime && newVal && this.showCount) {
          this.runtime = true
          this.countDown()
        }
      }
    },
    methods: {
      countDown(num = 600) {
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
    }
  }
</script>

<style scoped>
  .order-container {
    width: 100%;
    height: 0;
  }

  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 110;
  }

  .order-fadein-enter-active {
    animation: fade-in 500ms;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .order-box {
    background-color: #fff;
    overflow: hidden;
    color: #383838;
    width: 7.1rem;
    border-radius: 0.5rem;
    z-index: 120;
    position: fixed;
    bottom:.5rem;
    left: .2rem;
  }

  .order-box > h4 {
    text-align: center;
    padding: 0.5rem 0.2rem;
    color: #383838;
    font-size: .34rem;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .moveup1-enter {
    transform: translateY(100%);
  }

  .moveup1-enter-active {
    will-change: transform;
    transition: all linear 400ms;
  }

  .moveup1-enter-to {
    position: fixed !important;
    z-index: 1000;
  }
  .price-line{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding:0 .6rem .3rem;
  }
  .price-line .label{
    font-size: .32rem;
    color: #383838;
  }
  .price-line .price{
    font-size: .48rem;
    color: #383838;
  }
  .price-line .original{
    font-size: .32rem;
    color: #666;
  }
  .price-line .gray{
    color: #a5a5a5;
  }
  .count-down{
    display: flex;
    align-items: center;
    font-size: .36rem;
    color:#F94B4A;
  }
  .count-down span{
    color: #fff;
    background-color: #F94B4A;
    border-radius: 3px;
    padding:0 3px;
    margin:0 3px;
  }
  .count-down span:last-of-type{
    margin-right:0;
  }
  .pay-btns{
    padding: .2rem 0 .5rem;
   }
  .pay-btns img{
    width:.6rem;
    height: .6rem;
    margin-right: .2rem;
  }
  .zfb-btn,
  .wx-btn{
    font-size: .32rem;
    color: #fff;
    width:6.4rem;
    height:.9rem;
    border-radius:.12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
  .zfb-btn{
    background:#02A9F1;
  }
  .wx-btn{
    background:#4CCD6B;
  }
  .pay-btns button:nth-of-type(2){
    margin-top: .3rem;
  }
</style>
