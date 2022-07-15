<script setup lang="ts">
import { ref } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const locale = ref(zhCn);
</script>

<template>
  <el-config-provider :locale="locale"> 
    <router-view></router-view>
  </el-config-provider>
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: hidden;
}
html {
  height: 100%;
}
</style>
