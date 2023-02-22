<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card>
          <div class="tit">
            <span>线上热门搜索</span>
            <span>
              <el-dropdown>
                <i class="el-icon-more"></i>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                  <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
          <div>
            <el-col :span="12">
              <searchdata title="搜索用户数"></searchdata>
            </el-col>
            <el-col :span="12">
              <searchdata title="人均搜索次数"></searchdata>
            </el-col>
          </div>
          <!-- table -->
          <el-table style="width: 100%" border>
            <el-table-column prop="index" label="排名" width="80">
            </el-table-column>
            <el-table-column prop="name" label="搜索关键字"> </el-table-column>
            <el-table-column prop="address" label="用户数" sortable width="180">
            </el-table-column>
            <el-table-column prop="address" label="周涨幅" sortable width="180">
            </el-table-column>
          </el-table>
          <el-pagination class='pagin'  layout="prev, pager, next" :total="50">
          </el-pagination>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
         <lin></lin>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import searchdata from "./searchdata";
import lin from './lin'
export default {
  name: "showsearch",
  components: {
    searchdata,
    lin,
  },
};
</script>

<style scope>
.tit {
  margin: 10px 0px;
  padding: 10px 0px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}
.pagin{
  float: right;
}
</style>