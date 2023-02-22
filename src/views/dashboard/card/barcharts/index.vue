<template>
  <div class="rrt" ref="rrr"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "barcharts",
  mounted() {
    let bar = echarts.init(this.$refs.rrr);
    bar.setOption({
      xAxis: {
        show: false,
        type:'category',
      },
      yAxis: { show: false },
      // 系列
      series: [
        {
          type: "bar",
          data: [32, 13, 42, 56, 100, 0, 42, 56, 91, 32, 54],
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
.rrt {
  width: 100%;
  height: 100%;
}
</style>