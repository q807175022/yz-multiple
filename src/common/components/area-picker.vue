<template>
  <van-popup
    v-model="show"
    position="bottom"
    @close="headerClick"
  >
    <ul class="picker-header">
      <li @click="show=false">
        <span>取消</span>
      </li>
      <li @click="show=false">
        <span>确定</span>
      </li>
    </ul>

    <van-picker
      ref="picker"
      :columns="columnData"
      value-key="name"
      @change="pickerChange"
    />
  </van-popup>
</template>

<script>
  import {Popup, Picker} from 'vant';
  import areaJson from "../pca-code.json"
  export default {
    name: 'TimePicker',
    components: {
      [Popup.name]: Popup,
      [Picker.name]: Picker
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      currentValue:null
    },
    data () {
      return {
        $picker: null,
        show: this.visible,
        current: [],
        columnData: [
          {
            values:areaJson,
          },
          {
            values: [],
          },
          {
            values: [],
          },
        ]
      }
    },
    watch: {
      visible (val) {
        this.show = val
        if(val&&!this.$picker){
          this.$nextTick(()=>{
            this.$picker = this.$refs.picker;
            this.pickerInit()
          })
        }
      },
      currentValue(data){
        if(Object.keys(data).length){
          this.$picker.setValues(data)
        }
      }
    },
    methods: {
      //顶部确认取消点击事件
      headerClick(type) {
        this.$emit('update:visible', false)
        let value = this.$picker.getValues()
        this.$emit('change', value)
      },
      //初始化以及公农历切换触发
      pickerInit() {
        const that = this;
        let column =  that.$picker.getValues();
        that.$picker.setColumnValues(1,column[0].childs)
        that.$picker.setColumnValues(2,column[0].childs[0].childs)
      },
      //picker选项改变时触发
      pickerChange(event, checked, index) {
        const that = this;
        /*event     picker组件实例
        * checked   所有列选中值，
        * index     当前列对应的索引*/
        this.current = checked
        if(index==0){
          if(checked[0].childs.length){
            that.$picker.setColumnValues(1,checked[0].childs)
            that.$picker.setColumnValues(2,checked[0].childs[0].childs)
          }else {
            that.$picker.setColumnValues(1,[])
            that.$picker.setColumnValues(2,[])
          }
        }else if(index==1){
          that.$picker.setColumnValues(2,checked[1].childs)
        }

      },
    }
  }
</script>

<style scoped>
  .picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    font-size: 0.28rem;
    position: relative;
    color: #283353;
    padding: 0 0.25rem;
  }

  .picker-header:after {
    content: "";
    display: block;
    width: 7.1rem;
    height: 1px;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%) scaleY(0.5);
    background-color: rgb(220, 220, 220);
  }
  .picker-header li:last-of-type{
    color: rgba(14,11,61,1);
  }
</style>
