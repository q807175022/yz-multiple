<template>
  <section class="result">
    <!--内容插图-->
    <img src="../assets/images/index_1.png">
    <div
      v-if="detail.name"
      class="measure"
    >
      <span class="flex-1"><span>姓名:</span> {{ detail.name }}</span>
      <span class="flex-2"><span>性别:</span> {{ detail.sex==1?'男':'女' }}</span>
      <span class="flex-3"><span>出生日期:</span>{{ detail.birthday }}</span>
      <div class="flex-4">
        <b style="font-size: 0.34rem">总格</b><p>{{ detail.data.wuge_atr[4].wuge }}</p>
      </div>
      <div class="flex-5">
        <b style="font-size: 0.34rem">外格</b><p>{{ detail.data.wuge_atr[3].wuge }}</p>
      </div>
      <ul class="user-name">
        <li v-for="i in detail.name">
          {{ i }}
        </li>
      </ul>
      <div class="flex-7">
        <b style="font-size: 0.34rem">地格{{ detail.data.wuge_atr[2].wuge }}</b>
        <span class="wuxing">
          <span
            class="resspan"
            :class="['wuxing'+wuxing.indexOf(detail.data.wuge_atr[2].wuxin)]"
          >{{ detail.data.wuge_atr[2].wuxin }}</span>
        </span>
        <b style="font-size: 0.34rem">人格{{ detail.data.wuge_atr[1].wuge }}</b>
        <div class="wuxing">
          <span
            class="resspan"
            :class="['wuxing'+wuxing.indexOf(detail.data.wuge_atr[1].wuxin)]"
          >{{ detail.data.wuge_atr[1].wuxin }}</span>
        </div>
        <b style="font-size: 0.34rem">天格{{ detail.data.wuge_atr[0].wuge }}</b>
        <div class="wuxing">
          <span
            class="resspan"
            :class="['wuxing'+wuxing.indexOf(detail.data.wuge_atr[0].wuxin)]"
          >{{ detail.data.wuge_atr[0].wuxin }}</span>
        </div>
      </div>
      <span class="flex-8"><span>日期:</span>{{ detail.birthday }}</span>
      <span class="flex-9"><span>性别:</span>{{ detail.sex==1?'男':'女' }}</span>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>命格综述</p>
        <span class="textsp">{{ detail.data.description }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>事业分析</p>
        <span class="textsp">{{ detail.data.career }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>情感分析</p>
        <span class="textsp">{{ detail.data.feeling }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>人际分析</p>
        <span class="textsp">{{ detail.data.interpersonal }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>后运分析</p>
        <span class="textsp">{{ detail.data.later_life }}</span>
      </div>
    </div>
    <div class="result-luck">
      流年运势
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>2019年总体运势</p>
        <span class="textsp">{{ detail.zodiac.fortune }}</span>
        <b class="xing">吉星、凶星</b>
        <span>吉星有</span>
        <span>{{ detail.zodiac.ji_xing }}</span>
        <span>凶星有</span>
        <span>{{ detail.zodiac.fierce }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>2019年运势分布</p>
        <img :src="detail.zodiac_add.img_url">
        <div class="dashi">
          大师转运提示
        </div>
        <div class="res">
          <span>相宜五行:</span>
          <span
            class="resspan"
            style="background: #197F3D"
          >{{ detail.zodiac_add.five_nature }}</span>
        </div>
        <div class="res">
          <span>吉利数字:</span><span
            v-for="item in detail.zodiac_add.number"
            class="resnum"
          >{{ item }}</span>
        </div>
        <div class="res">
          <span>发展方向:</span><b>{{ detail.zodiac_add.direction }}</b>
        </div>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>2019年运势分布</p>
        <b class="xing">吉星、凶星</b>
        <span>{{ detail.zodiac.disease }}</span>
        <span class="textcolo">{{ detail.zodiac.smoothly }}</span>
        <img
          style="margin-top:1.2rem"
          :src="detail.zodiac_add.img_mon_url"
        >
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>农历正月运势</p>
        <b class="xing">{{ detail.mon.january_name }}</b>
        <span>{{ detail.mon.january }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>农历二月运势</p>
        <b class="xing">{{ detail.mon.february_name }}</b>
        <span>{{ detail.mon.february }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>农历三月运势</p>
        <b class="xing">{{ detail.mon.march_name }}</b>
        <span>{{ detail.mon.march }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>农历四月运势</p>
        <b class="xing">{{ detail.mon.april_name }}</b>
        <span>{{ detail.mon.april }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>农历五月运势</p>
        <b class="xing">{{ detail.mon.may_name }}</b>
        <span>{{ detail.mon.may }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>农历六月运势</p>
        <b class="xing">{{ detail.mon.june_name }}</b>
        <span>{{ detail.mon.june }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>农历七月运势</p>
        <b class="xing">{{ detail.mon.july_name }}</b>
        <span>{{ detail.mon.july }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>农历八月运势</p>
        <b class="xing">{{ detail.mon.august_name }}</b>
        <span>{{ detail.mon.august }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>农历九月运势</p>
        <b class="xing">{{ detail.mon.september_name }}</b>
        <span>{{ detail.mon.september }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>农历十月运势</p>
        <b class="xing">{{ detail.mon.october_name }}</b>
        <span>{{ detail.mon.october }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>农历十一月运势</p>
        <b class="xing">{{ detail.mon.november_name }}</b>
        <span>{{ detail.mon.november }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>农历十二月运势</p>
        <b class="xing">{{ detail.mon.december_name }}</b>
        <span>{{ detail.mon.december }}</span>
      </div>
    </div>

    <div class="result-luck">
      转运建议
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>事业转运建议</p>
        <img :src="detail.open_luck.img_url">
        <span>{{ detail.open_luck.open_lucky }}</span>
      </div>
    </div>
    <div
      v-if="detail.name"
      class="box-1"
    >
      <img
        class="spot1"
        src="../assets/images/spot.png"
      >
      <img
        class="spot2"
        src="../assets/images/spot.png"
      >
      <img
        class="spot3"
        src="../assets/images/spot.png"
      >
      <img
        class="spot4"
        src="../assets/images/spot.png"
      >
      <div class="text">
        <p>情感转运建议</p>
        <img :src="detail.marry.img_url">
        <span class="textcolo kong">你的另一半会是什么人</span>
        <span>上图说明了你们增进感情的时机，彼此相处的舒适度，TA的财富、事业、工作以及TA的真心程度。</span>
        <span class="textcolo kong">增进姻缘提示</span>
        <div class="res">
          <span>相宜五行:</span><span
            v-for="item in detail.marry.five_nature"
            class="resspan"
            style="background: #197F3D"
          >{{ item }}</span>
        </div>
        <div class="res">
          <span>吉利数字:</span><span
            v-for="item in detail.marry.number"
            class="resnum"
          >{{ item }}</span>
        </div>
        <span class="textcolo kong">你的姻缘走势</span>
        <img :src="detail.marry.radar_img">
      </div>
    </div>
    <yz-loading :visible="loading" />
  </section>
</template>

<script>
  import {Dialog} from 'vant'
  import {redirect} from "../../common/common"
  import {getResultData} from '../assets/http'
  import yzLoading from "../../common/components/loading"
  import admireConsult from "../../common/components/admire-consult"

  export default {
    name: 'Result',
    components: { yzLoading, admireConsult},
    data () {
      return {
        service: false,
        loading: false,
        detail: {},
        wuxing:['金','木','水','火','土'],
        currentdate:'',
        indexUrl:'',
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      zwGameId() {
        return localStorage.getItem('zwGameId') || this.$route.query.zwGameId
      }
    },
    created() {
      this.getData();
      this.getdeta();
      this.$nextTick(() => {
        this.recordUv(8)
      })
    },
    methods: {
      //返回当前时间
      getdeta(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        this.currentdate = currentdate;
        return ;
      },
      // 文字换行
      lineFeed(val){
        if(val){
          return val.split(/[\r|\n]+/g)
        }
        return []
      },
      redirect(src){redirect(src)},
      getData() {
        this.loading = true
        getResultData({user_id: this.id}).then(res => {
          if (res.code == 200) {
            this.detail = res.data;
            this.loading = false
          } else {
            localStorage.setItem('recoverData', JSON.stringify(res.data))
            Dialog.alert({message: res.msg || '请求错误:' + res.code}).then(() => {
              this.$router.replace({name: 'recover', query: {user_id: this.id}})
              // window.location.href=res.data.index_url
            })
          }
          if (res.data.index_url) {
            this.indexUrl = res.data.index_url;
          }
        }).catch(e => {
          console.log(e);
          Dialog.alert({message: '服务器异常,请稍候重试'})
        })
      }

    }
  }
</script>

<style scoped>
  .result{
    width: 100%;
  }

  .measure{
    width: 6.92rem;
    height: 9.0rem;
    background: url("../assets/images/result-sure.png") no-repeat;
    background-size: 100%;
    padding: 1.7rem 0.5rem 0.6rem;
    overflow: hidden;
    margin:0.3rem auto 0.5rem;
    position: relative;
    font-weight: bold;
  }

  .wuxing{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .wuxing0{
    background: #FFC600;
  }

  .wuxing1{
    background: #00D674;
  }

  .wuxing2{
    background: #0088D6;
  }

  .wuxing3{
    background: #CF2908;
  }

  .wuxing4{
    background: #D68300;
  }

  span{
    letter-spacing:0.03rem;
  }

  .flex-1{
    position: absolute;
    height: 0.59rem;
    line-height: 0.59rem;
    top: 1.0rem;
    left: 0.8rem;
    font-size: 0.34rem;
    color: #333333;
    background: #FFD89B;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }

  .flex-2{
    position: absolute;
    height: 0.59rem;
    line-height: 0.59rem;
    top: 1.0rem;
    right: 0.8rem;
    font-size: 0.34rem;
    color: #333333;
    background: #FFD89B;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }

  .flex-4{
    position: absolute;
    top: 3.7rem;
    left: 0.64rem;
    width: 1.29rem;
    height: 1.29rem;
    text-align: center;
    font-size: 0.32rem;
    color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .flex-3{
    position: absolute;
    height: 0.59rem;
    line-height: 0.59rem;
    top: 1.75rem;
    left: 0.8rem;
    font-size: 0.34rem;
    color: #333333;
    background: #FFD89B;
    padding-left: 0.3rem;
    padding-right: 1.15rem;
  }

  .flex-5{
    position: absolute;
    width: 1.29rem;
    height: 1.29rem;
    top: 5.4rem;
    left: 0.64rem;
    text-align: center;
    font-size: 0.34rem;
    color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .user-name{
    width:0.95rem;
    height:3.6rem;
    position: absolute;
    top:3.4rem;
    left: 3rem;
    font-size: 0.48rem;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
  }

  .flex-7{
    position: absolute;
    top: 3.7rem;
    right: 0.7rem;
    font-size: 0.34rem;
    color: #333333;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .flex-8{
    position: absolute;
    height: 0.59rem;
    line-height: 0.59rem;
    top: 7.55rem;
    left: 0.8rem;
    font-size: 0.34rem;
    color: #333333;
  }

  .flex-9{
    margin-top: 0.1rem;
    position: absolute;
    height: 0.59rem;
    line-height: 0.59rem;
    top: 8.05rem;
    left: 0.8rem;
    font-size: 0.34rem;
    color: #333333;
  }

  .box-1{
    overflow: hidden;
    width: 6.90rem;
    margin:0.3rem auto;
    background-color: #FFF7EF;
    position: relative;
  }

  .spot1{
     width: 0.38rem;
     height: 0.38rem;
     position: absolute;
     top: 0;
     left: 0;
   }

  .spot2{
    width: 0.38rem;
    height: 0.38rem;
    position: absolute;
    top: 0;
    right: 0;
    transform: rotateY(180deg);
  }

  .spot3{
    width: 0.38rem;
    height: 0.38rem;
    position: absolute;
    bottom:0;
    left: 0;
    transform: rotateX(180deg);
  }

  .spot4{
    width: 0.38rem;
    height: 0.38rem;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: rotateX(180deg) rotateY(180deg);
  }

  .text{
    padding: 0.26rem 0.51rem;
  }

  .text>p{
    text-align: center;
    font-size: 0.36rem;
    color: #840000;
    font-weight: bold;
  }

  .text .xing{
    font-size: 0.32rem;
    color: #840000;
  }

  .text .kong{
    margin-top:0.51rem;
    font-weight: bold;
  }
  .text>span{
    display: block;
    margin-top: 0.26rem;
    font-size: 0.32rem;
    color: #333333;
  }

  .text .textsp{
    text-indent: 2em;
  }

  .text .textcolo{
    height: 0.31rem;
    color: #D68300;
  }

  .text>img{
    margin: 0.8rem auto;
  }

  .text .dashi{
    width:2.07rem;
    border:0.1rem solid #E32F44;
    border-radius: 0.25rem;
    background: #E32F44;
    font-size: 0.29rem;
    color: #FFFFFF;
    text-align: center;
  }

  .text .res{
    font-size: 0.32rem;
    font-weight:bold;
    margin-top: 0.3rem;
    color: #333333;
    display: flex;
    flex-direction: row;
  }

  .resspan{
    width: 0.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    margin-left: 0.13rem;
    border-radius: 0.5rem;
    color: #ffffff;
    text-align: center;
  }

  .resnum{
    width: 0.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    margin-left: 0.13rem;
    border-radius: 0.5rem;
    color: #ffffff;
    text-align: center;
    background: #D68300;
  }

  .result-luck{
    width: 6.01rem;
    height: 0.65rem;
    background: url("../assets/images/title.png") no-repeat;
    background-size: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: 0.36rem;
    color: #FFFF9A;
  }


</style>
