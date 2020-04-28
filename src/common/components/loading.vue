<template>
  <div
    v-show="visible"
    class="loading-mask"
  >
    <img
      class="outer"
      src="../images/load-outer.png"
    >
    <img
      class="inner"
      src="../images/load-inset.png"
    >
    <span
      v-if="message"
      class="msg"
    >{{ message }}</span>
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
    width: 3.1rem;
    height: 3.1rem;
    position: absolute;
    top: 4.2rem;
    left: 2.2rem;
    animation: outer 4s linear infinite;
  }

  .inner {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 5rem;
    left: 3rem;
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
    top:7.7rem;
    transform: translateX(-50%);
    font-size: 0.34rem;
    color: #383838;
  }
</style>
