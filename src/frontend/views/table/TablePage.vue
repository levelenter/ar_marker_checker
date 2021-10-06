<template>
  <div>
    <paging-table :rows="rows" :columns="cols" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { TableColumn } from "../../../framework/components/table/TableColumn";
import PagingTable from "../../../framework/components/table/PagingTable.vue";

export default defineComponent({
  components: { PagingTable },
  setup() {
    const rows: { id: number; name: string; price: number; create: Date }[] = [];
    for (let i = 1; i <= 20; i++) {
      rows.push({ id: i, name: `item ${i}`, price: i * 1000000, create: new Date() });
    }

    const cols: TableColumn[] = [
      { label: "id", name: "id" },
      { label: "name", name: "name" },
      { label: "price", name: "price", type: "currency" },
      { label: "create data", name: "create", type: "date" },
    ];

    return {
      rows,
      cols,
    };
  },
});
</script>