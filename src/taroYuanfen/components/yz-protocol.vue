<template>
  <div class="protocol-box">
    <p>您的个人信息仅用于生成分析报告，不会用于其他用途</p>
    <div class="protocol">
      <svg
        v-show="!value"
        t="1567765255147"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6629"
        width="48"
        @click="$emit('input',true)"
        height="48"
      >
        <path
          d="M504.54345955 995.64081304a488.40339911 488.40339911 0 1 1 489.02477748-489.02477748 489.02477748 489.02477748 0 0 1-489.02477748 489.02477748z m0-915.29033955a426.26556208 426.26556208 0 1 0 426.88694045 426.26556207 426.88694045 426.88694045 0 0 0-426.88694045-426.26556207z"
          fill="#3CCAAE"
          p-id="6630"
        />
      </svg>
      <svg
        v-show="value"
        t="1567765039642"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4253"
        width="48"
        @click="$emit('input',false)"
        height="48"
      >
        <path
          d="M740.4 322.7c12.5-11.9 32.2-11.5 44.2 0.9 11.9 12.5 11.5 32.2-0.9 44.2L414.2 722 240.3 555.4c-12.5-11.9-12.9-31.7-0.9-44.2 11.9-12.5 31.7-12.9 44.2-0.9l130.6 125.1 326.2-312.7z"
          p-id="4254"
          data-spm-anchor-id="a313x.7781069.0.i1"
          class="selected"
          fill="#3CCAAE"
        />
        <path
          d="M512 960C264.6 960 64 759.4 64 512S264.6 64 512 64s448 200.6 448 448-200.6 448-448 448z m0-62.5c212.9 0 385.5-172.6 385.5-385.5S724.9 126.5 512 126.5 126.5 299.1 126.5 512 299.1 897.5 512 897.5z"
          p-id="4255"
          data-spm-anchor-id="a313x.7781069.0.i0"
          class="selected"
          fill="#3CCAAE"
        />
      </svg>
      <span>我已阅读并同意 <span @click="$router.push({name:'protocol'})">《易知用户隐私协议》</span></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'YzProtocol',
    props: {
      // 通过value获取绑定message值
      value: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>
  .protocol-box {
    width: 100%;
    position: relative;
    z-index: 1;
    font-size: 0.26rem;
    color: #ffffff;
    padding: 0 0.3rem;
    text-align: center;
    margin: .3rem 0;
  }

  .protocol {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .protocol svg.icon{
    width: 0.44rem;
    height: 0.44rem;
    /*margin-right: 0.1rem;*/
    padding: 0.05rem;
  }

  .protocol svg.icon {
    width: 0.42rem;
    height: 0.42rem;
    padding: 0.05rem;
  }
</style>
