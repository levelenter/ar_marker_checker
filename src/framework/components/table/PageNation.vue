<template>
  <div>
    <ul class="pagination">
      <li v-for="index in paginations()" :key="index" class="page-item" :class="{ active: currentPage === index }">
        <button class="page-link" @click="pageChanged(index)">{{ index + 1 }}</button>
      </li>
    </ul>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref, watch } from "@vue/runtime-core";
export default defineComponent({
  props: {
    fullRows: { type: Array, default: () => [] },
    pageSize: { type: Number, default: 10 },
  },
  emits: ["on-page-changed"],
  setup: (prop, context) => {
    const currentPage = ref(0);
    const rowsInPage = ref([] as any[]);
    const total = () => {
      return Math.ceil(prop.fullRows.length / prop.pageSize);
    };

    const paginations = (): number[] => {
      // 連番配列を取得
      return Array.from({ length: total() }, (v, k) => k);
    };

    const pageChanged = (index: number) => {
      currentPage.value = index;
      const start = currentPage.value * prop.pageSize;
      const end = (currentPage.value + 1) * prop.pageSize;
      rowsInPage.value = prop.fullRows.slice(start, end);

      context.emit("on-page-changed", rowsInPage.value, currentPage.value);
    };

    watch(
      () => prop.fullRows,
      (first, second) => {
        console.log("page", first, second);
        pageChanged(0);
      },
      { immediate: true }
    );

    return {
      currentPage,
      rowsInPage,
      paginations,
      pageChanged,
    };
  },
});
</script>
