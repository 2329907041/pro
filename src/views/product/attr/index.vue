<template>
  <div class="box">
    平台属性管理
    <el-card style="margin: 20px 0px">
      <thcard @getmetaid="getmetaid"  :show='!isshow'/>
    </el-card>
    <el-card>
      <div v-show="isshow">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="isshow = false"
          :disabled="!cate3id"
          >添加属性</el-button
        >
        <el-table :data="dlist" border style="width: 100%">
          <el-table-column
            type="index"
            label="序列号"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="180">
          </el-table-column>
          <el-table-column prop="address" label="属性值列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(row2, index) in row.attrValueList"
                :key="index"
                style="margin: 0px 20px"
              >
                {{ row2.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作" width="280">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                @click="change(row)"
              >
                修改</el-button
              >
              <el-button type="danger" icon="el-icon-delete"> 删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isshow">
        <el-form ref="form" :model="attrinfo" label-width="80px" :inline="true">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrinfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addshu"
          style="margin: 20px 0px"
          :disabled="!attrinfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="deall">取消</el-button>
        <el-table style="width: 100%" border :data="attrinfo.attrValueList">
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <!-- 进行切换 -->
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="ch(row)"
                @keyup.native.enter="ch(row)"
                :ref="$index"
              ></el-input>
              <span v-else @click="jujiao(row, $index)">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="380">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}`"
                @onConfirm="deletethis($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete-solid"
                  slot="reference"
                >
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="margin: 10px" @click="updataa"
          >保存</el-button
        >
        <el-button @click="deall">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "attr",
  data() {
    return {
      // flag: true,
      cate1id: "",
      cate2id: "",
      cate3id: "",
      dlist: [],
      isshow: true,
      attrinfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 0,
        flag: true,
      },
    };
  },
  methods: {
    deletethis(index) {
      this.attrinfo.attrValueList.splice(index, 1);
    },
    async updataa() {
      this.attrinfo.attrValueList = this.attrinfo.attrValueList.filter(
        (item) => {
          if (item.valueName != "") {
            delete item.flag;
            return true;
          }
        }
      );
      try {
         await this.$API.attr.addsxz(this.attrinfo);
         this.isshow=true;
         this.$message({type:'success' ,message:"保存成功"});
          this.getlist();
      } catch (error) {
        
      }
     
    },
    change(row) {
      (this.isshow = false), (this.attrinfo = cloneDeep(row));
      this.attrinfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    deall() {
      (this.isshow = true),
        (this.attrinfo = {
          attrName: "",
          attrValueList: [],
          categoryId: this.cate1id,
        });
    },
    ch(row) {
      console.log(row);
      if (row.valueName.trim() == "") {
        this.$message("请你输入一个正确的值");
        return;
      }
      let isr = this.attrinfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isr) return;

      row.flag = false;
      console.log(flag);
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
        this.getlist();
      }
    },
    jujiao(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    addshu() {
      this.attrinfo.attrValueList.push({
        attrid: this.attrinfo.id,
        valuename: "",
        flag: true,
      });
    },
    async getlist() {
      let re = await this.$API.attr.getall(
        this.cate1id,
        this.cate2id,
        this.cate3id
      );
      console.log(re);
      if (re.code == 200) {
        this.dlist = re.data;
      }
    },
  },
};
</script>

<style>
</style>