<template>
  <div
    v-show="visible"
    class="buymsg-box"
  >
    <div
      ref="buymsg"
      class="buymsg-item"
    >
      <img :src="require('../images/user/user'+msgArray[iIndex].id+'.png')">
      <div>用户<span>{{ msgArray[iIndex].name }}</span>在{{ msgArray[iIndex].time }}之前进行了测算</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ScrollBuymsg",
    props: {
      visible: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        lastName: ["张", "金", "李", "赵", "钱", "孙", "王", "刘", "谭", "杨", "尔", "戚", "彭", "田", "朱", "欧"],
        nameLength: ["*", "**"],
        time: ["分钟", "秒", "小时"],
        msgArray: [{id: 1}],
        iIndex: 0
      }
    },
    mounted() {
      let array = []
      for (let i = 0; i < 20; i++) {
        array.push({
          id: i + 1,
          heads: `../images/user/user${i + 1}.png`,
          name: `${this.randomArray(this.lastName)}${this.randomArray(this.nameLength)}`,
          time: `${parseInt(Math.random() * 60)}${this.randomArray(this.time)}`
        })
      }
      this.msgArray = array;
      setTimeout(() => {
        this.scrollItem()
      }, 2000)
    },
    methods: {
      /*数组中随机取一项值*/
      randomArray(array) {
        return array[parseInt(Math.random() * array.length)]
      },
      scrollItem() {
        let dom = this.$refs['buymsg'];
        if(!dom){return false}
        dom.classList.add('animation')
        setTimeout(() => {
          if (this.iIndex == this.msgArray.length - 1) {
            this.iIndex = -1
          }
          dom.classList.remove('animation')
          this.iIndex += 1
          setTimeout(() => {
            this.scrollItem()
          }, 200)
        }, 3000)
      }
    }
  }
</script>

<style scoped>
  .buymsg-box {

  }

  .buymsg-item {
    display: flex;
    align-items: center;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    font-size: 0.28rem;
    position: fixed;
    bottom: 1.8rem;
    right: 0.6rem;
    z-index: 10;
    height: 0.8rem;
    width: 5.2rem;
    border-radius: 0.4rem;
    padding-left: 0.1rem;
    opacity: 0;
    white-space: nowrap;
  }

  .buymsg-item.animation {
    animation: scroll-box 3000ms linear 0ms;
  }

  @keyframes scroll-box {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    10% {
      opacity: 1;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-2.4rem);
    }
  }

  .buymsg-item span {
    color: pink;
  }

  .buymsg-item > img {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    margin-right: 0.1rem;
  }
</style>
