<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="spu名称"> {{ spu.spuName }} </el-form-item>
      <el-form-item label="sku名称">
        <el-input placeholder="sku名称" v-model="attrinfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格"
          v-model="attrinfo.price"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量" v-model="attrinfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="描述规格">
        <el-input
          type="textarea"
          row="4"
          placeholder="描述规格"
          v-model="attrinfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item
            v-for="(attr, index) in attrinfolist"
            :key="attr.id"
            :label="attr.attrName"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                v-for="(attrval, index) in attr.attrValueList"
                :key="attrval.id"
                :label="attrval.valueName"
                :value="`${attr.id}:${attrval.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item
            :label="item.saleAttrName"
            v-for="(item, index) in sellist"
            :key="item.id"
          >
            <el-select placeholder="请选择 " v-model="item.attrIdAndValueId">
              <el-option
                v-for="(item1, index) in item.spuSaleAttrValueList"
                :key="item1.id"
                :label="item1.saleAttrName"
                :value="`${item.id}:${item1.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          border
          :data="imglist"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80"> </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                v-if="row.ismr == 0"
                @click="contort(row)"
                >设为默认</el-button
              >
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="ass">保存</el-button>
        <el-button @click="lastyei">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "skufrom",
  data() {
    return {
      imglist: [],
      sellist: [],
      attrinfolist: [],
      attrinfo: {
        // 第一类父类传给子组件
        category3Id: 0,
        tmId: 0,
        spuId: 0,
        // 第二类响应式数据
        price: 0,
        weight: "",
        skuDesc: "",
        skuName: "",
        // 第三类向服务器获取数据
        // 默认的数据
        skuDefaultImg: "",
        //
        skuAttrValueList: [],
        // 图片列表
        skuImageList: [],

        skuDefaultImg: "",
        // 销售属性数组
        skuSaleAttrValueList: [],
      },
      spu: {},
      imageList: [],
    };
  },
  methods: {
    async ass() {
      // // 整理数据\
      // // 平台属性
      // const [attrinfolist, spu, sellis, imglist, attrinfo] = this;
      const arr = [];
      this.attrinfolist.forEach((item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          let obj = {attrId, valueId};
          arr.push(obj);
        }
      });
      console.log(arr)
       this.attrinfo.skuAttrValueList = arr;
      // 销售属性
      this. attrinfo.skuSaleAttrValueList = this.sellist.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);
    
    // 图片数据
       this.attrinfo.skuImageList = this.imglist.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.ismr,
          spuImgId: item.id,
        }; 

      });
    
    let ew = await this.$API.sku.saveskuall(this.attrinfo);
    if(ew.code==200){
       Object.assign(this._data, this.$options.data());
        this.$message({type:'success',message:'添加成功'})

        this.$emit("changesco", 0);
    }
    },
    lastyei() {
      Object.assign(this._data, this.$options.data());

      this.$emit("changesco", 0);
    },
    contort(row) {
      this.imglist.filter((item) => {
        item.ismr = 0;
      });
      row.ismr = 1;
      // 收集默认图片的地址
      this.attrinfo.skuDefaultImg = row.imgUrl;
    },
    // 选中状态发生改变
    handleSelectionChange(params) {
      this.imageList = params;
    },
    // 进行发送获取3个数据
    async getdata(category1Id, category2Id, row) {
      this.attrinfo.category3Id = row.category3Id;
      this.attrinfo.spuId = row.id;
      this.attrinfo.tmId = row.tmId;
      this.spu = row;
      console.log(row);

      console.log(this.spu);

      let rea = await this.$API.sku.getskuid(row.id);
      if (rea.code == 200) {
         const tr= rea.data;

        tr.filter((item) => {
          item.ismr = 0;
        });
        this.attrinfo.skuImageList = tr;
        this.imglist = tr;
      }
      let reb = await this.$API.sku.getskusel(row.id);
      if (reb.code == 200) {
        this.sellist = reb.data;
      }
      let rec = await this.$API.sku.getskucate(
        category1Id,
        category2Id,
        row.category3Id
      );
      if (rec.code == 200) {
        this.attrinfolist = rec.data;
      }
    },
  },
};
</script>

<style>
</style>