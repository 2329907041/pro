<template>
  <div>
    <el-card>
      <div class="clearfix" slot="header">
        <el-tabs v-model="salechoose">
          <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
          <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
        </el-tabs>
        <!-- 右侧内容 -->
        <div class="you">
          <span @click="TD">今日</span>
          <span @click="TW">本周</span>
          <span @click="TM">本月</span>
          <span @click="TY">本年</span>
          <el-date-picker
            v-model="date"
            class="date"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- 下面内容 -->
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <div class="chartss" ref="charts">
              132
              <span class="paiMin">0</span>
              <span class="pinPai">肯德基</span>
              <span class="shiQig">1234</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <h4>门店{{ salechoose }}排行</h4>
              <ul class="saleul">
                <li class="saleli">
                  <span class="paiMin">0</span>
                  <span class="pinPai">肯德基</span>
                  <span class="shiQig">1234</span>
                </li>
                <li class="saleli">
                  <span class="paiMin">2</span>
                  <span class="pinPai">肯德基</span>
                  <span class="shiQig">1234</span>
                </li>
                <li class="saleli">
                  <span class="paiMin">3</span>
                  <span class="pinPai">肯德基</span>
                  <span class="shiQig">1234</span>
                </li>
                <li class="saleli">
                  <span>4</span>
                  <span class="pinPai">肯德基</span>
                  <span class="shiQig">1234</span>
                </li>
                <li class="saleli">
                  <span>5</span>
                  <span class="pinPai">肯德基</span>
                  <span class="shiQig">1234</span>
                </li>
                <li class="saleli">
                  <span>6</span>
                  <span class="pinPai">肯德基</span>
                  <span class="shiQig">1234</span>
                </li>
                <li class="saleli">
                  <span>7</span>
                  <span class="pinPai">肯德基</span>
                  <span class="shiQig">1234</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      salechoose: "销售额",
      ech: null,
      date: [],
    };
  },
  computed: {
    ...mapState({
      liststate: (state) => state.home.list,
    }),
  },
  methods: {
    TD() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    TW() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    TM() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    TY() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
  mounted() {
    this.ech = echarts.init(this.$refs.charts);
    this.ech.setOption({
      title: { text: this.salechoose + "趋势" },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.liststate.olderFullYearAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.liststate.userFullYearAxis,
        },
      ],
    });
  },
  //   图只会执行一次所以开始监听
  watch: {
    salechoose() {
      this.ech.setOption({
        title: { text: this.salechoose + "趋势" },
        xAxis: [
          {
            data:
              this.salechoos == "销售额"
                ? this.liststate.userFullYearAxis
                : this.liststate.orderFullYearAxis,
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data:
              this.salechoos == "销售额"
                ? this.liststate.userFullYear
                : this.liststate.orderFullYear,
          },
        ],
      });
    },
  },
};
</script>

<style scope>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.you {
  position: absolute;
  right: 0px;
}
.clearfix span {
  margin: 0px 10px;
}
.chartss {
  width: 100%;
  height: 400px;
}
.saleul {
  list-style: none;
  width: 100%;
  height: 400px;
  padding: 0px;
}
.saleli {
  height: 8%;
  margin: 10px, 0px;
}
.paiMin {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
  /* padding: 10px; */
}
.pinPai {
  padding: 0px 10px;
}
.shiQig {
  float: right;
}
</style>