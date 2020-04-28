<template>
  <div
    v-show="visible"
    class="loading-mask"
  >
    <img
      class="outer"
      src="../images/load-outer1.png"
    >
    <img
      class="inner"
      src="../images/load-inset1.png"
    >
    <span class="msg">正在生成命书中</span>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      message: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .loading-mask {
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
  }

  .outer {
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    top: 5rem;
    left: 3rem;
    animation: outer 4s linear infinite;
  }

  .inner {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 5.3rem;
    left: 3.3rem;
    animation: inset 4s linear infinite;
  }

  @keyframes outer {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }

  @keyframes inset {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .msg{
    position: absolute;
    left: 50%;
    top:7rem;
    transform: translateX(-50%);
    font-size: 0.34rem;
    color: #383838;
  }
</style>
