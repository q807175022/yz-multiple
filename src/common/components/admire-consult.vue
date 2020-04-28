<template>
  <div style="height: 1.1rem;">
    <div
      class="admire-consult"
      :class="{border:type==2}"
    >
      <!--赞赏-->
      <slot name="admire">
        <div
          class="admire"
          :class="{type1:type==1}"
          @click="toAdmire"
        >
          <img src="../images/admire1.png">
          <span>赞赏</span>
        </div>
      </slot>
      <!--咨询大师-->
      <div
        v-if="type==2"
        class="consult"
        @click="toConsult"
      >
        <img
          class="admire2"
          src="../images/admire2.png"
        >
        <div>
          <div>咨询大师</div>
          <div class="small">
            一对一亲测
          </div>
        </div>
        <img
          class="admire3"
          src="../images/admire3.png"
        >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AdmireConsult',
    props:{
      type:{
        type:Number,
        default:1
      },
      master:{
        /*
        * 1  罗镇
        * 2  言泽
        * 3  凯伦
        * 4  恬琳
        * 5  罗悦
        * */
        type:Number,
        default:1
      }
    },
    data(){
      return{

      }
    },
    methods:{
      toAdmire(){
        let path_id=localStorage.getItem('path_id');
        this.redirect(`${window.location.origin}/top-apply/MoneyReward-${path_id}-${this.master}`)
      },
      toConsult(){
        this.redirect('https://mp.weixin.qq.com/s/pdL2yBPHUPAobNvdR7a9Tw')
      },
      redirect(url){
        let el = document.createElement("a");
        document.body.appendChild(el);
        el.href = url;
        el.click();
        document.body.removeChild(el);
      }
    }
  }
</script>

<style scoped>
.admire-consult{
  height: 1.1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  left:0;
  box-shadow:0 -0.03rem 0.06rem 0 rgba(6,6,6,0.1);
  background-color: #fff;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.admire-consult.border:after{
  content: "";
  display: block;
  height: 0.86rem;
  width: 1px;
  background-color: #383838;
  position: absolute;
  left: 50%;
  top:0.12rem;
  transform: scaleX(0.5);
}
  .admire,.consult{
    flex: 0 0 3.5rem;
    height: 0.97rem;
    font-size:0.4rem;
    font-weight:400;
    color: rgb(56, 56, 56);
  }
  .type1{
    flex: 0 0 7.2rem;
  }
  .admire{
    background:linear-gradient(0deg,rgba(255,114,0,1) 0%,rgba(255,197,128,1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.25rem;
  }
  .admire img{
    width: 0.41rem;
    height: 0.38rem;
    margin-right: 0.15rem;
  }
  .consult{
    background:linear-gradient(0deg,rgba(255,160,37,1) 0%,rgba(255,203,45,1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .consult .admire2{
    width: 0.43rem;
    height: 0.43rem;
    margin-right: 0.15rem;
  }
.consult .admire3{
  width: 0.47rem;
  height: 0.52rem;
  position: absolute;
  left: 0.08rem;
  top: -0.05rem;
}
  .consult .small{
    color: #fff!important;
    font-size: 0.2rem!important;
    text-align: center;
  }
</style>
