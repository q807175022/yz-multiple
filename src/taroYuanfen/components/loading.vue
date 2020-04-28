<template>
  <div
    v-show="visible"
    class="loading-mask"
  >
    <div class="loading-content">
      <img
        class="tarot-rotate"
        src="../assets/images/card-cover.png"
      >
      <p>LOADING...</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    props: {
      visible: {
        type: Boolean,
        default: false
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
    preserve-3d:1rem;
  }
  .loading-content{
    width:100%;
    position: absolute;
    left:0rem;
    top: 35%;
    color: #999;
    font-size: 0.3rem;
    letter-spacing: 0.05rem;
    text-align: center;
    text-indent:1.5em;
  }
  .tarot-rotate {
    width: 1rem;
    margin: 0 auto 0.3rem;
    opacity: 0.3;
    animation: tarotrotate 1s ease-in-out infinite;
  }

  @keyframes tarotrotate {
    0% {
      transform:rotateY(0deg) ;
    }
    100% {
      transform: rotateY(360deg);
    }
  }
</style>
