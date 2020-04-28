<template>
  <section class="container">
    <!-- 抽牌的牌堆 -->
    <transition name="slide-top">
      <ol
        v-show="drawing"
        class="card-list"
        @click="pitchCard($event)"
      >
        <li
          v-for="(card,index) in 15"
          :class="['card','card'+index,{'shuffle':shuffle>=card}]"
          :style="{
            transform:'rotate('+ rotateList[index] +'deg)',
            left:leftList[index]+'rem'
          }"
        />
      </ol>
    </transition>
    <!-- 抽牌提示语 -->
    <transition name="fade">
      <div
        v-show="drawing"
        class="card-tips"
      >
        请根据你的第一感觉抽取<span style="color:#FCCB5A;">5张牌</span><br>让塔罗之灵感受你的能量
      </div>
    </transition>
    <!-- 实际选中的牌 -->
    <div
      class="card-main"
      :class="{top:!drawing}"
    >
      <img
        class="card-main-bg"
        src="../assets/images/result-total.png"
      >
      <div
        v-for="(item,index) in cards"
        class="result"
        :class="{show:pitchCurrent>=1+index,['result'+(1+index)]:true}"
      >
        <img
          :src="item.img"
          :alt="item.name"
        >
        <span>{{ item.name }}</span>
        <span>({{ item.direction == 1?'正位':'逆位' }})</span>
      </div>
    </div>
    <!-- 领取报告按钮 -->
    <transition name="fade">
      <div
        v-show="!drawing"
        class="submit-box"
      >
        <p>
          塔罗牌阵已准备就绪<br>
          让我们来看看<span style="color:#ECDE72;">TA</span>最喜欢的人是你吗？
        </p>
        <button @click="env?orderConfirm(env):(orderVisible= true)">
          <img
            src="../assets/images/draw-btn.png"
            alt="开始解牌"
          >
        </button>
      </div>
    </transition>

    <!--站外支付__支付确认-->
    <cashier-desk
      id="cashier"
      ref="cashier"
      :visible.sync="orderVisible"
      title="你和她的缘分有多深—TA最爱的人是你吗？"
      @success="payClick"
    />
    <yz-loading :visible="loading" />
  </section>
</template>

<script>

  import {Dialog} from "vant"
  import {postPayUrl,getCards} from "../assets/http"
  import cashierDesk from "../../common/components/cashierDesk"
  import yzLoading from "../components/loading"
  export default {
    name: "DrawCard",
    components:{cashierDesk,yzLoading},
    data() {
      return {
        loading:false,
        drawing:true,
        pitching:false,
        shuffle: 0,
        pitchCurrent:0,
        orderVisible:false,
        cards:[]
      }
    },
    computed: {
      rotateList() {
        let list = [];
        /* 15 为卡牌数量 */
        for (let i = 0; i < 15; i++) {
          list.push(-35 + i * 5)
        }
        return list
      },
      leftList() {
        let list = [];
        /* 15 为卡牌数量 */
        for (let i = 0; i < 15; i++) {
          list.push(6.47 - 0.47 * i)
        }
        return list
      },
      topList() {
        let list = [];
        /* 13 为卡牌数量 */
        for (let i = 0; i < 13; i++) {

          list.push(0.6 + (-0.08 * Math.abs(i - 6)))
        }
        return list
      },
      env() {
        return this.$refs['cashier'].env
      }
    },
    mounted() {
      this.shuffleCard()
      this.getCards()
    },
    methods: {
      getCards(){
        getCards({}).then(res=>{
          if(res.code == 200){
            this.cards = res.data
          }else {
            Dialog.alert(res.msg || "获取数据失败，请刷新重试")
          }
        }).catch(e=>{
          console.log(e);
          Dialog.alert("获取数据失败，请刷新重试！")
        })
      },
      shuffleCard(){
        let timer = setInterval(()=>{
          if(this.shuffle<15){
            this.shuffle+=1
          }else {
            clearInterval(timer)
          }
        },40)
      },
      pitchCard(e){
        let {target} = e;
        if (this.pitching || this.pitchCurrent>=5 || target.className.indexOf('result')!=-1){ return false}

        this.pitching = true
        target.classList.add('result'+(this.pitchCurrent+1),'animate')

        setTimeout(()=>{
          this.pitchCurrent+=1
          this.pitching = false
          if( this.pitchCurrent == 5){
            setTimeout(()=>{
              this.drawing = false

            },300)
          }
        },500)
      },
      orderConfirm(){
        let type = this.env
        if (type == 0) {
          this.orderVisible=true
        } else {
          this.payClick(type == 2 ? 2 : 1)
        }
        if(localStorage.getItem('zwUid')){
          zwDivine.recordUserInfo({
            name:"缘分塔罗",
            gender:"",
            birthday:"",
            extra: JSON.stringify(this.cards.map(v=>v.id))
          })
        }
      },
      payClick(type){
        this.loading = true
        let zwUid = localStorage.getItem("zwUid");
        let path_id = localStorage.getItem('path_id');
        // 遍历选中结果
        let params = {
          card_ids:JSON.stringify(this.cards.map(v=>v.id)),
          path_id: path_id ? path_id : 1,
          callback: encodeURIComponent(`${window.location.origin}${this.$router.options.base}result`),
        };
        if(type === 2){
          params.is_alipay = 1
          return postPayUrl(params,type)
        }
        if (zwUid) {
          params.channel = 'zhiwu'
          params.zwGameId = localStorage.getItem("zwGameId")
        }
        console.log(params)
        postPayUrl(params).then(res => {
          if (res.code == 200) {
            this.recordUv(7)
            if (zwUid) {
              zwDivine.payIndex(res.data)
            } else {
              window.location.href = res.data.url
            }
          } else {
            Dialog.alert({
              message: res.msg || '请求错误:' + res.code
            })
            this.loading = false
          }
        }).catch(e => {
          Dialog.alert({
            message: '服务器异常,请稍候重试'
          })
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    overflow: hidden;
    min-height: 100vh;
    background: url("../assets/images/draw-card-bg2.jpg") no-repeat center top / cover;
    position: relative;
  }
  #cashier >>> h4 {
    font-size: .28rem;
  }

  .card {
    position: absolute;
    left: 6rem;
    top:-.4rem;
    background: url("../assets/images/card-cover.png") no-repeat;
    background-size: contain;
    width: 1.2rem;
    height: 2.07rem;
    transform:rotate(-30deg);
    transform-origin: center center;
    opacity: 0;
  }
  .card-list{
    position: relative;
    z-index: 10;
  }
  .shuffle{
    transition: 30ms linear ;
    opacity:1;
  }
  .card.card0 {top:-.65rem;}
  .card.card1 {top:-.4rem;}
  .card.card2 {top:-.2rem;}
  .card.card3 {top:-.1rem;}
  .card.card4 {top:0;}
  .card.card5 {top:.05rem;}
  .card.card6 {top:.1rem;}

  .card.card7 {top:.15rem;}

  .card.card8 {top:.1rem;}
  .card.card9 {top:.05rem;}
  .card.card10 {top:0;}
  .card.card11 {top:-.1rem;}
  .card.card12 {top:-.2rem;}
  .card.card13 {top:-.4rem;}
  .card.card14 {top:-.65rem;}

  .card-tips{
    position: absolute;
    width: 100%;
    left: 0;
    top:2.8rem;
    color: #fff;
    text-align: center;
    font-size: .3rem;
    line-height: .5rem;
  }
  .card-tips:before{
    content:"";
    display: block;
    width: 0;height: 0;
    border-bottom:.27rem solid #8EA8FF;
    border-left:.27rem solid transparent;
    border-right:.27rem solid transparent;
    position: absolute;
    left:50%;
    top: -.3rem;
    animation:point linear 1500ms infinite alternate;
  }
  @keyframes point {
    from{
      transform: translate(-50%,0);
    }
    to{
      transform: translate(-50%,-.15rem);
    }
  }

  .card-main{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    min-height:11rem;
  }
  .card-main.top{
    transition: 200ms linear;
    transform: translateY(-2.8rem);
  }
  .card-main .result{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    width: 1.2rem;
    white-space: nowrap;
    opacity: 0;
  }
  .result span:nth-of-type(1){
    font-size: .28rem;
    color:#FFAE5E;
  }
  .result span:nth-of-type(2){
    font-size: .26rem;
    color:#ffffff;
  }
  .result.show{
    /*transition: 100ms linear;*/
    opacity: 1;
  }
  .card-main-bg{
    width: 5.6rem;
    position: absolute;
    top:5rem;
    left:.95rem;
  }
  .result1{
    position: absolute;
    transition: 500ms linear !important;
    left:3.15rem!important;
    top: 4.2rem !important;
    transform: rotate(0deg) !important;
  }
  .result2{
    position: absolute;
    transition: 500ms linear !important;
    left: .9rem !important;
    top: 5.6rem !important;
    transform: rotate(0deg) !important;
  }
  .result3{
    position: absolute;
    transition: 500ms linear !important;
    left: 5.4rem !important;
    top: 5.6rem !important;
    transform: rotate(0deg) !important;
  }
  .result4{
    position: absolute;
    transition: 500ms linear !important;
    left: 1.8rem !important;
    top: 8.6rem !important;
    transform: rotate(0deg) !important;
  }
  .result5{
    position: absolute;
    transition: 500ms linear !important;
    left: 4.5rem !important;
    top: 8.6rem !important;
    transform: rotate(0deg) !important;
  }
  .card.animate{
    animation: reversal 200ms linear 500ms forwards;
  }
  @keyframes reversal {
    0%{
      opacity:1;
      transform:rotateY(0deg);
    }
    99.99%{
      opacity:1;
      transform:rotateY(90deg);
    }
    100%{
      opacity: 0;
      transform:rotateY(90deg);
    }
  }
  .slide-top-leave-active{
    animation:slide-top 300ms linear ;
  }
  @keyframes slide-top {
    from{transform: translateY(0)}
    to{transform: translateY(-2.3rem)}
  }
  .submit-box{
    color:#ffffff;
    font-size:.32rem;
    text-align: center;
    line-height: .6rem;
    position: absolute;
    width: 100%;
    left: 0;
    top:9rem;
  }
  .submit-box button{
    display: block;
    width:6.35rem;
    margin:.3rem auto 0;
    z-index: 20;
  }
  @media all and (max-height: 160vw){
    .submit-box{
      top:8.2rem;
      line-height: 0.45rem;
    }
    .submit-box button{
      margin-top: .15rem;
    }
    .card-main.top{
      transition: 300ms linear;
      transform: translateY(-3.4rem);
    }
  }
</style>
