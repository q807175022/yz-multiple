<template>
  <van-popup
    v-model="show"
    position="bottom"
    @close="headerClick"
  >
    <!--顶部切换农历公历-->
    <ul class="picker-header">
      <li @click="show=false">
        <span>取消</span>
      </li>
      <li
        ref="li"
        class="lunar-switch-btn"
        :style="{color:theme,border: '1px solid '+theme}"
      >
        <span
          :class="{'is-lunar':!isLunar}"
          :style="!isLunar?'background-color:'+theme:'#fff'"
          @click="isLunar=false"
        >公历</span>
        <span
          :class="{'is-lunar':isLunar}"
          :style="isLunar?'background-color:'+theme:'#fff'"
          @click="isLunar=true"
        >农历</span>
      </li>
      <li
        :style="{color:theme}"
        @click="show=false"
      >
        <span>确定</span>
      </li>
    </ul>
    <!--if 公历-->
    <van-picker
      ref="picker"
      :columns="columnData"
      @change="pickerChange"
    />
  </van-popup>
</template>

<script>
  import {Popup, Picker} from 'vant';

  export default {
    name: 'LunarPicker',
    components: {
      [Popup.name]: Popup,
      [Picker.name]: Picker
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: '1985-01-01 0'
      },
      theme: {
        type: String,
        default: '#C3201B'
      },
      currentValue:null
    },
    data () {
      const max_year = new Date().getFullYear();
      return {
        $picker: null,
        show: this.visible,
        current: [],
        isLunar: false,
        MIN_YEAR: 1891,
        MAX_YEAR: max_year,
        lunarInfo: [
          [0, 2, 9, 21936], [6, 1, 30, 9656], [0, 2, 17, 9584], [0, 2, 6, 21168], [5, 1, 26, 43344], [0, 2, 13, 59728],
          [0, 2, 2, 27296], [3, 1, 22, 44368], [0, 2, 10, 43856], [8, 1, 30, 19304], [0, 2, 19, 19168], [0, 2, 8, 42352],
          [5, 1, 29, 21096], [0, 2, 16, 53856], [0, 2, 4, 55632], [4, 1, 25, 27304], [0, 2, 13, 22176], [0, 2, 2, 39632],
          [2, 1, 22, 19176], [0, 2, 10, 19168], [6, 1, 30, 42200], [0, 2, 18, 42192], [0, 2, 6, 53840], [5, 1, 26, 54568],
          [0, 2, 14, 46400], [0, 2, 3, 54944], [2, 1, 23, 38608], [0, 2, 11, 38320], [7, 2, 1, 18872], [0, 2, 20, 18800],
          [0, 2, 8, 42160], [5, 1, 28, 45656], [0, 2, 16, 27216], [0, 2, 5, 27968], [4, 1, 24, 44456], [0, 2, 13, 11104],
          [0, 2, 2, 38256], [2, 1, 23, 18808], [0, 2, 10, 18800], [6, 1, 30, 25776], [0, 2, 17, 54432], [0, 2, 6, 59984],
          [5, 1, 26, 27976], [0, 2, 14, 23248], [0, 2, 4, 11104], [3, 1, 24, 37744], [0, 2, 11, 37600], [7, 1, 31, 51560],
          [0, 2, 19, 51536], [0, 2, 8, 54432], [6, 1, 27, 55888], [0, 2, 15, 46416], [0, 2, 5, 22176], [4, 1, 25, 43736],
          [0, 2, 13, 9680], [0, 2, 2, 37584], [2, 1, 22, 51544], [0, 2, 10, 43344], [7, 1, 29, 46248], [0, 2, 17, 27808],
          [0, 2, 6, 46416], [5, 1, 27, 21928], [0, 2, 14, 19872], [0, 2, 3, 42416], [3, 1, 24, 21176], [0, 2, 12, 21168],
          [8, 1, 31, 43344], [0, 2, 18, 59728], [0, 2, 8, 27296], [6, 1, 28, 44368], [0, 2, 15, 43856], [0, 2, 5, 19296],
          [4, 1, 25, 42352], [0, 2, 13, 42352], [0, 2, 2, 21088], [3, 1, 21, 59696], [0, 2, 9, 55632], [7, 1, 30, 23208],
          [0, 2, 17, 22176], [0, 2, 6, 38608], [5, 1, 27, 19176], [0, 2, 15, 19152], [0, 2, 3, 42192], [4, 1, 23, 53864],
          [0, 2, 11, 53840], [8, 1, 31, 54568], [0, 2, 18, 46400], [0, 2, 7, 46752], [6, 1, 28, 38608], [0, 2, 16, 38320],
          [0, 2, 5, 18864], [4, 1, 25, 42168], [0, 2, 13, 42160], [10, 2, 2, 45656], [0, 2, 20, 27216], [0, 2, 9, 27968],
          [6, 1, 29, 44448], [0, 2, 17, 43872], [0, 2, 6, 38256], [5, 1, 27, 18808], [0, 2, 15, 18800], [0, 2, 4, 25776],
          [3, 1, 23, 27216], [0, 2, 10, 59984], [8, 1, 31, 27432], [0, 2, 19, 23232], [0, 2, 7, 43872], [5, 1, 28, 37736],
          [0, 2, 16, 37600], [0, 2, 5, 51552], [4, 1, 24, 54440], [0, 2, 12, 54432], [0, 2, 1, 55888], [2, 1, 22, 23208],
          [0, 2, 9, 22176], [7, 1, 29, 43736], [0, 2, 18, 9680], [0, 2, 7, 37584], [5, 1, 26, 51544], [0, 2, 14, 43344],
          [0, 2, 3, 46240], [4, 1, 23, 46416], [0, 2, 10, 44368], [9, 1, 31, 21928], [0, 2, 19, 19360], [0, 2, 8, 42416],
          [6, 1, 28, 21176], [0, 2, 16, 21168], [0, 2, 5, 43312], [4, 1, 25, 29864], [0, 2, 12, 27296], [0, 2, 1, 44368],
          [2, 1, 22, 19880], [0, 2, 10, 19296], [6, 1, 29, 42352], [0, 2, 17, 42208], [0, 2, 6, 53856], [5, 1, 26, 59696],
          [0, 2, 13, 54576], [0, 2, 3, 23200], [3, 1, 23, 27472], [0, 2, 11, 38608], [11, 1, 31, 19176], [0, 2, 19, 19152],
          [0, 2, 8, 42192], [6, 1, 28, 53848], [0, 2, 15, 53840], [0, 2, 4, 54560], [5, 1, 24, 55968], [0, 2, 12, 46496],
          [0, 2, 1, 22224], [2, 1, 22, 19160], [0, 2, 10, 18864], [7, 1, 30, 42168], [0, 2, 17, 42160], [0, 2, 6, 43600],
          [5, 1, 26, 46376], [0, 2, 14, 27936], [0, 2, 2, 44448], [3, 1, 23, 21936], [0, 2, 11, 37744], [8, 2, 1, 18808],
          [0, 2, 19, 18800], [0, 2, 8, 25776], [6, 1, 28, 27216], [0, 2, 15, 59984], [0, 2, 4, 27424], [4, 1, 24, 43872],
          [0, 2, 12, 43744], [0, 2, 2, 37600], [3, 1, 21, 51568], [0, 2, 9, 51552], [7, 1, 29, 54440], [0, 2, 17, 54432],
          [0, 2, 5, 55888], [5, 1, 26, 23208], [0, 2, 14, 22176], [0, 2, 3, 42704], [4, 1, 23, 21224], [0, 2, 11, 21200],
          [8, 1, 31, 43352], [0, 2, 19, 43344], [0, 2, 7, 46240], [6, 1, 27, 46416], [0, 2, 15, 44368], [0, 2, 5, 21920],
          [4, 1, 24, 42448], [0, 2, 12, 42416], [0, 2, 2, 21168], [3, 1, 22, 43320], [0, 2, 9, 26928], [7, 1, 29, 29336],
          [0, 2, 17, 27296], [0, 2, 6, 44368], [5, 1, 26, 19880], [0, 2, 14, 19296], [0, 2, 3, 42352], [4, 1, 24, 21104],
          [0, 2, 10, 53856], [8, 1, 30, 59696], [0, 2, 18, 54560], [0, 2, 7, 55968], [6, 1, 27, 27472], [0, 2, 15, 22224],
          [0, 2, 5, 19168], [4, 1, 25, 42216], [0, 2, 12, 42192], [0, 2, 1, 53584], [2, 1, 21, 55592], [0, 2, 9, 54560]
        ],
        hourList: ['时辰未知', '23:00~00:59(子时)', '1:00~2:59(丑时)', '3:00~4:59(寅时)', '5:00~6:59(卯时)', '7:00~8:59(辰时)',
          '9:00~10:59(巳时)',
          '11:00~12:59(午时)', '13:00~14:59(未时)', '15:00~16:59(申时)', '17:00~18:59(酉时)', '19:00~20:59(戌时)',
          '21:00~22:59(亥时)'
        ],
        columnData: [
          {
            values: [],
            defaultIndex: 0
          },
          {
            values: [],
          },
          {
            values: [],
          },
          {
            values: [],
            className: 'hour-column'
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
      isLunar (val) {
        this.pickerInit()
      },
      currentValue(data){
        if(Object.keys(data).length){
          this.$picker.setValues(data.values)
        }
      }
    },
    created(){
      /* 把value拆分,确认列数 */
      this.current = this.value.split(/\-|\s/)
      if (this.current.length == 3) {
        this.columnData.pop()
      } else {
        this.columnData[3].values = this.hourList
      }
      /*年列表初始化*/
      this.columnData[0].values = this.loopCreate(this.MIN_YEAR, this.MAX_YEAR)
      this.columnData[0].defaultIndex = this.columnData[0].values.indexOf(Number(this.value.split('-')[0]))
    },
    methods: {
      //顶部确认取消点击事件
      headerClick (type) {
        let value = this.$picker.getValues()
        let result = {};
        this.$emit('update:visible', false)
        // 农历结果  [1995, 1, 10, "乙亥", "猪", "正月", "初十", 8]

        result.islunar = this.isLunar
        // 如果是农历
        if (this.isLunar) {
          let indexes = this.$picker.getIndexes()
          let solar = this.toSolar(value[0], indexes[1], indexes[2] + 1);
          result.lunar = `${value[0]}年${value[1]}${value[2]}`;
          result.solar = `${solar[0]}-${solar[1] < 10 ? '0' + solar[1] : solar[1]}-${solar[2] < 10 ? '0' + solar[2] : solar[2]}`;
        } else {
          // 公立
          let lunar = this.toLunar(value[0], value[1], value[2]);
          result.lunar = `${lunar[0]}年${lunar[5]}${lunar[6]}`;
          result.solar = `${value[0]}-${value[1] < 10 ? '0' + value[1] : value[1]}-${value[2] < 10 ? '0' + value[2] : value[2]}`;
        }
        if (this.columnData.length == 4) {//如果有时辰列表
          result.hour = this.hourList.indexOf(value[3])
          result.hour_name = value[3]
        }
        result.values=value
        this.$emit('change', result)
      },
      //初始化以及公农历切换触发
      pickerInit () {
        const that = this;
        if (this.isLunar) {
          let value = this.$picker.getValues()
          let yearData = this.lunarInfo[value[0] - this.MIN_YEAR];
          let len = yearData[0] == 0 ? 12 : 13;
          let leapMonth = this.leapMonth(value[0])
          let months = this.lunarYearMonths(value[0]);
          this.$picker.setColumnValues(1, months.map((v, i) => {
            return (leapMonth != 0 && i == leapMonth) ? ('闰' + that.chineseMonth(i)) : that.chineseMonth(((leapMonth != 0 && leapMonth < i) ? (i) : i + 1));
          }))
          this.$picker.setColumnValues(2, this.loopCreate(1, months[0]).map(v => that.chineseNumber(v)))
        } else {
          this.$picker.setColumnValues(1, this.loopCreate(1, 12))
          this.$picker.setColumnValues(2, this.loopCreate(1, 31))
        }
      },
      //picker选项改变时触发
      pickerChange (event, checked, index) {
        const that = this;
        /*event     picker组件实例
        * checked   所有列选中值，
        * index     当前列对应的索引*/
        this.current = checked
        if (this.isLunar) {//农历
          if (index == 0) {//年变化
            let yearData = this.lunarInfo[checked[0] - this.MIN_YEAR];
            let leapMonth = this.leapMonth(checked[0])
            let months = this.lunarYearMonths(checked[0]);
            this.$picker.setColumnValues(1, months.map((v, i) => {
              return (leapMonth != 0 && i == leapMonth) ? ('闰' + that.chineseMonth(i)) : that.chineseMonth(((leapMonth != 0 && leapMonth < i) ? (i) : i + 1));
            }))
          } else if (index == 1) {
            let months = this.lunarYearMonths(checked[0]);
            this.$picker.setColumnValues(2, this.loopCreate(1, months[0]).map(v => that.chineseNumber(v)))
          }
        } else {//公历
          if (index == 1) {
            event.setColumnValues(2, this.loopCreate(1, this.solarMonthDays(checked[0], checked[1])))
          }
        }
      },
      //循环生成年份列表
      loopCreate (min, max) {
        let array = []
        for (let y = min; y <= max; y++) {
          array.push(y)
        }
        return array
      },
      //是否闰年
      isLeapYear: function (year) {
        return ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
      },
      //天干地支年
      lunarYear: function (year) {
        let gan = ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
          zhi = ['申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未'],
          str = year.toString().split('');
        return gan[str[3]] + zhi[year % 12];
      },
      //生肖年
      zodiacYear: function (year) {
        let zodiac = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
        return zodiac[year % 12];
      },
      //公历月份天数
      //@param year 阳历-年
      //@param month 阳历-月
      solarMonthDays: function (year, month) {
        let FebDays = this.isLeapYear(year) ? 29 : 28;
        let monthHash = ['', 31, FebDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return monthHash[month];
      },
      //农历月份天数
      lunarMonthDays: function (year, month) {
        let monthData = this.lunarMonths(year);
        return monthData[month - 1];
      },
      //农历月份天数数组
      lunarMonths: function (year) {
        let yearData = this.lunarInfo[year - this.MIN_YEAR];
        let leapMonth = yearData[0];
        let bit = (+yearData[3]).toString(2);
        let months = [];
        for (let i = 0; i < bit.length; i++) {
          months[i] = bit.substr(i, 1);
        }

        for (let k = 0, len = 16 - months.length; k < len; k++) {
          months.unshift('0');
        }

        months = months.slice(0, (leapMonth == 0 ? 12 : 13));
        for (let i = 0; i < months.length; i++) {
          months[i] = +months[i] + 29;
        }
        return months;
      },
      //农历每年的天数
      //@param year 农历年份
      lunarYearDays: function (year) {
        let monthArray = this.lunarYearMonths(year);
        let len = monthArray.length;
        return (monthArray[len - 1] == 0 ? monthArray[len - 2] : monthArray[len - 1]);
      },
      //
      lunarYearMonths: function (year) {
        let monthData = this.lunarMonths(year);
        let res = [];
        let temp = 0;
        let yearData = this.lunarInfo[year - this.MIN_YEAR];
        let len = (yearData[0] == 0 ? 12 : 13);
        for (let i = 0; i < len; i++) {
          temp = 0;
          for (let j = 0; j <= i; j++) {
            temp += monthData[j];
          }
          res.push(temp);
        }
        return res;
      },
      //获取闰月
      //@param year 农历年份
      leapMonth: function (year) {
        let yearData = this.lunarInfo[year - this.MIN_YEAR];
        return yearData[0];
      },
      //计算农历日期与正月初一相隔的天数
      betweenLunarDays: function (year, month, day) {
        let yearMonth = this.lunarMonths(year);
        let res = 0;
        for (let i = 0; i < month; i++) {//i原来是1
          res += yearMonth[i];
        }
        res += day - 1;
        return res;
      },
      //计算2个阳历日期之间的天数
      //@param year 阳历年
      //@param month
      //@param day
      //@param l_month 阴历正月对应的阳历月份
      //@param l_day  阴历初一对应的阳历天
      betweenSolarDays: function (year, month, day, l_month, l_day) {
        let time1 = new Date(year + '-' + month + '-' + day).getTime(),
          time2 = new Date(year + '-' + l_month + '-' + l_day).getTime();
        return Math.ceil((time1 - time2) / 24 / 3600 / 1000);
      },
      //根据距离正月初一的天数计算阴历日期
      //@param year 阳历年
      //@param between 天数
      lunarByBetween: function (year, between) {
        let lunarArray = [], yearMonth = [], t = 0, e = 0, leapMonth = 0, m = '';
        if (between == 0) {
          t = 1;
          e = 1;
          m = '正月';
        } else {
          year = between > 0 ? year : (year - 1);
          yearMonth = this.lunarYearMonths(year);
          leapMonth = this.leapMonth(year);
          between = between > 0 ? between : (this.lunarYearDays(year) + between);
          for (let i = 0; i < 13; i++) {
            if (between == yearMonth[i]) {
              t = i + 2;
              e = 1;
              break;
            } else if (between < yearMonth[i]) {
              t = i + 1;
              e = between - ((yearMonth[i - 1]) ? yearMonth[i - 1] : 0) + 1;
              break;
            }
          }
          m = (leapMonth != 0 && t == leapMonth + 1) ? ('闰' + this.chineseMonth(t - 1)) : this.chineseMonth(((leapMonth != 0 && leapMonth + 1 < t) ? (t - 1) : t));
        }
        lunarArray.push(year, t, e); //年 月 日
        lunarArray.push(this.lunarYear(year),
          this.zodiacYear(year),
          m,
          this.chineseNumber(e)); //天干地支年 生肖年 月份 日
        lunarArray.push(leapMonth); //闰几月
        return lunarArray;
      },
      //中文月份
      chineseMonth: function (month) {
        let monthHash = ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
        return monthHash[month];
      },
      //中文日期
      chineseNumber: function (num) {
        let dateHash = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        let res = ''
        if (num <= 10) {
          res = '初' + dateHash[num];
        } else if (num > 10 && num < 20) {
          res = '十' + dateHash[num - 10];
        } else if (num == 20) {
          res = '二十';
        } else if (num > 20 && num < 30) {
          res = '廿' + dateHash[num - 20];
        } else if (num == 30) {
          res = '三十';
        }
        return res;
      },
      //转换农历
      toLunar: function (year, month, day) {
        let yearData = this.lunarInfo[year - this.MIN_YEAR];
        if (year == this.MIN_YEAR && month <= 2 && day <= 9) {
          return [1891, 1, 1, '辛卯', '兔', '正月', '初一'];
        }
        return this.lunarByBetween(year, this.betweenSolarDays(year, month, day, yearData[1], yearData[2]));
      },
      //转换公历
      //@param year 阴历-年
      //@param month 阴历-月，闰月处理：例如如果当年闰五月，那么第二个五月就传六月，相当于阴历有13个月
      //@param date 阴历-日
      toSolar: function (year, month, day) {
        let yearData = this.lunarInfo[year - this.MIN_YEAR];
        let between = this.betweenLunarDays(year, month, day);
        let msDate = `${year}-${yearData[1]<10?'0'+yearData[1]:yearData[1]}-${yearData[2]<10?'0'+yearData[2]:yearData[2]}`
        let ms = new Date(msDate).getTime();
        let s = ms + between * 24 * 60 * 60 * 1000;
        let d = new Date();
        d.setTime(s);
        year = d.getFullYear();
        month = d.getMonth() + 1;
        day = d.getDate();
        return [year, month, day];
      }
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

  .picker-header > li:nth-of-type(1), .picker-header > li:nth-of-type(3) {
    padding: 0.2rem;
  }

  .picker-header > li:nth-of-type(1) {
    color: #666;
  }

  .lunar-switch-btn {
    font-size: 0.3rem;
    border-radius: 0.1rem;
    display: flex;
    align-items: center;
  }

  .lunar-switch-btn > span {
    padding: 0.1rem 0.25rem;
  }

  .is-lunar {
    color: #ffffff;
  }
</style>
