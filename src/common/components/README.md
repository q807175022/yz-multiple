公共组件列表：
```
hot-predict          //热门测算推荐
loading              //加载图，八卦
lunar-picker         //日期选择器，农历
service-dialog       //客服对话框
lz-video             //罗镇视频的公共组件
admire-consult       //结果页赞赏+ 咨询大师
```

  ###loading组件 
  ```
  props:
    visible  :是否显示
  ```
  ###service-dialog 客服弹框组件
  ```
  props
    visible :是否显示，sync
    wechat :客服二维码
  ```
  ###lunar-picker  //时间选择器组件（带农历）
```
属性props：
  visible   :是否弹出显示
  value     :设置默认值的效果只有年有效，默认'1985-01-01 0',传入'1985-01-01'则没有时辰选择
  currentValue :处理滑动动画中点击确定导致的bug,一般传入change事件的values
  
事件：
  change    ：选择器关闭则触发，事件携带参数为一个对象，
  //结果示例：{
  hour:0,                  //时辰，0代表未知，如果没有时辰列，则不会携带此字段
  hour_name:"时辰未知",     //时辰名字，展示用，如果没有时辰列，则不会携带此字段
  islunar: false,          //选择结束时是否为农历
  lunar: "1984年冬月十一",  //农历时间
  solar: "1985-01-01",     //公历时间
  values:                   //选中的值
  }
```
###lz-video   罗镇视频,只做了基本的播放暂停功能
```
props
  src      :视频资源，默认值'https://yizhikt.oss-cn-hongkong.aliyuncs.com/H5/mp4/new_video.mp4'
  poster    :封面资源，默认值'https://apply.yzketang.com/apply/img/life/cover.png'
```
