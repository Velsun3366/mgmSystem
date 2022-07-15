<!--  -->
<template>
  <div class="returnReason">
    <el-container>
      <el-header><BreadCrumbVue></BreadCrumbVue></el-header>
      <el-main class="main_content">
        <DataList></DataList>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
import BreadCrumbVue from "../../components/BreadCrumb.vue";
import DataList from "../../components/DataTable.vue";
</script>
<style lang="less" scoped>
.returnReason {
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
}
</style>
