<template>
  <div
    v-show="visible"
    class="loading-mask"
  >
    <div>
      <img
        src="../images/loading_book.gif"
        alt="加载中..."
      >
      <p>{{ message }}</p>
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
      },
      message: {
        type: String,
        default:'请稍候...'
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
  .loading-mask>div{
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
  }
  .loading-mask p{
    text-align: center;
    letter-spacing: 0.03rem;
    font-size: 0.32rem;
    color: #333;
    text-indent:1em;
    white-space: nowrap;
    margin-top:-0.3rem;
  }
  .loading-mask img{
    width:3rem;
  }
</style>
