<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="formid">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="formid.cate1"
          @change="handerq"
          :disabled="show"
        >
          <el-option
            :label="cate.name"
            :value="cate.id"
            v-for="(cate, index) in list1"
            :key="cate.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="formid.cate2"
          @change="handerw"
          :disabled="show"
        >
          <el-option
            :label="cate2.name"
            :value="cate2.id"
            v-for="(cate2, index) in list2"
            :key="cate2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="formid.cate3"
          @change="handere"
          :disabled="show"
        >
          <el-option
            :label="cate1.name"
            :value="cate1.id"
            v-for="(cate1, index) in list3"
            :key="cate1.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
  <!-- <div class="nox">\</div> -->
</template>

<script>
export default {
  name: "thcard",
  props: ["show"],
  data() {
    return {
      formid: {
        cate1: "",
        cate2: "",
        cate3: "",
      },
      list1: [],
      list2: [],
      list3: [],
    };
  },
  mounted() {
    this.getone();
  },
  methods: {
    async getone() {
      let re = await this.$API.attr.getaal();
      if (re.code == 200) {
        this.list1 = re.data;
      }
    },
    async handerq() {
      this.list2 = [];
      this.list3 = [];
      this.formid.cate2 = "";
      this.formid.cate3 = "";
      let { cate1 } = this.formid;
      this.$emit("getmetaid", { id: cate1, level: 1 });
      let re = await this.$API.attr.getabl(cate1);
      if (re.code == 200) {
        this.list2 = re.data;
      }
    },
    async handerw() {
      this.list3 = [];
      this.formid.cate3 = "";
      let { cate2 } = this.formid;
      this.$emit("getmetaid", { id: cate2, level: 2 });
      let re = await this.$API.attr.getacl(cate2);
      if (re.code == 200) {
        this.list3 = re.data;
      }
    },
    handere() {
      let { cate3 } = this.formid;
      this.$emit("getmetaid", { id: cate3, level: 3 });
    },
  },
};
</script>

<style>
</style>