<template>
  <save-dialog />
</template>
<script lang='ts'>
import { defineComponent } from "@vue/runtime-core";
import SaveDialog from "./SaveDialog.vue";

export default defineComponent({
  components: {
    SaveDialog,
  },
});
</script>