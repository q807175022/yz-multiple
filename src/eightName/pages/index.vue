<template>
  <section class="container">
    <!--&lt;!&ndash;顶部tips信息&ndash;&gt;-->
    <index-tips />
    <!--内容贴图-->
    <img src="../assets/images/index_1.png">
    <img
      src="../assets/images/index_2.png"
      @load="setOffsetTop"
    >
    <!--表单提交-->
    <div
      ref="form-position1"
      class="submit-img"
    >
      <ul class="form-box">
        <li class="form-line">
          <label>您的姓名:</label>
          <div class="form-line-input">
            <input
              id="name"
              v-model="form.name"
              type="text"
              name="name"
              placeholder="请输入姓名"
              @focus="buymsgVisible=false"
              @blur="inputBlur($event),buymsgVisible=true"
            >
          </div>
        </li>
        <li class="form-line">
          <label>您的性别:</label>
          <div class="form-line-input sex-box">
            <input
              id="man"
              v-model="form.sex"
              type="radio"
              name="sex"
              value="1"
            >
            <label
              class="sex-label"
              for="man"
              style="margin-right: 0.4rem"
            >
              <svg
                v-show="form.sex==1"
                t="1566029474878"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5649"
                width="48"
                height="48"
              >
                <path
                  d="M512 78.769231c240.246154 0 433.230769 192.984615 433.230769 433.230769s-192.984615 433.230769-433.230769 433.230769S78.769231 752.246154 78.769231 512 271.753846 78.769231 512 78.769231m0-78.769231C228.430769 0 0 228.430769 0 512s228.430769 512 512 512 512-228.430769 512-512S795.569231 0 512 0z"
                  fill="#F11833"
                  p-id="5650"
                  data-spm-anchor-id="a313x.7781069.0.i18"
                  class=""
                />
                <path
                  d="M512 512m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
                  fill="#F11833"
                  p-id="5651"
                  data-spm-anchor-id="a313x.7781069.0.i17"
                  class=""
                />
              </svg>
              <svg
                v-show="form.sex!=1"
                t="1566029474878"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5649"
                width="48"
                height="48"
              >
                <path
                  d="M512 78.769231c240.246154 0 433.230769 192.984615 433.230769 433.230769s-192.984615 433.230769-433.230769 433.230769S78.769231 752.246154 78.769231 512 271.753846 78.769231 512 78.769231m0-78.769231C228.430769 0 0 228.430769 0 512s228.430769 512 512 512 512-228.430769 512-512S795.569231 0 512 0z"
                  fill="#9B9B9B"
                  p-id="5650"
                  data-spm-anchor-id="a313x.7781069.0.i18"
                  class="selected"
                />
                <path
                  d="M512 512m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
                  fill="#FFEAC6"
                  p-id="5651"
                  data-spm-anchor-id="a313x.7781069.0.i17"
                  class="selected"
                />
              </svg>
              <span>男</span>
            </label>
            <input
              id="woman"
              v-model="form.sex"
              type="radio"
              name="sex"
              value="2"
            >
            <label
              class="sex-label"
              for="woman"
            >
              <svg
                v-show="form.sex==2"
                t="1566029474878"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5649"
                width="48"
                height="48"
              >
                <path
                  d="M512 78.769231c240.246154 0 433.230769 192.984615 433.230769 433.230769s-192.984615 433.230769-433.230769 433.230769S78.769231 752.246154 78.769231 512 271.753846 78.769231 512 78.769231m0-78.769231C228.430769 0 0 228.430769 0 512s228.430769 512 512 512 512-228.430769 512-512S795.569231 0 512 0z"
                  fill="#F11833"
                  p-id="5650"
                  data-spm-anchor-id="a313x.7781069.0.i18"
                  class=""
                />
                <path
                  d="M512 512m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
                  fill="#F11833"
                  p-id="5651"
                  data-spm-anchor-id="a313x.7781069.0.i17"
                  class=""
                />
              </svg>
              <svg
                v-show="form.sex!=2"
                t="1566029474878"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5649"
                width="48"
                height="48"
              >
                <path
                  d="M512 78.769231c240.246154 0 433.230769 192.984615 433.230769 433.230769s-192.984615 433.230769-433.230769 433.230769S78.769231 752.246154 78.769231 512 271.753846 78.769231 512 78.769231m0-78.769231C228.430769 0 0 228.430769 0 512s228.430769 512 512 512 512-228.430769 512-512S795.569231 0 512 0z"
                  fill="#9B9B9B"
                  p-id="5650"
                  data-spm-anchor-id="a313x.7781069.0.i18"
                  class="selected"
                />
                <path
                  d="M512 512m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
                  fill="#FFEAC6"
                  p-id="5651"
                  data-spm-anchor-id="a313x.7781069.0.i17"
                  class="selected"
                />
              </svg>
              <span>女</span>
            </label>
          </div>
        </li>
        <li class="form-line">
          <label>出生年月:</label>
          <div
            class="form-line-input"
            @click="birthVisible=true"
          >
            <span
              v-if="form.birthday"
              class="input"
            >{{ birthday }}</span>
            <span
              v-else
              class="placeholder"
            >请选择</span>
          </div>
        </li>
      </ul>
    </div>

    <!--提交按钮-->
    <div
      ref="submit-btn"
      class="submit-btn"
      @click="submit"
    >
      立即测试
    </div>
    <yz-protocol
      v-model="protocol"
      @to-result="redirect(indexUrl.result_url)"
    />
    <div
      class="teacher-vedio"
      :style="{backgroundImage: 'url('+require('../assets/images/index_video.png') +')'}"
    >
      <div class="video-box2">
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
    </div>
    <img
      class="index-image"
      src="../assets/images/index5.png"
    >
    <img
      class="index-image"
      src="../assets/images/index6.png"
    >
    <img
      class="index-image"
      src="../assets/images/index7.png"
    >
    <img
      class="index-image"
      src="../assets/images/index8.png"
    >
    <img
      class="index-image"
      src="../assets/images/index9.png"
    >
    <img
      class="index-image"
      src="../assets/images/index10.png"
    >
    <img
      class="index-image"
      src="../assets/images/index11.png"
    >
    <img
      class="index-image"
      src="../assets/images/index12.png"
    >
    <img
      class="index-image"
      src="../assets/images/index13.png"
    >
    <img
      class="index-image"
      src="../assets/images/index14.png"
    >
    <!--<img class="index-image" src="../assets/images/index15.png">-->
    <!--评论滚动-->
    <div class="comment-box">
      <span class="people">{{ people }}</span>
      <scroll-comment
        :list="commentList"
        @change="people++"
      >
        <template v-slot="data">
          <div class="comment-item">
            <div>{{ data.row.name }}</div>
            <div>{{ data.row.content }}</div>
          </div>
        </template>
      </scroll-comment>
    </div>
    <!--命主确认-->
    <!--命主确认-->
    <order-modal
      :visible.sync="userConfirm"
      :price="indexUrl.price"
      :user-data="form"
      @confirm="orderConfirm"
    />
    <!-- 滚动出现的测算按钮 -->
    <transition name="fade">
      <div
        v-show="flxedbtn"
        class="fixed-btn"
        @click.stop="fixedBtnClick"
      >
        <div class="submit-btn">
          立即测试
        </div>
      </div>
    </transition>
    <!--滚动的用户购买信息-->
    <scroll-buymsg :visible="buymsgVisible" />
    <!--出生日期组件-->
    <lunar-picker
      :visible.sync="birthVisible"
      value="1985-01-01 0"
      :current-value="birthData"
      @change="manBirth"
    />
    <!--网站底部组件-->
    <yz-footer
      padding-bottom="0.5rem"
      bg-color="#FFF8E6"
      @service="service=true"
    />
    <!--客服组件-->
    <service-dialog
      :visible.sync="service"
      :order-search="indexUrl.result_url"
      :bg-image="require('../assets/images/kefu_bgimg.png')"
    />
    <!--底部测试按钮-->
    <div class="index-bot" />
  </section>
</template>

<script>
  import { Dialog} from 'vant'
  import {getIndexUrl} from '../../common/api'
  import {redirect,setRouterHijack} from '../../common/common'
  import {postPayUrl} from "../assets/http"
  import serviceDialog from '../../common/components/service-dialog'//客服弹框
  import indexTips from "../../common/components/index-tips"//表头滑动
  import yzProtocol from '../components/yz-protocol'//用户协议
  import lunarPicker from '../../common/components/lunar-picker'//日期
  import commentList from "../assets/evaluate.json"//评论列表
  import scrollComment from "../../common/components/scroll-comment"//评论滑动
  import yzFooter from '../../common/components/yz-footer'//底部logo
  import scrollBuymsg from '../../common/components/scroll-buymsg'//测算信息
  import Toast from "../../common/components/toast"
  import  orderModal from "../components/order-modal"

  export default {
    name: 'Index',
    components: {
      serviceDialog,
      orderModal,
      scrollBuymsg,
      yzFooter,
      indexTips,
      yzProtocol,
      lunarPicker,
      scrollComment
    },
    data () {
      return {
        form:{
          name:"",
          sex:1,
          birthday:'',
          time:0,
          path_id:null
        },
        userConfirm:false,
        price: '28.8',
        scrollheight: 0,
        offsetTop:500,
        protocol:true,
        flxedbtn: false,
        buymsgVisible:true,
        service: false,
        commentList:commentList,
        birthVisible: false,
        audioStatus: 'paused',
        birthday:"",
        indexUrl: {},
        birthData:{},
        people:685451
      }
    },
    computed: {
      path_id() {
        if (this.$route.query.path_id) {
          return this.$route.query.path_id
        } else {
          return localStorage.getItem('path_id')
        }
      }
    },
    created() {
      // getIndexUrl()获取首页url地址方法
      this.getIndexUrl()
      // 监听页面滚动事件
      window.addEventListener('scroll', this.handleScroll);
      this.$nextTick(() => {
        this.recordUv(1)
        this.listenAudio()
      })
    },
    destroyed(){
      //销毁滚动监听
      window.removeEventListener('scroll', this.handleScroll);
      setRouterHijack()
    },
    methods: {
      getIndexUrl() {
        getIndexUrl({type: 1, path_id: this.path_id}).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.indexUrl = res.data
            let callbackUrl = this.$route.query.callbackUrl;
            if(callbackUrl || res.data.back_url){
              setRouterHijack(1,callbackUrl?window.atob(callbackUrl):res.data.back_url)
            }
            localStorage.getItem('price', res.data.price)
          }
        })
      },
      // 视频播放
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
      /* 生日选择 */
      manBirth(data) {
        // console.log(data)
        this.birthData = data;
        this.form.birthday = data.solar;
        // console.log(this.form.birthday )
        this.form.time = data.hour;
        let time = data.hour_name.match(/\((.+?)\)/);
        if (data.islunar) {
          this.birthday = data.lunar + ' ' + (time ? time[1] : data.hour_name)
        } else {
          this.birthday = data.solar + ' ' + (time ? time[1] : data.hour_name)
        }
      },
      inputBlur(e){
        let target = e.target;
        if(target.id=='name'){
          this.$refs['form-position1'].scrollIntoView()
        }else if(target.id=='name2'){
          this.$refs['form-position2'].scrollIntoView()
        }
      },

      redirect(url) {
        redirect(url)
      },
      setOffsetTop() {
        this.offsetTop = this.$refs['submit-btn'].offsetTop;
      },
      /* 底部隐藏按钮进行提交，并跳至表单位置 */
      fixedBtnClick() {
        window.scrollTo(0,0)//点击回到顶部
        this.submit()
      },
      handleScroll(e) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let scrollHeight = document.body.scrollHeight;
        if (scrollTop < this.offsetTop ) this.flxedbtn = false
         else this.flxedbtn = true
      },
      /* 表单验证通过，显示订单弹框 */
      submit() {
        if (this.formValidation()) {
          this.userConfirm = true;
          this.recordUv(5)
          this.recordUv(6)
          if (localStorage.getItem('zwUid') || this.$route.query.zwUid) {
            zwDivine.recordUserInfo({
              name: '',
              gender: '',
              birthday: '',
              extra: JSON.stringify(this.form)
            })
          }
        }
      },
      /* 表单验证 */
      formValidation() {
        const {name, birthday} = this.form;
        if (!this.protocol) {
          Toast({message: '请阅读并同意《易知用户隐私协议》!', duration: 1500, bgColor: '#FFD8A3', color: '#333'})
        } else if (!name) {
          Toast({message: '请输入您的姓名', duration: 1500, bgColor: '#FFD8A3', color: '#333'})
        } else if (!/^[\u4e00-\u9fa5]{2,4}$/.test(name)) {
          Toast({message: '姓名为2-4位汉字', duration: 1500, bgColor: '#FFD8A3', color: '#333'})
        } else if (!birthday) {
          Toast({message: '请选择您的生日', duration: 1500, bgColor: '#FFD8A3', color: '#333'})
        } else {
          return true
        }
        return false
      },
      /* 订单弹框确认提交 */
      orderConfirm() {
        this.userConfirm = false;
        this.loading = true;
        let zwUid = localStorage.getItem("zwUid");
        let params = {
          name: this.form.name,
          sex:this.form.sex,
          birthday: this.birthData.solar, //1995-05-06
          type:Number(this.birthData.islunar),
          time: this.birthData.hour, //0未知 1子时 2xx 3xx
          callback: encodeURIComponent(`${window.location.origin}${this.$router.options.base}result`),
          path_id: this.path_id
        }
        if (zwUid) {
          params.channel = 'zhiwu'
          params.zwGameId = localStorage.getItem("zwGameId")
        }
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
            message: '服务器错误,请稍候重试'
          })
          this.loading = false
        })
      }

    }
  }
</script>

<style scoped>
  .container {
    background-color: #fbf7f7;
    min-height: 100vh;
  }

  .index-bot{
    width: 6.66rem;
    height: 1.12rem;
  }
  #name {
    padding: 0.15rem 0;
    display: block;
    width: 100%;
    line-height: normal;
  }

  .submit-img{
    width: 100%;
    height: 3.10rem;
    margin-top: -0.2rem;
    background: url("../assets/images/submit_test.png") no-repeat;
    background-size: cover;
  }

  .form-box {
    width: 6.9rem;
    height: 2.92rem;
    padding: 0.15rem 0.3rem;
    margin: 0.19rem auto;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    font-size: 0.32rem;
    color: #333;
  }

  .form-box li {
    flex: 1 1 33%;
    border-bottom: 1px solid rgba(224,175,121,0.5);
  }
  .form-box li:last-child{
    border: none;
  }
  .form-line {
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    border-radius: 0.1rem;
    background-color: #D1BFB6;
  }

  .form-line > label {
    flex: 0 0 2rem;
    text-align: center;
    font-size: 0.32rem;
    color: #840000;
  }

  .form-line-input {
    flex: 1 1 auto;
  }

  .sex-box {
    display: flex;
    align-items: center;
  }

  .sex-box input[type="radio"] {
    display: none;
  }

  .sex-box svg.icon {
    width: 0.32rem;
    height: 0.32rem;
    margin-right: 0.1rem;
  }

  .sex-box label {
    width: 1rem;
    display: flex;
    align-items: center;
  }


  .submit-btn {
    width: 6.66rem;
    margin: 0 auto;
    background: url("../assets/images/index-btn.png")  no-repeat;
    background-size: 100%;
    height: 1.2rem;
    font-size: 0.48rem;
    color: #8B211B;
    line-height: 0.9rem;
    text-align: center;
    animation: submitbtn linear 1000ms infinite alternate;
  }

  .fixed-btn {
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.25rem;
    z-index: 100;
    padding-top: 0.15rem;
  }

  .fixed-btn .submit-btn {
    width: 6.66rem;
    height: 0.95rem;
    animation: submitbtn linear 1000ms infinite alternate;
  }

  @keyframes submitbtn {
    from {
      transform: scale(1)
    }
    to {
      transform: scale(0.92)
    }
  }

  .teacher-vedio {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 5.76rem;
    position: relative;
  }

  .video-box2 {
    padding: 0.05rem 0;
    border-radius: 0.15rem;
    background-color: #000;
    position: absolute;
    left: 50%;
    top: 1.0rem;
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

  .sex-box {
    display: flex;
    align-items: center;
  }

  .sex-box input[type="radio"] {
    display: none;
  }

  .sex-box label {
    width: 1rem;
    display: flex;
    align-items: center;
  }

  input::-webkit-input-placeholder,
  .placeholder {
    cursor: pointer;
    font-size: .32rem;
    color: #9F9F9F;
    line-height: normal;
  }

  .comment-box{
    width: 6.91rem;
    height: 11.51rem;
    padding: 1.7rem 0.5rem 0.6rem;
    overflow: hidden;
    margin:0 auto 0.5rem;
    position: relative;
    background: url("../assets/images/index15.png") no-repeat;
    background-size: 100% 100%;
  }

  .people{
    color: #f7ca4a;
    position: absolute;
    top: 1.05rem;
    left: 2.3rem;
  }

  .comment-item{
    border-bottom: 1px solid #D4B090;
    color:rgba(56,56,56,1);
  }

  .comment-item div:first-of-type{
    font-size:.3rem;
    font-weight:bolder;
    padding: 0.2rem 0 0.1rem;
  }

  .comment-item div:last-of-type{
    font-size:.28rem;
    font-weight:300;
    padding-bottom: 0.2rem;
  }

</style>
