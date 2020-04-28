<template>
  <section class="container">
    <div class="banner" />
    <template v-if="detail.cards">
      <div class="result-box">
        <h2 class="box-title">
          你的信息
        </h2>
        <div class="result-content">
          <h5 class="dear">
            <span style="color:#51428C;">亲爱的</span><span style="color:#E12828;">测试者:</span>
          </h5>
          <p class="p1">
            你抽到的每一张塔罗牌，都有着专属于你的神圣意义！接下来，我将透过你所选择的<span
              style="color:#D01B13;"
            >5张塔罗牌</span>，揭示TA心中所属之人是你吗...
          </p>
          <!-- 实际选中的牌 -->
          <div class="card-main">
            <img
              class="card-main-bg"
              src="../assets/images/result-total.png"
            >
            <div
              v-for="(item,index) in detail.cards"
              class="result"
              :class="{['result'+(1+index)]:true}"
            >
              <img
                :src="item.img"
                :alt="item.name"
              >
              <span>{{ item.name }}</span>
              <span>({{ item.direction == 1?'正位':'逆位' }})</span>
              <span
                v-if="index==0"
                class="top"
                style="color:#DA337F;"
              >本命姻缘</span>
              <span
                v-else-if="index==1"
                class="top"
                style="color:#FF420B;"
              >对方心意</span>
              <span
                v-else-if="index==2"
                class="top"
                style="color:#DE00FF;"
              >真心窥探</span>
              <span
                v-else-if="index==3"
                class="bottom"
                style="color:#1371F8;"
              >关系走向</span>
              <span
                v-else-if="index==4"
                class="bottom"
                style="color:#3B8D04;"
              >塔罗指引</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 内容块循环 -->
      <div
        v-for="(item,index) in detail.cards"
        class="result-box"
      >
        <h2
          v-if="index==0"
          class="box-title"
        >
          洞悉你的恋情特质
        </h2>
        <h2
          v-else-if="index==1"
          class="box-title"
        >
          揭秘TA隐藏的真心
        </h2>
        <h2
          v-else-if="index==2"
          class="box-title"
        >
          TA最爱的人真的是你吗?
        </h2>
        <h2
          v-else-if="index==3"
          class="box-title"
        >
          揭示恋情的最终走向!
        </h2>
        <h2
          v-else-if="index==4"
          class="box-title"
        >
          灵性塔罗专属指引
        </h2>

        <div class="result-content">
          <div class="sub-card-box">
            <img
              :src="require('../assets/images/result-'+(index+1)+'.png')"
              class="sub-card-box-bg"
            >
            <img
              class="tarot-card"
              :src="item.img"
            >
            <ol>
              <li>{{ item.name }}</li>
              <li>({{ item.direction == 1?'正位':'逆位' }})</li>
            </ol>
          </div>

          <h3
            v-if="index==0"
            class="sub-title"
            style="color:#DA337F;"
          >
            恋爱特质:
          </h3>
          <h3
            v-else-if="index==1"
            class="sub-title"
            style="color:#FF420B;"
          >
            对方心意：
          </h3>
          <h3
            v-else-if="index==2"
            class="sub-title"
            style="color:#DE00FF;"
          >
            真心窥探：
          </h3>
          <h3
            v-else-if="index==3"
            class="sub-title"
            style="color:#1371F8;"
          >
            关系走向：
          </h3>
          <h3
            v-else-if="index==4"
            class="sub-title"
            style="color:#3B8D04;"
          >
            塔罗指引：
          </h3>
          <p
            v-for="text in lineFeed(item.fate)"
            class="p1"
          >
            {{ text }}
          </p>
        </div>
      </div>
    </template>
    <!-- 再测一次 -->
    <a
      v-if="!zwGameId"
      class="again-btn"
      :href="indexUrl"
    >再测一次</a>
    <!--赞赏+咨询大师-->
    <admire-consult
      v-if="!zwGameId"
      ref="admire-consult"
      :master="3"
    />
    <div
      v-else
      style="height: 1.2rem;"
    />
    <yz-loading :visible="loading" />
  </section>
</template>

<script>
  import {Dialog} from 'vant'
  import {getResultData} from '../assets/http'
  import yzLoading from '../components/loading'
  import admireConsult from '../../common/components/admire-consult'

  export default {
    name: 'Result',
    components: {yzLoading, admireConsult},
    data() {
      return {
        loading: false,
        detail: {},
        indexUrl: ''
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      zwGameId() {
        return this.$route.query.zwGameId || localStorage.getItem('zwGameId')
      },
    },
    mounted() {
      this.getData()
      this.$nextTick(() => {
        this.recordUv(8)
      })
    },
    methods: {
      // 文字换行
      lineFeed(val) {
        if (val) {
          return val.split(/[\r|\n]+/g)
        }
        return []
      },
      getData() {
        this.loading = true
        getResultData({user_id: this.id}).then(res => {
          if (res.code == 200) {
            this.detail = res.data;
            this.loading = false;
          } else {
            Dialog.alert({message: res.msg || '支付失败，即将为您跳转...'}).then(() => {
              let {price, path_id} = res.data
              this.$router.replace({name: 'recover', query: {user_id: this.id, price, path_id}})
            })
          }
          if (res.data.index_url) {
            this.indexUrl = res.data.index_url;
          }
        }).catch(e => {
          console.log(e);
          Dialog.alert({message: '请求错误，点击下方确认按钮刷新重试'}).then(() => {
            window.location.reload()
          })
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: #161C77;
  }

  .banner {
    width: 100%;
    height: 5.22rem;
    background: url("../assets/images/result-banner.jpg") no-repeat;
    background-size: contain;
    margin-bottom: -.8rem;
    position: relative;
  }

  .banner:after {
    content: "";
    display: block;
    width: 100%;
    height: .6rem;
    background:linear-gradient(0deg,#231d7c 0%,transparent 100%);
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .result-box {
    position: relative;
    width: 6.9rem;
    background: #EEF4FF;
    border-radius: 0.2rem;
    margin: 0 auto 0.6rem;
    padding: 1rem .4rem .5rem;
    color: #51428C;
  }

  .box-title {
    width: 100%;
    height: 0.82rem;
    text-align: center;
    line-height: 0.6rem;
    position: absolute;
    top: 0;
    left: 0;
    font-size: .32rem;
    font-weight: 500;
    color: #FFFFFF;
    background: url("../assets/images/result-title-bg.png") no-repeat center center / 4.5rem 100%;
  }

  .dear {
    font-weight: bolder;
    font-size: 0.38rem;
    color: #D32C29;
    margin-bottom: .2rem;
  }

  .result-box .p1 {
    font-size: 0.34rem;
    font-weight: 400;
    line-height: .6rem;
    letter-spacing:3px;
    text-align: justify;
  }

  .card-main {
    width: 5.6rem;
    position: relative;
    height: 5.6rem;
    margin: 1.3rem auto 0.8rem;
  }

  .card-main .result {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    width: 1.2rem;
    white-space: nowrap;
    position: absolute;
  }

  .result span:nth-of-type(1) {
    font-size: .28rem;
    color: #444;
  }

  .result span:nth-of-type(2) {
    font-size: .26rem;
    color: #444;
  }

  .card-main-bg {
    width: 5.6rem;
    height: 5.6rem;
    position: absolute;
    top: 0;
    left: 0;
    opacity: .5;
  }

  .result1 {
    left: 2.2rem;
    top: -0.7rem;
  }

  .result2 {
    left: -.2rem;
    top: 1.2rem;
  }

  .result3 {
    right: -.2rem;
    top: 1.2rem;
  }

  .result4 {
    left: 0.9rem;
    top: 3.6rem;
  }

  .result5 {
    right: 0.9rem;
    top: 3.6rem;
  }

  .result .top, .result .bottom {
    position: absolute;
    top: -.36rem;
    left: 50%;
    font-size: .28rem;
    transform: translateX(-50%);
  }

  .result .bottom {
    bottom: -.36rem;
    top: auto;
  }

  .sub-card-box {
    width: 6.14rem;
    min-height: 2rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: .6rem;
  }

  .sub-card-box .tarot-card {
    flex: 0 0 1.3rem;
    width: 1.3rem;
    margin-right: .15rem;
  }

  .sub-card-box-bg {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .sub-title {
    margin: .2rem 0;
    font-size: .38rem;
  }
  .again-btn{
    position: fixed;
    right: 0;
    top: 3rem;
    font-size: .3rem;
    width: .5rem;
    padding: .2rem .1rem;
    background-color:#4B57B1;
    border-radius: .1rem 0 0 0.1rem;
    color: #fff;
  }
</style>
