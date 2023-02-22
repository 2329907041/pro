<template>
  <div>
    <div class="header">
      <div class="catego">
        <span>销售额类别占比</span>
        <div>
          <el-radio-group v-model="radio1">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="tu" ref="tupian"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      radio1: "全部渠道",
    };
  },
  mounted() {
    let rechar = echarts.init(this.$refs.tupian);
    rechar.setOption({
      title: {
        text: "",
        subtext: "",
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outsize",
          },

          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    rechar.on("mouseover", (params) => {
      const { name, value } = params.data;
      rechar.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    });
  },
};
</script>

<style scope>
.catego {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  border-bottom: 1px solid #eee;
  padding: 5px;
}
.tu {
  width: 100%;
  height: 300px;
}
</style>