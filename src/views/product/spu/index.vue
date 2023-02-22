<template>
  <div class="box">
    spu管理
    <el-card style="margin: 20px 0px">
      <thcard @getmetaid="getmetaid" />
    </el-card>
    <el-card>
      <!-- 展示第一部分 -->
      <div slot="header" v-show="scon == 0">
        <el-button type="primary" icon="el-icon-plus" @click="addspuu"
          >添加spu</el-button
        >
        <el-button type="primary" icon="el-icon-plus" @click="addsku"
          >添加sku</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加spu"
                @click="addsku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updata(row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前全部spu"
                @click="seesku(row)"
              ></el-button>
              <template>
                <el-popconfirm
                  title="这是一段内容确定删除吗？"
                  @onConfirm="delspu(row)"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    title="删除spu"
                    slot="reference"
                  ></el-button>
                </el-popconfirm>
              </template>
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
          @current-change="anniu"
          @size-change="sizech"
        >
        </el-pagination>
      </div>
      <skufrom v-show="scon == 2" @changesco="changesco" ref="sku" />
      <spufrom v-show="scon == 1" @changesc="changesc" ref="spu" />
      <el-dialog :title='`展示${spu.spuName}数据`' :visible.sync="Visible"  :before-close="handleClose">
        <el-table :data="spulist" style="width: 100%"  v-loading="loading">
          <el-table-column prop="skuName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="width">
          </el-table-column>
          <el-table-column prop="weight" label="重量" width="width">
          </el-table-column>
          <el-table-column prop="skuDefaultImg" label="默认图片" width="width">
            <template slot-scope="{row,$indx}">
                <img :src="row.skuDefaultImg" style="width:100px;height:100px">
            </template>
          
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
    <el-button type="primary" @click="as">ceshi</el-button>
  </div>
</template>

<script>
import spufrom from "./spufrom";
import skufrom from "./skufrom";
export default {
  components: {
    spufrom,
    skufrom,
  },
  name: "spu",
  data() {
    return {
      loading:true,
      spulist: [],
      Visible: 0,
      cate1id: "",
      cate2id: "",
      cate3id: "",
      page: 1,
      limit: 3,
      records: [], //展示数据
      total: 1,
      scon: 0,
      spu: {},
      
    };
  },
  methods: {
    handleClose(){
      this.loading=true;
      this.spulist=[];
      done();
    },
    async seesku(row) {
      this.Visible = 1;
      this.spu = row;
      let ewq = await this.$API.sku.seeS(row.id);
      if (ewq.code == 200) {
        this.spulist = ewq.data;
        this.loading=false;
      }
    },
    async as() {
      let ew = await this.$API.sku.saveskuall({});
    },
    addsku(row) {
      this.scon = 2;
      console.log(row);
      this.$refs.sku.getdata(this.cate1id, this.cate2id, row);
    },
    // 删除
    async delspu(row) {
      console.log(row);
      let req = await this.$API.spu.delspu(row.id);

      // if (req.code == 200) {
      //   this.$message({ type: "success", message: "删除成功" });
      //   this.getspulist(this.records.length > 1 ? this.page : this.page - 1);
      // }
    },
    addspuu() {
      this.scon = 1;
      this.$refs.spu.addspu(this.cate3id);
    },
    changesco(sec) {
      this.scon = sec;
      this.getspulist();
    },
    changesc({ sec, flag }) {
      this.scon = sec;
      // if (flag == "修改") {
      //   this.getspulist(this.page);
      // } else {
      console.log(sec);
      this.getspulist();
      // }
    },
    updata(row) {
      this.scon = 1;
      this.$refs.spu.init(row);
    },
    sizech(limit) {
      this.limit = limit;
      this.getspulist();
    },
    // 分页器按钮的跳转
    anniu(page) {
      this.page = page;
      this.getspulist();
    },
    getmetaid(q) {
      // console.log(q)
      let { id, level } = q;
      // console.log(id, level)
      if (level == 1) {
        this.cate1id = id;
        this.cate2id = "";
        this.cate3id = "";
      } else if (level == 2) {
        this.cate2id = id;
        this.cate3id = "";
      } else if (level == 3) {
        this.cate3id = id;
        this.getspulist();
      }
    },
    async getspulist(pages = 1) {
      this.page = pages;
      const { cate3id, limit, page } = this;
      let re = await this.$API.spu.getspu(page, limit, cate3id);
      if (re.code == 200) {
        this.total = re.data.total;
        this.records = re.data.records;
      }
    },
  },
};
</script>

<style>
</style>