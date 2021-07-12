### 前言：项目需要，需要画一段数据的折线图，折线图根据正常数据和异常数据显示两种颜色的线，并且在鼠标经过异常线横坐标时，标记该点往后的十个点组成的线，标记可以有很多方式: 1,第一个点和最后一个点做标记markPoint,2,第一个点到第十个点做区域阴影markArea，3，第一个点和第十个点都变颜色......等，反应这一段线就可以，我这里是选择的第二种方式， 


效果图：

代码如下：
Echarts.vue文件（写了一个echarts的组件）
```html
<template>
  <div :id="id"></div>
</template>
```
```js
<script>
  import echarts from 'echarts'
  import chinaJSON from '@/assets/data/chinaMap.json'
  echarts.registerMap('china', chinaJSON)
  export default {
    data () {
      return {
        chart: null,
        n: 0
      }
    },
    props: ['id', 'option'],
    mounted () {
      let vm = this
      this.chart = echarts.init(document.getElementById(this.id))
      let baseOption = {
      }
      let options = Object.assign({}, baseOption, this.option)
      this.chart.setOption(options, {
                notMerge:true,
      })
      // 以下为echarts的各种方法，我这里只使用了datazoom， 和updateAxisPointer方法。
      // this.chart.on('click', function (params) {
      //   vm.$emit('click-chart', params)
      // })
      // this.chart.on('mouseover', function(params) {
      //   vm.$emit('mouseoverChart', params)
      // })
      // this.chart.on('mouseout', function(params) {
      //   vm.$emit('mouseoutChart', params)
      // })
      this.chart.on('datazoom', function (params) {
        vm.$emit('datazoomChart', params)
      })
      this.chart.on('updateAxisPointer', function(params) {
        vm.$emit('updateAxisPointer', params)
      })
      
      
    },
    watch: {
      option: {
        handler(newVal, oldVal) {
          if (this.chart) {
            if (newVal) {
              this.chart.setOption(newVal);
            } else {
              this.chart.setOption(oldVal);
            }
          } else {
            this.init();
          }
        },
        deep: true //对象内部属性的监听，关键。
        }
      }
    // beforeDestroy(){
    //   this.chart.dispose()
    // }
  }
</script>
```
配置
```js
export function lineOption(xData, yData, xname, yname, pieces, trendList) 
   const option = {
        tooltip: {
            trigger: "axis",
            formatter: (params) => {
                let result =  params[0].marker + params[0].name  +'</br>'
                for(let n in trendList){
                    if(n == params[0].name){
                        result += `<ul>`
                        if(trendList[n].fault){
                            result += `
                                <li>
                                    <span>斜率：</span><span></span>${trendList[n].fault.ratio}</span>
                                </li>
                                <li>
                                    <span>最低差值百分比：</span><span></span>${trendList[n].fault.min_percent}</span>
                                </li>
                                <li>
                                    <span>开始时间：</span><span></span>${trendList[n].fault.start_time}</span>
                                </li>
                                <li>
                                    <span>结束时间：</span><span></span>${trendList[n].fault.end_time}</span>
                                </li>
                                <li>
                                    <span>窗口内开始差值百分比：</span><span></span>${trendList[n].fault.start_percent}</span>
                                </li>
                                <li>
                                    <span>窗口内结束差值百分比：</span><span></span>${trendList[n].fault.end_percent}</span>
                                </li>
                            `
                        }
                        result +=`
                                <li>
                                    <span>趋势差值百分比：</span><span></span>${trendList[n].trend.percent}</span>
                                </li>
                                <li>
                                    <span>趋势窗口开始时间：</span><span></span>${trendList[n].trend.start_time}</span>
                                </li>
                                <li>
                                    <span>趋势窗口结束时间：</span><span></span>${trendList[n].trend.end_time}</span>
                                </li> 
                            </ul>
                        `
                    }
                }

              return result;
          }
        },
        dataZoom: [
            {
                type: "inside",
                start: 0,
                end: 100,
                xAxisIndex: [0]
            },
            {
                start: 0,
                end: 100,
            }
        ],
        grid: {
            left: "2%",
            right: "5%",
            top: "10%",
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                name: xname,
                data: xData,
                axisTick: {
                  alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: "#999"
                    }
                }
            }
        ],
        yAxis: [
            {
                type: "value",
                name: yname,
                splitNumber: 7,
                // scale: true,
                splitLine: {
                    lineStyle: {
                        type: "dashed",
                        color: "#DDD"
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#999"
                    }
                },
                axisTick: {
                    show: false,
                     // axisTick: {
                //   alignWithLabel: true
                // },
                },
                nameTextStyle: {
                    color: "#555"
                },
                splitArea: {
                    show: false
                }
            },
           ],
        visualMap: {
            show: false,
            dimension: 0,
            pieces: pieces,
            outOfRange: {
                color: 'grey'
            },
            seriesIndex: 0
        },
        series: [{
            data: yData,
            // markPoint: {},
            type: "line",
            symbol:'circle',
            sampling: 'lttb',
            markLine: {
                silent: true,
                lineStyle: {
                    color: '#333'
                },
                data: [{
                    yAxis: 2
                }]
            },
        },
        {
            data: yData2,
            type: "line",
            symbol:'none',
            showSymbol: false,//这两个属性可以让折线图只在鼠标进入的时候在该数据画点，而不每个数据都画点，因为每个数据都画点在数据量大的时候会非常卡。
            sampling: 'lttb'
        }
    ],
    }
    return option
}
```
调用文件
```html
<div @mouseleave="mouseleaveChart">
    <!-- @mouseoverChart="mouseoverChart"   -->
    <echart v-if="trendList && trendList.length > 0" id="failureTimesOption" @datazoomChart="datazoomChart" :option="failureTimesOption" @updateAxisPointer="updateAxisPointer" class="failure-time-chart"></echart>
</div>
```
```js
import Echart  from "./components/Echart";
export default {
  mixins: [tracker],
  data(){
    return {
      failureTimesOption: {},
      yData: [],
      xname: '',
      yname: '',
      pieces: [],
      xData: [],
      dataZoom: {},
      // trendList: [
      //   {trend: {start_time: "2019-08-19 13:14:40", end_time: "2019-10-21 00:10:31", percent: 0}, sign: "0"}
      //   {trend: {start_time: "2019-08-19 13:14:40", end_time: "2019-10-21 00:10:31", percent: 0}, sign: "0"}
      //   {trend: {start_time: "2019-08-19 13:31:20", end_time: "2019-10-21 17:27:23", percent: 0.01}, sign: "0"}
      //   {trend: {start_time: "2019-08-19 13:31:20", end_time: "2019-10-21 17:27:23", percent: 0.01}, sign: "1"}
      //   {trend: {start_time: "2019-08-29 19:06:58", end_time: "2019-10-21 17:44:03", percent: 0.01}, sign: "1"}
      //   {trend: {start_time: "2019-08-29 19:06:58", end_time: "2019-10-21 17:44:03", percent: 0.01}, sign: "1"}
      //   {trend: {start_time: "2019-09-01 18:36:21", end_time: "2019-10-23 12:15:49", percent: 0.01}, sign: "0"}
      //   {trend: {start_time: "2019-09-01 18:36:21", end_time: "2019-10-23 12:15:49", percent: 0.01}, sign: "0"}
      //   {trend: {start_time: "2019-09-01 18:53:01", end_time: "2019-10-23 12:32:29", percent: 0.01}, sign: "0"}
      // ]
      // 后端给的数据格式是这样的
    }
  },
  components: {
    Echart
  },
  methods: {
    // 从后端拿到数据后初始化线
    getEchart(trendList){
      // trendList是后端给的数据，格式在data里面举了例子，线的颜色主要是用sign来区分，singn为0组成的点连程的线为green，为1则是红色
      this.yData = [] // 纵坐标数据
      this.xname = '时间批序号'  //横坐标名字
      this.yname = '差值百分比'// 纵坐标名字
      this.pieces = [] //线改变颜色的配置
      this.xData = []  // x轴数据
      let flag = 0 // 线改变颜色的关键标记
      for(let n in trendList){
        let obj = {}
        obj.value = Number(n)
        obj.sign = Number(trendList[n].sign)
        this.xData.push(Number(n)) //x轴数据
        this.yData.push(trendList[n].trend.percent) // y轴数据
       
        // 设置线的颜色
        if( Number(n) + 1 < trendList.length){
          if(trendList[Number(n)].sign != trendList[Number(n) + 1].sign){
            if(trendList[Number(n)].sign == '0'){
              this.pieces.push({
                color: 'green',
                gte: flag,
                lt: Number(n) + 1
              })
              flag =  Number(n) + 1 
            }else {
              this.pieces.push({
                color: 'red',
                gte: flag,
                lt: Number(n) + 1,
              })
              flag =  Number(n) + 1 
            } 
          }
        }
      } 
      // 设置最后区域线颜色
      if(trendList[trendList.length - 1].sign == '0'){
        this.pieces.push({
          color: 'green',
          gte: flag,
          lt: trendList.length - 1,
        })
      }else {
        this.pieces.push({
          color: 'red',
          gte: flag,
          lt: trendList.length - 1,
        })
      }
      console.log("this.pieces", this.pieces)
      this.trendList = trendList
      // 把处理好的线颜色的配置赋值给echarts
      this.$nextTick(() => {
        this.failureTimesOption = lineOption(this.xData, this.yData, this.xname, this.yname, this.pieces, this.trendList)
      })
    },
    // 鼠标经过横坐标时触发方法，我之前用的是mouseover的方法，但是我发现如果数据特别多，那点就非常密集，很难选中点，难以触发想要的线段标记方法，所以改为触发该点横坐标就执行标记线段方法
    updateAxisPointer(params){
      // 数据比较大的时候，坐标轴缩放，由于鼠标触发线段标记方法时会重置option（watch方法里面有写）,所以虽然缩放了但是鼠标一旦移动想去看看缩放后其他点的标记情况那折线图就被重置了，缩放就回到最初了，所以这里需要保留缩放后的dataZoom，这样在触发横坐标方法的时候依旧赋值缩放过的dataZoom，这样dataZoom就不会每次都被初始化了
      if (this.failureTimesOption.dataZoom && this.dataZoom) {
        this.failureTimesOption.dataZoom[0].start = this.dataZoom.start;
        this.failureTimesOption.dataZoom[0].end = this.dataZoom.end;
      }
      //获取标记区域所需的数据，即获取echarts的一个配置项markArea,所需内容
      let markArea = {}
      if(params.axesInfo && params.axesInfo.length > 0){
        let dataIndex = params.dataIndex
        let dataIndex10 = params.dataIndex + 9
        // 这里是标记规则，我们项目的规则是，1，绿色线的点不触发标记方法，2，绿色点的最后十个点是不触发的，
        if(this.trendList[dataIndex].fault){ 
          if(this.trendList[dataIndex] && this.trendList[dataIndex].sign == 1 && this.trendList[dataIndex10] && this.trendList[dataIndex10].sign != 0){
            for(let n in this.trendList){
              if(n == dataIndex10){
                  markArea = {
                    itemStyle: {
                      color: 'rgba(255, 173, 177, 0.2)'
                    },
                    data: [[
                      {xAxis: dataIndex},
                      {xAxis: dataIndex10}
                    ]]
                  }
                  this.$set(this.failureTimesOption.series[0], 'markArea', markArea)
              }
            }
        }
        }else {
          let markArea = {data: []}
          this.$set(this.failureTimesOption.series[0], 'markArea', markArea)
        }
        
      } 
    },
    // 当鼠标离开echarts元素块时，标记消失的
    mouseleaveChart(){
      let markArea = {data: []}
      this.$set(this.failureTimesOption.series[0], 'markArea', markArea)
    },
    // 缩放方法,获取缩放后的dataZoom
    datazoomChart(event){
      // console.log("datazoomChart", event)
      if (event.batch) {
        // 在图表内使用鼠标滚轮缩放
        this.dataZoom = {
          start: event.batch[0].start,
          end: event.batch[0].end
        }
      } else {
        // 使用滑块缩放
        this.dataZoom = {
          start: event.start,
          end: event.end
        }
      }
    }
  }
}
```

