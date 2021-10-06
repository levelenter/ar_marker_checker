<template>
  <login-dialog />
  <table-dialog />
  <notifications position="top right" />
</template>
<script lang='ts'>
import { defineComponent } from "@vue/runtime-core";
import LoginDialog from "./LoginDialog.vue";
import TableDialog from "./TableDialog.vue";

export default defineComponent({
  components: { LoginDialog, TableDialog },
});
</script>