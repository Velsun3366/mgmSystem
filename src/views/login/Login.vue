<!-- 登录页 -->
<template>
  <div class="container">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      class="demo-ruleForm login_box"
       @keyup.enter="LoginForm"
    >
      <h2>管理系统</h2>
      <el-form-item prop="username">
        <el-input
          v-model="ruleForm.username"
          type="text"
          autocomplete="off"
          placeholder="请输入账号"
          :prefix-icon="Avatar"
          size="large"
          class="input_item"
        />
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          v-model="ruleForm.pwd"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          size="large"
          class="input_item"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="LoginForm()" size="large" class="btn"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
import { LoginApi, getAdminInfoApi } from "../../request/api";
import { Avatar, Lock } from "@element-plus/icons-vue";
import Cookie from "js-cookie";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// 用户名密码
let ruleForm = reactive({
  username: "",
  pwd: "",
});
//
const store = useStore();
const ruleFormRef = ref();
const router = useRouter();

// 密码校验
const validatePwd = (
  rule: unknown,
  value: string,
  callback: (msg?: string) => void
) => {
  if (value) {
    callback();
  } else {
    callback("密码不能为空");
  }
};
let rules = reactive({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  pwd: [{ validator: validatePwd, trigger: "blur" }],
});
const LoginForm = () => {
  // console.log(ruleFormRef.value);
  ruleFormRef.value.validate().then(() => {
    console.log("校验通过");
    LoginApi({
      password: ruleForm.pwd,
      username: ruleForm.username,
    }).then((res) => {
      // console.log(res);
      if (res.code === 200) {
        Cookie.set("token", res.data.tokenHead + res.data.token, {
          expires: 7,
        });
        getAdminInfoApi().then((res) => {
          if (res.code === 200) {
            // console.log(res.data.menus);
            // console.log(store);
            store.commit("updateMenus", res.data);
            router.push("/homePage");
          }
        });
      }
      // ruleForm.username = "";
      // ruleForm.pwd = "";
    });
  });
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #283a4b;
}

.login_box {
  width: 420px;
  height: 250px;
  text-align: center;
  :deep(.btn) {
    width: 100%;
  }
  h2 {
    color: #fff;
  }
}
:deep(.el-input__wrapper) {
  box-shadow: none;
  background-color: #243443;
}
:deep(.el-input__inner) {
  height: 50px;
  padding: 0 15px;
}
</style>
