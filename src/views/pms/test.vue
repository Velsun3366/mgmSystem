<!--  -->
<template>
  <div>{{ count }}</div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, watchEffect, computed } from "vue";

let state = reactive({
  num: 1,
  arr: [1, 54, 6, 3, 2, 3],
});

let count = computed((): number => {
  return state.num;
});
</script>
<style lang="less" scoped></style>
