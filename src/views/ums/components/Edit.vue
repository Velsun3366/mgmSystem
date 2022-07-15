<!--  -->
<template>
  <div class="edit_dialog">
    <el-dialog v-model="editShow" title="编辑用户" @close="editClose">
      <el-form :model="form" label-width="120px">
        <el-form-item label="账号:">
          <el-input
            v-model="form.username"
            type="text"
            placeholder="请输入账号"
          />
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input
            v-model="form.nickName"
            type="text"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="form.email" type="text" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            v-model="form.note"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editClose" size="large">取消</el-button>
          <el-button type="primary" @click="editConfirm" size="large"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, watch } from "vue";
import { registerUser, updateUserInfo } from "../../../request/api";

let props = defineProps<{
  editShow: boolean;
  uEditInfo: editInfo;
}>();
let state = reactive({
  form: {},
}) as { form: editInfo };
let { form } = toRefs(state);
const emit = defineEmits<{
  (event: "editClose", reload?: "reload"): void;
}>();
const editClose = (reload?: "reload") => {
  emit("editClose", reload);
};
// 确认按钮
const editConfirm = async () => {
  if (form.value.id) {
    let res = await updateUserInfo(form.value);
    if (res.code === 200) {
      editClose("reload");
    }
  } else {
    let res = await registerUser(form.value);
    if (res.code === 200) {
      editClose("reload");
    }
  }
};
// 监听变化
watch(
  () => props.uEditInfo,
  (newVal, oldVal) => {
    form.value = { ...newVal };
  }
);
</script>
<style lang="less" scoped></style>
