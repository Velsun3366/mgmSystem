<!--  -->
<template>
  <div class="common-layout returnApply">
    <el-container>
      <el-header><BreadCrumbVue></BreadCrumbVue></el-header>
      <el-main class="main_content">
        <div class="search_card">
          <el-card>
            <div class="title">
              <div class="left">
                <el-icon><Search /></el-icon>
                <span>筛选搜索</span>
              </div>
              <div class="right">
                <el-button>重置</el-button>
                <el-button type="primary">查询搜索</el-button>
              </div>
            </div>
            <div>
              <el-form
                label-position="right"
                label-width="140px"
                size="default"
                :model="searchForm"
              >
                <el-form-item label="输入搜索:">
                  <el-input placeholder="服务单号" type="text" />
                </el-form-item>
                <el-form-item label="处理状态:">
                  <el-select
                    v-model="searchForm.status"
                    class="m-2"
                    placeholder="全部"
                  >
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="申请时间:">
                  <el-date-picker
                    v-model="searchForm.applyValue"
                    type="date"
                    placeholder="请选择时间"
                  />
                </el-form-item>
                <el-form-item label="操作人员">
                  <el-input placeholder="全部" type="text" />
                </el-form-item>
                <el-form-item label="处理时间:">
                  <el-date-picker
                    v-model="searchForm.handleValue"
                    type="date"
                    placeholder="请选择时间"
                  />
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
        <DataList :tableData="tableDataList"></DataList>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
import BreadCrumbVue from "../../components/BreadCrumb.vue";
import { Search } from "@element-plus/icons-vue";
import DataList from "../../components/DataTable.vue";
import { ReturnApplyList } from "../../request/api";
let tableDataList = reactive({});
ReturnApplyList().then((res) => {
  tableDataList = res.data.list;

  // console.log(tableData);
});

const searchForm = reactive({
  applyValue: "",
  status: "",
  handleValue: "",
});

const statusOptions = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
</script>
<style lang="less" scoped>
.returnApply {
  position: relative;
  .el-header {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
    --el-header-height: 40px;
    position: fixed;
    z-index: 9999;
    width: 100%;
  }
  .main_content {
    padding: 10px 20px;
    margin-top: 50px;
    margin-bottom: 60px;
  }
  .search_card {
    .el-card {
      box-shadow: none;
      margin-top: 20px;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        .el-icon {
          vertical-align: middle;
        }
      }
    }
  }
  .el-form {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;

    :deep(.el-input__wrapper) {
      width: 200px;
    }
  }
}
</style>
