<template>
  <div
    class="video-box"
    :style="{width:width,height:height}"
  >
    <svg
      v-show="status=='paused'"
      t="1567241242962"
      class="play-btn icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1962"
      width="32"
      height="32"
@click="videoPlay"
    ><path
      d="M837.622 420.834L279.126 55.938c-86.8-50.172-157.903-9.081-157.903 91.184v729.714c0 100.339 71.102 141.355 157.903 91.262L837.622 603.28c86.875-50.247 86.875-132.274 0-182.446z"
      fill="#ffffff"
      p-id="1963"
      data-spm-anchor-id="a313x.7781069.0.i7"
      class="selected"
    /></svg>
    <video
      id="lz-video"
      ref="lzvideo"
      :style="{width:width,height:height}"
      webkit-playsinline="true"
      playsinline="true"
      :src="src"
      :poster="poster"
      @click="videoPlay"
    />
  </div>
</template>

<script>
  export default {
    name: 'LzVideo',
    props:{
      width:{
        type:String,
        default:'6.11rem'
      },
      height:{
        type:String,
        default:'3.44rem'
      },
      poster:{
        type:String,
        default:'https://apply.yzketang.com/apply/img/life/cover.png'
      },
      src:{
        type:String,
        default:'https://yizhikt.oss-cn-hongkong.aliyuncs.com/H5/mp4/new_video.mp4'
      }
    },
    data(){
      return{
        status:'paused'
      }
    },
    mounted(){
      const that=this;
      let audio = document.getElementById('lz-video');
      audio.addEventListener('playing', function () {
        that.status = 'playing';
      });
      audio.addEventListener('pause', function () {
        that.status = 'paused';
      });
    },
    methods:{
      videoPlay(){
        const that=this;
        let audio = document.getElementById('lz-video');
        if( that.status == 'paused'){
          audio.play()
        }else {
          audio.pause()
        }
      }
    }
  }
</script>

<style scoped>
  .video-box{
    position: relative;
    margin: 0 auto;
  }
  .play-btn{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 1;
    width: 0.8rem;
    height: 0.8rem;
  }
</style>
