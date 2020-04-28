<template>
  <div class="protocol-box">
    <p class="p1">
      您的个人信息仅用于生成分析报告，不会用于其他用途
    </p>
    <div class="protocol">
      <svg
        v-show="!value"
        t="1573802073397"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2024"
        @click="$emit('input',true)"
        width="48"
height="48"
      ><path
        d="M 512.512 64 c -247.296 0 -448 200.704 -448 448 s 200.704 448 448 448 s 448 -200.704 448 -448 s -200.704 -448 -448 -448 Z m 257.024 331.776 l -289.792 289.792 c -13.312 13.312 -33.792 15.36 -49.152 6.144 c -3.072 -1.536 -5.632 -3.584 -8.192 -6.144 l -166.912 -166.912 c -15.872 -15.872 -15.872 -41.472 0 -57.344 s 41.472 -15.872 57.344 0 l 138.24 138.24 l 261.12 -261.12 c 15.872 -15.872 41.472 -15.872 57.344 0 c 15.872 15.872 15.872 41.472 0 57.344 Z"
        fill="#cdcdcd"
        p-id="2025"
      /></svg>
      <svg
        v-show="value"
        t="1573802073397"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2024"
        @click="$emit('input',false)"
        width="48"
height="48"
      ><path
        d="M 512.512 64 c -247.296 0 -448 200.704 -448 448 s 200.704 448 448 448 s 448 -200.704 448 -448 s -200.704 -448 -448 -448 Z m 257.024 331.776 l -289.792 289.792 c -13.312 13.312 -33.792 15.36 -49.152 6.144 c -3.072 -1.536 -5.632 -3.584 -8.192 -6.144 l -166.912 -166.912 c -15.872 -15.872 -15.872 -41.472 0 -57.344 s 41.472 -15.872 57.344 0 l 138.24 138.24 l 261.12 -261.12 c 15.872 -15.872 41.472 -15.872 57.344 0 c 15.872 15.872 15.872 41.472 0 57.344 Z"
        fill="#2cc333"
        p-id="2025"
      /></svg>
      <span>我已阅读并同意 <span
        style="color:#0868C9;"
        @click="$router.push({name:'protocol'})"
      >《易知用户隐私协议》</span></span>
    </div>


    <div class="history-box">
      <div class="p2">
        已为<span style="color:#E2392F;">314686</span>人生成报告
      </div>
      <div
        class="history-text"
        @click="$emit('to-result')"
      >
        点击查看历史订单
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'YzProtocol',
    props: {
      // 通过value获取绑定message值
      value: {
        type: Boolean,
        default:true
      }
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>
  .protocol-box{
    height:1.8rem;
    width: 100%;
    position: relative;
    z-index: 1;
    font-size: 0.24rem;
    color:#333333;
    opacity:0.8;
    padding: 0 0.3rem;
  }
  .protocol{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .protocol-box .p1{
    text-align: center;

  }
  .history-box{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-top: 0.4rem;
    font-size: 0.28rem;
  }

  .history-text{
    color: #0868C9;
    text-decoration: underline;
  }
  .protocol svg.icon{
    width: 0.38rem;
    height: 0.38rem;
    padding: 0.05rem;
  }
</style>
