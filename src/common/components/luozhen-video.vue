<template>
  <div
    class="video-box"
    :style="{top:top}"
  >
    <svg
      v-show="audioStatus=='paused'"
      t="1567241242962"
      class="play-btn icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1962"
      width="32"
      @click="videoPlay"
      height="32"
    >
      <path
        d="M837.622 420.834L279.126 55.938c-86.8-50.172-157.903-9.081-157.903 91.184v729.714c0 100.339 71.102 141.355 157.903 91.262L837.622 603.28c86.875-50.247 86.875-132.274 0-182.446z"
        fill="#ffffff"
        p-id="1963"
        data-spm-anchor-id="a313x.7781069.0.i7"
        class="selected"
      />
    </svg>
    <!-- 封面 https://apply.yzketang.com/apply/img/life/cover.png -->
    <video
      id="lz-video"
      ref="lzvideo"
      webkit-playsinline="true"
      playsinline="true"
      src="https://yizhikt.oss-cn-hongkong.aliyuncs.com/H5/mp4/new_video.mp4"
      poster="https://apply.yzketang.com/apply/img/life/cover.png"
      @click="videoPlay"
    />
  </div>
</template>

<script>
  export default {
    name: "LuozhenVideo",
    props: {
      top: {
        type: String,
        default: "1.6rem"
      }
    },
    data(){
      return{
        audioStatus: 'paused',
      }
    },
    mounted() {
      this.listenAudio()
    },
    methods:{
      listenAudio () {
        const that = this;
        let audio = document.getElementById('lz-video');
        audio.addEventListener('playing', function () {
          that.audioStatus = 'playing';
        });
        audio.addEventListener('pause', function () {
          that.audioStatus = 'paused';
        });
      },
      videoPlay () {
        const that = this;
        let audio = document.getElementById('lz-video');
        if (that.audioStatus == 'paused') {
          audio.play()
        } else {
          audio.pause()
        }
      },
    }
  }
</script>

<style scoped>
  .video-box {
    padding: 0.15rem 0;
    border-radius: 0.15rem;
    background-color: #000;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  #lz-video {
    width: 6.11rem;
    height: 3.44rem;
    display: block;
  }

  .play-btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 0.8rem;
    height: 0.8rem;
  }
</style>
