<template>
  <div
    class="swiper-container"
    :style="height?'height:'+height:''"
  >
    <ul ref="databox">
      <li
        v-for="(item,index) in evaluate"
        ref="data-item"
        :key="index"
        class="data-item"
      >
        <slot :row="item" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ScrollComment",
    props: {
      list: {
        type: Array,
        default: []
      },
      delay:{
        type: Number,
        default:3000
      },
      height:String
    },
    data(){
      return {
        scrollTimer:null,
        evaluate:this.list.concat(this.list.slice(0,5)),
        index:0,
        scrollheight:0
      }
    },
    mounted(){
      this.commentScroll()
    },
    destroyed(){
      clearInterval(this.scrollTimer)
    },
    methods:{
      commentScroll(){
        const that=this,length=this.evaluate.length;
        this.scrollTimer= setInterval(function () {
          if(that.index<=length-5){
            let height=that.$refs['data-item'][that.index].offsetHeight;
            if(that.index>=length-5){
              that.index=1;
              that.scrollheight=height
              that.$refs['databox'].style.transition=``
              that.$refs['databox'].style.transform=`translateY(0px)`;
              setTimeout(function(){
                that.$refs['databox'].style.transform=`translateY(-${Math.ceil(that.scrollheight)}px)`;
                that.$refs['databox'].style.transition=`1s`
              },30)
            }else{
              that.index+=1
              that.scrollheight+=height;
              that.$refs['databox'].style.transform=`translateY(-${Math.ceil(that.scrollheight)}px)`;
              that.$refs['databox'].style.transition=`1s`
            }
          }
          that.$emit('change')
        },that.delay)
      },
    }
  }
</script>

<style scoped>
  .swiper-container {
    width:100%;
    height:100%;
    overflow: hidden;
  }
</style>
