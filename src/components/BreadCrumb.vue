<!--  -->
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      ><a href="/">promotion management</a></el-breadcrumb-item
    >
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
</script>
<style lang="less" scoped>

</style>
