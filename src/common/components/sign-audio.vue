<template>
  <div class="audio-container">
    <!-- 播放器资源 -->
    <audio
      v-show="false"
      ref="audio"
      preload
      @ended="handleAudioPlayEnded"
      @timeupdate="handleAudioTimeUpdated"
    >
      <source
        :src="src"
        type="audio/mp3"
      >
    </audio>

    <div
      ref="runfatbar"
      class="audio-content"
      @click="playMusic"
    >
      <div class="audio-time">
        <span class="current-time">{{ currentTime|audioFormat }}</span>
        <span class="duration-time">{{ durationTime|audioFormat }}</span>
      </div>
      <div
        ref="runbar"
        class="progress-bar"
        :style="{width:indicatorPosition,background:theme}"
      >
        <span
          ref="tag"
          class="tag"
          @mousedown.prevent="barDown"
          @touchstart.prevent="barDown"
        >
          <i
            class="tag_inner"
            :style="{borderColor:theme}"
          />
        </span>
      </div>
    </div>
    <div class="btn-box">
      <div
        class="audio-play"
        :style="{background:theme}"
        @click="onPlay"
      >
        <span>{{ btnText }}</span>
        <img
          v-if="!isPlay"
          src="../images/icon-play.svg"
          alt="播放"
        >
        <img
          v-else-if="isPlay && loading"
          class="loadind-icon"
          src="../images/icon-loading.svg"
          alt="加载"
        >
        <img
          v-else
          src="../images/icon-pause.svg"
          alt="暂停"
        >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SignAudio",
    filters: {
      audioFormat(interval) {
        interval = interval | 0
        var minute = (parseInt(interval / 60))
        var second = (interval % 60)
        return `${minute<10?'0'+minute:minute}:${second<10?'0'+second:second}`
      }
    },
    props: {
      src: {
        type:String,
        default:''
      },
      theme: {
        type: String,
        default: '#D12110'
      },
      btnText: {
        type: String,
        default: '点击播放老师解签结果'
      }
    },
    data() {
      return {
        isPlay: false,
        currentTime: '00:00', // 已播放时间
        durationTime: '00:00', // 总播放时间,
        indicatorPosition: '0%',
        move: {
          status: false, // 是否可拖动
          startX: 0, // 记录最开始点击的X坐标
          left: 0 // 记录当前已经移动的距离
        },
        isLoading: false,
        loading: true,
        LoadingSchedule: 0.1
      }
    },
    watch: {
      "isPlay"(newVal) {
        if (newVal) this.$refs.audio.play()
        else this.$refs.audio.pause()
      },
      src(newVal) {
        if (this.$refs.audio && this.src.indexOf('.mp3') !== -1) {
          this.handleRouterChange()
        }
      }
    },
    mounted() {
      if (this.$refs.audio && this.src.indexOf('.mp3') !== -1) {
        this.handleRouterChange()
      }
    },
    methods: {
      // 播放/暂停
      onPlay() {
        if (this.src.indexOf('.mp3') !== -1) {
          if (this.isPlay) {
            this.isPlay = false
          } else {
            this.isPlay = true
          }
        }
      },
      // 播放结束
      handleAudioPlayEnded() {
        this.isPlay = false // 样式
        this.LoadingSchedule = 0.1
      },
      // 播放时间格式化
      handleAudioTimeUpdated(e) {
        const {currentTime, duration} = e.target
        this.initialAudio(currentTime, duration)
      },
      //计算播放进度条进度
      initialAudio(currentTime, duration) {
        this.currentTime = currentTime
        this.durationTime = duration
        this.indicatorPosition = `${(currentTime / duration) * 100}%`
        let listenLoad = (currentTime / duration) * 100
        if (listenLoad > this.LoadingSchedule){
          this.loading = false;
        }
      },
      // 路由变化,重置页面
      handleRouterChange(){
        const audio = this.$refs.audio
        this.loading = true;
        this.LoadingSchedule = 0.1
        this.$nextTick(() => {
          if (this.src.indexOf('.mp3') === -1) {
            this.durationTime =0
            this.indicatorPosition = `${0}%`
            return false
          }
          this.bindEvents();
          audio.load();
          audio.oncanplay = () => {
            this.durationTime = audio.duration
            this.initialAudio(audio.currentTime, audio.duration)
          }
        })
      },
      // 拖拽
      // 添加绑定事件
      bindEvents() {
        const tag = this.$refs.tag
        tag.addEventListener('mousemove', this.barMove)
        tag.addEventListener('mouseup', this.barUp)

        tag.addEventListener('touchmove', this.barMove)
        tag.addEventListener('touchend', this.barUp)
      },
      // 移除绑定事件
      unbindEvents() {
        const tag = this.$refs.tag
        tag.addEventListener('mousemove', this.barMove)
        tag.addEventListener('mouseup', this.barUp)

        tag.removeEventListener('touchmove', this.barMove)
        tag.removeEventListener('touchend', this.barUp)
      },
      // 点击事件
      playMusic(e) {
        let rect = this.$refs.runfatbar.getBoundingClientRect()
        let offsetWidth = Math.min(
          this.$refs.runfatbar.clientWidth,
          Math.max(0, e.clientX - rect.left)
        )
        if (this.src.indexOf('.mp3') !== -1) {
          this.isPlay = true
          this.moveSilde(offsetWidth)
          this.commitPercent()
        }
      },
      // 鼠标按下事件
      barDown(e) {
        this.move.status = true;
        this.move.startX = e.clientX || e.touches[0].pageX;
        this.move.left = this.$refs.runbar.clientWidth;
      },
      // 鼠标/触摸移动事件
      barMove(e) {
        if (!this.move.status) {
          return false
        }
        let endX = e.clientX || e.targetTouches[0].pageX // 获得触摸拖动的坐标
        let dist = endX - this.move.startX // 触摸拖动的距离
        let offsetWidth = Math.min(
          this.$refs.runfatbar.clientWidth,
          Math.max(0, this.move.left + dist)
        )
        this.moveSilde(offsetWidth)
        this.commitPercent()
        this.isPlay = true
      },
      // 鼠标/触摸释放事件
      barUp(e) {
        let indicatorPosition = (this.indicatorPosition.replace("%", "")) / 100
        this.LoadingSchedule = indicatorPosition + 0.1

        e.stopPropagation()
        this.move.status = false
        this.commitPercent()
        this.isPlay = true // 根据播放时间开始播放
      },
      // 进度
      moveSilde(offsetWidth) {
        if (this.$refs.runbar) {
          this.$refs.runbar.style.width = `${offsetWidth}px`
        }
      },
      // 修改播放时间
      commitPercent(){
        const audio = this.$refs.audio // 音频所在对象
        let lineWidth = this.$refs.runfatbar.clientWidth// 底部进度条总宽
        let percent = this.$refs.runbar.clientWidth / lineWidth// 计算进度条所在比例宽度
        let changeTime = audio.duration * percent
        audio.currentTime = changeTime
      }
    }
  }
</script>

<style scoped>
  .audio-container {
    width: 100%;
    padding: 0 .2rem;
    position: relative;
    overflow: hidden;
  }

  /*播放*/
  .audio-content {
    height: 2px;
    background: rgba(201, 201, 201, 1);
    margin: .5rem auto 0.2rem;
    width: 100%;
    position: relative;
  }

  .progress-bar {
    background: rgba(209, 33, 16, 1);
    border-radius:1px;
    height:2px;
    position: relative;
  }

  .tag {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tag_inner {
    width: 0.2rem;
    height: 0.2rem;
    border: 0.04rem solid rgba(209, 33, 16, 1);
    border-radius: 50%;
    display: block;
    background-color: rgba(255, 255, 255, 1);;
  }

  .audio-time {
    display: flex;
    justify-content: space-between;
    font-size: .26rem;
    font-weight: 400;
    color: rgba(107, 107, 107, 1);
    position: absolute;
    width: 100%;
    top: -0.5rem;
    left: 0;
  }

  .btn-box {
    display: flex;

  }

  .audio-play{
    padding: 0 0.2rem 0 0.3rem;
    height: .72rem;
    border-radius: .38rem;
    font-size: .28rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.2rem auto 0;
    white-space: nowrap;
  }

  .audio-play img {
    width: 0.32rem;
    height: 0.32rem;
    margin-left: .15rem;
  }
  .loadind-icon{
    animation: rotate360 1200ms linear infinite;
  }
  @keyframes rotate360 {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
</style>
