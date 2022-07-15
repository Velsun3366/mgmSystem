<!--  -->
<template>
  <div class="data_list">
    <div class="title">
      <el-card>
        <el-icon><Document /></el-icon>
        <span>数据列表</span>
      </el-card>
    </div>
    <div class="data_table">
      <el-table
        :border="true"
        ref="multipleTableRef"
        :data="props.tableDataList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="服务单号" width="120" property="id">
          <!-- <template #default="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column property="date" label="申请时间" width="120" />
        <el-table-column
          property="memberUsername"
          label="用户账号"
          show-overflow-tooltip
        />
        <el-table-column
          property="address"
          label="退款金额"
          show-overflow-tooltip
        />
        <el-table-column
          property="status"
          :label="status===1?'退货中':'已完成'"
          show-overflow-tooltip
        />
        <el-table-column
          property="address"
          label="操作"
          show-overflow-tooltip
          fixed="right"
          width="180"
          align="center"
        >
          <el-button>查看详情</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="data_pagination">
      <div class="left">
        <el-select v-model="value" class="m-2" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" style="margin-left: 10px">确定</el-button>
      </div>
      <div class="right">
        <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
import { Document } from "@element-plus/icons-vue";
interface user {
  data: string;
  name: string;
  address: string;
}
let props = defineProps({
  tableDataList: {
    type: Array,
  },
});


const multipleSelection = ref<user[]>([]);
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const handleSelectionChange = (val: user[]) => {
  multipleSelection.value = val;
};
// const options = [
//   {
//     value: "Option1",
//     label: "Option1",
//   },
//   {
//     value: "Option2",
//     label: "Option2",
//   },
//   {
//     value: "Option3",
//     label: "Option3",
//   },
//   {
//     value: "Option4",
//     label: "Option4",
//   },
//   {
//     value: "Option5",
//     label: "Option5",
//   },
// ];
</script>
<style lang="less" scoped>
.data_list {
  .el-card {
    box-shadow: none;
    margin-top: 20px;
  }
  .data_table {
    margin-top: 20px;
  }
  .data_pagination {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    align-items: center;
  }
  :deep(.el-card__body) {
    display: flex;
    align-items: center;
  }
}
</style>
