<template>
  <transition name="order-move">
    <div
      v-show="orderShow"
      class="order-container"
    >
      <transition name="fade">
        <div
          v-show="maskShow"
          class="mask"
          @touchmove.prevent=""
          @click="$emit('update:visible',false)"
        />
      </transition>
      <div class="order-box">
        <p class="lbtext1">
          咨询项目：八字姓名详批
        </p>
        <div class="lbtext">
          正在用您的八字排盘,测算您的运势吉凶...
        </div>
        <div class="user-info">
          <img
            class="lbimg"
            src="../assets/images/index-luo.png"
            alt="罗镇"
          >

          <div class="right">
            <p>命主信息</p>
            <span>姓名:{{ userData.name }}</span>
            &nbsp;
            <span>性别:{{ userData.sex==1?'男':'女' }}</span>
            <p style="overflow: hidden;text-overflow: ellipsis;">
              生辰:{{ userData.birthday }}
            </p>
          </div>
        </div>

        <div class="order-info">
          <div class="order-price">
            <div class="original">
              原价 <del>￥188.80</del>
            </div>
            <div class="order-price2">
              <span class="price-tag">结缘价</span><span>￥</span><span>{{ price }}</span>
            </div>
          </div>
          <div class="order-runtime">
            <div>限时优惠倒计时</div>
            <div>00:{{ time.m|timeFormat }}:{{ time.s|timeFormat }}</div>
          </div>
        </div>


        <div class="pay-ways">
          <svg
            t="1564737361050"
            class="wx icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3141"
            width="48"
            height="48"
          >
            <path
              d="M315.84 322.624c-20.032 0-40.128 13.312-40.128 33.472 0 19.904 20.096 33.28 40.128 33.28 19.968 0 33.216-13.376 33.216-33.28 0-20.16-13.312-33.472-33.216-33.472zM588.8 516.032c-13.248 0-26.624 13.376-26.624 26.496 0 13.568 13.376 26.688 26.624 26.688 20.16 0 33.344-13.056 33.344-26.688 0.064-13.12-13.12-26.496-33.344-26.496z"
              fill="#61BA46"
              p-id="3142"
            />
            <path
              d="M958.016 204.416A136.384 136.384 0 0 0 821.568 68.032H198.464A136.448 136.448 0 0 0 62.016 204.416V827.52c0 75.52 61.12 136.512 136.448 136.512h623.104A136.32 136.32 0 0 0 958.016 827.52V204.416zM402.304 662.592c-33.28 0-59.968-6.784-93.312-13.376l-93.056 46.72 26.624-80.128C175.872 569.152 136 509.248 136 435.968c0-126.656 119.872-226.496 266.304-226.496 131.008 0 245.76 79.744 268.8 187.136a245.824 245.824 0 0 0-25.792-1.472c-126.464 0-226.304 94.272-226.304 210.624 0 19.456 2.944 38.144 8.192 55.808a354.816 354.816 0 0 1-24.896 1.024z m392.96 93.44l20.032 66.432-73.216-39.872c-26.56 6.592-53.376 13.12-79.808 13.12-126.72 0-226.56-86.656-226.56-193.152 0-106.496 99.84-193.344 226.56-193.344 119.616 0 226.176 86.912 226.176 193.344 0.064 60.032-39.744 113.344-93.184 153.472z"
              fill="#61BA46"
              p-id="3143"
            />
            <path
              d="M735.232 516.032c-13.056 0-26.368 13.376-26.368 26.496 0 13.568 13.312 26.688 26.368 26.688 20.032 0 33.408-13.056 33.408-26.688 0.064-13.12-13.312-26.496-33.408-26.496zM502.208 389.376c20.032 0 33.408-13.376 33.408-33.28 0-20.16-13.312-33.472-33.408-33.472-19.968 0-40 13.312-40 33.472 0 19.904 20.032 33.28 40 33.28z"
              fill="#61BA46"
              p-id="3144"
            />
          </svg>
          <span>微信支付</span>
          <svg
            t="1564737443134"
            class="select icon"
            viewBox="0 0 1070 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3462"
            width="48"
            height="48"
          >
            <path
              d="M489.73913 823.652174A333.913043 333.913043 0 1 0 155.826087 489.73913 333.913043 333.913043 0 0 0 489.73913 823.652174z"
              fill="#00D300"
              p-id="3463"
              data-spm-anchor-id="a313x.7781069.0.i8"
              class=""
            />
            <path
              d="M489.73913 979.478261a489.73913 489.73913 0 1 1 489.739131-489.739131 489.73913 489.73913 0 0 1-489.739131 489.739131z m0-934.956522a445.217391 445.217391 0 1 0 445.217392 445.217391A445.217391 445.217391 0 0 0 489.73913 44.521739z"
              fill="#00D300"
              p-id="3464"
              data-spm-anchor-id="a313x.7781069.0.i10"
              class=""
            />
          </svg>
        </div>
        <button
          class="submit-btn"
          @click="pay"
        >
          立即解锁内容
        </button>
      </div>
      <yz-loading :visible="loading" />
    </div>
  </transition>
</template>

<script>
  import { postpayUrl } from "../assets/http";
  import yzLoading from "../../common/components/loading"
  export default {
    name: "OrderModal",
    components: { 'yz-loading':yzLoading},
    filters: {
      timeFormat(v) {
        return v < 10 ? '0' + v : v
      }
    },
    props: {
      visible: Boolean,
      price: String,
      id: Number,
      userData:Object
    },
    data() {
      return {
        loading: false,
        orderShow: false,
        maskShow: this.visible,
        runtime: false,
        time: { m: 0, s: 0 },
      }
    },
    computed: {
      path_id() {
        return this.$route.query.path_id || localStorage.getItem('path_id')
      },
    },
    watch: {
      visible(newVal) {
        this.orderShow = newVal
        if (!this.runtime && newVal) {
          this.runtime = true
          this.countDown()
        }
        if (newVal) {
          setTimeout(() => {
            this.maskShow = newVal
          }, 400)
        } else {
          this.maskShow = newVal
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
      pay() {
        this.$emit('confirm')
      }
    }
  }
</script>

<style scoped>
  .lbtext1 {
    font-size: .32rem;
    font-weight: 400;
    color: rgba(56, 56, 56, 1);
    margin-left: 1.8rem;
    margin-top: .2rem;
    margin-bottom: .05rem;
  }

  .order-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 1100;
  }

  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1101;
  }

  .order-box {
    overflow: hidden;
    color: #383838;
    width: 7.1rem;
    margin: 0 auto 0.5rem;
    border-radius: 0.5rem;
    position: relative;
    z-index: 1102;
    background: rgba(255, 236, 200, 1);
    border: 0.03rem solid rgba(255, 169, 0, 1);
  }

  .order-box>h4 {
    font-size: 0.32rem;
    text-align: center;
    padding: 0.3rem 0;
    margin: 0 0.25rem;
    font-weight: bolder;
  }

  .lbtext {
    font-size: .28rem;
    margin-left: 1.8rem;
    color: rgba(121, 104, 73, 1);
    padding-bottom: .1rem;
    border-bottom: 1px solid rgba(190, 144, 58, 0.2);
  }

  .pay-ways {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.3rem;
    color: #666666;
    margin: 0 0.3rem;
    padding: 0.3rem 0;
  }

  .pay-ways span {
    flex: 1;
  }

  .wx.icon {
    width: 0.68rem;
    height: 0.68rem;
    margin-right: 0.2rem;
  }

  .select.icon {
    width: 0.42rem;
    height: 0.42rem;
  }

  .submit-btn {
    width: 6.6rem;
    height: 0.9rem;
    background: rgba(76, 205, 107, 1);
    border-radius: 0.1rem;
    font-size: 0.42rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    margin: 0rem auto 0.4rem;
    display: block;
    color: #fff;
  }

  .order-move-enter {
    opacity: 0;
    transform: translateY(100%);
  }

  .order-move-enter-active {
    will-change: transform;
    transition: all linear 400ms;
  }

  .order-move-enter-to {
    position: fixed !important;
    z-index: 1000;
  }

  .user-info {
    position: relative;
    padding: 0.2rem 0;
    margin: 0 0.2rem;
    border-bottom: 1px solid rgba(190, 144, 58, 0.2);
  }

  .lbimg {
    width: 1.66rem;
    position: absolute;
    height: 2.85rem;
    top: -.96rem;
    left: 0;
  }
  .user-info .right {
    font-size: 0.32rem;
    padding-left: 0.3rem;
    white-space: nowrap;
    line-height: 0.56rem;
    margin-left: 2.2rem;
    color: rgba(56, 56, 56, 1);
    font-weight: 400;
    position: relative;
  }
  .user-info .right:after {
    display: block;
    content: "";
    height: 1.2rem;
    width: 1px;
    background: rgba(190, 144, 58, 0.2);
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .order-info {
    display: flex;
    justify-content: space-between;
    margin: 0 0.25rem;
    padding: 0.2rem 0;
    border-bottom: 1px solid rgba(190, 144, 58, 0.2);
  }

  .order-price .original {
    font-size: 0.28rem;
    color: rgba(56, 56, 56, 1);
    padding-bottom: 0.15rem;
  }

  .order-price2 {
    display: flex;
    align-items: center;
    font-size: 0.42rem;
    font-weight: 500;
    color: rgba(56, 56, 56, 1);
  }

  .order-price2 .price-tag {
    background: rgba(249, 75, 74, 1);
    border-radius: 0.08rem;
    color: #fff;
    font-size: 0.28rem;
    display: block;
    padding: 0.1rem 0.2rem;
  }

  .order-runtime {
    font-size: 0.32rem;
    color: #D93232;
    text-align: right;
  }

  .order-runtime>div:first-of-type {
    padding-bottom: 0.2rem;
    font-size: 0.28rem;
  }
</style>
