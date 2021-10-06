<template>
  <header>
    <nav class="d-flex justify-content-between pt-2 my-2">
      <!-- <a href="#"><img src="../../assets/logo.png" height="40" /></a> -->

      <div>
        <a id="sign_in_button" class="btn btn-outline-secondary btn-sm" role="button" href="#" @click="openDialog">ログイン</a>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/runtime-core";
import { DialogHandler } from "@/frontend/components/dialog/DialogHandler";
export default defineComponent({
  props: {},
  setup: (prop, context) => {
    const props = reactive(prop);
    const openDialog = () => {
      DialogHandler.showSingInDialog();
    };

    return {
      props,
      context,
      openDialog,
    };
  },
});
</script>
