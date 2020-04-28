<template>
  <div class="word-lantern">
    <div class="lantern-box">
      <slot />本网页数据安全由阿里云提供，严格按照法律法规和用户协议对您的信息进行全方位保护，请放心使用！
    </div>
  </div>
</template>

<script>
  export default {
    name: 'IndexTips',
    props:['isDy'],
    data () {
      return {}
    },
    mounted(){
      const that=this;
      setTimeout(function () {
        if(!that.isDy){
          document.getElementsByClassName('lantern-box')[0].classList.add('run')
        }else{
          document.getElementsByClassName('lantern-box')[0].classList.add('run2')
        }

      },100)
    }
  }
</script>

<style scoped>
  .word-lantern{
    background-color: rgba(0,0,0,0.4);
    width: 100%;
    overflow: hidden;
    height: 0.5rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index:1000;
  }
  .lantern-box{
    white-space: nowrap;
    font-size: 0.28rem;
    line-height: 0.5rem;
    color: #fff;
    display: none;
  }
  .lantern-box.run{
    display: flex;
    -webkit-animation:wordrun linear 10s infinite normal;
    -o-animation:wordrun linear 10s infinite normal;
    animation:wordrun linear 10s infinite normal;
  }
  .lantern-box.run2{
    display: flex;
    -webkit-animation:wordrun2 linear 15s infinite normal;
    -o-animation:wordrun2 linear 15s infinite normal;
    animation:wordrun2 linear 15s infinite normal;
  }
  @keyframes wordrun {
    from{
      transform:translateX(7.5rem);
    }
    to{
      transform:translateX(-13rem)}
  }
  @keyframes wordrun2 {
    from{
      transform:translateX(7.5rem);
    }
    to{
      transform:translateX(-20rem)}
  }
</style>
