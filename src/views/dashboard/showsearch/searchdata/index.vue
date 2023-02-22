<template>
  <div>
    <div>
      <span>搜索用户数</span>
      <svg
        t="1676381808754"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1391"
        width="16"
        height="16"
      >
        <path
          d="M513.3312 94.72a409.6 409.6 0 1 0 409.6 409.6 409.9584 409.9584 0 0 0-409.6-409.6z m0 762.88a353.28 353.28 0 1 1 353.28-353.28 353.6384 353.6384 0 0 1-353.28 353.0752z"
          fill="#cdcdcd"
          p-id="1392"
        ></path>
        <path
          d="M513.3312 600.7296a28.16 28.16 0 0 0 28.16-28.16V292.1984a28.16 28.16 0 0 0-56.32 0v280.3712a28.16 28.16 0 0 0 28.16 28.16zM513.3312 641.5872a36.2496 36.2496 0 1 0 36.2496 36.2496 36.2496 36.2496 0 0 0-36.2496-36.2496z"
          fill="#cdcdcd"
          p-id="1393"
        ></path>
      </svg>
    </div>
    <div class="cen">
      <el-row :gutter="5">
        <el-col :span="12">
          <span>1234</span>
        </el-col>
        <el-col :span="12">
          <span>
            72.1
            <svg
              t="1676279834483"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2986"
              width="16"
              height="16"
            >
              <path
                d="M613.888 715.264h-41.984C448.512 715.264 348.16 614.912 348.16 491.52s99.84-223.232 223.232-223.232h41.984c123.392 0 223.232 99.84 223.232 223.232 0.512 123.392-99.328 223.744-222.72 223.744z"
                fill="#d81e06"
                opacity=".2"
                p-id="2987"
              ></path>
              <path
                d="M144.384 465.92c-7.68 0-15.36 3.584-19.968 9.728-8.704 11.264-6.656 27.136 4.608 35.84l391.68 304.64L896 510.976c10.752-8.704 12.8-25.088 3.584-35.84-8.704-10.752-25.088-12.8-35.84-3.584l-343.552 279.552L160.256 471.04c-5.12-3.584-10.24-5.12-15.872-5.12z"
                fill="#d81e06"
                p-id="2988"
              ></path>
              <path
                d="M144.384 189.44c-7.68 0-15.36 3.584-19.968 9.728-8.704 11.264-6.656 27.136 4.608 35.84l391.68 304.64L896 234.496c10.752-8.704 12.8-25.088 3.584-35.84-8.704-10.752-25.088-12.8-35.84-3.584l-343.552 279.552L160.256 194.56c-5.12-3.584-10.24-5.12-15.872-5.12z"
                fill="#d81e06"
                opacity=".5"
                p-id="2989"
              ></path></svg
          ></span>
        </el-col>
      </el-row>
    </div>
    <div class="charts" ref="wd"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "searchdata",
  props: ["title"],
  mounted(){
    let linecha = echarts.init(this.$refs.wd);
    linecha.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: { show: false },
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
          lineStyle: {
            color: "purple",
          },
          //   渐变
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "purple" },
                { offset: 1, color: "#fff" },
              ],
              global: false,
            },
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

<style scope>
/* .box{
    width: 100%;
    height: 100px;
} */
.cen {
  padding: 10px 0px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>