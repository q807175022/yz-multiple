<template>
  <transition name="fade">
    <div
      v-show="visible"
      class="toast-box"
      :style="{backgroundColor:bgColor,color: color}"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Toast',
    data () {
      return {
        message:'',
        bgColor:'rgba(0,0,0,0.7)',
        color:'#fff',
        duration:2000,
        visible:false
      }
    },
    mounted(){
      this.visible=true
      setTimeout(() => {
        this.visible=false
        setTimeout(()=>{
          if(this.$el.parentNode){
            this.$el.parentNode.removeChild(this.$el);
          }
        },300)
      }, this.duration);
    }
  }
</script>

<style scoped>
  .toast-box{
    text-align: center;
    padding: 0.2rem 0.4rem;
    min-width: 4rem;
    max-width:5.5rem;
    width: 100%;
    position: fixed;
    z-index: 1001;
    top: 45%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 0.32rem;
    border-radius: 0.1rem;
    letter-spacing: 0.02rem;
    box-shadow: 0 0 0.1rem rgba(0,0,0,0.5);
  }
</style>
