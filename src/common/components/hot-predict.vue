<template>
  <div class="predice-box">
    <h4 class="predice-title">
      热门测算
    </h4>
    <ul class="predice-list">
      <li
        v-for="item in list.one"
        @click="toLink(item.url)"
      >
        <img :src="item.img">
        <span>{{ item.title }}</span>
      </li>
    </ul>
    <ul
      class="predice-list"
      style="padding-top: 0;"
      @click="toLink(item.url)"
    >
      <li v-for="item in list.two">
        <img :src="item.img">
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getHotPredict} from "../assets/api"

  export default {
    name: "HotPredict",
    data() {
      return {
        list: []
      }
    },
    mounted() {
      let path_id = localStorage.getItem('path_id')
      getHotPredict({path_id: path_id ? path_id : 1}).then(res => {
        if (res.code == 200) {
          this.list = res.data
        }
      })
    },
    methods: {
      toLink(url) {
        window.location.href = url
      }
    }
  }
</script>

<style scoped>
  .predice-box {
    background: #fff url("http://yzkt-1256765192.cos.ap-chengdu.myqcloud.com/uploads/2019-08-02/20190802181519-5d440d378bf8b.png") no-repeat center center;
    background-size: cover;
    width: 100%;
    box-shadow: 0px 2px 0.08rem 0px rgba(0, 0, 0, 0.18);
  }

  .predice-title {
    padding: 0.28rem 0;
    margin: 0 0.6rem;
    text-align: center;
    font-size: 0.34rem;
    font-weight: 500;
    color: rgba(56, 56, 56, 1);
    border-bottom: 1px solid #383838;
  }

  .predice-list {
    padding: 0.4rem 0.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    font-size: 0.24rem;
  }

  .predice-list img {
    width: 1.05rem;
    height: 1rem;
    display: block;
    margin: 0 auto 0.05rem;
  }

  .predice-list li {
    cursor: pointer;
  }
</style>
