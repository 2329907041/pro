<template>
  <div class="box">
    品牌管理
    <el-table :data="records" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="120" align="center">
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80" align="center">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="80" align="center">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-sort-down"
            size="mini"
            @click="sale(row)"
            v-if="row.isSale == 0"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-sort-up"
            size="mini"
            @click="cancel(row)"
            v-else
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getsee(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
          <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :show-close="false"
            size="50%"
          >
            <el-row>
              <el-col :span="5">标题</el-col>
              <el-col :span="16">{{ seethis.skuName }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">描述</el-col>
              <el-col :span="16">{{ seethis.skuDesc }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">价格</el-col>
              <el-col :span="16">{{ seethis.price }}元</el-col>
            </el-row>

            <el-row>
              <el-col :span="5">平台属性</el-col>
              <el-col :span="16"
                ><el-tag
                  v-for="(see, index) in seethis.skuAttrValueList"
                  :key="see.id"
                  >{{ see.attrName }}</el-tag
                ></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="5">商品图片</el-col>
              <el-col :span="16">
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item v-for="item in seethis.skuImageList" :key="item.id">
                    <img :src=item.imgUrl style='width:100%; heigh:100%;' >
                  </el-carousel-item>
                </el-carousel></el-col
              >
            </el-row>
          </el-drawer>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center"
      :total="total"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next,jumper,->,sizes, total"
      @current-change="getsl"
      @size-change="sizechange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "sku",
  data() {
    return {
      drawer: false,
      skulis: [],
      page: 1,
      limit: 3,
      total: 1,
      records: [],
      seethis: {},
    };
  },
  methods: {
    edit() {
      this.$message("功能未完善");
    },
    async sale(row) {
      let re = await this.$API.skutrue.onSale(row.id);
      if (re.code == 200) {
        row.isSale = 1;
        this.$message("正在开发中");
      }
    },
    async cancel(row) {
      let re = await this.$API.skutrue.cancelSale(row.id);
      if (re.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功" });
      }
    },
    async getsl(pages = 1) {
      this.page = pages;
      const { page, limit } = this;
      let re = await this.$API.skutrue.getskulispl(page, limit);
      if (re.code == 200) {
        this.records = re.data.records;
        this.total = re.data.total;
      }
    },

    sizechange(limit) {
      this.limit = limit;
      this.getsl();
    },
    async getsee(row) {
      this.drawer = true;
      console.log(row);
      let req = await this.$API.skutrue.seesku(row.id);
      if (req.code == 200) {
        this.seethis = req.data;
      }
    },
  },
  mounted() {
    this.getsl();
  },
};
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
/* 深度选择器 */
 >>>.el-carousel__button{
    width:10px;
    height:10px;
    background:red;
    border-radius:50%;
  }
</style>
