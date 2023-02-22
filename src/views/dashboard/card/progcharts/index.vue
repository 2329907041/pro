<template>
  <div class="ttt" ref="tttt"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "progcharts",
  mounted() {
    let bar = echarts.init(this.$refs.tttt);
    bar.setOption({
      xAxis: {
        show: false,
        mini: 0,
        max: 100,
      },
      yAxis: { show: false, type: "category" },
      // 系列
      series: [
        {
          type: "bar",
          data: [32],
          // 宽度设置
          barWidth: 10,
          color: "yellowgreen",
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          // 文本
          label:{
            show:true,
            formatter:'|',
            // 文本标签位置
            position:'right'
          }
        },
      ],
      // 布局
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip: {},
    });
  },
};
</script>

<style>
.ttt {
  width: 100%;
  height: 100%;
}
</style>