<!-- 首页 -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header-left">
          <h1 class="title">运营平台</h1>
          <el-icon class="icon_menu" @click="menuToggle"><Menu /></el-icon>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userName }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>首页</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="#294256"
            text-color="#fff"
            active-text-color="#fff"
            :unique-opened="true"
            :router="true"
          >
            <el-sub-menu
              :index="menu.id + ''"
              v-for="menu in newMenus"
              :key="menu.id"
            >
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ menu.title }}</span>
              </template>
              <template v-for="submenu in menu.children" :key="submenu.id">
                <el-menu-item
                  :index="'/' + menu.name + '/' + submenu.name"
                  v-if="!submenu.hidden"
                  >{{ submenu.title }}</el-menu-item
                >
              </template>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main class="sub_view">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, computed } from "vue";
import { Location, ArrowDown, Menu } from "@element-plus/icons-vue";
import { useStore } from "vuex";

const store = useStore();
// 菜单数据
const newMenus = computed(() => {
  // console.log(store.getters);

  return store.getters.getNewMenus;
});
const userName = computed(() => {
  return store.state.userInfo.username;
});

let isCollapse = ref(false);

const menuToggle = () => {
  isCollapse.value = !isCollapse.value;
  // console.log(isCollapse);
};
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 100%;
  // background-color: #294256;
  color: #fff;
}
:deep(.el-menu--collapse) {
  min-height: 100%;
  // background-color: #294256;
}
:deep(.el-aside) {
  --el-aside-width: none;
}
:deep(.el-header) {
  background-color: #00a0ff;
}
:deep(.el-main) {
  --el-main-padding: none;
  
}
.sub_view{
  height: 100vh;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  color: #fff;
  h1 {
    font-weight: normal;
  }
  .header-left {
    display: flex;
    align-items: center;
    .title {
      margin-right: 20px;
    }
  }
  .icon_menu {
    // margin-top: 10px;
    color: #fff;
    font-size: 20px;
  }
}
:deep(.el-dropdown) {
  color: #fff;
}
</style>
