<template>
  <div class="oiu" ref="charts">
    <!-- 数据图的大小 -->
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "linechart",
  mounted() {
  console.log(echarts)
    let linecha = echarts.init(this.$refs.charts);
    linecha.setOption({
      xAxis: {
        show:false,
        type:'category'
      },
      yAxis: {  show:false},
      // 系列
      series: [
        {
          type: "line",
          data: [32, 13, 42, 56, 100, 0],
          // 设置拐点样式
          itemStyle: {
            opacity: 0,
          },
        //   线条颜色
          lineStyle:{
            color:'purple'
          },
        //   渐变
          areaStyle:{
                color:{
                    type:'linear',
                    x:0,
                    y:0,
                    x2:0,
                    y2:1,
                    colorStops:[{offset:0,color:'purple'},{offset:1,color:'#fff'}],
                    global:false,
                }
          },
        },
      ],
      // 布局
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style>
.oiu {
  width: 100%;
  height: 100%;
}
</style>