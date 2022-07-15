<!--  -->
<template>
  <div class="dialog_box">
    <el-dialog v-model="isShow" title="分配角色" @close="close" :width="400">
      <el-select
        v-model="form.roleSelect"
        multiple
        placeholder="选择分配的角色"
        style="width: 300px"
      >
        <el-option
          v-for="item in roleListAll"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="updateRole">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { reactive, toRefs, ref, watch } from "vue";
import { getRoleList, getUserRole, updateUserRole } from "../../../request/api";

let form = reactive<{
  roleSelect: number[];
}>({
  roleSelect: [],
});
let roleListAll = ref<roleListData[]>([]);
getRoleList().then((res) => {
  if (res.code === 200) {
    roleListAll.value = res.data;
  }
});
let props = defineProps<{
  isShow: boolean;
  uid: number;
}>();
const emit = defineEmits<{
  (event: "close", visible: boolean): void;
}>();
const close = () => {
  emit("close", false);
};
// 确认按钮
const updateRole = async () => {
  let res = await updateUserRole({
    adminId: props.uid,
    roleIds: form.roleSelect.join(","),
  });
  if (res.code === 200) {
    console.log(res);
    emit("close", false);
    ElMessage({
      message: "分配角色成功",
      type: "success",
    });
  }
};
watch(
  () => props.uid,
  () => {
    getUserRole(props.uid).then((res) => {
      if (res.code === 200) {
        // form.roleSelect = res.data.map((item) => item.id);
        form.roleSelect = res.data.reduce((pre, cur) => {
          cur && pre.push(cur.id);
          return pre;
        }, [] as number[]);
      }
    });
  }
);
// console.log(props.isShow);
</script>
<style lang="less" scoped></style>
