<template>
  <core-dialog :id="dialogId" :dialog-class="{ 'modal-xl': true }" :title="title">
    <div>
      <table-page />
    </div>
  </core-dialog>
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { DialogHandler } from "./DialogHandler";
import CoreDialog from "@/framework/components/dialog/CoreDialog.vue";
import TablePage from "../../views/table/TablePage.vue";
export default defineComponent({
  components: { CoreDialog, TablePage },
  props: {},
  setup: () => {
    const dialogId = DialogHandler.tableDialogId;

    onMounted(() => {
      DialogHandler.onOpenDialog(dialogId, (e: Event) => {
        console.log("init");
      });
    });
    return {
      dialogId,
    };
  },
});
</script>