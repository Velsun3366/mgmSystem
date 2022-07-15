<!--  -->
<template>
  <div class="admin_list">
    <Dialog :isShow="isShow" @close="closeRoleDialog" :uid="uid" />
    <Edit :editShow="editShow" @editClose="editClose" :uEditInfo="uEditInfo" />
    <div class="title">
      <el-card>
        <div class="left">
          <el-icon class="title_icon"><Document /></el-icon>
          <span>数据列表</span>
        </div>
        <div class="right">
          <el-button type="primary" @click="roleEdit">添加</el-button>
        </div>
      </el-card>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="60" />
      <el-table-column prop="username" label="账号" width="200" />
      <el-table-column prop="nickName" label="姓名" width="150" />
      <el-table-column prop="email" label="邮箱" width="150" />
      <el-table-column label="添加时间" width="150">
        <template #default="{ row }">
          {{ timeFormat(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="最后登录" width="150">
        <template #default="{ row }">
          {{ timeFormat(row.loginTime) }}
        </template>
      </el-table-column>
      <el-table-column label="是否可用" width="150" align="center">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button type="text" @click="showDialog(row.id)"
            >分配角色</el-button
          >
          <el-button type="text" @click="roleEdit(row)" v-permission="'editUser'">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :small="true"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, Ref } from "vue";
import { getAdminList } from "../../request/api";
import { timeFormat } from "../../../utils/tools";
import Dialog from "./components/Dialog.vue";
import Edit from "./components/Edit.vue";
import BreadCrumb from "../../components/BreadCrumb.vue";
import { Document } from "@element-plus/icons-vue";
let state = reactive<{
  tableData: {}[];
  currentPage: number;
  pageSize: number;
  keyword: string;
}>({
  currentPage: 1,
  pageSize: 10,
  keyword: "",
  tableData: [],
});
let { currentPage, pageSize, keyword, tableData } = toRefs(state);
let totalPage = ref(0);
let isShow = ref(false);
let editShow = ref(false);
let uid = ref(0);
let uEditInfo = ref({}) as Ref<editInfo>;
let addUser = ref(0);
// 对话框隐藏
let closeRoleDialog = (visible: boolean) => {
  isShow.value = visible;
};
// 对话框显示
let showDialog = (id: number) => {
  isShow.value = true;
  uid.value = id;
};
// 编辑框隐藏
const editClose = (reload?: "reload") => {
  editShow.value = false;
  if (reload === "reload") {
    fetchData();
  }
};
// 编辑用户或添加用户
const roleEdit = (item: editInfo | {}) => {
  editShow.value = true;
  uEditInfo.value = item as editInfo;
  // console.log(uEditInfo.value);
};


// 条数更改
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  fetchData();
};
// 当前页更改
const handleCurrentChange = (curPage: number) => {
  currentPage.value = curPage;
  fetchData();
};
const fetchData = async () => {
  let res = await getAdminList({
    pageNum: currentPage.value,
    pageSize: pageSize.value,
    keyword: keyword.value,
  });
  if (res.code === 200) {
    tableData.value = res.data.list;
    totalPage.value = res.data.total;
  }
};
fetchData();
</script>
<style lang="less" scoped>
.admin_list {
  .el-card {
    margin-top: 20px;
  }
  :deep(.el-card__body) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title {
    .left {
      display: flex;
      align-items: center;
      .title_icon {
        margin-top: 4px;
      }
    }
  }
}
</style>
