<template>
  <div
    v-show="visible"
    class="loading-mask"
  >
    <div class="card">
      <span class="heartbeat-loader" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    props:{
      visible:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .loading-mask{
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
  }
  .card{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .heartbeat-loader:not(:required) {
    -moz-animation: heartbeat-loader 1300ms ease 0s infinite normal;
    -webkit-animation: heartbeat-loader 1300ms ease 0s infinite normal;
    animation: heartbeat-loader 1300ms ease 0s infinite normal;
    display: inline-block;
    position: relative;
    overflow: hidden;
    width:2.1rem;
    height:2.1rem;
    -moz-transform: rotate(45deg) scale(1);
    -ms-transform: rotate(45deg) scale(1);
    -webkit-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
    -moz-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
  .heartbeat-loader:not(:required):after, .heartbeat-loader:not(:required):before {
    position: absolute;
    content: "";
    background: #e87;
  }
  .heartbeat-loader:not(:required):before {
    -moz-border-radius-topleft: 0.7rem;
    -webkit-border-top-left-radius: 0.7rem;
    border-top-left-radius:0.7rem;
    -moz-border-radius-bottomleft: 0.7rem;
    -webkit-border-bottom-left-radius:0.7rem;
    border-bottom-left-radius: 0.7rem;
    top: 0.7rem;
    left: 0;
    width:2.1rem;
    height: 1.4rem;
  }
  .heartbeat-loader:not(:required):after {
    -moz-border-radius-topleft: 0.7rem;
    -webkit-border-top-left-radius: 0.7rem;
    border-top-left-radius:0.7rem;
    -moz-border-radius-topright: 0.7rem;
    -webkit-border-top-right-radius: 0.7rem;
    border-top-right-radius: 0.7rem;
    top: 0;
    left: 0.7rem;
    width: 1.4rem;
    height: 0.7rem;
  }
  @keyframes heartbeat-loader {
    0% {
      transform: rotate(45deg) scale(1);
    }
    14% {
      transform: rotate(45deg) scale(1.3);
    }
    28% {
      transform: rotate(45deg) scale(1);
    }
    42% {
      transform: rotate(45deg) scale(1.3);
    }
    70% {
      transform: rotate(45deg) scale(1);
    }
  }
</style>
