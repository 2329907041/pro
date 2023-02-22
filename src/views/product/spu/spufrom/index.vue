<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmid">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradlist"
            :key="tm.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          row="4"
          placeholder="描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="spu图片">
        <!-- action 设置图片上传的地址 -->
        <el-upload
          action="dev-api/admin/product/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="price"
          :on-success="upsuc"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性 ">
        <el-select placeholder="请选择 " v-model="unselet1">
          <el-option
            v-for="item in unselet"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!unselet1"
          @click="addse"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="width"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            label="属性值名称"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index)"
                >{{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              ></el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="savespu">保存</el-button>
        <el-button @click="backlast()"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spufrom",

  data() {
    return {
      attrid: "",
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0,
        tmId: 0,
        spuName: "",
        description: "",
        spuImageList: [],
        spuSaleAttrList: [],
      },
      unselet1: "",
      tradlist: [],
      price: [],
      pricelist: [],
      saleattr: [],
    };
  },
  computed: {
    unselet() {
      let re = this.saleattr.filter((item) => {
        // every会返回一个布尔值
        // if (this.spu.spuSaleAttrList) {
        return this.spu.spuSaleAttrList.every((itemm) => {
          return item.name != itemm.saleAttrName;
        });
        // }else{
        //      return item.name
        // }
      });
      return re;
    },
  },
  methods: {


    backlast() {
      this.$emit("changesc", { sec: 0, flag: "" });
      //  清除数据
      //  Object.assign合并对象

      // /this._data可以操作data的响应式数据
      // this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
      Object.assign(this._data,this.$options.data())
    },
    // 添加spu的请求
    async addspu(category3Id) {
      let req = await this.$API.spu.getspuneww();
      if (req.code == 200) {
        this.tradlist = req.data;
      }
      let ree = await this.$API.spu.getspushu();
      if (ree.code == 200) {
        this.saleattr = ree.data;
      }
      this.spu.category3Id = category3Id;
    },
    // 保存添加
    async savespu() {
      // 整理参数
      console.log(this.spu);
      this.spu.spuImageList = this.pricelist.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });

      let re = await this.$API.spu.requpdataspi(this.spu);
      console.log(re);
      if (re.code == 200) {
        Object.assign(this._data, this.$options.data());
        this.$emit("changesc", {
          scene: 0,
          flag: this.spu.id ? "修改" : "添加",
        });
      }
    },
    showInput(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");

      // row.inputVisible = true;
      // this.$nextTick(_ => {
      //   this.$refs.saveTagInput.$refs.input.focus();
      // });
    },
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      let r = row.spuSaleAttrValueList.every((item) => {
        item.saleAttrValueName != inputValue;
      });
      //  console.log(`${r}11`)
      if (inputValue.trim() == "") {
        this.$message(`属性值不能为空或重复${r}`);
        return;
      }
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      row.spuSaleAttrValueList.push(newSaleAttrValue);

      row.inputVisible = false;
      // console.log(inputVisible);
    },
    addse() {
      const [baseSaleAttrId, saleAttrName] = this.unselet1.split(":");
      let news = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] };

      //   添加
      this.spu.spuSaleAttrList.push(news);
      this.unselet1 = "";
    },
    upsuc(response, file, fileList) {
      this.pricelist = fileList;
    },
    handleRemove(file, fileList) {
      // 提交的数据需要处理
      this.pricelist = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 初始化数据展示
    async init(row) {
      console.log(row);
      let re = await this.$API.spu.getspunew(row.id);
      if (re.code == 200) {
        this.spu = re.data;
      }

      let req = await this.$API.spu.getspuneww();
      if (req.code == 200) {
        this.tradlist = req.data;
      }

      let rew = await this.$API.spu.getspupri(row.id);

      if (rew.code == 200) {
        let r = rew.data;
        r.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.price = r;
      }
      let ree = await this.$API.spu.getspushu();
      if (ree.code == 200) {
        this.saleattr = ree.data;
      }
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>