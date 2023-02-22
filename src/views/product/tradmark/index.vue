<template>
  <div class="box">
    <el-button type="primary" icon="el-icon-plus" @click="show">添加</el-button>
    <div class="jianxi"></div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column label="序号" width="80px" align="center" type="index">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="logoUrl"
        label="品牌logo"
        width="width"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="width: 60px; height: 50px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit" @click="xiugaitm(row)">
            修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" @click="deltm(row)">
            删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="jianxi"></div>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :total="99"
      :current-page="6"
      :page-size="3"
      :page-sizes="[3, 5, 10]"
      layout="total,sizes,prev, pager, next,jumper"
    >
    </el-pagination>
    <!-- 对话框 -->

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
              style="border: 1px dashed #d9d9d9"
            ></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addpp">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradmark",
  data() {
    return {
      rules: {
        tmName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请选择图片" }],
      },
      page: 1,
      limit: 3,
      total: 0,
      //列表展示的数据
      list: [],
      //对话框显示与隐藏控制的属性
      dialogFormVisible: false,
      //收集品牌信息:对象身上的属性，不能瞎写，需要看文档的
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
    };
  },
  methods: {
    addpp() {
      this.dialogFormVisible = false;
      // 验证规则通过再发送
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (!this.tmForm.id) {
            let re = await this.$API.tradmark.getpp(this.tmForm);
            if (re.code == 200) {
              this.$message("添加成功");
              this.getd();
            }
          } else {
            let re = await this.$API.tradmark.getcp(this.tmForm);
            if (re.code == 200) {
              this.$message("修改成功");
              this.getd();
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.tmForm.logoUrl = res.data;
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    xiugaitm(row) {
      this.dialogFormVisible = true;
      this.tmForm = { ...row };
    },
    deltm(row) {
      console.log(row);
      this.$confirm(`此操作将永久删除${row.tmName}是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let re = await this.$API.tradmark.getdp(row.id);
          if (re.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getd(this.list > 1 ? this.page : this.page - 1);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    show() {
      this.dialogFormVisible = true;
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    handleCurrentChange(page) {
      (this.page = page), this.getd();
    },
    // 分页器展示的个数改变
    handleSizeChange(limit) {
      (this.limit = limit), this.getd();
    },
    async getd(pager = 1) {
      this.page = pager;

      // console.log(this.$API)
      const { page, limit } = this;
      let re = await this.$API.tradmark.gettm(page, limit);
      if (re.code == 200) {
        this.total = re.data.total;
        this.list = re.data.records;
      }
    },
  },
  mounted() {
    this.getd();
  },
};
</script>

<style lang="scss" scoped>
.box {
  .jianxi {
    margin: 15px;
  }
  // 上传的样式
  .avatar-uploader {
    .el-upload {
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>